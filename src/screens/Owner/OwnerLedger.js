import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowDownRight,
  ArrowLeftSquare,
  ArrowUpRight,
  BarChart2,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ConciergeBell,
  Download,
  LayoutGrid,
  Lightbulb,
  PieChart,
  Plus,
  Search,
  Settings,
  Settings as SettingsIcon,
  TrendingUp,
  Wallet,
  Wand2
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE ──
// High-trust executive theme using deep forest green & teal
const COLORS = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceDark: '#1A3626',      // Owner Deep Forest Green
  surfaceDarkHover: '#0D1E14',

  primary: '#1A3626',
  primaryDark: '#0D1E14',
  primaryLight: '#E8F0EA',
  accent: '#2DD4BF',           // Owner Teal Accent
  accentLight: '#CCFBF1',

  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',

  cardBg: '#FFFFFF',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
  expenseBg: '#FEE2E2',
  expenseText: '#EF4444',
};

// Filter Options
const FILTERS = ['All', 'Income', 'Expenses', 'Refunds'];

// --- MOCK DATA ---
const ALL_LEDGER_DATA = [
  {
    title: 'TODAY, OCT 24',
    data: [
      { id: '1', icon: Wallet, title: 'Booking Deposit', subtitle: "REINE'S BEACH HOUSE • 10:42 AM", amount: '+₱4,500.00', method: 'E-Wallet', type: 'income' },
      { id: '2', icon: SettingsIcon, title: 'Pool Maintenance', subtitle: "CASA M.O. • 09:15 AM", amount: '-₱1,200.00', method: 'Cash', type: 'expense' },
      { id: '3', icon: ConciergeBell, title: 'Breakfast Service', subtitle: "RYU'S TRANSIENT • 08:30 AM", amount: '+₱850.00', method: 'Card', type: 'income' }
    ]
  },
  {
    title: 'YESTERDAY, OCT 23',
    data: [
      { id: '4', icon: Lightbulb, title: 'Utility Bill (Meralco)', subtitle: "REINE'S BEACH HOUSE", amount: '-₱15,840.00', method: 'Auto-pay', type: 'expense' },
      { id: '5', icon: CalendarCheck, title: 'Event Venue Rental', subtitle: "CASA M.O.", amount: '+₱25,000.00', method: 'Bank Transfer', type: 'income' }
    ]
  },
  {
    title: 'EARLIER THIS WEEK',
    data: [
      { id: '6', icon: Wand2, title: 'Cleaning Supplies', subtitle: "PORTFOLIO-WIDE", amount: '-₱3,420.50', method: 'Cash', type: 'expense' }
    ]
  }
];

const INCOME_DATA = [
  {
    title: 'TODAY, OCT 24',
    data: [
      { id: 'i1', title: 'Booking Deposit', subtitle: "REINE'S BEACH HOUSE • 10:42 AM", amount: '+₱4,500.00', method: 'E-Wallet', type: 'income' },
      { id: 'i2', title: 'Breakfast Service', subtitle: "RYU'S TRANSIENT • 08:30 AM", amount: '+₱850.00', method: 'Card', type: 'income' }
    ]
  },
  {
    title: 'YESTERDAY, OCT 23',
    data: [
      { id: 'i3', title: 'Event Venue Rental', subtitle: "CASA M.O. • 02:15 PM", amount: '+₱25,000.00', method: 'Bank Transfer', type: 'income' }
    ]
  }
];

const REFUND_DATA = [
  {
    title: 'TODAY, OCT 24',
    data: [
      { id: 'r1', title: 'Partial Cancellation', subtitle: "REINE'S BEACH • REF-0092 • MARCUS V.", amount: '₱1,500.00', method: 'E-Wallet' }
    ]
  },
  {
    title: 'YESTERDAY, OCT 23',
    data: [
      { id: 'r2', title: 'Security Deposit Return', subtitle: "CASA M.O. • REF-0089 • ELENA S.", amount: '₱5,000.00', method: 'Bank Transfer' },
      { id: 'r3', title: 'Service Fee Adjustment', subtitle: "RYU'S TRANSIENT • REF-0087 • DAVID K.", amount: '₱350.00', method: 'Cash' }
    ]
  },
  {
    title: 'EARLIER THIS WEEK',
    data: [
      { id: 'r4', title: 'Overpayment Refund', subtitle: "PORTFOLIO-WIDE • REF-0082 • SARAH J.", amount: '₱12,400.00', method: 'Card' }
    ]
  }
];

