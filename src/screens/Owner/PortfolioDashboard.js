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
  CheckCircle2,
  Search
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Adapted to Modern UI)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep Forest Green
  primaryLight: '#E8F0EA',  // Soft Green for active states
  primaryDark: '#0D1E14',   // Darker green for contrast
  accent: '#2DD4BF',        // Teal
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',

  // Accents & Badges
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444'
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.profileAvatar}
            />
            {activeTab === 'All Properties' ? (
              <View>
                <Text style={styles.greetingText}>PORTFOLIO OVERVIEW</Text>
                <Text style={styles.headerTitle}>Resort Admin</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.greetingText}>PROPERTY STATUS</Text>
                <View style={styles.liveUpdateRow}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>Live update • Just now</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Search size={20} color={COLORS.textMain} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- SCROLLABLE CONTENT --- */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Modern Top Tabs */}
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
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {activeTab === 'All Properties' ? (
            /* ==========================================
               ALL PROPERTIES OVERVIEW (BENTO GRID)
               ========================================== */
            <>
              {/* Hero Revenue Bento Card */}
              <View style={styles.heroCard}>
                <View style={styles.heroCircleTop} />
                <View style={styles.heroCircleBottom} />

                <View style={styles.heroHeader}>
                  <View style={styles.walletIconWrapper}>
                    <Wallet size={24} color={COLORS.accent} strokeWidth={2} />
                  </View>
                  <View style={styles.trendPill}>
                    <TrendingUp size={16} color={COLORS.successText} strokeWidth={2.5} style={{ marginRight: 4 }} />
                    <Text style={styles.trendText}>+12.4%</Text>
                  </View>
                </View>

                <View style={styles.heroBody}>
                  <Text style={styles.heroSubtitle}>TOTAL MONTHLY REVENUE</Text>
                  <View style={styles.heroValueRow}>
                    <Text style={styles.heroCurrency}>₱</Text>
                    <Text style={styles.heroValue}>54,230</Text>
                    <Text style={styles.heroDecimals}>.00</Text>
                  </View>
                </View>
              </View>

              {/* Stacked KPI Bento Row */}
              <View style={styles.bentoGrid}>
                <View style={[styles.bentoCard, styles.smallBento]}>
                  <View style={styles.bentoTopRow}>
                    <View style={[styles.bentoIconWrapper, { backgroundColor: '#EEF2FF' }]}>
                      <Users size={20} color="#4F46E5" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={20} color={COLORS.textMuted} />
                  </View>
                  <Text style={styles.smallBentoValue}>32</Text>
                  <Text style={styles.bentoLabelDark}>ACTIVE GUESTS</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '40%', backgroundColor: '#4F46E5' }]} />
                  </View>
                </View>

                <View style={[styles.bentoCard, styles.smallBento]}>
                  <View style={styles.bentoTopRow}>
                    <View style={[styles.bentoIconWrapper, { backgroundColor: '#FFF7ED' }]}>
                      <BedDouble size={20} color="#EA580C" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={20} color={COLORS.textMuted} />
                  </View>
                  <Text style={styles.smallBentoValue}>88.5%</Text>
                  <Text style={styles.bentoLabelDark}>OCCUPANCY RATE</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '88.5%', backgroundColor: '#EA580C' }]} />
                  </View>
                </View>
              </View>

              {/* Net Operating Income Bento */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Net Operating Income</Text>
                <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.7} onPress={() => navigation.navigate('OwnerFinance')}>
                  <Text style={styles.detailsBtnText}>Report</Text>
                  <ArrowRight size={14} color={COLORS.primary} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.noiCard}>
                <View style={styles.noiDataRow}>
                  <View>
                    <Text style={styles.noiLabel}>TOTAL NOI (Q3 2023)</Text>
                    <Text style={styles.noiValueMain}>₱ 38,150.40</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.noiLabel}>EXPENSES</Text>
                    <Text style={styles.noiValueExpense}>₱ 16,079.00</Text>
                  </View>
                </View>

                <View style={styles.chartContainer}>
                  {['JUL', 'AUG', 'SEP'].map((month, index) => {
                    const isCurrent = index === 2;
                    const barHeight = index === 0 ? 30 : index === 1 ? 50 : 80;
                    return (
                      <View key={month} style={styles.chartColumn}>
                        <View style={styles.chartTrack}>
                          <View style={[styles.chartBar, { height: `${barHeight}%`, backgroundColor: isCurrent ? COLORS.accent : COLORS.border }]} />
                        </View>
                        <Text style={[styles.chartLabel, isCurrent && styles.chartLabelActive]}>{month}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Property Performance List */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Property Performance</Text>
              </View>

              <View style={styles.propertyList}>
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
                        <Text style={styles.propertyName} numberOfLines={1}>{property.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: property.statusColor }]}>
                          <Text style={[styles.statusText, { color: property.statusTextColor }]}>
                            {property.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.propertyStatsRow}>
                        <View style={styles.statBox}>
                          <Text style={styles.statLabel}>REV</Text>
                          <Text style={styles.statValue}>{property.rev}</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statBox}>
                          <Text style={styles.statLabel}>OCC</Text>
                          <Text style={styles.statValue}>{property.occ}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            /* ==========================================
               SPECIFIC PROPERTY VIEW (MODERNIZED MOCKUP)
               ========================================== */
            <View style={styles.detailsContainer}>

              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[styles.availableBadge, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successBg : COLORS.warningBg }]}>
                    <View style={[styles.availableDot, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]} />
                    <Text style={[styles.availableText, { color: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]}>
                      {propertyStatus}
                    </Text>
                  </View>
                  <View style={styles.houseIconBtn}>
                    <Home size={22} color={COLORS.primary} strokeWidth={2.5}/>
                  </View>
                </View>

                <Text style={styles.detailTitle}>{activePropertyDetails.title}</Text>

                <Text style={styles.amenityHeader}>INCLUDED AMENITIES</Text>
                <View style={styles.amenityGrid}>
                  {activePropertyDetails.amenities.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <View key={idx} style={styles.amenityPill}>
                        <Icon size={16} color={COLORS.primary} strokeWidth={2.5} style={{ marginRight: 8 }} />
                        <Text style={styles.amenityPillText}>{item.label}</Text>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.dividerLine} />

                <View style={styles.detailFooter}>
                  <View>
                    <Text style={styles.footerLabel}>CAPACITY</Text>
                    <Text style={styles.footerValue}>{activePropertyDetails.capacity}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.footerLabel}>BASE RATE</Text>
                    <Text style={styles.footerValue}>{activePropertyDetails.baseRate}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.updateCard}>
                <View style={styles.updateHeader}>
                  <View>
                    <Text style={styles.updateTitle}>Property Status</Text>
                    <Text style={styles.updateSubtitle}>{activePropertyDetails.title}</Text>
                  </View>
                  <View style={styles.syncBadge}>
                    <Text style={styles.syncText}>SYNCING</Text>
                  </View>
                </View>

                <View style={styles.updateActions}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPropertyStatus('AVAILABLE')}
                    style={[styles.actionBtn, propertyStatus === 'AVAILABLE' && styles.actionBtnActive]}
                  >
                    <CheckCircle2 size={24} color={propertyStatus === 'AVAILABLE' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2} />
                    <Text style={[styles.actionBtnText, propertyStatus === 'AVAILABLE' && styles.actionBtnTextActive]}>
                      AVAILABLE
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPropertyStatus('OCCUPIED')}
                    style={[styles.actionBtn, propertyStatus === 'OCCUPIED' && styles.actionBtnActive]}
                  >
                    <User size={24} color={propertyStatus === 'OCCUPIED' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2} />
                    <Text style={[styles.actionBtnText, propertyStatus === 'OCCUPIED' && styles.actionBtnTextActive]}>
                      OCCUPIED
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>

      {/* --- FLOATING BOTTOM NAVIGATION --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity onPress={() => setActiveNav('Property')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Props</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Book</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Fin</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledg</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <TrendingUp size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Data</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Set</Text>}
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 2,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  liveUpdateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  bellButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: COLORS.dangerBg,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  /* --- TABS --- */
  tabsContainer: {
    marginBottom: 24,
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
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
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
    paddingBottom: 20,
  },

  /* --- HERO REVENUE BENTO --- */
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  heroCircleTop: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -80,
    right: -40,
  },
  heroCircleBottom: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -60,
    left: -40,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  walletIconWrapper: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  trendText: {
    color: COLORS.successText,
    fontSize: 12,
    fontWeight: '800',
  },
  heroBody: {
    marginTop: 10,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heroCurrency: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 4,
  },
  heroValue: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  heroDecimals: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 20,
    fontWeight: '700',
  },

  /* --- BENTO KPI GRID --- */
  bentoGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  smallBento: {
    flex: 1,
  },
  bentoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bentoIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBentoValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  /* --- SECTION HEADERS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
  },
  detailsBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 6,
  },

  /* --- NOI CARD --- */
  noiCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  noiDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  noiLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  noiValueMain: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  noiValueExpense: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dangerText,
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
    width: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 8,
  },
  chartLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  chartLabelActive: {
    color: COLORS.accent,
    fontWeight: '800',
  },

  /* --- PROPERTY LIST --- */
  propertyList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
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
    color: COLORS.textMain,
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
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },

  /* --- PROPERTY DETAILS VIEW --- */
  detailsContainer: {
    paddingHorizontal: 24,
  },
  detailCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
    marginBottom: 24,
    lineHeight: 38,
  },
  amenityHeader: {
    fontSize: 10,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  amenityPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
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
    color: COLORS.textMain,
  },
  updateCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  updateSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  syncBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  updateActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    height: 90,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  actionBtnActive: {
    backgroundColor: '#F0FDF4', // very light green
    borderColor: COLORS.successText,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  actionBtnTextActive: {
    color: COLORS.textMain,
  },

  bottomSpacer: {
    height: 140, // Avoid overlap with floating nav
  },

  /* --- FLOATING BOTTOM NAV (Matched style + FAB) --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 16,
    right: 16,
    alignItems: 'center', // helps center FAB
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  navText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  }
});