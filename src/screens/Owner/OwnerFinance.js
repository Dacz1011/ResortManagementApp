import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BarChart2,
  BookOpen,
  Calendar,
  CalendarDays,
  ConciergeBell,
  Info,
  LayoutGrid,
  Lightbulb,
  MapPin,
  PieChart,
  Settings,
  TrendingUp,
  Wrench
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE (green brand, matches PortfolioDashboard) ──
const COLORS = {
  background: '#F7F8F6',
  surface:    '#FFFFFF',
  surfaceDark:'#1A3626',     // deep forest green

  primary:     '#1A3626',
  primaryLight:'#E8F0EA',
  accent:      '#2DD4BF',    // teal — owner-only highlight
  accentLight: '#CCFBF1',

  textMain:  '#0F172A',
  textMuted: '#64748B',
  border:    '#E2E8F0',

  successBg:  '#DCFCE7',
  successText:'#16A34A',
  warningBg:  '#FEF9C3',
  warningText:'#CA8A04',
  expenseBg:  '#FEE2E2',
  expenseText:'#EF4444',
};

const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

const HERO_IMAGES = {
  'All Properties': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  "Reine's":        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  "Ryu's":          'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
  "Casa M.O.":      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
};

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

  // Fade-in — matches the owner portal pattern
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ══════════════════════════════════════════
            FULL-BLEED HERO (Matches OwnerBookings)
            ══════════════════════════════════════════ */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: HERO_IMAGES[activeTab] }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
              {/* Top Nav Row */}
              <View style={styles.headerTopRow}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.locationText}>Financials</Text>
                </View>
                <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>

              {/* --- NOI CARD (Owner Tier Design) --- */}
              <View style={styles.heroBottomContent}>
                <View style={styles.noiCard}>
                  <View style={styles.noiHeader}>
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
                      <Text style={styles.calcValueAccent}>₱210,400</Text>
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
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* ══════════════════════════════════════════
            PROPERTY SELECTOR PILLS
            ══════════════════════════════════════════ */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {TABS.map((tab, index) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    isActive ? styles.actionPillDark : styles.actionPillLight,
                  ]}
                >
                  <Text style={isActive ? styles.actionPillDarkText : styles.actionPillLightText}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ══════════════════════════════════════════
            MAIN CONTENT
            ══════════════════════════════════════════ */}
        <View style={styles.mainContent}>

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
            <TouchableOpacity activeOpacity={0.7} style={styles.viewAllBtn} onPress={() => navigation.navigate('OwnerLedger')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {TRANSACTIONS.map((tx) => {
              const Icon = tx.icon;
              const isIncome = tx.type === 'income';

              return (
                <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.transactionCard}>
                  <View style={[
                    styles.txIconWrapper,
                    isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.expenseBg }
                  ]}>
                    {isIncome ? (
                      <ArrowDownRight size={20} color={COLORS.successText} strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight size={20} color={COLORS.expenseText} strokeWidth={2.5} />
                    )}
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
                  </View>
                  <View style={styles.txFinancials}>
                    <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>
                      {tx.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>

        </View>

        {/* Bottom padding to clear the navigation bar */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ══════════════════════════════════════════
          DARK GREEN PILL BOTTOM NAV (Owner Portal)
          ══════════════════════════════════════════ */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('PortfolioDashboard')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Settings' && styles.navTextActive]}>Settings</Text>
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

  /* --- FULL BLEED HERO --- */
  heroContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'flex-start',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,25,15,0.65)',
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  /* --- NOI CARD --- */
  heroBottomContent: {
    marginTop: 'auto',
  },
  noiCard: {
    backgroundColor: 'rgba(26, 54, 38, 0.85)', // Deep green glass effect
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  noiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusPill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heroMainStat: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginBottom: 4,
  },
  heroSubDecimals: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
  },
  heroSubStat: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  noiDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
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
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 4,
  },
  calcValueAccent: {
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
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    marginHorizontal: 8,
  },
  badgeHealthy: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeHealthyText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },

  /* --- PROPERTY TABS --- */
  quickActionsWrapper: {
    marginTop: 20,
    marginBottom: 12,
  },
  quickActionsScroll: {
    paddingHorizontal: 24,
    gap: 10,
    alignItems: 'center',
  },
  actionPillDark: {
    backgroundColor: COLORS.surfaceDark,
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  actionPillDarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  actionPillLight: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionPillLightText: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: '600',
  },

  /* --- MAIN CONTENT --- */
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
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
    paddingVertical: 8,
    borderRadius: 100,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- DAILY COLLECTIONS --- */
  collectionsScrollView: {
    marginBottom: 32,
    marginHorizontal: -24,
  },
  collectionsScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  collectionCard: {
    width: 160,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
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
    paddingVertical: 4,
    borderRadius: 6,
  },
  progressPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
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
    flexDirection: 'column',
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
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
    paddingRight: 10,
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
  txFinancials: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  bottomSpacer: {
    height: 140, // Clear the navigation bar space
  },

  /* --- DARK GREEN PILL BOTTOM NAV (owner portal) --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center',
    width: '92%',
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  navText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 3
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
});