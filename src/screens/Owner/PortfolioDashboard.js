import React, { useState, useCallback, useRef, useMemo } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import {
  Bell,
  User,
  Wallet,
  Users,
  BedDouble,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  MoreHorizontal,
  Home,
  Waves,
  Coffee,
  Wifi,
  Car,
  CheckCircle2,
  Search,
  Wrench,
  MapPin,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Clock
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Syncing with Reine Palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const PROPERTY_DETAILS = {
  "All Properties": {
    title: "Resort Portfolio",
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  },
  "Reine's Beach": {
    title: "Reine's Beach House",
    capacity: "Unlimited Pax",
    baseRate: "₱15,000/night",
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    amenities: [
      { icon: Waves, label: "Private Pool" },
      { icon: Coffee, label: "Full Kitchen" },
      { icon: Home, label: "Entire House" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Car, label: "4-Car Parking" }
    ]
  },
  "Ryu's House": {
    title: "Ryu's Transient House",
    capacity: "15 Pax",
    baseRate: "₱8,000/night",
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    amenities: [
      { icon: Home, label: "Entire House" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Coffee, label: "Basic Kitchen" },
      { icon: Car, label: "2-Car Parking" }
    ]
  },
  "Casa M.O.": {
    title: "Casa M.O.",
    capacity: "20 Pax",
    baseRate: "₱12,000/night",
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
    amenities: [
      { icon: Waves, label: "Private Pool" },
      { icon: Home, label: "Heritage Villa" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Car, label: "6-Car Parking" }
    ]
  }
};

export default function PortfolioDashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const [activeNav, setActiveNav] = useState('Property');
  const [propertyStatus, setPropertyStatus] = useState('AVAILABLE');
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netIncome: 0,
    pendingIssues: 0,
    totalBookings: 0,
    occupancyRate: 0
  });

  const [propertyStats, setPropertyStats] = useState([]);

  const topTabs = ['All Properties', "Reine's Beach", "Ryu's House", "Casa M.O."];

  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const fetchDashboardData = async () => {
        setLoading(true);
        try {
          const dailyCollections = await mockDb.getAll('dailyCollections');
          const electricity = await mockDb.getAll('electricityBills');
          const water = await mockDb.getAll('waterBills');
          const pettyCash = await mockDb.getAll('pettyCash') || [];
          const rooms = await mockDb.getAll('rooms');
          const maintenance = await mockDb.getAll('maintenance');

          const totalRevenue = dailyCollections.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
          const totalExpenses = electricity.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) +
                               water.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) +
                               pettyCash.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

          const netIncome = totalRevenue - totalExpenses;
          const occupiedRooms = rooms.filter(r => r.isOccupied).length;
          const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;
          const pendingIssues = maintenance.filter(m => m.status === 'Open').length;

          setMetrics({
            totalRevenue,
            totalExpenses,
            netIncome,
            totalBookings: dailyCollections.length,
            occupancyRate,
            pendingIssues
          });

          const propertyNames = [
            { id: '1', name: "Reine Beach House", tabName: "Reine's Beach", image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' },
            { id: '2', name: "Ryu Resort", tabName: "Ryu's House", image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' },
            { id: '3', name: "Casa M.O.", tabName: "Casa M.O.", image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }
          ];

          const stats = propertyNames.map(prop => {
            const propCollections = dailyCollections.filter(c => c.property === prop.name);
            const propRevenue = propCollections.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
            const propRooms = rooms.filter(r => r.property === prop.name);
            const propOccupied = propRooms.filter(r => r.isOccupied).length;
            const propOccRate = propRooms.length > 0 ? Math.round((propOccupied / propRooms.length) * 100) : 0;

            let status = 'Stable';
            let sColor = COLORS.successBg;
            let sText = COLORS.successText;

            if (propRevenue > 150000) status = 'High Demand';

            return {
              ...prop,
              rev: `₱${(propRevenue / 1000).toFixed(1)}k`,
              occ: `${propOccRate}%`,
              status,
              statusColor: sColor,
              statusTextColor: sText,
            };
          });

          setPropertyStats(stats);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }, [])
  );

  const heroImage = PROPERTY_DETAILS[activeTab].image;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground source={{ uri: heroImage }} style={styles.heroImage}>
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>{activeTab === 'All Properties' ? 'Resort Portfolio' : activeTab}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('OwnerSettings')} style={styles.profileAvatarWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroSubStat}>PORTFOLIO OVERVIEW</Text>
                <Text style={styles.heroMainStat}>
                  {activeTab === 'All Properties' ? `₱${metrics.totalRevenue.toLocaleString()}` : propertyStatus}
                </Text>
                <View style={styles.trendPill}>
                  <TrendingUp size={16} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.trendPillText}>+12.4% revenue increase</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ── QUICK TAB PILLS ── */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {topTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.actionPillLight, isActive && styles.actionPillLightActive]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setActiveTab(tab);
                    setPropertyStatus('AVAILABLE');
                  }}
                >
                  <Text style={[styles.actionPillLightText, isActive && styles.actionPillLightTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          {activeTab === 'All Properties' ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Portfolio Snapshot</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8} onPress={() => navigation.navigate('OwnerFinance')}>
                  <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>₱{(metrics.totalRevenue / 1000).toFixed(1)}k</Text>
                        <Text style={styles.snapshotLabel}>Total Revenue</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8} onPress={() => navigation.navigate('OwnerBookings')}>
                  <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <Users size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>{metrics.totalBookings}</Text>
                        <Text style={styles.snapshotLabel}>Total Bookings</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <BedDouble size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>{metrics.occupancyRate}%</Text>
                        <Text style={styles.snapshotLabel}>Occupancy</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Property Performance</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')}>
                  <Text style={styles.viewAllText}>Full Report</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.performanceList}>
                {propertyStats.map((property) => (
                  <TouchableOpacity key={property.id} style={styles.performanceCard} activeOpacity={0.7} onPress={() => setActiveTab(property.tabName)}>
                    <Image source={{ uri: property.image }} style={styles.performanceImage} />
                    <View style={styles.performanceInfo}>
                      <Text style={styles.performanceTitle}>{property.name}</Text>
                      <Text style={styles.performanceSubtitle}>REV: {property.rev} • OCC: {property.occ}</Text>
                    </View>
                    <View style={[styles.statusBadgeSmall, { backgroundColor: property.statusColor }]}>
                      <Text style={[styles.statusBadgeTextSmall, { color: property.statusTextColor }]}>{property.status}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Overview</Text>
              </View>

              <View style={styles.propertyCard}>
                <ImageBackground source={{ uri: PROPERTY_DETAILS[activeTab].image }} style={styles.propertyCardImage} imageStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                   <View style={styles.propertyCardImageOverlay} />
                </ImageBackground>
                <View style={styles.propertyCardBody}>
                  <Text style={styles.propertyCardTitle}>{PROPERTY_DETAILS[activeTab].title}</Text>
                  <View style={styles.amenityGrid}>
                    {PROPERTY_DETAILS[activeTab].amenities?.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <View key={idx} style={styles.amenityPill}>
                          <Icon size={14} color={COLORS.primary} strokeWidth={2.5} style={{ marginRight: 6 }} />
                          <Text style={styles.amenityPillText}>{item.label}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.propertyCardFooter}>
                    <View>
                      <Text style={styles.footerLabel}>BASE RATE</Text>
                      <Text style={styles.footerValue}>{PROPERTY_DETAILS[activeTab].baseRate}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.footerLabel}>CAPACITY</Text>
                      <Text style={styles.footerValue}>{PROPERTY_DETAILS[activeTab].capacity}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick Controls</Text>
              </View>
              <View style={styles.controlsRow}>
                 <TouchableOpacity
                  style={[styles.controlBtn, propertyStatus === 'AVAILABLE' && styles.controlBtnActive]}
                  onPress={() => setPropertyStatus('AVAILABLE')}
                 >
                   <CheckCircle2 size={24} color={propertyStatus === 'AVAILABLE' ? COLORS.primary : COLORS.textMuted} />
                   <Text style={[styles.controlBtnText, propertyStatus === 'AVAILABLE' && styles.controlBtnTextActive]}>Set Available</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                  style={[styles.controlBtn, propertyStatus === 'OCCUPIED' && styles.controlBtnActive]}
                  onPress={() => setPropertyStatus('OCCUPIED')}
                 >
                   <Users size={24} color={propertyStatus === 'OCCUPIED' ? COLORS.primary : COLORS.textMuted} />
                   <Text style={[styles.controlBtnText, propertyStatus === 'OCCUPIED' && styles.controlBtnTextActive]}>Set Occupied</Text>
                 </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
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
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60 },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  profileAvatarWrap: { position: 'relative' },
  profileAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#FFFFFF' },
  notificationDot: { position: 'absolute', top: 2, right: 2, width: 10, height: 10, backgroundColor: COLORS.primary, borderRadius: 5, borderWidth: 2, borderColor: '#FFFFFF' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
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

  snapshotScroll: { gap: 16, paddingBottom: 24 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)' },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  performanceList: { gap: 12 },
  performanceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  performanceImage: { width: 56, height: 56, borderRadius: 14 },
  performanceInfo: { flex: 1, marginLeft: 14 },
  performanceTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 2 },
  performanceSubtitle: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  statusBadgeSmall: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeTextSmall: { fontSize: 10, fontWeight: '800' },

  propertyCard: { backgroundColor: COLORS.surface, borderRadius: 24, marginBottom: 24, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  propertyCardImage: { width: '100%', height: 180 },
  propertyCardImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  propertyCardBody: { padding: 20 },
  propertyCardTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 12 },
  amenityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  amenityPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  amenityPillText: { fontSize: 12, fontWeight: '700', color: COLORS.textMain },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  propertyCardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted, marginBottom: 2 },
  footerValue: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },

  controlsRow: { flexDirection: 'row', gap: 12 },
  controlBtn: { flex: 1, height: 100, backgroundColor: COLORS.surface, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', gap: 8 },
  controlBtnActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  controlBtnText: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  controlBtnTextActive: { color: COLORS.primary },

  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});