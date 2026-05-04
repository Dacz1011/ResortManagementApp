import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  ImageBackground,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  Banknote,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Droplet,
  Zap,
  Wallet,
  SlidersHorizontal
} from 'lucide-react-native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

const TABS = ['All Properties', "Reine", "Ryu", "Casa"];

const PROPERTY_MAP = {
  "Reine": "Reine Beach House",
  "Ryu": "Ryu Resort",
  "Casa": "Casa M.O."
};

export default function OwnerFinance({ navigation, route }) {
  const [activeTab, setActiveTab] = useState(route?.params?.activeTab || 'All Properties');
  const activeNav = 'Finance';
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netIncome: 0,
    propertyCollections: [],
    recentTransactions: []
  });

  const fetchFinancials = async () => {
    setLoading(true);
    try {
      const [collections, electricity, water, pettyCash, otherExp] = await Promise.all([
        mockDb.getAll('dailyCollections'),
        mockDb.getAll('electricityBills'),
        mockDb.getAll('waterBills'),
        mockDb.getAll('pettyCash'),
        mockDb.getAll('otherExpenses')
      ]);

      const filterByProperty = (data, tab) => {
        if (tab === 'All Properties') return data;
        const mappedName = PROPERTY_MAP[tab];
        return data.filter(item => item.property === mappedName);
      };

      const filteredCollections = filterByProperty(collections, activeTab);
      const filteredElectricity = filterByProperty(electricity, activeTab);
      const filteredWater = filterByProperty(water, activeTab);
      const filteredPettyCash = filterByProperty(pettyCash, activeTab);
      const filteredOther = filterByProperty(otherExp, activeTab);

      const rev = filteredCollections.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      const exp = filteredElectricity.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
                  filteredWater.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
                  filteredPettyCash.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
                  filteredOther.reduce((sum, item) => sum + Number(item.amount || 0), 0);

      const propStats = Object.keys(PROPERTY_MAP).map(key => {
        const propName = PROPERTY_MAP[key];
        const propRevenue = collections.filter(c => c.property === propName).reduce((sum, c) => sum + Number(c.amount || 0), 0);
        const progress = Math.min(Math.round((propRevenue / 100000) * 100), 100);
        return {
          id: key,
          name: key.toUpperCase(),
          amount: `₱${(propRevenue / 1000).toFixed(1)}k`,
          progress: `${progress}%`
        };
      });

      const allTx = [
        ...filteredCollections.map(c => ({ id: `c-${c.id}`, type: 'income', title: 'Stay Collection', subtitle: `${c.property}`, amount: `+₱${Number(c.amount).toLocaleString()}`, date: c.date, icon: Banknote })),
        ...filteredElectricity.map(e => ({ id: `e-${e.id}`, type: 'expense', title: 'Electricity', subtitle: `${e.property}`, amount: `-₱${Number(e.amount).toLocaleString()}`, date: e.date, icon: Zap })),
        ...filteredWater.map(w => ({ id: `w-${w.id}`, type: 'expense', title: 'Water Bill', subtitle: `${w.property}`, amount: `-₱${Number(w.amount).toLocaleString()}`, date: w.date, icon: Droplet })),
        ...filteredPettyCash.map(p => ({ id: `p-${p.id}`, type: 'expense', title: p.category || 'Petty Cash', subtitle: `${p.property}`, amount: `-₱${Number(p.amount).toLocaleString()}`, date: p.date, icon: Banknote })),
        ...filteredOther.map(o => ({ id: `o-${o.id}`, type: 'expense', title: o.type || 'Other Utility', subtitle: `${o.property}`, amount: `-₱${Number(o.amount).toLocaleString()}`, date: o.date, icon: Banknote }))
      ];

      allTx.sort((a, b) => new Date(b.date) - new Date(a.date));

      setFinancialData({
        totalRevenue: rev,
        totalExpenses: exp,
        netIncome: rev - exp,
        propertyCollections: activeTab === 'All Properties' ? propStats : propStats.filter(p => p.id === activeTab),
        recentTransactions: allTx.slice(0, 10)
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      fetchFinancials();
    }, [activeTab])
  );

  const HERO_IMAGE = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        <View style={styles.heroContainer}>
          <ImageBackground source={{ uri: HERO_IMAGE }} style={styles.heroImage}>
            <View style={styles.heroOverlay} />
            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <Wallet size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>{activeTab === 'All Properties' ? 'Portfolio Financials' : activeTab}</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark}>
                  <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroSubStat}>NET OPERATING INCOME</Text>
                <Text style={styles.heroMainStat}>₱{financialData.netIncome.toLocaleString()}</Text>
                <View style={styles.trendPill}>
                  <TrendingUp size={16} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.trendPillText}>Live Portfolio Sync</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.actionPillLight, isActive && styles.actionPillLightActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.actionPillLightText, isActive && styles.actionPillLightTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Breakdown</Text>
          </View>
          <View style={styles.noiCard}>
             <View style={styles.noiRow}>
               <View style={styles.noiItem}>
                 <Text style={styles.noiLabel}>REVENUE</Text>
                 <Text style={styles.noiValueGreen}>₱{financialData.totalRevenue.toLocaleString()}</Text>
               </View>
               <View style={styles.noiDivider} />
               <View style={styles.noiItem}>
                 <Text style={styles.noiLabel}>EXPENSES</Text>
                 <Text style={styles.noiValueRed}>₱{financialData.totalExpenses.toLocaleString()}</Text>
               </View>
             </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Collections</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.collectionsScroll}>
            {financialData.propertyCollections.map((col) => (
              <View key={col.id} style={styles.collectionCard}>
                <View style={styles.collectionHeader}>
                  <Text style={styles.collectionName}>{col.name}</Text>
                  <View style={styles.collectionBadge}><Text style={styles.collectionBadgeText}>{col.progress}</Text></View>
                </View>
                <Text style={styles.collectionAmount}>{col.amount}</Text>
                <View style={styles.progressTrack}><View style={[styles.progressFill, { width: col.progress }]} /></View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')}>
              <Text style={styles.viewAllText}>View Ledger</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            {financialData.recentTransactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <View key={tx.id} style={styles.transactionItem}>
                  <View style={[styles.txIconBox, { backgroundColor: isIncome ? COLORS.successBg : COLORS.dangerBg }]}>
                    {isIncome ? <ArrowDownRight size={20} color={COLORS.successText} /> : <ArrowUpRight size={20} color={COLORS.dangerText} />}
                  </View>
                  <View style={styles.txInfo}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txSubtitle}>{tx.subtitle} • {tx.date}</Text>
                  </View>
                  <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>{tx.amount}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}><LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}><Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}><BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}><BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}><PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}><Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} /></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 380 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60 },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 44, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubStat: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5, textAlign: 'center' },
  trendPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 },
  trendPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', marginLeft: 8 },
  quickActionsWrapper: { marginTop: 24, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillLight: { backgroundColor: COLORS.surface, paddingHorizontal: 20, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },
  mainContent: { paddingHorizontal: 24, paddingTop: 16 },
  sectionHeader: { marginBottom: 16 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  viewAllText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  noiCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  noiRow: { flexDirection: 'row', alignItems: 'center' },
  noiItem: { flex: 1, alignItems: 'center' },
  noiLabel: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 1 },
  noiValueGreen: { fontSize: 20, fontWeight: '800', color: COLORS.successText },
  noiValueRed: { fontSize: 20, fontWeight: '800', color: COLORS.dangerText },
  noiDivider: { width: 1, height: 40, backgroundColor: COLORS.border, marginHorizontal: 20 },
  collectionsScroll: { gap: 16, paddingBottom: 24 },
  collectionCard: { width: 160, backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  collectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  collectionName: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted },
  collectionBadge: { backgroundColor: COLORS.primaryLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  collectionBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.primary },
  collectionAmount: { fontSize: 22, fontWeight: '800', color: COLORS.textMain, marginBottom: 16 },
  progressTrack: { height: 6, backgroundColor: COLORS.background, borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  transactionsContainer: { backgroundColor: COLORS.surface, borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: COLORS.background },
  txIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  txInfo: { flex: 1 },
  txTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 2 },
  txSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  txAmount: { fontSize: 16, fontWeight: '800' },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});