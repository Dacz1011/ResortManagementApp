import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  FlatList,
  ImageBackground,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  ChevronLeft,
  Search,
  Wallet,
  Lightbulb,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  Droplets,
  Banknote,
  Zap,
  Droplet,
  MapPin,
  SlidersHorizontal,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react-native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Matched strictly to Reine palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  expenseText: '#EF4444',
  expenseBg: '#FEE2E2',
};

const FILTERS = ['All', 'Income', 'Expenses'];

export default function OwnerLedger({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const activeNav = 'Ledger';
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchLedgerData = async () => {
    setLoading(true);
    try {
      const dailyCollections = await mockDb.getAll('dailyCollections');
      const electricity = await mockDb.getAll('electricityBills');
      const water = await mockDb.getAll('waterBills');
      const pettyCash = await mockDb.getAll('pettyCash');

      const income = dailyCollections.map(item => ({
        id: `c-${item.id}`,
        title: 'Guest Collection',
        subtitle: `${item.property}`,
        amount: item.amount,
        date: item.date,
        type: 'Income',
        icon: Wallet
      }));

      const electricityExpenses = electricity.map(item => ({
        id: `e-${item.id}`,
        title: 'Electricity Bill',
        subtitle: `${item.property}`,
        amount: item.amount,
        date: item.date,
        type: 'Expenses',
        icon: Zap
      }));

      const waterExpenses = water.map(item => ({
        id: `w-${item.id}`,
        title: 'Water Bill',
        subtitle: `${item.property}`,
        amount: item.amount,
        date: item.date,
        type: 'Expenses',
        icon: Droplet
      }));

      const otherExpenses = pettyCash.map(item => ({
        id: `p-${item.id}`,
        title: item.category || 'Petty Cash',
        subtitle: `${item.property}`,
        amount: item.amount,
        date: item.date,
        type: 'Expenses',
        icon: Banknote
      }));

      const combinedData = [...income, ...electricityExpenses, ...waterExpenses, ...otherExpenses];
      combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

      setLedgerData(combinedData);
    } catch (error) {
      console.error("Error loading ledger:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLedgerData();
    }, [])
  );

  const filteredData = ledgerData.filter(item => {
    if (activeFilter === 'Income') return item.type === 'Income';
    if (activeFilter === 'Expenses') return item.type === 'Expenses';
    return true;
  }).filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTransactionItem = ({ item }) => {
    const isIncome = item.type === 'Income';
    return (
      <View style={styles.transactionCard}>
        <View style={[styles.txIconBox, { backgroundColor: isIncome ? COLORS.successBg : COLORS.expenseBg }]}>
          {isIncome ? <ArrowDownRight size={20} color={COLORS.successText} /> : <ArrowUpRight size={20} color={COLORS.expenseText} />}
        </View>
        <View style={styles.txInfo}>
          <Text style={styles.txTitle}>{item.title}</Text>
          <Text style={styles.txSubtitle}>{item.subtitle} • {item.date}</Text>
        </View>
        <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>
          {isIncome ? '+' : '-'}₱{Number(item.amount).toLocaleString()}
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {/* ── FULL-BLEED HERO ── */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2000&auto=format&fit=crop' }}
          style={styles.heroImage}
        >
          <View style={styles.heroOverlay} />

          <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.iconBtnDark} onPress={() => navigation.goBack()}>
                <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
              <View style={styles.locationPill}>
                <BookOpen size={14} color="#FFFFFF" style={styles.locationIcon} />
                <Text style={styles.locationText}>Ledger</Text>
              </View>
              <TouchableOpacity style={styles.iconBtnDark}>
                <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroBottomContent}>
              <Text style={styles.heroSubStat}>TRANSACTION HISTORY</Text>
              <Text style={styles.heroMainStat}>{ledgerData.length} Records</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* ── SEARCH & FILTER ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search history..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.actionPillLight, isActive && styles.actionPillLightActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.actionPillLightText, isActive && styles.actionPillLightTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ height: 16 }} />
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderTransactionItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.bottomSpacer} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={{ color: COLORS.textMuted, fontWeight: '600' }}>No records found.</Text>
            </View>
          }
        />
      </Animated.View>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  heroContainer: { width: '100%', height: 320 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60 },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubStat: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5, textAlign: 'center' },

  searchWrapper: { paddingHorizontal: 24, marginTop: 24 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 100, paddingHorizontal: 20, height: 56, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600', color: COLORS.textMain },

  filtersWrapper: { marginTop: 20, marginBottom: 12 },
  filtersScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillLight: { backgroundColor: COLORS.surface, paddingHorizontal: 20, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },

  listContent: { paddingBottom: 16 },
  transactionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, marginHorizontal: 24 },
  txIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  txInfo: { flex: 1 },
  txTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 2 },
  txSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  txAmount: { fontSize: 16, fontWeight: '800' },

  emptyContainer: { alignItems: 'center', marginTop: 40, paddingHorizontal: 24 },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});