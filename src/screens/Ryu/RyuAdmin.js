import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Home,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  CheckCircle2,
  Building,
  CreditCard,
  Info
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#F8FAFC',
  primary: '#23324B',
  primaryLight: '#E0E7FF',
  primaryDark: '#1A2537',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

// Grouped Settings for a cleaner, organized UI
const MENU_GROUPS = [
  {
    title: 'Property Management',
    items: [
      { id: 'profile', icon: Building, title: 'Property Profile', subtitle: 'Manage resort details & policies' },
      { id: 'billing', icon: CreditCard, title: 'Billing Details', subtitle: 'Payout methods & tax info' },
    ]
  },
  {
    title: 'Account & Preferences',
    items: [
      { id: 'notif', icon: Bell, title: 'Notifications', subtitle: 'Alerts, emails, and messages' },
      { id: 'security', icon: Shield, title: 'Security', subtitle: 'Password, 2FA & active sessions' },
    ]
  },
  {
    title: 'Support & About',
    items: [
      { id: 'help', icon: HelpCircle, title: 'Help Center', subtitle: 'Guides and customer support' },
      { id: 'about', icon: Info, title: 'About App', subtitle: 'Version 2.4.0' },
    ]
  }
];

export default function RyuAdmin({ navigation }) {
  const activeNav = 'Admin';
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLogout = () => {
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  // Header collapses smoothly based on scroll position
  const headerMaxHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [100, 0],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} translucent={false} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER (COLLAPSIBLE) --- */}
        <Animated.View style={{ maxHeight: headerMaxHeight, opacity: headerOpacity, overflow: 'hidden' }}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View>
                <Text style={styles.greetingText}>Configuration</Text>
                <Text style={styles.headerTitle}>Admin Panel</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* --- IMMERSIVE PROFILE HERO CARD --- */}
          <TouchableOpacity activeOpacity={0.9} style={styles.heroCardWrapper}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
              style={styles.heroBackground}
              imageStyle={{ borderRadius: 32 }}
            >
              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <View style={styles.heroHeaderRow}>
                  <View style={styles.statusBadge}>
                    <CheckCircle2 size={14} color={COLORS.successText} strokeWidth={2.5} style={{ marginRight: 4 }} />
                    <Text style={[styles.statusBadgeText, { color: COLORS.successText }]}>VERIFIED</Text>
                  </View>
                  <TouchableOpacity style={styles.editBadge}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.heroMainContent}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.profileAvatarLarge}
                  />
                  <View style={styles.heroSubRow}>
                    <Text style={styles.heroGuestName}>Ryu Admin</Text>
                    <Text style={styles.heroSubText}>Property Manager</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* --- GROUPED SETTINGS MENU --- */}
          {MENU_GROUPS.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.menuGroupWrapper}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
              </View>

              <View style={styles.bentoCard}>
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

          {/* --- LOGOUT BUTTON --- */}
          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={COLORS.dangerText} strokeWidth={2.5} style={styles.logoutIcon} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>RYU'S TRANSIENT HOUSE V2.4.0</Text>
          </View>

          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </SafeAreaView>

      {/* --- SLEEK FLOATING ICON-ONLY BOTTOM NAV --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={[styles.navItem, activeNav === 'Home' && styles.navItemActive]} activeOpacity={0.7}>
            <Home size={24} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]} activeOpacity={0.7}>
            <CalendarDays size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={[styles.navItem, activeNav === 'Guest' && styles.navItemActive]} activeOpacity={0.7}>
            <Users size={24} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]} activeOpacity={0.7}>
            <Wallet size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Admin' && styles.navItemActive]} activeOpacity={0.7}>
            <Settings size={24} color={activeNav === 'Admin' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Admin' ? 2.5 : 2} />
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

  /* --- HEADER (COLLAPSIBLE) --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  /* --- IMMERSIVE HERO CARD (PROFILE) --- */
  heroCardWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 32,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
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
    backgroundColor: 'rgba(26, 37, 55, 0.65)', // Darker navy overlay
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  editBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  editText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  heroMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  heroSubRow: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroGuestName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  heroSubText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
  },

  /* --- MENU BENTO BOXES --- */
  menuGroupWrapper: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 16,
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
    marginRight: 16
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 16
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
    color: COLORS.textMuted
  },

  /* --- FOOTER & LOGOUT BUTTON --- */
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
  },
  logoutIcon: {
    marginRight: 10
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