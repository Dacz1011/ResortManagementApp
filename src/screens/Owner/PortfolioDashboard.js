import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  BedDouble,
  Bell,
  BookOpen,
  Building,
  CalendarDays,
  FileBarChart,
  Home,
  LayoutGrid,
  LogIn,
  MoreHorizontal,
  PieChart,
  ReceiptText,
  Settings,
  TrendingUp,
  Users,
  Wallet,
  Wand2
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE ──
// High-trust executive theme using deep forest green & teal,
// mapped to the modern Ryu/Casa UI structure.
const COLORS = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceDark: '#1A3626',      // Owner Deep Forest Green
  surfaceDarkHover: '#0D1E14',

  primary: '#1A3626',
  primaryLight: '#E8F0EA',
  accent: '#2DD4BF',           // Owner Teal Accent
  accentLight: '#CCFBF1',

  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',

  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningIcon: '#EAB308',
  infoBg: '#E0F2FE',
  infoIcon: '#0EA5E9',
};

const PORTFOLIO_TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

const QUICK_ACTIONS = [
  { id: '1', icon: BarChart2, label: 'Finance', route: 'OwnerFinance' },
  { id: '2', icon: BookOpen, label: 'Ledger', route: 'OwnerLedger' },
  { id: '3', icon: PieChart, label: 'Insights', route: 'OwnerInsights' },
  { id: '4', icon: Settings, label: 'Settings', route: 'OwnerSettings' },
];

const PROPERTY_PERFORMANCE = [
  {
    id: '1', tabName: "Reine's",
    name: "Reine's Beach House",
    rev: '₱22.4k', occ: '94%',
    status: 'HIGH DEMAND',
    statusBg: '#DCFCE7', statusText: '#16A34A',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2', tabName: "Ryu's",
    name: "Ryu's Transient House",
    rev: '₱16.8k', occ: '82%',
    status: 'STABLE',
    statusBg: '#FEF9C3', statusText: '#CA8A04',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
  },
  {
    id: '3', tabName: "Casa M.O.",
    name: 'Casa M.O.',
    rev: '₱26.1k', occ: '78%',
    status: 'GROWING',
    statusBg: '#DCFCE7', statusText: '#16A34A',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  },
];

const HERO_IMAGES = {
  'All Properties': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  "Reine's": 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  "Ryu's": 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  "Casa M.O.": 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
};

