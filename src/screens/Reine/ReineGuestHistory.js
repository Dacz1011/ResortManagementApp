import {
  ArrowDownToLine,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Clock,
  Home,
  ListFilter,
  MapPin,
  Search,
  Settings,
  Users,
  Wallet
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const GUEST_HISTORY = [
  { id: '1', name: 'Maria Sofia Gonzales', date: 'Jan 28 - Jan 30', amount: '₱12,000.00', nights: 2, status: 'COMPLETED', phone: '+63 912 345 6789', email: 'maria.s@example.com' },
  { id: '2', name: 'Robert Wilson',         date: 'Jan 22 - Jan 27', amount: '₱60,000.00', nights: 5, status: 'COMPLETED', phone: '+63 998 765 4321', email: 'rwilson@example.com' },
  { id: '3', name: 'Elena Rodriguez',       date: 'Jan 18 - Jan 20', amount: '₱24,000.00', nights: 2, status: 'COMPLETED', phone: '+63 917 111 2222', email: 'elena.r@example.com' },
  { id: '4', name: 'Michael Chang',         date: 'Jan 12 - Jan 15', amount: '₱36,000.00', nights: 3, status: 'COMPLETED', phone: '+63 920 333 4444', email: 'mchang@example.com' },
];

export default function ReineGuestHistory({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const activeNav = 'Guest';

  // Fade-in entrance — matches ReineHome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const filtered = GUEST_HISTORY.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStays = GUEST_HISTORY.length;
  const avgNights = Math.round(
    GUEST_HISTORY.reduce((sum, g) => sum + g.nights, 0) / GUEST_HISTORY.length
  );
  const totalRevenue = GUEST_HISTORY.reduce(
    (sum, g) => sum + parseInt(g.amount.replace(/[₱,\.]/g, '').slice(0, -2)),
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          style={{ opacity: fadeAnim }}
        >
          {/* ── FULL-BLEED HERO (mirrors ReineHome exactly) ── */}
          <View style={styles.heroContainer}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' }}
              style={styles.heroImage}
              imageStyle={styles.heroImageStyle}
            >
              <View style={styles.heroOverlay} />

              <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Top bar */}
                <View style={styles.topBar}>
                  <View style={styles.locationPill}>
                    <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                    <Text style={styles.locationText}>Guest History</Text>
                  </View>
                  <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8}>
                    <ListFilter size={18} color="#FFFFFF" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                {/* Hero bottom — big stat + subtitle */}
                <View style={styles.heroBottomContent}>
                  <Text style={styles.heroMainStat}>{totalStays} Stays</Text>
                  <Text style={styles.heroSubStat}>Completed stays — Fixed Rate Log</Text>

                  {/* Dark search-style pill — mirrors ReineHome search pill */}
                  <View style={styles.searchPill}>
                    <Search size={20} color="rgba(255,255,255,0.8)" style={{ marginRight: 12 }} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search guest name..."
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>

          {/* ── QUICK FILTER PILLS (mirrors ReineHome quickActionsWrapper) ── */}
          <View style={styles.quickActionsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActionsScroll}
            >
              <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8}>
                <Text style={styles.actionPillDarkText}>Past 30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
                <Text style={styles.actionPillLightText}>This Month</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
                <Text style={styles.actionPillLightText}>Last 3 Months</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
                <Text style={styles.actionPillLightText}>All Time</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* ── MAIN CONTENT ── */}
          <View style={styles.mainContent}>

            {/* ── SNAPSHOT STRIP (mirrors ReineHome Today's Snapshot) ── */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Stay Summary</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.snapshotScroll}
            >
              <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }}
                  style={styles.snapshotImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <View style={styles.snapshotOverlay} />
                  <View style={styles.snapshotContent}>
                    <BedDouble size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                    <View>
                      <Text style={styles.snapshotValue}>{totalStays} Stays</Text>
                      <Text style={styles.snapshotLabel}>Total Completed</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }}
                  style={styles.snapshotImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <View style={styles.snapshotOverlay} />
                  <View style={styles.snapshotContent}>
                    <Clock size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                    <View>
                      <Text style={styles.snapshotValue}>{avgNights} nights</Text>
                      <Text style={styles.snapshotLabel}>Avg. Duration</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
                  style={styles.snapshotImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <View style={styles.snapshotOverlay} />
                  <View style={styles.snapshotContent}>
                    <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                    <View>
                      <Text style={styles.snapshotValue}>₱{totalRevenue.toLocaleString()}</Text>
                      <Text style={styles.snapshotLabel}>Total Earned</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>

            {/* ── GUEST RECORDS — styled like ReineHome's "Currently Hosting" largeCard ── */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Guest Records</Text>
            </View>

            <View style={styles.recordsList}>
              {filtered.length > 0 ? (
                filtered.map((guest) => (
                  <TouchableOpacity 
                    key={guest.id} 
                    activeOpacity={0.7} 
                    style={styles.recordCard}
                    onPress={() => navigation.navigate('ReineGuestDetails', { guest })}
                  >
                    {/* Image top — mirrors largeCard image section */}
                    <ImageBackground
                      source={{ uri: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' }}
                      style={styles.recordCardImage}
                      imageStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                    >
                      <View style={styles.recordCardImageOverlay} />
                      <View style={styles.recordCardImageContent}>
                        <View style={styles.confirmedBadge}>
                          <CheckCircle2 size={11} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 3 }} />
                          <Text style={styles.confirmedBadgeText}>{guest.status}</Text>
                        </View>
                        <View style={styles.nightsBadge}>
                          <Text style={styles.nightsBadgeText}>{guest.nights}N</Text>
                        </View>
                      </View>
                    </ImageBackground>

                    {/* Card body — mirrors largeCard body */}
                    <View style={styles.recordCardBody}>
                      <View style={styles.cardBodyHeader}>
                        <Text style={styles.guestName}>{guest.name}</Text>
                        <Text style={styles.guestDate}>{guest.date}</Text>
                      </View>

                      {/* Divider — mirrors ReineHome largeCard divider */}
                      <View style={styles.divider} />

                      <View style={styles.cardFooter}>
                        <Text style={styles.amountLabel}>AMOUNT PAID</Text>
                        <Text style={styles.amountValue}>{guest.amount}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyCard}>
                  <View style={styles.emptyIconBox}>
                    <CalendarDays size={32} color={COLORS.textMain} strokeWidth={1.5} />
                  </View>
                  <Text style={styles.emptyTitle}>No Results Found</Text>
                  <Text style={styles.emptySub}>
                    No past stays match your search. Try a different name.
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>

      {/* Export FAB — matches the pink primary brand accent */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <ArrowDownToLine size={24} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* ── BLACK PILL BOTTOM NAV — exact match to ReineHome ── */}
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
          <TouchableOpacity onPress={() => navigation.navigate('ReineSettings')} style={styles.navItem} activeOpacity={0.8}>
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
  scrollContent: { flexGrow: 1 },

  /* ── HERO (full-bleed, matches ReineHome) ── */
  heroContainer: {
    width: '100%',
    height: 340,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageStyle: {},
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.48)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 28,
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
  locationIcon: { marginRight: 6 },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  iconBtnDark: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(30,30,30,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  /* Hero bottom content */
  heroBottomContent: {
    marginTop: 'auto',
    gap: 10,
  },
  heroMainStat: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 0,
  },
  heroSubStat: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },

  /* Search pill (mirrors ReineHome searchPill) */
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24,24,27,0.65)',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* ── QUICK FILTER PILLS ── */
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

  /* ── MAIN CONTENT ── */
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  /* ── SNAPSHOT STRIP (mirrors ReineHome Today's Snapshot) ── */
  snapshotScroll: {
    gap: 16,
    paddingBottom: 8,
  },
  snapshotCard: {
    width: 160,
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
    backgroundColor: 'rgba(0,0,0,0.32)',
    borderRadius: 24,
  },
  snapshotContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  snapshotLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },

  /* ── RECORD CARDS (mirrors ReineHome largeCard with image top) ── */
  recordsList: {
    gap: 16,
    marginBottom: 8,
  },
  recordCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recordCardImage: {
    width: '100%',
    height: 120,
  },
  recordCardImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  recordCardImageContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confirmedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
  },
  nightsBadge: {
    backgroundColor: 'rgba(24,24,27,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nightsBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  recordCardBody: {
    padding: 20,
  },
  cardBodyHeader: {
    marginBottom: 16,
  },
  guestName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  guestDate: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* Divider — mirrors ReineHome largeCard divider */
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },

  /* Card footer */
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },

  /* Empty state */
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },

  /* Export FAB */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },

  bottomSpacer: { height: 160 },

  /* ── BLACK PILL BOTTOM NAV (exact match to ReineHome) ── */
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
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 100,
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