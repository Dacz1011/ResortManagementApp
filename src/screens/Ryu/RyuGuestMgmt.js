import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Image
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
  Building2,
  UserPlus,
  Search,
  ChevronRight,
  History,
  BedDouble,
  Calendar,
  Download
} from 'lucide-react-native';

// Ryu-specific Palette Adapted to Reine's Design System
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#23324B',       // Ryu Deep Navy
  primaryLight: '#E0E7FF',  // Soft indigo/blue tint
  primaryDark: '#1A2537',   // Deeper navy
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',

  // Accents & Badges
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FFEDD5',
  warningText: '#CA8A04',
  infoBg: '#DBEAFE',
  infoText: '#0EA5E9',

  // Summary Colors
  summaryDarkBg: '#1E293B',
  summaryLightBg: '#E0E7FF',
};

// Mock data for guests
const GUEST_LIST = [
  { id: '1', name: 'Jonathan Rivera', date: 'Feb 3, 2026 - Feb 5, 2026', status: 'FULLY PAID' },
  { id: '2', name: 'Sarah Jenkins', date: 'Feb 4, 2026 - Feb 7, 2026', status: 'BALANCE DUE' },
  { id: '3', name: 'Michael Chen', date: 'Feb 5, 2026 - Feb 8, 2026', status: 'FULLY PAID' },
];

// Mock data for guest history
const GUEST_HISTORY = [
  { id: '1', name: 'Maria Sofia Gonzales', date: 'Jan 28 - Jan 30', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '2', name: 'Robert Wilson', date: 'Jan 22 - Jan 27', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '3', name: 'Elena Rodriguez', date: 'Jan 18 - Jan 20', amount: '₱12,000.00', status: 'COMPLETED' },
  { id: '4', name: 'Michael Chang', date: 'Jan 12 - Jan 15', amount: '₱12,000.00', status: 'COMPLETED' },
];

