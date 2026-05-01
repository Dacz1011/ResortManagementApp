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
  MapPin,
  Settings,
  Shield,
  Users,
  Wallet
} from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Casa Deep Forest Green Palette applied to Reine's Structure
const COLORS = {
  background: '#F7F7F9',    
  surface: '#FFFFFF',       
  surfaceDark: '#0D3B10',   // Casa Dark Green
  surfaceDarkActive: '#1B5E20',

  primary: '#1B5E20',       // Casa Primary
  primaryLight: '#E8F5E9',

  textMain: '#18181B',      
  textMuted: '#71717A',     
  border: '#E4E4E7',        

  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

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

export default function CasaAdmin({ navigation }) {
  const activeNav = 'Admin';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = () => {
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

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* --- HERO HEADER --- */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.heroContent, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 10 }]}>
              {/* Top Bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>System Control</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.profileAvatarWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <View style={styles.greetingContainer}>
                  <Text style={styles.greetingText}>Admin Settings{'\n'}& Preferences</Text>
                </View>

                <TouchableOpacity style={styles.searchPill} activeOpacity={0.9}>
                  <View style={styles.searchPillIconBox}>
                    <CheckCircle2 size={18} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View style={styles.searchPillTextWrap}>
                    <Text style={styles.searchPillTitle}>Casa Admin</Text>
                    <Text style={styles.searchPillSubtitle}>Verified Property Manager</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>

          {/* --- GROUPED SETTINGS MENU --- */}
          {MENU_GROUPS.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.menuGroup}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
              </View>

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
                        <Icon size={20} color={COLORS.textMain} strokeWidth={2.5} />
                      </View>

                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      </View>

                      <ChevronRight size={20} color={COLORS.border} strokeWidth={2.5} />
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

            <Text style={styles.versionText}>CASA M.O. RESORT V2.4.0</Text>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* --- SLEEK BLACK PILL BOTTOM NAV --- */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('CasaHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 280, backgroundColor: COLORS.surfaceDark, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8 },
  heroImage: { width: '100%', height: '100%' }, heroImageStyle: {},
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(27, 94, 32, 0.65)' },
  heroContent: { flex: 1, paddingHorizontal: 24, paddingBottom: 20, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' }, locationIcon: { marginRight: 6 }, locationText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  profileAvatarWrap: { position: 'relative' }, profileAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: '#FFFFFF' },
  notificationDot: { position: 'absolute', top: 0, right: 0, width: 10, height: 10, backgroundColor: COLORS.primary, borderRadius: 5, borderWidth: 2, borderColor: '#FFFFFF' },
  heroBottomContent: { marginTop: 'auto' }, greetingContainer: { marginBottom: 12 }, greetingText: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5, lineHeight: 34 },
  searchPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,30,30,0.6)', borderRadius: 100, paddingHorizontal: 20, paddingVertical: 16, width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  searchPillIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }, searchPillTextWrap: { marginLeft: 12 },
  searchPillTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 }, searchPillSubtitle: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },
  mainContent: { paddingHorizontal: 24, paddingTop: 24 }, menuGroup: { marginBottom: 24 }, sectionHeader: { marginBottom: 12 }, sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  menuCard: { backgroundColor: COLORS.surface, borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: COLORS.border }, menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border }, iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 16, borderWidth: 1, borderColor: COLORS.border },
  menuTextContainer: { flex: 1, paddingRight: 16 }, menuItemTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 }, menuItemSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  footerContainer: { paddingTop: 8, paddingBottom: 24 }, logoutButton: { flexDirection: 'row', backgroundColor: COLORS.dangerBg, borderRadius: 24, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logoutIcon: { marginRight: 10 }, logoutButtonText: { color: COLORS.dangerText, fontSize: 16, fontWeight: '800', letterSpacing: 0.5 }, versionText: { textAlign: 'center', fontSize: 10, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1.5 },
  bottomSpacer: { height: 160 }, bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 }, navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 }, navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});