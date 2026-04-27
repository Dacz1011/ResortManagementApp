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
  StatusBar,
  ImageBackground
} from 'react-native';
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
  Search
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Modern UI)
const COLORS = {
  background: '#F8FAFC',
  primary: '#1A3626',
  primaryLight: '#E8F0EA',
  primaryDark: '#0D1E14',
  accent: '#2DD4BF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',

  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444'
};

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

  const getHeroImage = () => {
    if (activeTab === 'All Properties') return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';
    if (activeTab === "Reine's Beach") return 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop';
    if (activeTab === "Ryu's House") return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop';
    if (activeTab === "Casa M.O.") return 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* --- FULL BLEED HERO IMAGE HEADER --- */}
        <ImageBackground
          source={{ uri: getHeroImage() }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            {/* Top Nav Row */}
            <View style={styles.headerTopRow}>
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
                  <Search size={18} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                  <Bell size={20} color={COLORS.textMain} strokeWidth={2} />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Glassmorphism Status Card */}
            <View style={styles.glassCard}>
              {activeTab === 'All Properties' ? (
                <>
                  <View style={styles.glassHeader}>
                    <View style={styles.statusPill}>
                      <Wallet size={12} color={COLORS.textMain} strokeWidth={2.5} style={{ marginRight: 6 }} />
                      <Text style={styles.statusText}>TOTAL MONTHLY REVENUE</Text>
                    </View>
                    <View style={styles.trendBadge}>
                      <TrendingUp size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 2 }} />
                      <Text style={styles.trendText}>+12.4%</Text>
                    </View>
                  </View>
                  <Text style={styles.heroMainStat}>₱54,230<Text style={styles.heroSubDecimals}>.00</Text></Text>
                </>
              ) : (
                <>
                  <View style={styles.glassHeader}>
                    <View style={styles.statusPill}>
                      <View style={[styles.statusDot, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]} />
                      <Text style={styles.statusText}>{propertyStatus}</Text>
                    </View>
                  </View>
                  <Text style={styles.heroMainStat}>{activePropertyDetails.title}</Text>
                </>
              )}
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* --- OVERLAPPING MAIN SHEET --- */}
        <View style={styles.mainSheet}>

          {/* Tabs Container */}
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
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Portfolio Logistics</Text>
              </View>

              {/* Stacked KPI Bento Row */}
              <View style={styles.bentoGrid}>
                <View style={[styles.bentoCard, styles.smallBento]}>
                  <View style={styles.bentoTopRow}>
                    <View style={[styles.bentoIconWrapper, { backgroundColor: '#EEF2FF' }]}>
                      <Users size={18} color="#4F46E5" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={18} color={COLORS.textMuted} />
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
                      <BedDouble size={18} color="#EA580C" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={18} color={COLORS.textMuted} />
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
               SPECIFIC PROPERTY VIEW
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
                    <Home size={20} color={COLORS.primary} strokeWidth={2.5}/>
                  </View>
                </View>

                <Text style={styles.detailTitle}>{activePropertyDetails.title}</Text>

                <Text style={styles.amenityHeader}>INCLUDED AMENITIES</Text>
                <View style={styles.amenityGrid}>
                  {activePropertyDetails.amenities.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <View key={idx} style={styles.amenityPill}>
                        <Icon size={14} color={COLORS.primary} strokeWidth={2.5} style={{ marginRight: 6 }} />
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
                    <CheckCircle2 size={20} color={propertyStatus === 'AVAILABLE' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2} />
                    <Text style={[styles.actionBtnText, propertyStatus === 'AVAILABLE' && styles.actionBtnTextActive]}>
                      AVAILABLE
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPropertyStatus('OCCUPIED')}
                    style={[styles.actionBtn, propertyStatus === 'OCCUPIED' && styles.actionBtnActive]}
                  >
                    <User size={20} color={propertyStatus === 'OCCUPIED' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2} />
                    <Text style={[styles.actionBtnText, propertyStatus === 'OCCUPIED' && styles.actionBtnTextActive]}>
                      OCCUPIED
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          )}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* --- SLEEK FLOATING ICON-ONLY BOTTOM NAV --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => setActiveNav('Property')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]} activeOpacity={0.7}>
            <LayoutGrid size={24} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]} activeOpacity={0.7}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]} activeOpacity={0.7}>
            <BarChart2 size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]} activeOpacity={0.7}>
            <BookOpen size={24} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]} activeOpacity={0.7}>
            <PieChart size={24} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]} activeOpacity={0.7}>
            <Settings size={24} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
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
  scrollContent: {
    flexGrow: 1,
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 280, // Height optimized to balance with overlaps
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.55)', // Modern dark slate overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 48, // Space for the glass card to sit elegantly
    paddingTop: Platform.OS === 'android' ? 32 : 16,
  },

  /* Top Nav in Hero */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
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
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accent,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dangerText,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* Glassmorphism Status Card */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly lighter for premium blur effect
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    marginBottom: 0,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
  },
  heroMainStat: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
  },
  heroSubDecimals: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
  },

  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32, // Tighter overlap
    paddingTop: 24,
    flex: 1,
  },

  tabsContainer: {
    marginBottom: 20,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* --- SECTION HEADERS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  detailsBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },

  /* --- BENTO KPI GRID --- */
  bentoGrid: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
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
    marginBottom: 10,
  },
  bentoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBentoValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  bentoLabelDark: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 10,
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

  /* --- NOI CARD --- */
  noiCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  noiDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  noiLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  noiValueMain: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  noiValueExpense: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dangerText,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chartColumn: {
    alignItems: 'center',
    height: '100%',
    width: 36,
  },
  chartTrack: {
    flex: 1,
    width: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 6,
  },
  chartLabel: {
    fontSize: 10,
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
    gap: 12,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  propertyImage: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 14,
  },
  propertyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 8,
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
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMain,
  },

  /* --- PROPERTY DETAILS VIEW --- */
  detailsContainer: {
    paddingHorizontal: 24,
  },
  detailCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  availableText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  houseIconBtn: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
    marginBottom: 16,
  },
  amenityHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  amenityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  detailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  updateCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  updateSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  syncBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  syncText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  updateActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 72,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  actionBtnActive: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.successText,
  },
  actionBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  actionBtnTextActive: {
    color: COLORS.textMain,
  },

  bottomSpacer: {
    height: 120, // Enough clearance for floating bottom nav
  },

  /* --- SLEEK FLOATING ICON-ONLY BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center',
    width: '90%', // Modern floating width
    left: '5%',
    right: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 36, // Fully rounded pill shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 24, // Perfect circle for icon
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
});