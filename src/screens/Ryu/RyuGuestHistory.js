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
  KeyboardAvoidingView
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
  Folder,
  Settings
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#FAFAFA',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#3A4D6B',
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
  const [activeNav, setActiveNav] = useState('Records'); // Active tab is Records

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <History size={24} color="#FFFFFF" strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Guest History</Text>
            <Text style={styles.headerSubtitle}>FIXED RATE LOG</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <ListFilter size={20} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

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
              <Text style={[styles.summaryLabel, { color: COLORS.primaryLight }]}>AVG. DURATION</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- FLOATING ACTION BUTTON (DOWNLOAD) --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <View style={styles.fabInner}>
          <Download size={24} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem}>
            <Home size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem}>
            <Calendar size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>BOOKINGS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>GUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem}>
            <Wallet size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>FINANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Folder size={24} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={[styles.navText, styles.navTextActive]}>RECORDS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuSettings')} style={styles.navItem}>
            <Settings size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>SETTING</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },

  /* --- HEADER --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconBg: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- SEARCH BAR --- */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
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
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
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
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    height: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
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
    fontWeight: '600',
    color: COLORS.primary,
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
    marginBottom: 16,
  },
  pastDaysPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
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
    borderRadius: 20,
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
    marginBottom: 8,
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
    marginBottom: 24,
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
    height: 120,
  },

  /* --- FLOATING ACTION BUTTON --- */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
    right: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  },
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* --- BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});