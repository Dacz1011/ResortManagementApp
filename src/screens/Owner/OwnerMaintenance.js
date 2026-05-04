import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  ImageBackground,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  ChevronLeft,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  MoreHorizontal,
  MapPin,
  SlidersHorizontal
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
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
};

export default function OwnerMaintenance({ navigation }) {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeNav = 'Property';
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const logs = await mockDb.getAll('maintenance');
      logs.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
      setMaintenanceLogs(logs);
    } catch (error) {
      console.error("Error fetching maintenance logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      fetchLogs();
    }, [])
  );

  const handleResolve = async (id) => {
    Alert.alert(
      'Resolve Issue',
      'Mark this issue as resolved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Resolve',
          onPress: async () => {
            const success = await mockDb.update('maintenance', id, { status: 'Resolved' });
            if (success) {
              fetchLogs();
            }
          }
        }
      ]
    );
  };

  const renderLogItem = ({ item }) => {
    const isOpen = item.status === 'Open';
    return (
      <View style={styles.logCard}>
        <View style={styles.logHeader}>
          <View style={[styles.statusBadge, { backgroundColor: isOpen ? COLORS.dangerBg : COLORS.successBg }]}>
            <Text style={[styles.statusBadgeText, { color: isOpen ? COLORS.dangerText : COLORS.successText }]}>
              {item.status}
            </Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: item.priority === 'High' ? COLORS.dangerBg : COLORS.warningBg }]}>
            <Text style={[styles.priorityBadgeText, { color: item.priority === 'High' ? COLORS.dangerText : COLORS.warningText }]}>
              {item.priority} Priority
            </Text>
          </View>
        </View>

        <View style={styles.logBody}>
          <View style={styles.iconBox}>
            <Wrench size={20} color={COLORS.primary} strokeWidth={2.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.logTitle}>{item.description}</Text>
            <Text style={styles.logSubtitle}>{item.property}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.logFooter}>
          <View style={styles.dateInfo}>
            <Clock size={12} color={COLORS.textMuted} />
            <Text style={styles.dateText}>{item.reportedDate}</Text>
          </View>
          <TouchableOpacity
            style={[styles.actionBtn, !isOpen && styles.actionBtnDisabled]}
            onPress={() => isOpen && handleResolve(item.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionBtnText, !isOpen && styles.actionBtnTextDisabled]}>
              {isOpen ? 'Resolve' : 'Resolved'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <TouchableOpacity style={styles.iconBtnDark} onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={styles.locationPill}>
                  <Wrench size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Maintenance</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark}>
                  <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroSubStat}>OPERATIONS UNIT</Text>
                <Text style={styles.heroMainStat}>
                  {maintenanceLogs.filter(l => l.status === 'Open').length} Active Issues
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Maintenance Logs</Text>
          </View>

          <FlatList
            data={maintenanceLogs}
            keyExtractor={(item) => item.id}
            renderItem={renderLogItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listPadding}
            ListEmptyComponent={
              <View style={styles.emptyCard}>
                <AlertCircle size={48} color={COLORS.textMuted} strokeWidth={1.5} />
                <Text style={styles.emptyText}>No logs recorded.</Text>
              </View>
            }
          />
        </View>
      </Animated.View>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={22} color={'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={22} color={'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={22} color={'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <PieChart size={22} color={'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={22} color={'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  heroContainer: { width: '100%', height: 340 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60 },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubStat: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5, textAlign: 'center' },

  mainContent: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  listPadding: { paddingBottom: 160 },

  logCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityBadgeText: { fontSize: 10, fontWeight: '800' },
  logBody: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  logTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 4 },
  logSubtitle: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  divider: { height: 1, backgroundColor: COLORS.background, marginBottom: 16 },
  logFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  actionBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  actionBtnDisabled: { backgroundColor: COLORS.background },
  actionBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  actionBtnTextDisabled: { color: COLORS.textMuted },

  emptyCard: { alignItems: 'center', padding: 40, backgroundColor: COLORS.surface, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border },
  emptyText: { marginTop: 12, fontSize: 14, fontWeight: '600', color: COLORS.textMuted },

  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});