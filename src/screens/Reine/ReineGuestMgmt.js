import {
  CalendarDays,
  Home,
  MapPin,
  MoreHorizontal,
  Settings,
  Star,
  User,
  UserPlus,
  Users,
  Wallet
} from 'lucide-react-native';
import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
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
import { useBookings } from '../../context/BookingContext';
import { exportGuestsToCSV, exportGuestsToPDF } from '../../utils/exportReports';

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

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF3C7',
  warningText: '#D97706',
};

// Snapshot data for the horizontal strip
const GUEST_SNAPSHOTS = [
  {
    label: 'Total Guests',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
  },
  {
    label: 'Fully Paid',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop',
  },
  {
    label: 'Avg. Stay',
    value: '2 nights',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
  },
];

export default function ReineGuestMgmt({ navigation }) {
  const activeNav = 'Guest';
  const { getBookings } = useBookings();
  const bookingsData = getBookings('Reine');

  const insets = useSafeAreaInsets(); // iOS compatibility fix

  // Fade-in entrance — matches ReineHome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const guests = useMemo(() => {
    const uniqueBookings = [];
    const seen = new Set();
    Object.values(bookingsData).forEach((booking) => {
      const identifier = `${booking.guestName}-${booking.checkIn}-${booking.checkOut}`;
      if (!seen.has(identifier)) {
        seen.add(identifier);
        uniqueBookings.push({
          id: identifier,
          name: booking.guestName,
          date: `${booking.checkIn} - ${booking.checkOut}`,
          status: booking.status === 'CONFIRMED' ? 'FULLY PAID' : 'BALANCE DUE',
        });
      }
    });
    return uniqueBookings;
  }, [bookingsData]);

  const paidCount = guests.filter((g) => g.status === 'FULLY PAID').length;

  const handleExportPDF = () => {
    exportGuestsToPDF(guests, "Reine's Beach House");
  };

  const handleExportCSV = () => {
    exportGuestsToCSV(guests, "Reine");
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
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            {/* iOS Fix */}
            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              {/* Top bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Guests</Text>
                </View>
                <TouchableOpacity
                  style={styles.iconBtnDark}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ReineBookings', { mode: 'manual' })}
                >
                  <UserPlus size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* Hero bottom — centered text */}
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>{guests.length} Guests</Text>
                <Text style={styles.heroSubStat}>Active roster for Reine's Beach House</Text>

                {/* Dark search-style pill */}
                <TouchableOpacity
                  style={styles.searchPill}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('ReineGuestHistory')}
                >
                  <View style={styles.searchPillIconBox}>
                    <CalendarDays size={18} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View style={styles.searchPillTextWrap}>
                    <Text style={styles.searchPillTitle}>Guest History</Text>
                    <Text style={styles.searchPillSubtitle}>Past stays • Completed records</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ── QUICK FILTER PILLS ── */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8}>
              <Text style={styles.actionPillDarkText}>Current & Upcoming</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPillLight}
              activeOpacity={0.7}
              onPress={handleExportPDF}
            >
              <Text style={[styles.actionPillLightText, { color: COLORS.primary }]}>📄 Export PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPillLight}
              activeOpacity={0.7}
              onPress={handleExportCSV}
            >
              <Text style={styles.actionPillLightText}>📊 Export CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPillLight}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ReineGuestHistory')}
            >
              <Text style={styles.actionPillLightText}>View History</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ── MAIN CONTENT ── */}
        <View style={styles.mainContent}>

          {/* ── SNAPSHOT STRIP ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roster Snapshot</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.snapshotScroll}
          >
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground
                source={{ uri: GUEST_SNAPSHOTS[0].image }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <Users size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>{guests.length} Total</Text>
                    <Text style={styles.snapshotLabel}>Active Guests</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground
                source={{ uri: GUEST_SNAPSHOTS[1].image }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <Star size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>{paidCount} Paid</Text>
                    <Text style={styles.snapshotLabel}>Fully Settled</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground
                source={{ uri: GUEST_SNAPSHOTS[2].image }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <CalendarDays size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>2 nights</Text>
                    <Text style={styles.snapshotLabel}>Avg. Stay</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

          {/* ── GUEST LIST ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Roster</Text>
          </View>

          <View style={styles.guestList}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.newEntryCard}
              onPress={() => navigation.navigate('ReineBookings', { mode: 'manual' })}
            >
              <View style={styles.newEntryIconBox}>
                <UserPlus size={22} color="#FFFFFF" strokeWidth={2} />
              </View>
              <View style={styles.guestInfo}>
                <Text style={styles.newEntryName}>New Guest Entry</Text>
                <Text style={styles.newEntryDesc}>Tap here to manually log a guest</Text>
              </View>
            </TouchableOpacity>

            {guests.map((guest) => {
              const isPaid = guest.status === 'FULLY PAID';
              return (
                <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.guestCard}>
                  <View style={styles.avatar}>
                    <User size={22} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <View style={styles.guestInfo}>
                    <Text style={styles.guestName}>{guest.name}</Text>
                    <Text style={styles.guestDate}>{guest.date}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 8 }}>
                    <View style={[styles.statusBadge, { backgroundColor: isPaid ? COLORS.successBg : COLORS.warningBg }]}>
                      <Text style={[styles.statusBadgeText, { color: isPaid ? COLORS.successText : COLORS.warningText }]}>
                        {guest.status}
                      </Text>
                    </View>
                    <MoreHorizontal size={18} color={COLORS.textMuted} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

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
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 340 },
  heroImage: { width: '100%', height: '100%' },
  heroImageStyle: {},
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 28 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBottomContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  heroMainStat: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    textAlign: 'center'
  },
  heroSubStat: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    textAlign: 'center'
  },
  searchPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(24,24,27,0.65)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  searchPillIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  searchPillTextWrap: {},
  searchPillTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  searchPillSubtitle: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100 },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  mainContent: { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader: { marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  snapshotScroll: { gap: 16, paddingBottom: 8 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)', borderRadius: 24 },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  guestList: { gap: 14, marginBottom: 8 },
  newEntryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 24, padding: 16 },
  newEntryIconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  newEntryName: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 4, letterSpacing: -0.2 },
  newEntryDesc: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.6)' },
  guestCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 16, borderWidth: 1, borderColor: COLORS.border },
  guestInfo: { flex: 1, paddingRight: 8 },
  guestName: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 },
  guestDate: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});