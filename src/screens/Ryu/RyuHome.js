import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  LogOut,
  LogIn,
  Banknote,
  Zap,
  Droplet,
  ChevronRight,
  Home,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  ArrowUpRight,
  Wand2,
  CalendarPlus,
  ReceiptText,
  Wrench,
  FileBarChart,
  SunMedium
} from 'lucide-react-native';

// Ryu-specific Palette Adapted to Reine's Design System
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#23324B',       // Ryu Deep Navy
  primaryLight: '#E0E7FF',  // Soft indigo/blue tint
  primaryDark: '#1A2537',   // Deeper navy for gradients/accents
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',

  // Accents (Standardized)
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningIcon: '#EAB308',
  infoBg: '#E0F2FE',
  infoIcon: '#0EA5E9',
};

// Quick Actions integrated from Reine's design principle
const QUICK_ACTIONS = [
  { id: '1', icon: CalendarPlus, label: 'Book', route: 'RyuBookings', params: { mode: 'manual' } },
  { id: '2', icon: ReceiptText, label: 'Expense', route: 'RyuFinance' },
  { id: '3', icon: Wrench, label: 'Fix', route: 'RyuFinance' },
  { id: '4', icon: FileBarChart, label: 'Report', route: 'RyuGuestHistory' },
];

