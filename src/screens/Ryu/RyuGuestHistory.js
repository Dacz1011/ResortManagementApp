import {
  BedDouble,
  Calendar,
  CalendarDays,
  ChevronLeft,
  Download,
  Home,
  ListFilter,
  Search,
  Settings,
  Users,
  Wallet
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#F8FAFC',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#E0E7FF',
  accent: '#E0E7FF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',

  // Status Badges
  statusCompletedBg: '#E2E8F0',
  statusCompletedText: '#1E293B',

  // Summary Cards
  summaryDarkBg: '#1E293B',
  summaryLightBg: '#E2E8F0',
};

// Mock data for guest history
const GUEST_HISTORY = [
  { id: '1', name: 'Maria Sofia Gonzales', date: 'Jan 28 - Jan 30', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '2', name: 'Robert Wilson', date: 'Jan 22 - Jan 27', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '3', name: 'Elena Rodriguez', date: 'Jan 18 - Jan 20', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '4', name: 'Michael Chang', date: 'Jan 12 - Jan 15', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '5', name: 'David Lee', date: 'Jan 05 - Jan 08', amount: '₱12,000.00', status: 'COMPLETED' },
];

export default function RyuGuestHistory({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const activeNav = 'Guest';
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // iOS compatibility fix

  // Header fades smoothly to transparent based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* --- MODERN HEADER (PINNED TO VERY TOP, FADES ON SCROLL) --- */}
      <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
        {/* iOS Fix: Using View + insets instead of SafeAreaView */}
        <View style={[styles.headerSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitle}>Guest History</Text>
                <Text style={styles.headerSubtitle}>FIXED RATE LOG</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
              <ListFilter size={20} color={COLORS.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {/* Spacer height to clear the pinned absolute header dynamically */}
            <View style={{ height: Platform.OS === 'ios' ? insets.top + 70 : (StatusBar.currentHeight || 24) + 70 }} />

            {/* --- SEARCH BAR --- */}
            <View style={styles.searchContainer}>
              <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search guest name..."
                placeholderTextColor={COLORS.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* --- STAY SUMMARY CARDS --- */}
            <Text style={styles.sectionLabel}>STAY SUMMARY</Text>
            <View style={styles.summaryRow}>

              {/* Total Stays Card */}
              <View style={[styles.summaryCard, { backgroundColor: COLORS.summaryDarkBg }]}>
                <Text style={[styles.summaryLabel, { color: '#94A3B8' }]}>TOTAL STAYS</Text>
                <Text style={[styles.summaryValue, { color: '#FFFFFF' }]}>42</Text>
                <BedDouble size={64} color="#FFFFFF" opacity={0.05} style={styles.bgIcon} />
              </View>

              {/* Avg Duration Card */}
              <View style={[styles.summaryCard, { backgroundColor: COLORS.summaryLightBg }]}>
                <Text style={[styles.summaryLabel, { color: COLORS.primary }]}>AVG. DURATION</Text>
                <View style={styles.durationValueRow}>
                  <Text style={[styles.summaryValue, { color: COLORS.primary }]}>1</Text>
                  <Text style={styles.summaryValueUnit}> day</Text>
                </View>
                <CalendarDays size={64} color={COLORS.primary} opacity={0.05} style={styles.bgIcon} />
              </View>

            </View>

            {/* --- GUEST RECORDS LIST --- */}
            <View style={styles.listHeaderRow}>
              <Text style={styles.sectionLabel}>GUEST RECORDS</Text>
              <TouchableOpacity style={styles.pastDaysPill} activeOpacity={0.7}>
                <Text style={styles.pastDaysText}>Past 30 Days</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recordsList}>
              {GUEST_HISTORY.map((guest) => (
                <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.recordCard}>

                  <View style={styles.recordHeader}>
                    <Text style={styles.guestName}>{guest.name}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{guest.status}</Text>
                    </View>
                  </View>

                  <View style={styles.dateRow}>
                    <Calendar size={14} color={COLORS.textMuted} strokeWidth={2} style={{ marginRight: 6 }} />
                    <Text style={styles.guestDate}>{guest.date}</Text>
                  </View>

                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>AMOUNT PAID</Text>
                    <Text style={styles.amountValue}>{guest.amount}</Text>
                  </View>

                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.bottomSpacer} />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* --- FLOATING ACTION BUTTON (DOWNLOAD) --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <View style={styles.fabInner}>
          <Download size={24} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

      {/* --- REINE-STYLE BOTTOM NAV (RYU COLORS) --- */}
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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },

  /* --- HEADER (ABSOLUTE FOR SMOOTH SCROLL) --- */
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: COLORS.background,
  },
  headerSafeArea: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    marginRight: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- SEARCH BAR --- */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textMain,
    height: '100%',
  },

  /* --- SUMMARY CARDS --- */
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 28,
    padding: 24,
    height: 120,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  durationValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  summaryValueUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  bgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },

  /* --- RECORDS LIST --- */
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pastDaysPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pastDaysText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recordsList: {
    gap: 16,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  guestName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  statusBadge: {
    backgroundColor: COLORS.statusCompletedBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.statusCompletedText,
    letterSpacing: 0.5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestDate: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    paddingTop: 16,
  },
  amountLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },

  bottomSpacer: {
    height: 160,
  },

  /* --- FLOATING ACTION BUTTON --- */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* --- REINE-STYLE BOTTOM NAV (RYU COLORS) --- */
  bottomNavContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
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