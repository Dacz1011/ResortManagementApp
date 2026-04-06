import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  History,
  ListFilter,
  Search,
  BedDouble,
  CalendarDays,
  Calendar,
  Download,
  Home,
  Users,
  Wallet,
  Settings,
  ChevronLeft
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#FAFAFA',
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
  const activeNav = 'Guest'; // Set active as 'Guest' since history is a subset of Guest Management
  const scrollY = useRef(new Animated.Value(0)).current;

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
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
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
        </SafeAreaView>
      </Animated.View>

      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
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
            {/* Spacer height to clear the pinned absolute header */}
            <View style={{ height: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 60 : 80 }} />

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
            <Text style={styles.sectionTitle}>STAY SUMMARY</Text>
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
              <Text style={styles.sectionTitle}>GUEST RECORDS</Text>
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
      </SafeAreaView>

      {/* --- FLOATING ACTION BUTTON (DOWNLOAD) --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <View style={styles.fabInner}>
          <Download size={24} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

      {/* --- MODERN FULL-WIDTH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuHome')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Home' && styles.navIconWrapperActive]}>
              <Home size={22} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuBookings')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Bookings' && styles.navIconWrapperActive]}>
              <CalendarDays size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuGuestMgmt')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Guest' && styles.navIconWrapperActive]}>
              <Users size={22} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuFinance')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Finance' && styles.navIconWrapperActive]}>
              <Wallet size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuAdmin')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Admin' && styles.navIconWrapperActive]}>
              <Settings size={22} color={activeNav === 'Admin' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Admin' ? 2.5 : 2} />
            </View>
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
  sectionTitle: {
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
    height: 140,
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

  /* --- MODERN FULL-WIDTH BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 15,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconWrapper: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconWrapperActive: {
    backgroundColor: COLORS.primaryLight,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});