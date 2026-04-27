import React from 'react';
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
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  PieChart
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Owner Portal)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep luxury forest green
  primaryLight: '#E8F0EA',  // Soft muted green
  primaryDark: '#0D1E14',   // Darker green
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  successText: '#16A34A',
};

// Grouped Settings for a cleaner, organized UI
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

  const handleLogout = () => {
    // Reset navigation to Login screen
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
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
          source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' }}
          style={styles.heroHeader}
        >
          {/* Dark gradient overlay for text readability */}
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            {/* Top Nav Row */}
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Configuration</Text>
                <Text style={styles.adminTitle}>Settings</Text>
              </View>
            </View>

            {/* Glassmorphism Profile Card */}
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
          </SafeAreaView>
        </ImageBackground>

        {/* --- OVERLAPPING MAIN SHEET --- */}
        <View style={styles.mainSheet}>

          {/* --- GROUPED SETTINGS MENU --- */}
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

          {/* --- LOGOUT BUTTON --- */}
          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={COLORS.dangerText} strokeWidth={2.5} style={styles.logoutIcon} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>RESORT PORTFOLIO V3.1.0</Text>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- MODERN FULL-WIDTH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Overview</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Bookings</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Finance</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledger</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <PieChart size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Insights</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Settings</Text>}
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
    height: 380, // Generous height for the image
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.65)', // Dark slate overlay for deep contrast
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40, // Space before the overlapping sheet
  },

  /* Top Nav in Hero */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 16 : 8,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adminTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  /* Glassmorphism Profile Card */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Translucent
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 0.5,
  },
  editProfileBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  /* --- OVERLAPPING MAIN SHEET --- */
  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36, // Overlaps the image header
    paddingHorizontal: 24,
    paddingTop: 32,
    flex: 1,
  },

  /* --- MENU GROUPS & CARDS --- */
  menuGroup: {
    marginBottom: 28,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 8,
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
    borderColor: '#FFFFFF',
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
    height: 120, // Generous padding to clear the expanding pill nav
  },

  /* --- FULL-WIDTH EXPANDING PILL BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 25,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.3,
  },
});