export default function RyuGuestMgmt({ navigation }) {
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeNav = 'Guest';

  // --- RENDER: GUEST MANAGEMENT VIEW ---
  const renderGuestManagement = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* --- BENTO BOX SUMMARY CARDS (Reine Style) --- */}
      <View style={styles.bentoGrid}>

        {/* Hero Summary Card */}
        <View style={[styles.bentoCard, styles.heroBento]}>
          <View style={styles.heroCircleTop} />
          <View style={styles.heroCircleBottom} />

          <View style={styles.bentoTextWrap}>
            <Text style={styles.bentoLabelWhite}>ACTIVE GUESTS</Text>
            <Text style={styles.heroValueWhite}>12</Text>
            <View style={styles.trendRowWhite}>
              <Text style={styles.trendTextWhite}>+2 this week</Text>
            </View>
          </View>
          <Users size={48} color="#FFFFFF" strokeWidth={1} style={styles.heroBgIcon} opacity={0.2} />
        </View>

        {/* Stacked Supplementary Cards */}
        <View style={styles.bentoCol}>
          <View style={[styles.bentoCard, styles.smallBento]}>
            <Text style={styles.bentoLabelDark}>PENDING BAL.</Text>
            <Text style={styles.smallBentoValue}>₱450</Text>
          </View>

          <View style={[styles.bentoCard, styles.smallBento]}>
            <Text style={styles.bentoLabelDark}>ARRIVALS</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={styles.smallBentoValue}>8</Text>
              <Text style={styles.smallBentoSub}> Guests</Text>
            </View>
          </View>
        </View>

      </View>

      {/* --- LIST HEADER --- */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.listTitle}>Current Guests</Text>
        <TouchableOpacity
          style={styles.filterPill}
          activeOpacity={0.7}
          onPress={() => setShowHistory(true)}
        >
          <Text style={styles.filterPillText}>View History</Text>
          <ChevronRight size={14} color={COLORS.primary} strokeWidth={2.5} style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      {/* --- GUEST LIST --- */}
      <View style={styles.guestList}>
        {GUEST_LIST.map((guest) => {
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
                  styles.statusText,
                  { color: isPaid ? COLORS.successText : COLORS.warningText }
                ]}>
                  {guest.status}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}

        {/* Property Status Card */}
        <TouchableOpacity activeOpacity={0.7} style={styles.propertyCard}>
           <View style={styles.propertyAvatar}>
              <Building2 size={22} color={COLORS.primary} strokeWidth={2} />
           </View>

           <View style={styles.guestInfo}>
             <Text style={styles.propertyName}>Room Available</Text>
             <Text style={styles.propertyDesc}>Ready for check-in at 2:00 PM</Text>
           </View>

           <View style={styles.dotIndicator} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );

  // --- RENDER: GUEST HISTORY VIEW ---
  const renderGuestHistory = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- SEARCH BAR --- */}
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search record name..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* --- STAY SUMMARY CARDS (Reine Bento Adaptation) --- */}
        <Text style={styles.sectionLabel}>STAY SUMMARY</Text>
        <View style={styles.summaryRow}>

          {/* Total Stays Card */}
          <View style={[styles.summaryCard, { backgroundColor: COLORS.summaryDarkBg }]}>
            <View style={styles.heroCircleTopSmall} />
            <Text style={[styles.summaryCardLabel, { color: 'rgba(255,255,255,0.6)' }]}>TOTAL STAYS</Text>
            <Text style={[styles.summaryCardValue, { color: '#FFFFFF' }]}>42</Text>
            <BedDouble size={48} color="#FFFFFF" opacity={0.1} style={styles.summaryBgIcon} />
          </View>

          {/* Avg Duration Card */}
          <View style={[styles.summaryCard, { backgroundColor: COLORS.primaryLight }]}>
            <Text style={[styles.summaryCardLabel, { color: COLORS.primary }]}>AVG. DURATION</Text>
            <View style={styles.durationRow}>
              <Text style={[styles.summaryCardValue, { color: COLORS.primary }]}>1</Text>
              <Text style={styles.durationUnit}> day</Text>
            </View>
            <Calendar size={48} color={COLORS.primary} opacity={0.1} style={styles.summaryBgIcon} />
          </View>

        </View>

        {/* --- GUEST RECORDS LIST --- */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>Guest Records</Text>
          <TouchableOpacity style={styles.datePill} activeOpacity={0.7}>
            <Text style={styles.datePillText}>Past 30 Days</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recordsList}>
          {GUEST_HISTORY.map((guest) => (
            <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.recordCard}>

              <View style={styles.recordHeader}>
                <Text style={styles.guestName}>{guest.name}</Text>
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>COMPLETED</Text>
                </View>
              </View>

              <View style={styles.recordDateRow}>
                <Calendar size={14} color={COLORS.textMuted} strokeWidth={2.5} style={{ marginRight: 6 }} />
                <Text style={styles.guestDate}>{guest.date}</Text>
              </View>

              <View style={styles.amountPaidRow}>
                <Text style={styles.amountLabel}>AMOUNT PAID</Text>
                <Text style={styles.amountValue}>{guest.amount}</Text>
              </View>

            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* --- MODERN HEADER (Matches Home) --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showHistory ? (
              <TouchableOpacity onPress={() => setShowHistory(false)} style={styles.backBtn}>
                <ChevronRight size={28} color={COLORS.primary} strokeWidth={2.5} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            ) : (
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' }}
                style={styles.profileAvatar}
              />
            )}
            <View>
              <Text style={styles.greetingText}>{showHistory ? 'Guest History' : 'Guest Roster'}</Text>
              <Text style={styles.headerTitle}>{showHistory ? 'Fixed Rate Log' : 'Management'}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            {!showHistory && (
              <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                <Search size={20} color={COLORS.textMain} strokeWidth={2.5} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {showHistory ? renderGuestHistory() : renderGuestManagement()}
      </SafeAreaView>

      {/* --- FLOATING ACTION BUTTON (Squircle) --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        {showHistory ? (
          <Download size={24} color="#FFFFFF" strokeWidth={2.5} />
        ) : (
          <UserPlus size={24} color="#FFFFFF" strokeWidth={2.5} />
        )}
      </TouchableOpacity>

      {/* --- FLOATING BOTTOM NAVIGATION (Pill Shape) --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuHome')}>
            <Home size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuBookings')}>
            <CalendarDays size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Guest' && styles.navItemActive]}>
            <Users size={22} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Guest' && <Text style={styles.navTextActive}>Guest</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuFinance')}>
            <Wallet size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuAdmin')}>
            <Settings size={22} color={COLORS.textMuted} strokeWidth={2.5} />
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

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
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
  bellButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- BENTO BOX SUMMARY CARDS --- */
  bentoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  heroBento: {
    flex: 1.2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircleTop: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -40,
    right: -20,
  },
  heroCircleBottom: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: -30,
    left: -20,
  },
  heroBgIcon: {
    position: 'absolute',
    right: -10,
    bottom: 10,
  },
  bentoTextWrap: {
    zIndex: 1,
  },
  bentoLabelWhite: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroValueWhite: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -2,
    marginBottom: 8,
  },
  trendRowWhite: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendTextWhite: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bentoCol: {
    flex: 1,
    gap: 16,
  },
  smallBento: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  smallBentoValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  smallBentoSub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  /* --- LIST HEADER --- */
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listTitle: {
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

  /* --- GUEST LIST --- */
  guestList: {
    gap: 16,
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
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
    borderColor: 'rgba(35, 50, 75, 0.05)',
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
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  propertyDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
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

  /* --- HISTORY SPECIFIC --- */
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
  },
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
  heroCircleTopSmall: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -20,
    right: -20,
  },
  summaryCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryCardValue: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  durationUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 4,
  },
  summaryBgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  datePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  datePillText: {
    fontSize: 10,
    fontWeight: '800',
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
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completedBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  recordDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountPaidRow: {
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
    color: COLORS.textMuted,
    letterSpacing: 0.5,
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
    width: 64,
    height: 64,
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

  /* --- FLOATING BOTTOM NAV --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 24,
    right: 24,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    flex: 1.5,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  },
});