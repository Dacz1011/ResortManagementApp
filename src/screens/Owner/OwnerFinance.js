import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Info,
  Banknote,
  Wrench,
  ConciergeBell,
  Lightbulb,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  TrendingUp,
  Settings,
  Plus
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Exact Colors from Mockup
const COLORS = {
  background: '#FFFFFF',
  primary: '#1F3323',       // Dark forest green
  primaryLight: '#E8F0EA',
  accent: '#A3E635',        // Lime green for HEALTHY badge
  textMain: '#1E293B',
  textMuted: '#94A3B8',
  borderLight: '#F1F5F9',
  borderCard: '#E2E8F0',
  successText: '#15803D',   // Dark green for income
  successBg: '#DCFCE7',
  expenseText: '#EF4444',   // Red for expenses
};

const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

const COLLECTIONS = [
  { id: '1', name: "REINE'S", amount: "₱12k", progress: '60%' },
  { id: '2', name: "RYU'S", amount: "₱15k", progress: '75%' },
  { id: '3', name: "CASA M.O.", amount: "₱18k", progress: '85%' },
];

const TRANSACTIONS = [
  {
    id: '1',
    icon: Banknote,
    title: 'Booking Deposit',
    subtitle: "Reine's • 10:42 AM",
    amount: '+₱4,500',
    type: 'income'
  },
  {
    id: '2',
    icon: Wrench,
    title: 'Pool Maintenance',
    subtitle: "Casa M.O. • 09:15 AM",
    amount: '-₱1,200',
    type: 'expense'
  },
  {
    id: '3',
    icon: ConciergeBell,
    title: 'Breakfast Service',
    subtitle: "Ryu's • 08:30 AM",
    amount: '+₱850',
    type: 'income'
  },
  {
    id: '4',
    icon: Lightbulb,
    title: 'Utility Bill (Meralco)',
    subtitle: "Reine's • Yesterday",
    amount: '-₱15,840',
    type: 'expense'
  },
];

export default function OwnerFinance({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const activeNav = 'Finance';

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Finances</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Bold' }]}>RESORT PORTFOLIO</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- MAIN NOI CALCULATOR CARD --- */}
        <View style={styles.noiCard}>
          <View style={styles.noiHeaderRow}>
            <Text style={[styles.noiCardTitle, { fontFamily: 'Manrope-ExtraBold' }]}>AUTOMATED NOI CALCULATOR</Text>
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Info size={16} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.noiMainValue, { fontFamily: 'Manrope-Bold' }]}>₱142,850.00</Text>
          <Text style={[styles.noiSubtitle, { fontFamily: 'Manrope-Medium' }]}>Net Operating Income (This Month)</Text>

          <View style={styles.noiDivider} />

          <View style={styles.noiCalculationRow}>
            <View>
              <Text style={[styles.calcLabel, { fontFamily: 'Manrope-Bold' }]}>REVENUE</Text>
              <Text style={[styles.calcValueGreen, { fontFamily: 'Manrope-Bold' }]}>₱210,400</Text>
            </View>
            <Text style={[styles.calcOperator, { fontFamily: 'Manrope-Bold' }]}>-</Text>
            <View>
              <Text style={[styles.calcLabel, { fontFamily: 'Manrope-Bold' }]}>EXPENSES</Text>
              <Text style={[styles.calcValueWhite, { fontFamily: 'Manrope-Bold' }]}>₱67,550</Text>
            </View>
            <Text style={[styles.calcOperator, { fontFamily: 'Manrope-Bold' }]}>=</Text>
            <View style={styles.badgeHealthy}>
              <Text style={[styles.badgeHealthyText, { fontFamily: 'Manrope-ExtraBold' }]}>HEALTHY</Text>
            </View>
          </View>
        </View>

        {/* --- HORIZONTAL PROPERTY TABS --- */}
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tab, isActive && styles.tabActive]}
                >
                  <Text style={[styles.tabText, { fontFamily: 'Manrope-Bold' }, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- DAILY COLLECTIONS --- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Daily Collections</Text>
          <Text style={[styles.sectionRightLabel, { fontFamily: 'Manrope-Bold' }]}>TODAY, OCT 24</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collectionsScroll}
          style={{ marginBottom: 32 }}
        >
          {COLLECTIONS.map((col) => (
            <View key={col.id} style={styles.collectionCard}>
              <Text style={[styles.collectionLabel, { fontFamily: 'Manrope-ExtraBold' }]}>{col.name}</Text>
              <Text style={[styles.collectionAmount, { fontFamily: 'Manrope-Bold' }]}>{col.amount}</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: col.progress }]} />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* --- RECENT TRANSACTIONS --- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Recent Transactions</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[styles.viewAllLink, { fontFamily: 'Manrope-Bold' }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {TRANSACTIONS.map((tx) => {
            const Icon = tx.icon;
            const isIncome = tx.type === 'income';
            return (
              <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.transactionItem}>
                <View style={styles.txIconWrapper}>
                  <Icon size={20} color={COLORS.primary} strokeWidth={2} />
                </View>
                <View style={styles.txDetails}>
                  <Text style={[styles.txTitle, { fontFamily: 'Manrope-Bold' }]}>{tx.title}</Text>
                  <Text style={[styles.txSubtitle, { fontFamily: 'Manrope-Medium' }]}>{tx.subtitle}</Text>
                </View>
                <Text style={[styles.txAmount, { fontFamily: 'Manrope-Bold', color: isIncome ? COLORS.successText : COLORS.expenseText }]}>
                  {tx.amount}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Extra spacing at bottom to ensure scrolling past Bottom Nav and FAB */}
        <View style={{ height: 130 }} />
      </ScrollView>

      {/* --- CUSTOM BOTTOM NAVIGATION BAR --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={24} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Property' && styles.navTextActive]}>PROPERTY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Bookings' && styles.navTextActive]}>BOOKINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Finance' && styles.navTextActive]}>FINANCE</Text>
          </TouchableOpacity>

          <View style={styles.navSpacer} />

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={24} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Ledger' && styles.navTextActive]}>LEDGER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <TrendingUp size={24} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Insights' && styles.navTextActive]}>INSIGHTS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={24} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Settings' && styles.navTextActive]}>SETTINGS</Text>
          </TouchableOpacity>

        </View>

        {/* --- FLOATING ACTION BUTTON --- */}
        <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
          <View style={styles.fabInner}>
            <Plus size={32} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#E8F0EA',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- NOI CARD --- */
  noiCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 28,
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  noiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  noiCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  noiMainValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 4,
  },
  noiSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },
  noiDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 20,
  },
  noiCalculationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calcLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  calcValueGreen: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
  },
  calcValueWhite: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  calcOperator: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
  badgeHealthy: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeHealthyText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  /* --- PROPERTY TABS --- */
  tabsWrapper: {
    marginBottom: 32,
    marginHorizontal: -24, // Break out of container padding
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* --- SECTION HEADERS --- */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  sectionRightLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  viewAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.successText,
    marginBottom: 2,
  },

  /* --- DAILY COLLECTIONS --- */
  collectionsScroll: {
    gap: 12,
  },
  collectionCard: {
    width: 130,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 20,
    padding: 16,
  },
  collectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  collectionAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },

  /* --- RECENT TRANSACTIONS --- */
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 24,
    padding: 16,
  },
  txIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txDetails: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  txSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '800',
  },

  /* --- BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    height: 75,
    borderRadius: 35,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
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
  navSpacer: {
    width: 50,
  },
  fab: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 18,
  },
  fabInner: {
    width: 66,
    height: 66,
    backgroundColor: COLORS.primary,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.background,
  }
});
