import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  User,
  Home,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  Search,
  ChevronRight,
  UserPlus
} from 'lucide-react-native';
import { useBookings } from '../../context/BookingContext';

const { width } = Dimensions.get('window');

// Casa M.O. Deep Forest Green Palette (Unified Design System)
const COLORS = {
  background: '#F8FAFC',
  primary: '#1B5E20',       // Casa Deep Forest Green
  primaryLight: '#E8F5E9',  // Soft green tint
  primaryDark: '#0D3B10',   // Deep green for accents
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
};

export default function CasaGuestMgmt({ navigation }) {
  const activeNav = 'Guest';
  const { getBookings } = useBookings();
  const bookingsData = getBookings('Casa');

  const guests = useMemo(() => {
    const uniqueBookings = [];
    const seen = new Set();

    Object.values(bookingsData).forEach(booking => {
      const identifier = `${booking.guestName}-${booking.checkIn}-${booking.checkOut}`;
      if (!seen.has(identifier)) {
        seen.add(identifier);
        uniqueBookings.push({
          id: identifier,
          name: booking.guestName,
          date: `${booking.checkIn} - ${booking.checkOut}`,
          status: booking.status === 'CONFIRMED' ? 'FULLY PAID' : 'BALANCE DUE'
        });
      }
    });

    return uniqueBookings;
  }, [bookingsData]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Manage Guests</Text>
                <Text style={styles.adminName}>Guest Roster</Text>
              </View>

              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                  <Search size={20} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                  <Bell size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.glassCard}>
              <View style={styles.glassHeader}>
                <View style={styles.statusPill}>
                  <Users size={14} color={COLORS.textMain} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.statusText}>ACTIVE ROSTER</Text>
                </View>
              </View>
              <Text style={styles.heroMainStat}>{guests.length} Guests</Text>
              <Text style={styles.heroSubStat}>Currently in-house and upcoming</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.mainSheet}>
          <View style={styles.listHeaderRow}>
            <Text style={styles.sectionTitle}>Current & Upcoming</Text>
            <TouchableOpacity
              style={styles.filterPill}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CasaGuestHistory')}
            >
              <Text style={styles.filterPillText}>History</Text>
              <ChevronRight size={14} color={COLORS.primary} strokeWidth={2.5} style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.guestList}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.propertyCard}
              onPress={() => navigation.navigate('CasaBookings', { mode: 'manual' })}
            >
               <View style={styles.propertyAvatar}>
                  <UserPlus size={22} color={COLORS.primary} strokeWidth={2} />
               </View>

               <View style={styles.guestInfo}>
                 <Text style={styles.propertyName}>New Guest Entry</Text>
                 <Text style={styles.propertyDesc}>Tap here to manually log a guest</Text>
               </View>

               <View style={styles.dotIndicator} />
            </TouchableOpacity>

            {guests.length > 0 ? guests.map((guest) => {
              const isPaid = guest.status === 'FULLY PAID';

              return (
                <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.guestCard}>
                  <View style={styles.avatar}>
                    <User size={22} color={COLORS.textMuted} strokeWidth={2} />
                  </View>

                  <View style={styles.guestInfo}>
                    <Text style={styles.guestName}>{guest.name}</Text>
                    <Text style={styles.guestDate}>{guest.date}</Text>
                  </View>

                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: isPaid ? COLORS.successBg : COLORS.warningBg }
                  ]}>
                    <Text style={[
                      styles.statusBadgeText,
                      { color: isPaid ? COLORS.successText : COLORS.warningText }
                    ]}>
                      {guest.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No active guests currently scheduled.</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- MODERN FULL-WIDTH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CasaHome')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Home' && styles.navIconWrapperActive]}>
              <Home size={22} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CasaBookings')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Bookings' && styles.navIconWrapperActive]}>
              <CalendarDays size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CasaGuestMgmt')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Guest' && styles.navIconWrapperActive]}>
              <Users size={22} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CasaFinance')} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Finance' && styles.navIconWrapperActive]}>
              <Wallet size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CasaAdmin')} activeOpacity={0.7}>
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
  scrollContent: {
    flexGrow: 1,
  },
  bottomSpacer: {
    height: 110,
  },
  heroHeader: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 94, 32, 0.7)', // Casa Deep Green Overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
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
  adminName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  heroMainStat: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 4,
  },
  heroSubStat: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
  },
  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36,
    paddingHorizontal: 24,
    paddingTop: 32,
    flex: 1,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  guestList: {
    gap: 16,
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(27, 94, 32, 0.1)',
  },
  propertyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  guestInfo: {
    flex: 1,
    paddingRight: 8,
  },
  guestName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  guestDate: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  propertyDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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