export default function RyuHome({ navigation }) {
  const activeNav = 'Home';
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header fades smoothly to transparent based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* --- MODERN HEADER (FIXED TOP, FADES ON SCROLL) --- */}
      <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' }}
                style={styles.profileAvatar}
              />
              <View>
                <Text style={styles.greetingText}>Welcome back,</Text>
                <Text style={styles.headerTitle}>Ryu Admin 🌙</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bellButton}
              activeOpacity={0.7}
              // onPress={() => navigation.navigate('RyuNotifications')}
            >
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
        {/* Spacer to push content down so it doesn't overlap the pinned header */}
        <View style={{ height: Platform.OS === 'ios' ? 70 : 115 }} />

        {/* --- IMMERSIVE HERO CARD --- */}
        <TouchableOpacity activeOpacity={0.9} style={styles.heroCardWrapper}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroBackground}
            imageStyle={{ borderRadius: 32 }}
          >
            {/* Dark Navy Gradient/Overlay Simulation */}
            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <View style={styles.heroHeaderRow}>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusBadgeText}>OCCUPIED</Text>
                </View>
                <View style={styles.weatherBadge}>
                  <SunMedium size={14} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 4 }} />
                  <Text style={styles.weatherText}>24°C</Text>
                </View>
              </View>

              <View style={styles.heroMainContent}>
                <Text style={styles.heroLabel}>CURRENT GUEST</Text>
                <Text style={styles.heroGuestName}>Mark J.</Text>
                <View style={styles.heroSubRow}>
                  <LogIn size={14} color="rgba(255,255,255,0.7)" style={{ marginRight: 4 }} />
                  <Text style={styles.heroSubText}>Checking out tomorrow • 12:00 PM</Text>
                </View>

                {/* Elegant White Action Button Integrated inside the Image Card */}
                <TouchableOpacity style={styles.actionButtonGlass} activeOpacity={0.9}>
                  <Wand2 size={16} color={COLORS.primary} strokeWidth={2.5} />
                  <Text style={styles.actionButtonText}>Mark as Cleaned</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* --- QUICK ACTIONS ROW (Adopted from Reine) --- */}
        <View style={styles.quickActionsContainer}>
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.actionItem}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(action.route, action.params)}
              >
                <View style={styles.actionIconBox}>
                  <Icon size={24} color={COLORS.primary} strokeWidth={2} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- BENTO BOX GRID --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's Snapshot</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Tall Revenue Card (Inverted Primary Style like Reine) */}
          <TouchableOpacity
            style={[styles.bentoCard, styles.revenueCard]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RyuFinance')}
          >
            <View style={styles.bentoIconWrapper}>
              <Banknote size={24} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <View style={styles.bentoTextWrap}>
              <Text style={styles.bentoLabel}>TOTAL REVENUE</Text>
              <Text style={styles.revenueValue}>₱12.0K</Text>
              <View style={styles.trendRow}>
                <ArrowUpRight size={14} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.trendText}>+8% vs yesterday</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Stacked Logistics Cards (Tinted Backgrounds like Reine) */}
          <View style={styles.bentoCol}>
            <TouchableOpacity
              style={[styles.bentoCard, styles.smallBento, { backgroundColor: '#F0F9FF', borderColor: '#E0F2FE' }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RyuBookings')}
            >
              <View style={styles.bentoHeader}>
                <Text style={styles.bentoLabelDark}>CHECK-IN</Text>
                <LogIn size={18} color="#0284C7" strokeWidth={2.5} />
              </View>
              <Text style={[styles.smallBentoValue, { color: '#0284C7' }]}>2:00 <Text style={styles.smallBentoSub}>PM</Text></Text>
              <Text style={styles.smallBentoDesc}>Next Guest: Jonathan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bentoCard, styles.smallBento, { backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RyuBookings')}
            >
              <View style={styles.bentoHeader}>
                <Text style={styles.bentoLabelDark}>CHECK-OUT</Text>
                <LogOut size={18} color="#EA580C" strokeWidth={2.5} />
              </View>
              <Text style={[styles.smallBentoValue, { color: '#EA580C' }]}>12:00 <Text style={styles.smallBentoSub}>PM</Text></Text>
              <Text style={styles.smallBentoDesc}>Housekeeping Ready</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- ACTIVE TASKS SECTION --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Priority Tasks</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RyuFinance')}
          >
            <Text style={styles.viewAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksList}>
          {/* Task 1 */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.taskCard}
            onPress={() => navigation.navigate('RyuFinance')}
          >
            <View style={[styles.taskIconWrapper, { backgroundColor: COLORS.warningBg }]}>
              <Zap size={22} color={COLORS.warningIcon} strokeWidth={2.5} />
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Meralco Utility</Text>
              <Text style={styles.taskSubtitle}>Pending Payment • ₱8,240</Text>
            </View>
            <View style={styles.taskAction}>
              <Text style={styles.payNowText}>Pay</Text>
              <ChevronRight size={18} color={COLORS.textMuted} />
            </View>
          </TouchableOpacity>

          {/* Task 2 */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.taskCard}
            onPress={() => navigation.navigate('RyuFinance')}
          >
            <View style={[styles.taskIconWrapper, { backgroundColor: COLORS.infoBg }]}>
              <Droplet size={22} color={COLORS.infoIcon} strokeWidth={2.5} />
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Water Utility</Text>
              <Text style={styles.taskSubtitle}>Due in 2 days • ₱1,150</Text>
            </View>
            <View style={styles.taskAction}>
              <Text style={styles.payNowText}>Pay</Text>
              <ChevronRight size={18} color={COLORS.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Spacer for Bottom Nav */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* --- MODERN FULL-WIDTH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuHome')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Home' && styles.navIconWrapperActive]}>
              <Home size={22} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuBookings')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Bookings' && styles.navIconWrapperActive]}>
              <CalendarDays size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuGuestMgmt')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Guest' && styles.navIconWrapperActive]}>
              <Users size={22} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuFinance')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Finance' && styles.navIconWrapperActive]}>
              <Wallet size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuAdmin')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Admin' && styles.navIconWrapperActive]}>
              <Settings size={22} color={activeNav === 'Admin' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Admin' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Admin</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 4,
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
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- IMMERSIVE HERO CARD --- */
  heroCardWrapper: {
    width: '100%',
    height: 260, // Adjusted to fit the action button gracefully
    borderRadius: 32,
    marginBottom: 24,
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
    backgroundColor: 'rgba(26, 37, 55, 0.55)', // Navy overlay for Ryu theme
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
    backgroundColor: '#4ADE80',
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
    paddingHorizontal: 10,
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
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroSubText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
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

  /* --- QUICK ACTIONS ROW --- */
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  actionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconBox: {
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
  actionLabel: {
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
    backgroundColor: COLORS.primary, // Inverted Primary Background
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    borderColor: COLORS.primaryDark,
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bentoTextWrap: {
    marginTop: 'auto',
  },
  bentoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
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

  /* --- ACTIVE TASKS --- */
  tasksList: {
    gap: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  taskIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  taskSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  taskAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payNowText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },

  bottomSpacer: {
    height: 90, // Adjusted to clear bottom nav perfectly
  },

  /* --- MODERN FULL-WIDTH BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 15,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconWrapper: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconWrapperActive: {
    backgroundColor: COLORS.primaryLight,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});