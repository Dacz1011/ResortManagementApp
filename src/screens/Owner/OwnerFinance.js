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
  StatusBar,
  ImageBackground
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
  PieChart,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Premium Color Palette (Modernized & Eye-Appealing)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep Forest Green
  primaryLight: '#E8F0EA',  // Soft Green background
  primaryDark: '#0D1E14',   // Darker green
  accent: '#A3E635',        // Lime green accent
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

const COLLECTIONS = [
  { id: '1', name: "REINE'S", amount: "₱12.4k", progress: '60%' },
  { id: '2', name: "RYU'S", amount: "₱15.2k", progress: '75%' },
  { id: '3', name: "CASA M.O.", amount: "₱18.8k", progress: '85%' },
];

const TRANSACTIONS = [
  {
    id: '1',
    icon: Banknote,
    title: 'Booking Deposit',
    subtitle: "Reine's Beach House • 10:42 AM",
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
    subtitle: "Ryu's Transient • 08:30 AM",
    amount: '+₱850',
    type: 'income'
  },
  {
    id: '4',
    icon: Lightbulb,
    title: 'Utility Bill (Meralco)',
    subtitle: "Reine's Beach House • Yesterday",
    amount: '-₱15,840',
    type: 'expense'
  },
];

export default function OwnerFinance({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const activeNav = 'Finance';

  // Dynamic Hero Background for Owner Portal
  const HERO_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* --- FULL BLEED HERO IMAGE HEADER (Now Inside ScrollView) --- */}
        <ImageBackground
          source={{ uri: HERO_IMAGE }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            {/* Top Nav Row */}
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>RESORT PORTFOLIO</Text>
                <Text style={styles.headerTitle}>Financials</Text>
              </View>
              <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            {/* --- GLASSMORPHISM NOI CARD --- */}
            <View style={styles.glassCard}>
              <View style={styles.glassHeader}>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>AUTOMATED NOI CALCULATOR</Text>
                </View>
                <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Info size={18} color="rgba(255,255,255,0.8)" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <Text style={styles.heroMainStat}>₱142,850<Text style={styles.heroSubDecimals}>.00</Text></Text>
              <Text style={styles.heroSubStat}>Net Operating Income (This Month)</Text>

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
                  <TrendingUp size={12} color={COLORS.primaryDark} strokeWidth={3} style={{ marginRight: 4 }} />
                  <Text style={styles.badgeHealthyText}>HEALTHY</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* --- OVERLAPPING MAIN SHEET (Now follows the Image in flow) --- */}
        <View style={styles.mainSheet}>
          {/* --- PROPERTY TABS --- */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
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

          {/* --- DAILY COLLECTIONS SECTION --- */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Daily Collections</Text>
            <Text style={styles.sectionContextDate}>TODAY, OCT 24</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsScroll}
            style={styles.collectionsScrollView}
          >
            {COLLECTIONS.map((col) => (
              <View key={col.id} style={styles.collectionCard}>
                <View style={styles.collectionHeaderRow}>
                  <Text style={styles.collectionLabel}>{col.name}</Text>
                  <View style={styles.progressPill}>
                     <Text style={styles.progressPillText}>{col.progress}</Text>
                  </View>
                </View>
                <Text style={styles.collectionAmount}>{col.amount}</Text>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: col.progress }]} />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* --- RECENT TRANSACTIONS --- */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bentoCard}>
            <View style={styles.transactionsList}>
              {TRANSACTIONS.map((tx, index) => {
                const Icon = tx.icon;
                const isIncome = tx.type === 'income';
                const isLast = index === TRANSACTIONS.length - 1;

                return (
                  <TouchableOpacity
                    key={tx.id}
                    activeOpacity={0.7}
                    style={[styles.transactionItem, !isLast && styles.transactionItemBorder]}
                  >
                    <View style={[styles.txIconWrapper, isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.dangerBg }]}>
                      {isIncome ? (
                        <ArrowDownRight size={20} color={COLORS.successText} strokeWidth={2.5} />
                      ) : (
                        <ArrowUpRight size={20} color={COLORS.dangerText} strokeWidth={2.5} />
                      )}
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
          </View>
        </View>

        {/* Bottom padding to clear the navigation bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- FULL-WIDTH EXPANDING PILL BOTTOM NAV (Optimized Spacing) --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Overview</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Bookings</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Finance</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledger</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <PieChart size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Insights</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Settings</Text>}
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
    // Note: ScrollView now wraps the whole page including the hero
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 500,
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    justifyContent: 'flex-start',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  /* --- GLASSMORPHISM NOI CARD --- */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 36,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    zIndex: 5,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heroMainStat: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginBottom: 6,
  },
  heroSubDecimals: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
  },
  heroSubStat: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  noiDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
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
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 4,
  },
  calcValueGreen: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accent,
  },
  calcValueWhite: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  calcOperator: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    marginHorizontal: 8,
  },
  badgeHealthy: {
    flexDirection: 'row',
    alignItems: 'center',
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

  /* --- OVERLAPPING MAIN SHEET --- */
  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -25, // Overlap pulls the sheet up onto the bottom of the hero
    paddingTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    zIndex: 10,
  },

  /* --- TABS --- */
  tabsContainer: {
    marginBottom: 32,
    marginHorizontal: -24,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 22,
    paddingVertical: 14,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  sectionContextDate: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  viewAllBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- SHARED BENTO STYLES --- */
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },

  /* --- DAILY COLLECTIONS --- */
  collectionsScrollView: {
    marginBottom: 36,
    marginHorizontal: -24,
  },
  collectionsScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  collectionCard: {
    width: 160,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  collectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  collectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  progressPill: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  progressPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  collectionAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  /* --- RECENT TRANSACTIONS --- */
  transactionsList: {
    flexDirection: 'column',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  txIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txDetails: {
    flex: 1,
    paddingRight: 8,
  },
  txTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  txSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  txAmount: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  bottomSpacer: {
    height: 120, // Clear the navigation bar space
  },

  /* --- FULL-WIDTH EXPANDING PILL BOTTOM NAV (Optimized) --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 25,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.3,
  },
});