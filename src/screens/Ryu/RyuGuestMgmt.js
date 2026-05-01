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

const { width } = Dimensions.get('window');

// Ryu Deep Navy Palette applied to Reine's Structure
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#1A2537',        // Ryu Deep Navy
  surfaceDarkActive: '#23324B',  // Ryu Primary

  primary: '#23324B',            // Ryu Primary
  primaryLight: '#E0E7FF',       // Ryu Light Tint

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF3C7',
  warningText: '#D97706',
};

const GUEST_SNAPSHOTS = [
  { label: 'Total Guests', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Fully Paid', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Avg. Stay', value: '2 nights', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' },
];

export default function RyuGuestMgmt({ navigation }) {
  const activeNav = 'Guest';
  const { getBookings } = useBookings();
  const bookingsData = getBookings('Ryu');

  const insets = useSafeAreaInsets();
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
            source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Guests</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8} onPress={() => navigation.navigate('RyuBookings', { mode: 'manual' })}>
                  <UserPlus size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>{guests.length} Guests</Text>
                <Text style={styles.heroSubStat}>Active roster for Ryu's Transient House</Text>

                <TouchableOpacity style={styles.searchPill} activeOpacity={0.9} onPress={() => navigation.navigate('RyuGuestHistory')}>
                  <View style={styles.searchPillIconBox}><CalendarDays size={18} color={COLORS.surfaceDark} strokeWidth={2.5} /></View>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8}>
              <Text style={styles.actionPillDarkText}>Current & Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7} onPress={() => navigation.navigate('RyuGuestHistory')}>
              <Text style={styles.actionPillLightText}>View History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
              <Text style={styles.actionPillLightText}>Fully Paid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
              <Text style={styles.actionPillLightText}>Balance Due</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ── MAIN CONTENT ── */}
        <View style={styles.mainContent}>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roster Snapshot</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: GUEST_SNAPSHOTS[0].image }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <Users size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View><Text style={styles.snapshotValue}>{guests.length} Total</Text><Text style={styles.snapshotLabel}>Active Guests</Text></View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: GUEST_SNAPSHOTS[1].image }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <Star size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View><Text style={styles.snapshotValue}>{paidCount} Paid</Text><Text style={styles.snapshotLabel}>Fully Settled</Text></View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: GUEST_SNAPSHOTS[2].image }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <CalendarDays size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View><Text style={styles.snapshotValue}>2 nights</Text><Text style={styles.snapshotLabel}>Avg. Stay</Text></View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Roster</Text>
          </View>

          <View style={styles.guestList}>
            {/* New Entry Card */}
            <TouchableOpacity activeOpacity={0.8} style={styles.newEntryCard} onPress={() => navigation.navigate('RyuBookings', { mode: 'manual' })}>
              <View style={styles.newEntryIconBox}><UserPlus size={22} color="#FFFFFF" strokeWidth={2} /></View>
              <View style={styles.guestInfo}>
                <Text style={styles.newEntryName}>New Guest Entry</Text>
                <Text style={styles.newEntryDesc}>Tap here to manually log a guest</Text>
              </View>
              <View style={styles.newEntryArrow}><Text style={styles.newEntryArrowText}>+</Text></View>
            </TouchableOpacity>

            {/* Guest cards */}
            {guests.length > 0 ? (
              guests.map((guest) => {
                const isPaid = guest.status === 'FULLY PAID';
                return (
                  <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.guestCard}>
                    <View style={styles.avatar}><User size={22} color={COLORS.textMain} strokeWidth={2} /></View>
                    <View style={styles.guestInfo}>
                      <Text style={styles.guestName}>{guest.name}</Text>
                      <Text style={styles.guestDate}>{guest.date}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 8 }}>
                      <View style={[styles.statusBadge, { backgroundColor: isPaid ? COLORS.successBg : COLORS.warningBg }]}>
                        <Text style={[styles.statusBadgeText, { color: isPaid ? COLORS.successText : COLORS.warningText }]}>{guest.status}</Text>
                      </View>
                      <MoreHorizontal size={18} color={COLORS.textMuted} />
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.emptyCard}>
                <View style={styles.emptyIconBox}><Users size={32} color={COLORS.textMain} strokeWidth={1.5} /></View>
                <Text style={styles.emptyTitle}>No Active Guests</Text>
                <Text style={styles.emptySub}>No guests are currently scheduled. Add a new entry to get started.</Text>
                <TouchableOpacity style={styles.blackButton} activeOpacity={0.85} onPress={() => navigation.navigate('RyuBookings', { mode: 'manual' })}>
                  <Text style={styles.blackButtonText}>Add Guest</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ── BLACK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem} activeOpacity={0.8}><Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem} activeOpacity={0.8}><CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem} activeOpacity={0.8}><Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem} activeOpacity={0.8}><Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem} activeOpacity={0.8}><Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text></TouchableOpacity>
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
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26, 37, 55, 0.65)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 28, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBottomContent: { marginTop: 'auto', gap: 12 },
  heroMainStat: { fontSize: 42, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, marginBottom: 0 },
  heroSubStat: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
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
  newEntryArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  newEntryArrowText: { color: '#FFFFFF', fontSize: 20, fontWeight: '300', lineHeight: 22 },
  guestCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 16, borderWidth: 1, borderColor: COLORS.border },
  guestInfo: { flex: 1, paddingRight: 8 },
  guestName: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 },
  guestDate: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  emptyCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  emptyIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, marginBottom: 8 },
  emptySub: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  blackButton: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 100 },
  blackButtonText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});