export default function OwnerLedger({ navigation }) {
  const activeNav = 'Ledger';
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Manual Expense Form State
  const [expenseProperty, setExpenseProperty] = useState("Reine's");
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('10/24/2023');

  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header fades out as you scroll up (Mirrors PortfolioDashboard)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* --- MODERN HEADER (FIXED TOP, FADES ON SCROLL) --- */}
      <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
        <View style={[styles.headerSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconBtnHeader}>
                <BookOpen size={20} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.greetingText}>History & Records</Text>
                <Text style={styles.headerTitle}>Master Ledger</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Download size={20} color={COLORS.textMain} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Spacer to push content down below the pinned header */}
          <View style={{ height: Platform.OS === 'ios' ? insets.top + 70 : (StatusBar.currentHeight || 24) + 70 }} />

          {/* ══════════════════════════════════════════
              FULL-BLEED IMMERSIVE HERO CARD
              ══════════════════════════════════════════ */}
          <TouchableOpacity activeOpacity={0.9} style={styles.heroCardWrapper}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
              style={styles.heroBackground}
              imageStyle={{ borderRadius: 32 }}
            >
              {/* Dark Forest Green Gradient Overlay */}
              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <View style={styles.heroHeaderRow}>
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusBadgeText}>SYNCED TODAY</Text>
                  </View>
                  <View style={styles.weatherBadge}>
                    <Wallet size={14} color={COLORS.accent} strokeWidth={2.5} style={{ marginRight: 6 }} />
                    <Text style={styles.weatherText}>All Accounts</Text>
                  </View>
                </View>

                <View style={styles.heroMainContent}>
                  <Text style={styles.heroLabel}>TOTAL LEDGER BALANCE</Text>
                  <Text style={styles.heroGuestName}>₱124,500<Text style={styles.heroSubDecimals}>.00</Text></Text>

                  <View style={styles.heroSubRow}>
                    <TrendingUp size={14} color={COLORS.accent} style={{ marginRight: 6 }} strokeWidth={3} />
                    <Text style={styles.heroSubText}>Based on settled transactions</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* ══════════════════════════════════════════
              OVERLAPPING MAIN SHEET
              ══════════════════════════════════════════ */}
          <View style={styles.mainSheet}>

            {/* --- SEARCH BAR --- */}
            <View style={styles.searchContainer}>
              <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={activeFilter === 'Expenses' ? "Search expense categories..." : "Search transactions..."}
                placeholderTextColor={COLORS.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* --- FILTER PILLS --- */}
            <View style={styles.quickActionsWrapper}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickActionsScroll}
              >
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <TouchableOpacity
                      key={filter}
                      style={[
                        isActive ? styles.actionPillDark : styles.actionPillLight,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setActiveFilter(filter)}
                    >
                      <Text style={[
                        isActive ? styles.actionPillDarkText : styles.actionPillLightText,
                      ]}>
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* ══════════════════════════════════════════
                DYNAMIC CONTENT BASED ON FILTER
                ══════════════════════════════════════════ */}

            {/* 1. ALL TRANSACTIONS */}
            {activeFilter === 'All' && (
              <Animated.View style={{ opacity: fadeAnim }}>
                {ALL_LEDGER_DATA.map((section, sectionIndex) => (
                  <View key={sectionIndex} style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <View style={styles.sectionLine} />
                    </View>

                    {section.data.map((item) => {
                      const Icon = item.icon;
                      const isIncome = item.type === 'income';
                      return (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                          <View style={[styles.txIconWrapper, isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.expenseBg }]}>
                            {isIncome ? (
                              <ArrowDownRight size={20} color={COLORS.successText} strokeWidth={2.5} />
                            ) : (
                              <ArrowUpRight size={20} color={COLORS.expenseText} strokeWidth={2.5} />
                            )}
                          </View>
                          <View style={styles.txDetails}>
                            <Text style={styles.txTitle}>{item.title}</Text>
                            <Text style={styles.txSubtitle}>{item.subtitle}</Text>
                          </View>
                          <View style={styles.txFinancials}>
                            <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>
                              {item.amount}
                            </Text>
                            <Text style={styles.txMethod}>{item.method}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                ))}
              </Animated.View>
            )}

            {/* 2. INCOME LEDGER */}
            {activeFilter === 'Income' && (
              <Animated.View style={{ opacity: fadeAnim }}>
                {/* Bento Summary for Income */}
                <View style={styles.bentoGrid}>
                  <View style={[styles.bentoCard, styles.revenueCard]}>
                    <View style={styles.bentoIconWrapper}>
                      <BarChart2 size={24} color={COLORS.primary} strokeWidth={2.5} />
                    </View>
                    <View style={styles.bentoTextWrap}>
                      <Text style={styles.bentoLabelDark}>TOTAL INCOME (OCT)</Text>
                      <Text style={styles.revenueValueDark}>₱30,350</Text>
                      <View style={styles.trendRow}>
                        <ArrowUpRight size={14} color={COLORS.successText} strokeWidth={3} />
                        <Text style={styles.trendText}>+12% vs last month</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {INCOME_DATA.map((section, sectionIndex) => (
                  <View key={sectionIndex} style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <View style={styles.sectionLine} />
                    </View>

                    {section.data.map((item) => (
                      <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                        <View style={[styles.txIconWrapper, { backgroundColor: COLORS.successBg }]}>
                          <ArrowDownRight size={20} color={COLORS.successText} strokeWidth={2.5} />
                        </View>
                        <View style={styles.txDetails}>
                          <Text style={styles.txTitle}>{item.title}</Text>
                          <Text style={styles.txSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View style={styles.txFinancials}>
                          <Text style={[styles.txAmount, { color: COLORS.successText }]}>{item.amount}</Text>
                          <Text style={styles.txMethod}>{item.method}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </Animated.View>
            )}

            {/* 3. EXPENSES FORM (Manual Entry) */}
            {activeFilter === 'Expenses' && (
              <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.formCard}>
                  <View style={styles.sectionHeaderRowForm}>
                    <Text style={styles.sectionTitleForm}>Log New Expense</Text>
                  </View>

                  <Text style={styles.formLabel}>SELECT PROPERTY</Text>
                  <View style={styles.formPropertyRow}>
                    {["Reine's", "Ryu's", "Casa M.O."].map((prop) => (
                      <TouchableOpacity
                        key={prop}
                        activeOpacity={0.8}
                        onPress={() => setExpenseProperty(prop)}
                        style={[styles.formPropertyPill, expenseProperty === prop && styles.formPropertyPillActive]}
                      >
                        <Text style={[styles.formPropertyText, expenseProperty === prop && styles.formPropertyTextActive]}>
                          {prop}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.formLabel}>EXPENSE CATEGORY</Text>
                  <TouchableOpacity style={styles.formSelectBox} activeOpacity={0.8}>
                    <Text style={styles.formSelectText}>Select category</Text>
                    <ChevronDown size={20} color={COLORS.textMuted} />
                  </TouchableOpacity>

                  <Text style={styles.formLabel}>AMOUNT</Text>
                  <View style={styles.formInputBox}>
                    <View style={styles.pesoIconWrapper}>
                      <Text style={styles.pesoIconText}>₱</Text>
                    </View>
                    <TextInput
                      style={styles.formAmountInput}
                      placeholder="0.00"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="decimal-pad"
                      value={expenseAmount}
                      onChangeText={setExpenseAmount}
                    />
                  </View>

                  <Text style={styles.formLabel}>DATE</Text>
                  <View style={styles.formInputBox}>
                    <TextInput
                      style={styles.formInput}
                      placeholder="MM/DD/YYYY"
                      placeholderTextColor={COLORS.textMuted}
                      value={expenseDate}
                      onChangeText={setExpenseDate}
                    />
                  </View>

                  <TouchableOpacity activeOpacity={0.85} style={styles.saveExpenseBtn} onPress={() => setActiveFilter('All')}>
                    <Text style={styles.saveExpenseBtnText}>Save Expense to Ledger</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {/* 4. REFUNDS LEDGER */}
            {activeFilter === 'Refunds' && (
              <Animated.View style={{ opacity: fadeAnim }}>
                {/* Bento Summary for Refunds */}
                <View style={styles.bentoGrid}>
                  <View style={[styles.bentoCard, styles.revenueCard, { borderColor: COLORS.border, backgroundColor: COLORS.surface }]}>
                    <View style={[styles.bentoIconWrapper, { backgroundColor: COLORS.primaryLight }]}>
                      <ArrowLeftSquare size={24} color={COLORS.primary} strokeWidth={2.5} />
                    </View>
                    <View style={styles.bentoTextWrap}>
                      <Text style={styles.bentoLabelDark}>TOTAL REFUNDED</Text>
                      <Text style={[styles.revenueValueDark, { color: COLORS.textMain }]}>₱42,350</Text>
                      <Text style={styles.bentoSubDesc}>October 01 - October 24, 2023</Text>
                    </View>
                  </View>
                </View>

                {REFUND_DATA.map((section, sectionIndex) => (
                  <View key={sectionIndex} style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <View style={styles.sectionLine} />
                    </View>

                    {section.data.map((item) => (
                      <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                        <View style={[styles.txIconWrapper, { backgroundColor: COLORS.primaryLight }]}>
                          <ArrowLeftSquare size={20} color={COLORS.primary} strokeWidth={2.5} />
                        </View>
                        <View style={styles.txDetails}>
                          <Text style={styles.txTitle}>{item.title}</Text>
                          <Text style={styles.txSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View style={styles.txFinancials}>
                          <Text style={[styles.txAmount, { color: COLORS.primary }]}>{item.amount}</Text>
                          <Text style={styles.txMethod}>{item.method}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </Animated.View>
            )}

          </View>
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>

      {/* ── DARK GREEN PILL BOTTOM NAV (matches PortfolioDashboard & OwnerBookings) ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarCheck size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} strokeWidth={2} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
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
    paddingHorizontal: 20,
  },

  /* ── FIXED FADING HEADER (matches PortfolioDashboard) ── */
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: COLORS.background,
  },
  headerSafeArea: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtnHeader: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  /* ── HERO CARD (matches PortfolioDashboard floating style) ── */
  heroCardWrapper: {
    marginBottom: 24,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 12,
  },
  heroBackground: {
    height: 220,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 30, 20, 0.72)',
    borderRadius: 32,
  },
  heroContent: {
    padding: 24,
    justifyContent: 'space-between',
    flex: 1,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45,212,191,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  weatherText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  heroMainContent: {
    marginTop: 'auto',
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  heroGuestName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginBottom: 10,
  },
  heroSubDecimals: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroSubText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
  },

  /* ── MAIN SHEET ── */
  mainSheet: {
    flex: 1,
  },

  /* ── SEARCH BAR ── */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textMain,
    height: '100%',
  },

  /* ── FILTER PILLS (matches PortfolioDashboard tabs) ── */
  quickActionsWrapper: {
    marginBottom: 24,
  },
  quickActionsScroll: {
    gap: 10,
    paddingVertical: 2,
  },
  actionPillDark: {
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionPillDarkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionPillLight: {
    backgroundColor: COLORS.surface,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionPillLightText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  /* ── BENTO CARDS ── */
  bentoGrid: {
    marginBottom: 24,
  },
  bentoCard: {
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  revenueCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.05,
  },
  bentoIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bentoTextWrap: {
    marginTop: 'auto',
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  revenueValueDark: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.successText,
    marginLeft: 4,
  },
  bentoSubDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  /* ── LEDGER LIST ── */
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  txIconWrapper: {
    width: 48,
    height: 48,
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
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  txMethod: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },

  /* ── EXPENSES FORM ── */
  sectionHeaderRowForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitleForm: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  formPropertyRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  formPropertyPill: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formPropertyPillActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  formPropertyText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  formPropertyTextActive: {
    color: COLORS.primary,
  },
  formSelectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formSelectText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  formInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pesoIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pesoIconText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  formAmountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    height: '100%',
  },
  formInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
    height: '100%',
  },
  saveExpenseBtn: {
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginTop: 10,
  },
  saveExpenseBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 160,
  },

  /* ── DARK GREEN PILL BOTTOM NAV (matches PortfolioDashboard & OwnerBookings) ── */
  bottomNavContainer: {
    position: 'absolute',
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
    flex: 1,
  },
  navText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 3,
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});