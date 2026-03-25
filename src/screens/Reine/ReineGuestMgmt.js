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
  ChevronRight
} from 'lucide-react-native';

// Modernized Theme Palette (Matching Home, Bookings, Finance)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#E64E76',       // Vibrant Pink
  primaryLight: '#FDF0F4',  // Very soft pink
  primaryDark: '#BE375A',   // Deep pink for gradients/accents
  textMain: '#0F172A',      // Slate 900 (High contrast)
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',

  // Accents & Badges
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
  infoBg: '#E0F2FE',
  infoText: '#0EA5E9',
};

// Mock data for guests
const GUEST_LIST = [
  { id: '1', name: 'Jonathan Rivera', date: 'Feb 3, 2026 - Feb 5, 2026', status: 'FULLY PAID' },
  { id: '2', name: 'Sarah Jenkins', date: 'Feb 4, 2026 - Feb 7, 2026', status: 'BALANCE DUE' },
  { id: '3', name: 'Michael Chen', date: 'Feb 5, 2026 - Feb 8, 2026', status: 'FULLY PAID' },
];

export default function ReineGuestMgmt({ navigation }) {
  const activeNav = 'Guest';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Guest Roster</Text>
            <Text style={styles.headerTitle}>Management</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Search size={20} color={COLORS.textMain} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- BENTO BOX SUMMARY CARDS --- */}
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
                <Text style={styles.bentoLabelDark}>TODAY'S ARRIVALS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.smallBentoValue}>8</Text>
                  <Text style={styles.smallBentoSub}> Guests</Text>
                </View>
              </View>
            </View>

          </View>

          {/* --- LIST HEADER --- */}
          <View style={styles.listHeaderRow}>
            <Text style={styles.listTitle}>Upcoming & Current</Text>
            <TouchableOpacity style={styles.filterPill} activeOpacity={0.7}>
              <Text style={styles.filterPillText}>Filter</Text>
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

            {/* Special Property Available Card */}
            <TouchableOpacity activeOpacity={0.7} style={styles.propertyCard}>
               <View style={styles.propertyAvatar}>
                  <Building2 size={22} color={COLORS.primary} strokeWidth={2} />
               </View>

               <View style={styles.guestInfo}>
                 <Text style={styles.propertyName}>Property Available</Text>
                 <Text style={styles.propertyDesc}>Ready for next check-in at 2:00 PM</Text>
               </View>

               <View style={styles.dotIndicator} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>

      {/* --- FLOATING ACTION BUTTON --- */}
      <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
        <UserPlus size={24} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* --- FLOATING BOTTOM NAVIGATION --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineHome')}>
            <Home size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineBookings')}>
            <CalendarDays size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Guest' && styles.navItemActive]}>
            <Users size={22} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Guest' && <Text style={styles.navTextActive}>Guest</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineFinance')}>
            <Wallet size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineAdmin')}>
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

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
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
    borderColor: '#FFF0F5',
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

  bottomSpacer: {
    height: 140, // Avoid overlap with floating nav
  },

  /* --- FLOATING ACTION BUTTON --- */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 20, // Modern squircle
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