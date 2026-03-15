import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Building2,
  Bell,
  Users,
  Wallet,
  User,
  LayoutGrid,
  Calendar,
  Folder,
  Settings,
  Home
} from 'lucide-react-native';

// Ryu Deep Navy Theme
const COLORS = {
  background: '#FFFFFF',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#3A4D6B',
  accent: '#3B82F6',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#F1F5F9',
  cardBg: '#FFFFFF',

  // Summary Cards
  cardDarkBg: '#1E293B',
  cardLightBg: '#E2E8F0',

  // Status Badges
  statusPaidBg: '#F1F5F9',
  statusPaidText: '#475569',
  statusDueBg: '#FEF3C7',
  statusDueText: '#B45309',
};

// Mock data for guests
const GUEST_LIST = [
  { id: '1', name: 'Jonathan Rivera', date: 'Oct 26, 2025 - Oct 28, 2025', status: 'FULLY PAID' },
  { id: '2', name: 'Sarah Jenkins', date: 'Oct 27, 2025 - Oct 30, 2025', status: 'BALANCE DUE' },
  { id: '3', name: 'Michael Chen', date: 'Oct 29, 2025 - Nov 01, 2025', status: 'FULLY PAID' },
  { id: '4', name: 'Amanda Lewis', date: 'Nov 03, 2025 - Nov 05, 2025', status: 'BALANCE DUE' },
  { id: '5', name: 'David Kim', date: 'Nov 07, 2025 - Nov 09, 2025', status: 'FULLY PAID' },
  { id: '6', name: 'Sophia Rodriguez', date: 'Nov 12, 2025 - Nov 15, 2025', status: 'FULLY PAID' },
];

export default function RyuGuestMgmt({ navigation }) {
  const [activeNav, setActiveNav] = useState('Guest');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <Building2 size={24} color={COLORS.primary} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Ryu's Guest Management</Text>
            <Text style={styles.headerSubtitle}>TRANSIENT HOUSE ADMIN</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- SUMMARY CARDS --- */}
        <View style={styles.summaryRow}>
          {/* Active Guests Card */}
          <View style={[styles.summaryCard, { backgroundColor: COLORS.cardDarkBg }]}>
            <Text style={[styles.summaryLabel, { color: '#94A3B8' }]}>ACTIVE GUESTS</Text>
            <Text style={[styles.summaryValue, { color: '#FFFFFF' }]}>15</Text>
            <Users size={64} color="#FFFFFF" opacity={0.05} style={styles.bgIcon} />
          </View>

          {/* Pending Balance Card */}
          <View style={[styles.summaryCard, { backgroundColor: COLORS.cardLightBg }]}>
            <Text style={[styles.summaryLabel, { color: COLORS.primaryLight }]}>PENDING</Text>
            <Text style={[styles.summaryValue, { color: COLORS.primary }]}>₱36,000</Text>
            <Wallet size={64} color={COLORS.primary} opacity={0.05} style={styles.bgIcon} />
          </View>
        </View>

        {/* --- LIST HEADER --- */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>Upcoming & Current{'\n'}Guests</Text>
          <TouchableOpacity style={styles.filterPill} activeOpacity={0.7}>
            <Text style={styles.filterPillText}>12 This{'\n'}Month</Text>
          </TouchableOpacity>
        </View>

        {/* --- GUEST LIST --- */}
        <View style={styles.guestList}>
          {GUEST_LIST.map((guest) => {
            const isPaid = guest.status === 'FULLY PAID';

            return (
              <TouchableOpacity key={guest.id} activeOpacity={0.7} style={styles.guestCard}>
                <View style={styles.avatar}>
                  <User size={20} color="#94A3B8" strokeWidth={2.5} />
                </View>

                <View style={styles.guestInfo}>
                  <Text style={styles.guestName}>{guest.name}</Text>
                  <Text style={styles.guestDate}>{guest.date}</Text>
                </View>

                <View style={[
                  styles.statusBadge,
                  { backgroundColor: isPaid ? COLORS.statusPaidBg : COLORS.statusDueBg }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: isPaid ? COLORS.statusPaidText : COLORS.statusDueText }
                  ]}>
                    {guest.status}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

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
          <TouchableOpacity style={styles.navItem}>
            <Users size={24} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={[styles.navText, styles.navTextActive]}>GUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem}>
            <Wallet size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>FINANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
            <Folder size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>RECORDS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
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
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  bellButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- SUMMARY CARDS --- */
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
    height: 110,
    justifyContent: 'center',
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
  bgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },

  /* --- LIST HEADER --- */
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  filterPill: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryLight,
    textAlign: 'center',
  },

  /* --- GUEST LIST --- */
  guestList: {
    gap: 16,
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 120,
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