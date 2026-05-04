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
import { useRef } from 'react';
import {
  Animated,
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

// Modernized Luxury Beach House Palette (Matched with ReineHome)
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',

  primary: '#E64E76',       // Vibrant Reine Pink
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  cardBg: '#FFFFFF',

  // Accents
  successBg: '#DCFCE7',
  successText: '#16A34A',
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

export default function ReineSettings({ navigation }) {
  const activeNav = 'Admin';
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // iOS compatibility fix

  const handleLogout = () => {
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} translucent={true} />

      <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>

        <Animated.View style={{ maxHeight: headerMaxHeight, opacity: headerOpacity, overflow: 'hidden' }}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View>
                <Text style={styles.greetingText}>Configuration</Text>
                <Text style={styles.headerTitle}>Settings</Text>
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
          <TouchableOpacity activeOpacity={0.9} style={styles.heroCardWrapper}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
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
                </View>

                <View style={styles.heroMainContent}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.profileAvatarLarge}
                  />
                  <View style={styles.heroSubRow}>
                    <Text style={styles.heroGuestName}>Reine Admin</Text>
                    <Text style={styles.heroSubText}>Resort Manager</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

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
                      onPress={() => {
                        if (item.id === 'profile') navigation.navigate('ReinePropertyProfile');
                      }}
                    >
                      <View style={styles.iconBox}>
                        <Icon size={20} color={COLORS.primary} strokeWidth={2.5} />
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

          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color="#FFFFFF" strokeWidth={2.5} style={styles.logoutIcon} />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>REINE'S BEACH HOUSE RESORT V2.4.0</Text>
          </View>

          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </View>

      {/* --- PINK PILL BOTTOM NAV --- */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ReineHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  greetingText: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 10 },
  heroCardWrapper: { width: '100%', height: 220, borderRadius: 32, marginBottom: 32, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 10 },
  heroBackground: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.45)', borderRadius: 32 },
  heroContent: { padding: 24, width: '100%', height: '100%', justifyContent: 'space-between' },
  heroHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  statusBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  heroMainContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  profileAvatarLarge: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#FFFFFF', marginRight: 16 },
  heroSubRow: { flexDirection: 'column', justifyContent: 'center' },
  heroGuestName: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: -0.5, marginBottom: 2 },
  heroSubText: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '500' },
  menuGroupWrapper: { marginBottom: 16 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  bentoCard: { backgroundColor: COLORS.cardBg, borderRadius: 28, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 3, borderWidth: 1, borderColor: '#FFFFFF', marginBottom: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuTextContainer: { flex: 1, paddingRight: 16 },
  menuItemTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 },
  menuItemSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  footerContainer: { paddingTop: 8, paddingBottom: 24 },
  logoutButton: { flexDirection: 'row', backgroundColor: COLORS.primary, borderRadius: 24, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  logoutIcon: { marginRight: 10 },
  logoutButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  versionText: { textAlign: 'center', fontSize: 10, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1.5 },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});
