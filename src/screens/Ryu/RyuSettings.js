import {
  Bell,
  Building,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Settings,
  Shield,
  Users,
  Wallet
} from 'lucide-react-native';
import {
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Ryu Navy Blue Palette
const COLORS = {
  background: '#F8FAFC',
  primary: '#23324B',
  primaryLight: '#E0E7FF',
  primaryDark: '#1A2537',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  successText: '#16A34A',
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

export default function RyuAdmin({ navigation }) {
  const activeNav = 'Admin';
  const insets = useSafeAreaInsets(); // iOS compatibility fix

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
          source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.heroHeader}
        >
          {/* Dark gradient overlay for text readability */}
          <View style={styles.heroOverlay} />

          {/* iOS Fix: Using View + insets instead of SafeAreaView */}
          <View style={[styles.heroSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
            {/* Top Nav Row */}
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Configuration</Text>
                <Text style={styles.adminTitle}>Admin Panel</Text>
              </View>
            </View>

            {/* Glassmorphism Profile Card */}
            <View style={styles.glassCard}>
              <View style={styles.profileInfoRow}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.avatarImage}
                  />
                  <View style={styles.verifiedBadge}>
                    <CheckCircle2 size={16} color={COLORS.successText} fill="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileName}>Ryu Admin</Text>
                  <Text style={styles.profileRole}>Property Manager</Text>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={styles.editProfileBtn}>
                <Text style={styles.editProfileBtnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
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

            <Text style={styles.versionText}>RYU'S TRANSIENT HOUSE V2.4.0</Text>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- SLEEK BLACK PILL BOTTOM NAV (Ryu Colors) --- */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  bottomSpacer: { height: 160 },
  heroHeader: { width: '100%', height: 380, justifyContent: 'flex-start' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26, 37, 55, 0.65)' },
  heroSafeArea: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingBottom: 40 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Platform.OS === 'android' ? 16 : 8 },
  greetingText: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 },
  adminTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', marginBottom: 10 },
  profileInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarWrapper: { position: 'relative', marginRight: 16 },
  avatarImage: { width: 64, height: 64, borderRadius: 20, backgroundColor: COLORS.primaryLight, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  verifiedBadge: { position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  profileTextContainer: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 4, letterSpacing: -0.3 },
  profileRole: { fontSize: 13, fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: 0.5 },
  editProfileBtn: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 16, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  editProfileBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  mainSheet: { backgroundColor: COLORS.background, borderTopLeftRadius: 36, borderTopRightRadius: 36, marginTop: -36, paddingHorizontal: 24, paddingTop: 32, flex: 1 },
  menuGroup: { marginBottom: 28 },
  groupTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1.5, marginBottom: 12, marginLeft: 8 },
  menuCard: { backgroundColor: COLORS.cardBg, borderRadius: 28, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2, borderWidth: 1, borderColor: '#FFFFFF' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuTextContainer: { flex: 1, paddingRight: 16 },
  menuItemTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 },
  menuItemSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  footerContainer: { paddingTop: 8, paddingBottom: 24 },
  logoutButton: { flexDirection: 'row', backgroundColor: COLORS.dangerBg, borderRadius: 24, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logoutIcon: { marginRight: 10 },
  logoutButtonText: { color: COLORS.dangerText, fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  versionText: { textAlign: 'center', fontSize: 10, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1.5 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primaryDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});