export default function PortfolioDashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const activeNav = 'Property';
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header fades smoothly to transparent based on scroll position (Ryu/Casa Style)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const isAllProps = activeTab === 'All Properties';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* --- MODERN HEADER (FIXED TOP, FADES ON SCROLL) --- */}
      <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
        <View style={[styles.headerSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                style={styles.profileAvatar}
              />
              <View>
                <Text style={styles.greetingText}>Executive Dashboard,</Text>
                <Text style={styles.headerTitle}>Welcome Back 🌿</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7} onPress={() => navigation.navigate('OwnerSettings')}>
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Spacer to push content down below the pinned header */}
        <View style={{ height: Platform.OS === 'ios' ? insets.top + 70 : (StatusBar.currentHeight || 24) + 70 }} />

        {/* --- IMMERSIVE HERO CARD (Floating Style) --- */}
        <TouchableOpacity activeOpacity={0.9} style={styles.heroCardWrapper}>
          <ImageBackground
            source={{ uri: HERO_IMAGES[activeTab] }}
            style={styles.heroBackground}
            imageStyle={{ borderRadius: 32 }}
          >
            {/* Dark Green Gradient/Overlay Simulation */}
            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <View style={styles.heroHeaderRow}>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusBadgeText}>PORTFOLIO LIVE</Text>
                </View>
                <View style={styles.weatherBadge}>
                  <Building size={14} color={COLORS.accent} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.weatherText}>{isAllProps ? '3 Properties' : activeTab}</Text>
                </View>
              </View>

              <View style={styles.heroMainContent}>
                <Text style={styles.heroLabel}>{isAllProps ? "TOTAL MONTHLY REVENUE" : "PROPERTY REVENUE"}</Text>
                <Text style={styles.heroGuestName}>{isAllProps ? "₱84,230" : "₱22,400"}<Text style={styles.heroSubDecimals}>.00</Text></Text>

                <View style={styles.heroSubRow}>
                  <TrendingUp size={14} color={COLORS.accent} style={{ marginRight: 6 }} strokeWidth={3} />
                  <Text style={styles.heroSubText}>+12.4% vs last month</Text>
                </View>

                {/* Elegant White Action Button Integrated inside the Image Card */}
                <TouchableOpacity style={styles.actionButtonGlass} activeOpacity={0.9} onPress={() => navigation.navigate('OwnerInsights')}>
                  <FileBarChart size={16} color={COLORS.primary} strokeWidth={2.5} />
                  <Text style={styles.actionButtonText}>Generate Full Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* --- PROPERTY TABS (Scrollable Pills) --- */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {PORTFOLIO_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    isActive ? styles.actionPillDark : styles.actionPillLight,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[
                    isActive ? styles.actionPillDarkText : styles.actionPillLightText,
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- QUICK ACTIONS ROW (4 Square Blocks) --- */}
        <View style={styles.squaresContainer}>
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.squareItem}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(action.route)}
              >
                <View style={styles.squareIconBox}>
                  <Icon size={24} color={COLORS.primary} strokeWidth={2} />
                </View>
                <Text style={styles.squareLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- BENTO BOX GRID --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Logistics Snapshot</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Tall Occupancy Card */}
          <TouchableOpacity
            style={[styles.bentoCard, styles.revenueCard]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OwnerInsights')}
          >
            <View style={styles.bentoIconWrapper}>
              <PieChart size={24} color={COLORS.primary} strokeWidth={2.5} />
            </View>
            <View style={styles.bentoTextWrap}>
              <Text style={styles.bentoLabelDark}>AVG OCCUPANCY</Text>
              <Text style={styles.revenueValueDark}>88.5%</Text>
              <View style={styles.trendRow}>
                <ArrowUpRight size={14} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.trendText}>+5% vs yesterday</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Stacked Logistics Cards */}
          <View style={styles.bentoCol}>
            <TouchableOpacity
              style={[styles.bentoCard, styles.smallBento, { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('OwnerBookings')}
            >
              <View style={styles.bentoHeader}>
                <Text style={styles.bentoLabelDark}>ACTIVE GUESTS</Text>
                <Users size={18} color="#16A34A" strokeWidth={2.5} />
              </View>
              <Text style={[styles.smallBentoValue, { color: '#16A34A' }]}>32 <Text style={styles.smallBentoSub}>Pax</Text></Text>
              <Text style={styles.smallBentoDesc}>Across portfolio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bentoCard, styles.smallBento, { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('OwnerBookings')}
            >
              <View style={styles.bentoHeader}>
                <Text style={styles.bentoLabelDark}>UPCOMING</Text>
                <CalendarDays size={18} color={COLORS.textMain} strokeWidth={2.5} />
              </View>
              <Text style={[styles.smallBentoValue, { color: COLORS.textMain }]}>14 <Text style={styles.smallBentoSub}>Stays</Text></Text>
              <Text style={styles.smallBentoDesc}>Next 7 days</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- PROPERTY PERFORMANCE LIST --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Property Performance</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('OwnerInsights')}>
            <Text style={styles.viewAllText}>Insights</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.propertyList}>
          {PROPERTY_PERFORMANCE.map((prop) => (
            <TouchableOpacity
              key={prop.id}
              activeOpacity={0.85}
              onPress={() => setActiveTab(prop.tabName)}
              style={styles.propertyCard}
            >
              <Image source={{ uri: prop.image }} style={styles.propertyThumb} />
              <View style={styles.propertyInfo}>
                <View style={styles.propertyHeaderRow}>
                  <Text style={styles.propertyName} numberOfLines={1}>{prop.name}</Text>
                  <View style={[styles.statusBadgeMini, { backgroundColor: prop.statusBg }]}>
                    <Text style={[styles.statusBadgeTextMini, { color: prop.statusText }]}>
                      {prop.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.propertyStatsRow}>
                  <View style={styles.propStatBox}>
                    <Text style={styles.propStatLabel}>REVENUE</Text>
                    <Text style={styles.propStatValue}>{prop.rev}</Text>
                  </View>
                  <View style={styles.propStatDivider} />
                  <View style={styles.propStatBox}>
                    <Text style={styles.propStatLabel}>OCCUPANCY</Text>
                    <Text style={styles.propStatValue}>{prop.occ}</Text>
                  </View>
                  <ArrowRight size={18} color={COLORS.textMuted} style={{ marginLeft: 'auto' }} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer for Bottom Nav */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* --- DARK GREEN PILL BOTTOM NAV (Owner Theme) --- */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Settings' && styles.navTextActive]}>Settings</Text>
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

  /* --- HEADER (ABSOLUTE TO PIN IT AT TOP) --- */
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: COLORS.background,
  },
  headerSafeArea: {
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  bellButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- IMMERSIVE HERO CARD (Floating Style) --- */
  heroCardWrapper: {
    width: '100%',
    height: 260,
    borderRadius: 32,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 54, 38, 0.65)', // Deep Green Overlay
    borderRadius: 32,
  },
  heroContent: {
    padding: 24,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  weatherText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  heroMainContent: {
    marginBottom: 4,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroGuestName: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 6,
  },
  heroSubDecimals: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroSubText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtonGlass: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },

  /* --- QUICK TAB PILLS --- */
  quickActionsWrapper: {
    marginBottom: 20,
    marginHorizontal: -24,
  },
  quickActionsScroll: {
    paddingHorizontal: 24,
    gap: 10,
    alignItems: 'center',
  },
  actionPillDark: {
    backgroundColor: COLORS.surfaceDark,
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  actionPillDarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  actionPillLight: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionPillLightText: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: '600',
  },

  /* --- SQUARE QUICK ACTIONS ROW --- */
  squaresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  squareItem: {
    alignItems: 'center',
    width: '22%',
  },
  squareIconBox: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F8FAFC',
  },
  squareLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },

  /* --- SECTION HEADERS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 2,
  },

  /* --- BENTO BOX GRID --- */
  bentoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  revenueCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.05,
    borderColor: COLORS.border,
    justifyContent: 'space-between',
  },
  bentoCol: {
    flex: 1,
    gap: 16,
  },
  smallBento: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  bentoIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bentoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bentoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bentoTextWrap: {
    marginTop: 'auto',
  },
  bentoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  bentoValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  revenueValueDark: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  progressBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.successText,
    marginLeft: 4,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallBentoValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  smallBentoSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  smallBentoDesc: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  /* --- PROPERTY LIST CARDS --- */
  propertyList: {
    gap: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  propertyThumb: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: COLORS.background,
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  propertyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  statusBadgeMini: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeTextMini: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  propertyStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propStatBox: {
    flex: 1,
  },
  propStatLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  propStatValue: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  propStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },

  bottomSpacer: {
    height: 160,
  },

  /* --- DARK GREEN PILL BOTTOM NAV (Owner Theme) --- */
  bottomNavContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '92%',
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 3,
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});