import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import {
  Bell,
  User,
  Wallet,
  Users,
  BedDouble,
  ArrowRight,
  Plus,
  TrendingUp,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  Settings,
  MoreHorizontal,
  Home,
  Waves,
  Coffee,
  Wifi,
  Car,
  CheckCircle2
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette
const COLORS = {
  background: '#F4F7F6',
  primary: '#1A3626',
  primarySoft: '#E8F0EA',
  accent: '#2DD4BF',
  cardBg: '#FFFFFF',
  textDark: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  successText: '#15803D',
  successBg: '#DCFCE7',
  warningText: '#B45309',
  warningBg: '#FEF3C7',
  red: '#EF4444'
};

// Detailed Data for Property Status View
const PROPERTY_DETAILS = {
  "Reine's Beach": {
    title: "Reine's Beach House",
    capacity: "Unlimited Pax",
    baseRate: "₱12,000/night",
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
    baseRate: "₱15,000/night",
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

  const topTabs = ['All Properties', "Reine's Beach", "Ryu's House", "Casa M.O."];

  const propertyPerformance = [
    {
      id: '1',
      name: "Reine's Beach House",
      tabName: "Reine's Beach",
      rev: '₱22.4k',
      occ: '94%',
      status: 'HIGH DEMAND',
      statusColor: COLORS.successBg,
      statusTextColor: COLORS.successText,
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '2',
      name: "Ryu's Transient House",
      tabName: "Ryu's House",
      rev: '₱22.4k',
      occ: '82%',
      status: 'STABLE',
      statusColor: COLORS.warningBg,
      statusTextColor: COLORS.warningText,
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop'
    },
    {
      id: '3',
      name: "Casa M.O.",
      tabName: "Casa M.O.",
      rev: '₱22.4k',
      occ: '78%',
      status: 'GROWING',
      statusColor: COLORS.successBg,
      statusTextColor: COLORS.successText,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'
    }
  ];

  const activePropertyDetails = PROPERTY_DETAILS[activeTab];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- DYNAMIC HEADER --- */}
      <View style={styles.header}>
        {activeTab === 'All Properties' ? (
          <View>
            <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-ExtraBold' }]}>PORTFOLIO OVERVIEW</Text>
            <Text style={[styles.headerTitle, { fontFamily: 'Manrope-Regular' }]}>Resort Admin</Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.headerTitle, { textTransform: 'uppercase', fontFamily: 'Manrope-ExtraBold' }]}>PROPERTY STATUS</Text>
            <Text style={[styles.headerSubtitle, { marginTop: 4, letterSpacing: 0, color: COLORS.primary, fontFamily: 'Manrope-Bold' }]}>
              Live update • Just now
            </Text>
          </View>
        )}
        <View style={styles.headerActions}>
          {activeTab === 'All Properties' && (
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Bell size={22} color={COLORS.textDark} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Top Property Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {topTabs.map((tab, index) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    setActiveTab(tab);
                    setPropertyStatus('AVAILABLE');
                  }}
                  style={[styles.tab, isActive && styles.tabActive]}
                >
                  <Text style={[styles.tabText, { fontFamily: 'Manrope-SemiBold' }, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {activeTab === 'All Properties' ? (
          /* ==========================================
             ALL PROPERTIES OVERVIEW (DASHBOARD)
             ========================================== */
          <>
            <View style={styles.revenueCard}>
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />

              <View style={styles.revenueHeader}>
                <View style={styles.walletIconWrapper}>
                  <Wallet size={22} color={COLORS.accent} strokeWidth={2} />
                </View>
                <View style={styles.revenueBadge}>
                  <TrendingUp size={14} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 4 }} />
                  <Text style={[styles.revenueBadgeText, { fontFamily: 'Manrope-Bold' }]}>12.4%</Text>
                </View>
              </View>

              <View style={styles.revenueBody}>
                <Text style={[styles.revenueSubtitle, { fontFamily: 'Manrope-Medium' }]}>Total Monthly Revenue</Text>
                <View style={styles.revenueValueRow}>
                  <Text style={[styles.revenueCurrency, { fontFamily: 'Manrope-Bold' }]}>₱</Text>
                  <Text style={[styles.revenueValue, { fontFamily: 'Manrope-Bold' }]}>54,230</Text>
                  <Text style={[styles.revenueDecimals, { fontFamily: 'Manrope-Bold' }]}>.00</Text>
                </View>
              </View>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpiCard}>
                <View style={styles.kpiTopRow}>
                  <View style={[styles.kpiIconWrapper, { backgroundColor: '#EEF2FF' }]}>
                    <Users size={20} color="#4F46E5" strokeWidth={2} />
                  </View>
                  <MoreHorizontal size={20} color={COLORS.textMuted} />
                </View>
                <Text style={[styles.kpiValue, { fontFamily: 'Manrope-Bold' }]}>32</Text>
                <Text style={[styles.kpiLabel, { fontFamily: 'Manrope-Bold' }]}>Active Guests</Text>
                <View style={styles.modernProgressBarBg}>
                  <View style={[styles.modernProgressBarFill, { width: '40%', backgroundColor: '#4F46E5' }]} />
                </View>
              </View>

              <View style={styles.kpiCard}>
                <View style={styles.kpiTopRow}>
                  <View style={[styles.kpiIconWrapper, { backgroundColor: '#FFF7ED' }]}>
                    <BedDouble size={20} color="#EA580C" strokeWidth={2} />
                  </View>
                  <MoreHorizontal size={20} color={COLORS.textMuted} />
                </View>
                <Text style={[styles.kpiValue, { fontFamily: 'Manrope-Bold' }]}>88.5%</Text>
                <Text style={[styles.kpiLabel, { fontFamily: 'Manrope-Bold' }]}>Occupancy Rate</Text>
                <View style={styles.modernProgressBarBg}>
                  <View style={[styles.modernProgressBarFill, { width: '88.5%', backgroundColor: '#EA580C' }]} />
                </View>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-Bold' }]}>Net Operating Income</Text>
              <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.7} onPress={() => navigation.navigate('OwnerFinance')}>
                <Text style={[styles.detailsBtnText, { fontFamily: 'Manrope-Bold' }]}>Full Report</Text>
                <ArrowRight size={14} color={COLORS.primary} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.noiCard}>
              <View style={styles.noiDataRow}>
                <View>
                  <Text style={[styles.noiLabel, { fontFamily: 'Manrope-Bold' }]}>TOTAL NOI (Q3 2023)</Text>
                  <Text style={[styles.noiValueMain, { fontFamily: 'Manrope-Bold' }]}>₱ 38,150.40</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.noiLabel, { fontFamily: 'Manrope-Bold' }]}>EXPENSES</Text>
                  <Text style={[styles.noiValueExpense, { fontFamily: 'Manrope-Bold' }]}>₱ 16,079.00</Text>
                </View>
              </View>

              <View style={styles.chartContainer}>
                {['JUL', 'AUG', 'SEP'].map((month, index) => {
                  const isCurrent = index === 2;
                  const barHeight = index === 0 ? 30 : index === 1 ? 50 : 80;
                  return (
                    <View key={month} style={styles.chartColumn}>
                      <View style={styles.chartTrack}>
                        <View style={[styles.chartBar, { height: `${barHeight}%`, backgroundColor: isCurrent ? COLORS.primary : '#CBD5E1' }]} />
                      </View>
                      <Text style={[styles.chartLabel, { fontFamily: 'Manrope-Bold' }, isCurrent && { color: COLORS.primary, fontWeight: '800' }]}>{month}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-Bold' }]}>Property Performance</Text>
            </View>

            {propertyPerformance.map((property) => (
              <TouchableOpacity
                key={property.id}
                activeOpacity={0.9}
                onPress={() => setActiveTab(property.tabName)}
                style={styles.propertyCard}
              >
                <Image source={{ uri: property.image }} style={styles.propertyImage} />

                <View style={styles.propertyInfo}>
                  <View style={styles.propertyHeaderRow}>
                    <Text style={[styles.propertyName, { fontFamily: 'Manrope-SemiBold' }]} numberOfLines={1}>{property.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: property.statusColor }]}>
                      <Text style={[styles.statusText, { fontFamily: 'Manrope-ExtraBold', color: property.statusTextColor }]}>
                        {property.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.propertyStatsRow}>
                    <View style={styles.statBox}>
                      <Text style={[styles.statLabel, { fontFamily: 'Manrope-Bold' }]}>REV</Text>
                      <Text style={[styles.statValue, { fontFamily: 'Manrope-Bold' }]}>{property.rev}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                      <Text style={[styles.statLabel, { fontFamily: 'Manrope-Bold' }]}>OCC</Text>
                      <Text style={[styles.statValue, { fontFamily: 'Manrope-Bold' }]}>{property.occ}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          /* ==========================================
             SPECIFIC PROPERTY VIEW (FROM MOCKUP)
             ========================================== */
          <View style={styles.detailsContainer}>

            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <View style={styles.availableBadge}>
                  <View style={[styles.availableDot, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]} />
                  <Text style={[styles.availableText, { fontFamily: 'Manrope-ExtraBold', color: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]}>
                    {propertyStatus}
                  </Text>
                </View>
                <View style={styles.houseIconBtn}>
                  <Home size={22} color={COLORS.primary} />
                </View>
              </View>

              <Text style={[styles.detailTitle, { fontFamily: 'Manrope-ExtraBold' }]}>{activePropertyDetails.title}</Text>

              <Text style={[styles.amenityHeader, { fontFamily: 'Manrope-ExtraBold' }]}>INCLUDED AMENITIES</Text>
              <View style={styles.amenityGrid}>
                {activePropertyDetails.amenities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <View key={idx} style={styles.amenityPill}>
                      <Icon size={16} color={COLORS.primary} strokeWidth={2} style={{ marginRight: 8 }} />
                      <Text style={[styles.amenityPillText, { fontFamily: 'Manrope-Bold' }]}>{item.label}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.dividerLine} />

              <View style={styles.detailFooter}>
                <View>
                  <Text style={[styles.footerLabel, { fontFamily: 'Manrope-ExtraBold' }]}>CAPACITY</Text>
                  <Text style={[styles.footerValue, { fontFamily: 'Manrope-Bold' }]}>{activePropertyDetails.capacity}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.footerLabel, { fontFamily: 'Manrope-ExtraBold' }]}>BASE RATE</Text>
                  <Text style={[styles.footerValue, { fontFamily: 'Manrope-Bold' }]}>{activePropertyDetails.baseRate}</Text>
                </View>
              </View>
            </View>

            <View style={styles.updateCard}>
              <View style={styles.updateHeader}>
                <View>
                  <Text style={[styles.updateTitle, { fontFamily: 'Manrope-Bold' }]}>Update Entire Property</Text>
                  <Text style={[styles.updateSubtitle, { fontFamily: 'Manrope-SemiBold' }]}>{activePropertyDetails.title}</Text>
                </View>
                <View style={styles.syncBadge}>
                  <Text style={[styles.syncText, { fontFamily: 'Manrope-ExtraBold' }]}>SYNCING</Text>
                </View>
              </View>

              <View style={styles.updateActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPropertyStatus('AVAILABLE')}
                  style={[styles.actionBtn, propertyStatus === 'AVAILABLE' && styles.actionBtnActive]}
                >
                  <CheckCircle2 size={24} color={propertyStatus === 'AVAILABLE' ? COLORS.textDark : '#94A3B8'} strokeWidth={2} />
                  <Text style={[styles.actionBtnText, { fontFamily: 'Manrope-ExtraBold' }, propertyStatus === 'AVAILABLE' && styles.actionBtnTextActive]}>
                    AVAILABLE
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPropertyStatus('OCCUPIED')}
                  style={[styles.actionBtn, propertyStatus === 'OCCUPIED' && styles.actionBtnActive]}
                >
                  <User size={24} color={propertyStatus === 'OCCUPIED' ? COLORS.textDark : '#94A3B8'} strokeWidth={2} />
                  <Text style={[styles.actionBtnText, { fontFamily: 'Manrope-ExtraBold' }, propertyStatus === 'OCCUPIED' && styles.actionBtnTextActive]}>
                    OCCUPIED
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )}
      </ScrollView>

      {/* --- COMPLETE 6-ITEM BOTTOM NAVIGATION BAR --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => setActiveNav('Property')} style={styles.navItem}>
            <LayoutGrid size={20} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Property' && styles.navTextActive]} numberOfLines={1}>PROPERTY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={20} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Bookings' && styles.navTextActive]} numberOfLines={1}>BOOKINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={20} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Finance' && styles.navTextActive]} numberOfLines={1}>FINANCE</Text>
          </TouchableOpacity>

          {/* Spacer for the Floating Action Button */}
          <View style={styles.navSpacer} />

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={20} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Ledger' && styles.navTextActive]} numberOfLines={1}>LEDGER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <TrendingUp size={20} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Insights' && styles.navTextActive]} numberOfLines={1}>INSIGHTS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={20} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Settings' && styles.navTextActive]} numberOfLines={1}>SETTINGS</Text>
          </TouchableOpacity>

        </View>

        {/* Floating Action Button */}
        <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
          <View style={styles.fabInner}>
            <Plus size={30} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 15,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: COLORS.red,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  tabActive: {
    backgroundColor: COLORS.textDark,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 130,
  },

  /* --- DASHBOARD STYLES --- */
  revenueCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 28,
    marginBottom: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  walletIconWrapper: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  revenueBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  revenueBody: {
    marginTop: 10,
  },
  revenueSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  revenueValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  revenueCurrency: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 4,
  },
  revenueValue: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  revenueDecimals: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 20,
    fontWeight: '700',
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  kpiCard: {
    width: (width - 48 - 16) / 2,
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  kpiTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  kpiIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiValue: {
    color: COLORS.textDark,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  kpiLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
  },
  modernProgressBarBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
  },
  modernProgressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
  },
  detailsBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 6,
    letterSpacing: 0.5,
  },
  noiCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  noiDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  noiLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  noiValueMain: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  noiValueExpense: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.red,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chartColumn: {
    alignItems: 'center',
    height: '100%',
    width: 40,
  },
  chartTrack: {
    flex: 1,
    width: 14,
    backgroundColor: '#F1F5F9',
    borderRadius: 7,
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 7,
  },
  chartLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    alignItems: 'center',
  },
  propertyImage: {
    width: 85,
    height: 85,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  propertyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  propertyStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },

  /* --- PROPERTY DETAILS VIEW (MOCKUP MATCH) --- */
  detailsContainer: {
    paddingBottom: 20,
  },
  detailCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 40,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  availableText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  houseIconBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
    marginBottom: 32,
    lineHeight: 40,
  },
  amenityHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  amenityPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 30,
  },
  detailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  updateCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 40,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  updateSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  syncBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7FA085',
    letterSpacing: 0.5,
  },
  updateActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    height: 100,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  actionBtnActive: {
    backgroundColor: '#F5FBEA',
    borderColor: '#A3E635',
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    marginTop: 12,
    letterSpacing: 0.5,
  },
  actionBtnTextActive: {
    color: COLORS.textDark,
  },

  /* --- FULL 6-ITEM BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    height: 75,
    borderRadius: 35,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: COLORS.primary,
  },
  navSpacer: {
    width: 50,
  },
  fab: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 18,
  },
  fabInner: {
    width: 66,
    height: 66,
    backgroundColor: COLORS.primary,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.background,
  }
});
