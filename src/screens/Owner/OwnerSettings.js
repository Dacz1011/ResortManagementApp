import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bell,
  Shield,
  CircleHelp,
  ChevronRight,
  LogOut,
  Settings,
  CheckCircle2,
  Building,
  CreditCard,
  Info,
  User,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  CalendarCheck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE (matches PortfolioDashboard & OwnerBookings) ──
const COLORS = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceDark: '#1A3626',      // Owner Deep Forest Green
  surfaceDarkHover: '#0D1E14',

  primary: '#1A3626',
  primaryLight: '#E8F0EA',
  primaryDark: '#0D1E14',
  accent: '#2DD4BF',
  accentLight: '#CCFBF1',

  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',

  cardBg: '#FFFFFF',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  successText: '#16A34A',
};

// Grouped Settings
const MENU_GROUPS = [
  {
    title: 'PORTFOLIO MANAGEMENT',
    items: [
      { id: 'profile', icon: Building, title: 'Portfolio Profile', subtitle: 'Manage portfolio details & properties' },
      { id: 'billing', icon: CreditCard, title: 'Billing Details', subtitle: 'Payout methods & tax info' },
    ]
  },
  {
    title: 'ACCOUNT & PREFERENCES',
    items: [
      { id: 'personal', icon: User, title: 'Personal Information', subtitle: 'Admin profile details' },
      { id: 'notif', icon: Bell, title: 'Notifications', subtitle: 'Alerts, emails, and messages' },
      { id: 'security', icon: Shield, title: 'Security', subtitle: 'Password, 2FA & active sessions' },
    ]
  },
  {
    title: 'SUPPORT & ABOUT',
    items: [
      { id: 'help', icon: CircleHelp, title: 'Help Center', subtitle: 'Guides and customer support' },
      { id: 'about', icon: Info, title: 'About App', subtitle: 'Version 3.1.0' },
    ]
  }
];

export default function OwnerSettings({ navigation }) {
  const activeNav = 'Settings';
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header fades out as user scrolls — mirrors PortfolioDashboard behavior
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const handleLogout = () => {
    if (navigation && navigation.reset) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* ── FIXED FADING HEADER (matches PortfolioDashboard) ── */}
      <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
        <View style={[styles.headerSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconBtnHeader}>
                <Settings size={20} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.greetingText}>Configuration</Text>
                <Text style={styles.headerTitle}>Settings</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Spacer to clear the pinned header */}
        <View style={{ height: Platform.OS === 'ios' ? insets.top + 70 : (StatusBar.currentHeight || 24) + 70, paddingHorizontal: 20 }} />

        {/* ══════════════════════════════════════════
            IMMERSIVE HERO CARD (matches PortfolioDashboard floating style)
            ══════════════════════════════════════════ */}
        <View style={styles.heroCardWrapper}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' }}
            style={styles.heroBackground}
            imageStyle={{ borderRadius: 32 }}
          >
            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              {/* Top badges row - Now absolutely positioned */}
              <View style={styles.heroHeaderRow}>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusBadgeText}>PORTFOLIO OWNER</Text>
                </View>
                <View style={styles.weatherBadge}>
                  <Building size={14} color={COLORS.accent} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.weatherText}>3 Properties</Text>
                </View>
              </View>

              {/* Profile card centered in hero card */}
              <View style={styles.glassCard}>
                <View style={styles.profileInfoRow}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                      style={styles.avatarImage}
                    />
                    <View style={styles.verifiedBadge}>
                      <CheckCircle2 size={16} color={COLORS.primary} fill="#FFFFFF" strokeWidth={2} />
                    </View>
                  </View>
                  <View style={styles.profileTextContainer}>
                    <Text style={styles.profileName}>Admin Jr.</Text>
                    <Text style={styles.profileRole}>Portfolio Owner</Text>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.editProfileBtn}>
                  <Text style={styles.editProfileBtnText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ══════════════════════════════════════════
            OVERLAPPING MAIN SHEET
            ══════════════════════════════════════════ */}
        <View style={styles.mainSheet}>

          {/* ── GROUPED SETTINGS MENU ── */}
          {MENU_GROUPS.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.menuGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>

              <View style={styles.menuCard}>
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === group.items.length - 1;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
                    >
                      <View style={styles.iconBox}>
                        <Icon size={20} color={COLORS.primary} strokeWidth={2.5} />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      </View>
                      <ChevronRight size={20} color="#CBD5E1" strokeWidth={2.5} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* ── LOGOUT BUTTON ── */}
          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={COLORS.dangerText} strokeWidth={2.5} style={styles.logoutIcon} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>RESORT PORTFOLIO V3.1.0</Text>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ── DARK GREEN PILL BOTTOM NAV (matches PortfolioDashboard & OwnerBookings) ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarCheck size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, styles.navTextActive]}>Settings</Text>
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

  /* ── FIXED FADING HEADER (matches PortfolioDashboard) ── */
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: COLORS.background,
  },
  headerSafeArea: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtnHeader: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  /* ── HERO CARD (matches PortfolioDashboard floating style) ── */
  heroCardWrapper: {
    marginBottom: 0,
    marginHorizontal: 20,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 12,
  },
  heroBackground: {
    height: 300,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 30, 20, 0.68)',
    borderRadius: 32,
  },
  heroContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 28 : 0,
  },
  heroHeaderRow: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45,212,191,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  weatherText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },

  /* Glassmorphism Profile Card inside hero */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  profileRole: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.5,
  },
  editProfileBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  /* ── FLAT MAIN CONTENT (no curved overlay) ── */
  mainSheet: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1,
  },

  /* ── MENU GROUPS & CARDS ── */
  menuGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* ── FOOTER & LOGOUT ── */
  footerContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.dangerBg,
    borderRadius: 24,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: COLORS.dangerText,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },

  bottomSpacer: {
    height: 160,
  },

  /* ── DARK GREEN PILL BOTTOM NAV (matches PortfolioDashboard & OwnerBookings) ── */
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
