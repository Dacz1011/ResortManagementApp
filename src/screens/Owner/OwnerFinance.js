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
  Settings
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Modernized)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep Forest Green
  primaryLight: '#E8F0EA',
  primaryDark: '#0D1E14',
  accent: '#A3E635',        // Lime green for HEALTHY badge
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  successText: '#16A34A',   // Dark green for income
  successBg: '#DCFCE7',
  expenseText: '#EF4444',   // Red for expenses
  expenseBg: '#FEE2E2',
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>RESORT PORTFOLIO</Text>
            <Text style={styles.headerTitle}>Finances</Text>
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
          {/* --- MAIN NOI HERO CARD --- */}
          <View style={styles.heroCard}>
            <View style={styles.heroCircleTop} />
            <View style={styles.heroCircleBottom} />

            <View style={styles.noiHeaderRow}>
              <Text style={styles.noiCardTitle}>AUTOMATED NOI CALCULATOR</Text>
              <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Info size={18} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            </View>

            <Text style={styles.noiMainValue}>₱142,850.00</Text>
            <Text style={styles.noiSubtitle}>Net Operating Income (This Month)</Text>

            <View style={styles.noiDivider} />

            <View style={styles.noiCalculationRow}>
              <View>
                <Text style={styles.calcLabel}>REVENUE</Text>
                <Text style={styles.calcValueGreen}>₱210,400</Text>
              </View>
              <Text style={styles.calcOperator}>-</Text>
              <View>
                <Text style={styles.calcLabel}>EXPENSES</Text>
                <Text style={styles.calcValueWhite}>₱67,550</Text>
              </View>
              <Text style={styles.calcOperator}>=</Text>
              <View style={styles.badgeHealthy}>
                <Text style={styles.badgeHealthyText}>HEALTHY</Text>
              </View>
            </View>
          </View>

          {/* --- MODERN TABS --- */}
          <View style={styles.tabsContainer}>
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
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* --- DAILY COLLECTIONS --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Collections</Text>
            <Text style={styles.sectionRightLabel}>TODAY, OCT 24</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsScroll}
            style={{ marginBottom: 32 }}
          >
            {COLLECTIONS.map((col) => (
              <View key={col.id} style={styles.collectionCard}>
                <Text style={styles.collectionLabel}>{col.name}</Text>
                <Text style={styles.collectionAmount}>{col.amount}</Text>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: col.progress }]} />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* --- RECENT TRANSACTIONS --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {TRANSACTIONS.map((tx) => {
              const Icon = tx.icon;
              const isIncome = tx.type === 'income';
              return (
                <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.transactionItem}>
                  <View style={[styles.txIconWrapper, isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.expenseBg }]}>
                    <Icon size={20} color={isIncome ? COLORS.successText : COLORS.expenseText} strokeWidth={2.5} />
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
                  </View>
                  <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>
                    {tx.amount}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Extra spacing at bottom to ensure scrolling past Bottom Nav */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>

      {/* --- FLOATING BOTTOM NAVIGATION (NO FAB) --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Props</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Book</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Fin</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledg</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <TrendingUp size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Data</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Set</Text>}
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
    paddingTop: Platform.OS === 'android' ? 48 : 20, // Increased to avoid status bar overlap
    paddingBottom: 24,
  },
  greetingText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 4,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* --- HERO NOI CARD --- */
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 28,
    marginHorizontal: 24,
    marginBottom: 28,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  heroCircleTop: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -80,
    right: -40,
  },
  heroCircleBottom: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -60,
    left: -40,
  },
  noiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  noiCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  noiMainValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 6,
  },
  noiSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  noiDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 24,
  },
  noiCalculationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calcLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  calcValueGreen: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accent,
  },
  calcValueWhite: {
    fontSize: 15,
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
  },
  badgeHealthyText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },

  /* --- MODERN TABS --- */
  tabsContainer: {
    marginBottom: 28,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
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
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
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
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 2,
  },

  /* --- DAILY COLLECTIONS --- */
  collectionsScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  collectionCard: {
    width: 140,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  collectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  collectionAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },

  /* --- RECENT TRANSACTIONS --- */
  transactionsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  txIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txDetails: {
    flex: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  txSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  bottomSpacer: {
    height: 140, // Keeps it clear of the floating nav
  },

  /* --- FLOATING BOTTOM NAV (Matched, NO FAB) --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    width: '100%',
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
    flexDirection: 'column',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  navText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});