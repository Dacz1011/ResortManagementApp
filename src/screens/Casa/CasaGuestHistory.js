import React, { useState } from 'react';
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
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ListFilter,
  Search,
  BedDouble,
  CalendarDays,
  Calendar,
  Home,
  Users,
  Wallet,
  Settings,
  ChevronLeft,
  ArrowDownToLine
} from 'lucide-react-native';

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
  summaryDarkBg: '#1B5E20', // Casa Primary
  summaryLightBg: '#E8F5E9',// Casa Light
};

// Data based on the provided mockup
const GUEST_HISTORY = [
  { id: '1', name: 'Maria Sofia Gonzales', date: 'Jan 28 - Jan 30', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '2', name: 'Robert Wilson', date: 'Jan 22 - Jan 27', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '3', name: 'Elena Rodriguez', date: 'Jan 18 - Jan 20', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '4', name: 'Michael Chang', date: 'Jan 12 - Jan 15', amount: '₱12,000.00', status: 'COMPLETED' },
];

export default function CasaGuestHistory({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const activeNav = 'Guest';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {/* --- IMMERSIVE HERO HEADER --- */}
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }}
            style={styles.heroHeader}
          >
            <View style={styles.heroOverlay} />
            <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
              <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtnBack} activeOpacity={0.8}>
                  <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.greetingText}>Fixed Rate Log</Text>
                  <Text style={styles.adminName}>Guest History</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnRight} activeOpacity={0.8}>
                  <ListFilter size={20} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ImageBackground>

          {/* --- OVERLAPPING MAIN SHEET --- */}
          <View style={styles.mainSheet}>
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

            <Text style={styles.sectionTitle}>STAY SUMMARY</Text>
            <View style={styles.summaryRow}>
              {/* Dark Summary Card */}
              <View style={[styles.summaryCard, { backgroundColor: COLORS.summaryDarkBg }]}>
                <Text style={[styles.summaryLabel, { color: 'rgba(255,255,255,0.7)' }]}>TOTAL STAYS</Text>
                <Text style={[styles.summaryValue, { color: '#FFFFFF' }]}>42</Text>
                <BedDouble size={64} color="#FFFFFF" opacity={0.1} style={styles.bgIcon} />
              </View>
              {/* Light Summary Card */}
              <View style={[styles.summaryCard, { backgroundColor: COLORS.summaryLightBg }]}>
                <Text style={[styles.summaryLabel, { color: COLORS.primaryDark }]}>AVG. DURATION</Text>
                <View style={styles.durationValueRow}>
                  <Text style={[styles.summaryValue, { color: COLORS.primaryDark }]}>3.5</Text>
                  <Text style={styles.summaryValueUnit}> days</Text>
                </View>
                <CalendarDays size={64} color={COLORS.primaryDark} opacity={0.1} style={styles.bgIcon} />
              </View>
            </View>

            <View style={styles.listHeaderRow}>
              <Text style={styles.listTitle}>Guest Records</Text>
              <TouchableOpacity style={styles.pastDaysPill} activeOpacity={0.7}>
                <Text style={styles.pastDaysText}>Past 30 Days</Text>
              </TouchableOpacity>
            </View>

            {/* Guest Records List */}
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
                    <Calendar size={14} color={COLORS.textMuted} strokeWidth={2.5} style={{ marginRight: 6 }} />
                    <Text style={styles.guestDate}>{guest.date}</Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>AMOUNT PAID</Text>
                    <Text style={styles.amountValue}>{guest.amount}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- DOWNLOAD FAB --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <View style={styles.fabInner}>
          <ArrowDownToLine size={24} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

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
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  bottomSpacer: { height: 110 },

  /* Hero Header */
  heroHeader: { width: '100%', height: 280, justifyContent: 'flex-start' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(27, 94, 32, 0.75)' }, // Casa Overlay
  heroSafeArea: { flex: 1, paddingHorizontal: 24, justifyContent: 'flex-start', paddingTop: Platform.OS === 'android' ? 32 : 16 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  iconBtnBack: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  iconBtnRight: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  headerTitleContainer: { flex: 1, paddingHorizontal: 16 },
  greetingText: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 },
  adminName: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },

  /* Main Sheet */
  mainSheet: { backgroundColor: COLORS.background, borderTopLeftRadius: 36, borderTopRightRadius: 36, marginTop: -36, paddingHorizontal: 24, paddingTop: 32, flex: 1 },

  /* Search */
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardBg, borderRadius: 20, paddingHorizontal: 20, height: 60, marginBottom: 32, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.textMain },

  /* Summary Cards */
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1.5, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  summaryCard: { flex: 1, borderRadius: 28, padding: 24, height: 120, justifyContent: 'center', position: 'relative', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  summaryLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  summaryValue: { fontSize: 32, fontWeight: '800', letterSpacing: -1 },
  durationValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  summaryValueUnit: { fontSize: 14, fontWeight: '700', marginLeft: 4, color: COLORS.primaryDark },
  bgIcon: { position: 'absolute', right: -10, bottom: -10 },

  /* List Elements */
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  listTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  pastDaysPill: { backgroundColor: COLORS.primaryLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  pastDaysText: { fontSize: 11, fontWeight: '800', color: COLORS.primaryDark },
  recordsList: { gap: 16 },
  recordCard: { backgroundColor: COLORS.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  guestName: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.2 },
  statusBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  statusText: { fontSize: 9, fontWeight: '800', color: '#16A34A', letterSpacing: 0.5 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  guestDate: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: COLORS.background, paddingTop: 16 },
  amountLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5 },
  amountValue: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 }, // Specifically textMain (Slate) for Casa history amount

  /* FAB */
  fab: { position: 'absolute', bottom: Platform.OS === 'ios' ? 120 : 110, right: 24, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8, zIndex: 10 },
  fabInner: { width: 64, height: 64, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },

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
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
});