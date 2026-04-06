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

const { width } = Dimensions.get('window');

// High-End Boutique Palette (Matches Reine Suite)
const COLORS = {
  background: '#F4F7FA',    // Deep, crisp off-white for the main sheet
  primary: '#E64E76',       // Signature Reine Pink
  primaryLight: '#FDF0F4',  // Soft pink background for accents
  primaryDark: '#BE375A',
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

// Grouped Settings for a cleaner, organized UI
const MENU_GROUPS = [
  {
    title: 'PROPERTY MANAGEMENT',
    items: [
      { id: 'profile', icon: Building, title: 'Property Profile', subtitle: 'Manage resort details & policies' },
      { id: 'billing', icon: CreditCard, title: 'Billing Details', subtitle: 'Payout methods & tax info' },
    ]
  },
  {
    title: 'ACCOUNT & PREFERENCES',
    items: [
      { id: 'notif', icon: Bell, title: 'Notifications', subtitle: 'Alerts, emails, and messages' },
      { id: 'security', icon: Shield, title: 'Security', subtitle: 'Password, 2FA & active sessions' },
    ]
  },
  {
    title: 'SUPPORT & ABOUT',
    items: [
      { id: 'help', icon: HelpCircle, title: 'Help Center', subtitle: 'Guides and customer support' },
      { id: 'about', icon: Info, title: 'About App', subtitle: 'Version 2.4.0' },
    ]
  }
];

export default function ReineSettings({ navigation }) {
  const activeNav = 'Admin';

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
          source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
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
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.avatarImage}
                  />
                  <View style={styles.verifiedBadge}>
                    <CheckCircle2 size={16} color={COLORS.primary} fill="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileName}>Reine's Admin</Text>
                  <Text style={styles.profileRole}>Resort Manager</Text>
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

            <Text style={styles.versionText}>REINE'S BEACH HOUSE RESORT V2.4.0</Text>
          </View>

        </View>
      </ScrollView>

      {/* --- FLOATING BOTTOM NAVIGATION --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineHome')}>
            <Home size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineBookings')}>
            <CalendarDays size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineGuestMgmt')}>
            <Users size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineFinance')}>
            <Wallet size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Admin' && styles.navItemActive]} onPress={() => {}}>
            <Settings size={22} color={activeNav === 'Admin' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Admin' && <Text style={styles.navTextActive}>Admin</Text>}
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
    paddingBottom: 120, // Prevents content from hiding behind the floating nav
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 380, // Generous height for the image
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // Dark slate overlay for deep contrast
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
    backgroundColor: '#FDECE6',
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

  /* --- FLOATING BOTTOM NAV --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 24,
    right: 24,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navItem: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    flex: 1.5,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  },
});