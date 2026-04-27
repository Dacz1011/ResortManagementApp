import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  DollarSign,
  FileBarChart,
  Home,
  LogIn,
  MapPin,
  ReceiptText,
  Search,
  Settings,
  Star,
  Users,
  Wallet,
  Wrench
} from 'lucide-react-native';
import { useEffect, useRef } from 'react';
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

const { width } = Dimensions.get('window');

// Modern Minimalist Palette (Matched strictly to reference image)
const COLORS = {
  background: '#F7F7F9',    // Light gray background
  surface: '#FFFFFF',       // Pure white cards
  surfaceDark: '#18181B',   // Stark black for nav and dark pills
  
  // Reine Brand Accent
  primary: '#E64E76',       // Vibrant Reine Pink

  textMain: '#18181B',      // Dark slate/black
  textMuted: '#71717A',     // Medium gray
  border: '#E4E4E7',        // Subtle border
};

const QUICK_ACTIONS = [
  { id: '1', icon: CalendarPlus, label: 'Book', route: 'ReineBookings', params: { mode: 'manual' } },
  { id: '2', icon: ReceiptText, label: 'Expense', route: 'ReineFinance' },
  { id: '3', icon: Wrench, label: 'Fix', route: 'ReineFinance' },
  { id: '4', icon: FileBarChart, label: 'Report', route: 'ReineGuestHistory' },
];

export default function ReineHome({ navigation }) {
  const activeNav = 'Home';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* --- HERO BANNER (Matched precisely to Reference Middle Screen) --- */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            {/* Elegant dark overlay */}
            <View style={styles.heroOverlay} />
            
            <View style={styles.heroContent}>
              {/* Top Bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Reine's Beach House</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ReineAdmin')} style={styles.profileAvatarWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>

              {/* Grouping Text and Pill to sit closely together at the bottom */}
              <View style={styles.heroBottomContent}>
                {/* Greeting */}
                <View style={styles.greetingContainer}>
                  <Text style={styles.greetingText}>Hey, Admin! Ready to Manage?</Text>
                </View>

                {/* Dark Search Pill Overlay */}
                <TouchableOpacity style={styles.searchPill} activeOpacity={0.9} onPress={() => navigation.navigate('ReineGuestMgmt')}>
                  <Search size={20} color="rgba(255,255,255,0.8)" />
                  <View style={styles.searchPillTextWrap}>
                    <Text style={styles.searchPillTitle}>Search guests</Text>
                    <Text style={styles.searchPillSubtitle}>Names • Bookings • Dates</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </ImageBackground>
        </View>

        {/* --- HORIZONTAL QUICK ACTIONS PILLS --- */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.quickActionsScroll}
          >
            <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8} onPress={() => navigation.navigate('ReineBookings', { mode: 'manual' })}>
              <Text style={styles.actionPillDarkText}>Quick Actions</Text>
            </TouchableOpacity>

            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionPillLight}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate(action.route, action.params)}
                >
                  <Icon size={16} color={COLORS.textMain} style={{ marginRight: 6 }} />
                  <Text style={styles.actionPillLightText}>{action.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>

          {/* --- CURRENTLY HOSTING (Matched Reference Image Card) --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Currently Hosting</Text>
          </View>

          <View style={styles.largeCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' }}
              style={styles.cardImageTop}
            >
              <View style={styles.cardImageOverlay}>
                <View style={styles.cardFavoriteBtn}>
                  <CheckCircle2 size={18} color="#FFFFFF" />
                </View>
              </View>
            </ImageBackground>

            <View style={styles.cardBody}>
              <View style={styles.cardBodyHeader}>
                <Text style={styles.cardTitle}>Ronald Cute Dacanay</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color={COLORS.textMain} fill={COLORS.textMain} />
                  <Text style={styles.ratingText}>VIP</Text>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>Checking out tomorrow • 12:00 PM</Text>
              <Text style={styles.cardTags}>Fully Paid • No Pending Requests • Standard Room</Text>
              
              {/* Divider matching reference elegance */}
              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <Text style={styles.priceAmount}>₱36,000 <Text style={styles.priceSubtitle}>total</Text></Text>
                <TouchableOpacity style={styles.blackButton} activeOpacity={0.8}>
                  <Text style={styles.blackButtonText}>Mark Cleaned</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* --- TODAY'S SNAPSHOT (Discover new places style) --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Snapshot</Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.snapshotScroll}
          >
            {/* Revenue Metric */}
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.7} onPress={() => navigation.navigate('ReineFinance')}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <DollarSign size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>₱12.4K</Text>
                    <Text style={styles.snapshotLabel}>Total Revenue</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Arrivals Metric */}
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.7} onPress={() => navigation.navigate('ReineBookings')}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <LogIn size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>2 Guests</Text>
                    <Text style={styles.snapshotLabel}>Expected Arrivals</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </Animated.ScrollView>

      {/* --- SLEEK BLACK PILL BOTTOM NAV (Matched perfectly to Reference) --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ReineHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text>
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
    paddingBottom: 110, // Optimized clearance for floating bottom nav
  },

  /* --- HERO HEADER --- */
  heroContainer: {
    width: '100%',
    height: 280, // Compressed overall height to remove dead space
    backgroundColor: COLORS.surfaceDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageStyle: {
    // Border radius removed for square full-bleed look
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Classic dark overlay for legibility
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10, // Slightly less top padding
    paddingBottom: 20, // Tighter bottom padding
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 6,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileAvatarWrap: {
    position: 'relative',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroBottomContent: {
    marginTop: 'auto', // Pushes this entire block to the bottom of the hero card
  },
  greetingContainer: {
    marginBottom: 12, // Snug spacing right above the search pill
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 34, // Slightly tighter line height
  },
  
  /* --- DARK OVERLAY SEARCH PILL --- */
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.6)', // Deep translucent look
    borderRadius: 100, // Pill shape
    paddingHorizontal: 20,
    paddingVertical: 16, // Made the pill slightly taller
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchPillTextWrap: {
    marginLeft: 12,
  },
  searchPillTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  searchPillSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },

  /* --- QUICK ACTIONS PILLS --- */
  quickActionsWrapper: {
    marginTop: 20,
    marginBottom: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
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

  /* --- MAIN CONTENT --- */
  mainContent: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  /* --- LARGE IMAGE CARD (Currently Hosting) --- */
  largeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImageTop: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  cardImageOverlay: {
    padding: 16,
  },
  cardFavoriteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 20,
  },
  cardBodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
    marginLeft: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  cardTags: {
    fontSize: 13,
    fontWeight: '500',
    color: '#A1A1AA',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  priceSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  blackButton: {
    backgroundColor: COLORS.surfaceDark,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  blackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* --- SNAPSHOT CARDS --- */
  snapshotScroll: {
    gap: 16,
    paddingBottom: 20,
  },
  snapshotCard: {
    width: 150,
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
  },
  snapshotImage: {
    width: '100%',
    height: '100%',
  },
  snapshotOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },
  snapshotContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  snapshotIcon: {
    marginBottom: 'auto',
  },
  snapshotValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  snapshotLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },

  /* --- BLACK FLOATING PILL BOTTOM NAV (Matched perfectly to Reference) --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center',
    width: '90%', 
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceDark, // Solid black
    borderRadius: 100, // Perfect pill
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 4,
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});