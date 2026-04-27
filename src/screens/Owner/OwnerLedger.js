import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Download,
  Search,
  Wallet,
  Settings as SettingsIcon,
  ConciergeBell,
  Lightbulb,
  CalendarCheck,
  Wand2,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  Plus,
  ListFilter,
  ChevronDown,
  ArrowLeftSquare
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Modernized)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep luxury forest green
  primaryLight: '#E8F0EA',  // Soft muted green
  primaryDark: '#0D1E14',
  primaryText: '#245236',   // Slightly lighter green
  accent: '#A3E635',
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  successText: '#16A34A',   // Dark green for income
  successBg: '#DCFCE7',
  expenseText: '#EF4444',   // Red for expenses
  expenseBg: '#FEE2E2',
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
      { id: 'i1', title: 'Booking Deposit', subtitle: "REINE'S BEACH HOUSE • 10:42 AM", amount: '₱4,500.00', method: 'E-Wallet' },
      { id: 'i2', title: 'Breakfast Service', subtitle: "RYU'S TRANSIENT • 08:30 AM", amount: '₱850.00', method: 'Card' }
    ]
  },
  {
    title: 'YESTERDAY, OCT 23',
    data: [
      { id: 'i3', title: 'Event Venue Rental', subtitle: "CASA M.O. • 02:15 PM", amount: '₱25,000.00', method: 'Bank Transfer' }
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
  // Navigation & States
  const [activeFilter, setActiveFilter] = useState('All');
  const activeNav = 'Ledger';
  const [searchQuery, setSearchQuery] = useState('');

  // Manual Expense Form State
  const [expenseProperty, setExpenseProperty] = useState("Reine's");
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('10/27/2023');

  // --- RENDER: ALL TRANSACTIONS (DEFAULT LEDGER) ---
  const renderAllLedger = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>HISTORY & RECORDS</Text>
          <Text style={styles.headerTitle}>Transaction Ledger</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <Download size={20} color={COLORS.textMain} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
            {FILTERS.map((filter, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.ledgerContainer}>
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
                      <Icon size={20} color={isIncome ? COLORS.successText : COLORS.expenseText} strokeWidth={2.5} />
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
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );

  // --- RENDER: INCOME LEDGER ---
  const renderIncomeLedger = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>REVENUE ONLY</Text>
          <Text style={styles.headerTitle}>Income Ledger</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <ListFilter size={20} color={COLORS.textMain} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search income entries..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardLabel}>TOTAL INCOME (OCT 2023)</Text>
          <View style={styles.summaryCardValueRow}>
            <Text style={styles.summaryCardCurrency}>₱</Text>
            <Text style={styles.summaryCardValue}>30,350.00</Text>
            <Text style={styles.summaryCardGrowth}>+12% vs last month</Text>
          </View>

          <View style={styles.summaryCardSubRow}>
            <View style={styles.summaryCardSubBox}>
              <Text style={styles.summaryCardSubLabel}>BOOKINGS</Text>
              <Text style={styles.summaryCardSubValue}>₱4,500.00</Text>
            </View>
            <View style={styles.summaryCardSubBox}>
              <Text style={styles.summaryCardSubLabel}>RENTALS</Text>
              <Text style={styles.summaryCardSubValue}>₱25,000.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.ledgerContainer}>
          {INCOME_DATA.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionLine} />
              </View>

              {section.data.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                  <View style={[styles.txIconWrapper, { backgroundColor: COLORS.successBg }]}>
                    <Plus size={22} color={COLORS.successText} strokeWidth={2.5} />
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={styles.txTitle}>{item.title}</Text>
                    <Text style={styles.txSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.txFinancials}>
                    <Text style={[styles.txAmount, { color: COLORS.successText }]}>+₱{item.amount}</Text>
                    <Text style={styles.txMethod}>{item.method}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );

  // --- RENDER: ADD MANUAL EXPENSE ---
  const renderExpensesForm = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>NEW ENTRY</Text>
          <Text style={styles.headerTitle}>Add Expense</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>

        {/* Select Property */}
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

        {/* Expense Category */}
        <Text style={styles.formLabel}>EXPENSE CATEGORY</Text>
        <TouchableOpacity style={styles.formSelectBox} activeOpacity={0.8}>
          <Text style={styles.formSelectText}>Select category</Text>
          <ChevronDown size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Amount */}
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

        {/* Date */}
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

        {/* Save Button */}
        <View style={styles.formFooter}>
          <TouchableOpacity activeOpacity={0.8} style={styles.saveExpenseBtn} onPress={() => setActiveFilter('All')}>
            <Text style={styles.saveExpenseBtnText}>Save Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );

  // --- RENDER: REFUND HISTORY ---
  const renderRefundsLedger = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>REFUND LEDGER ONLY</Text>
          <Text style={styles.headerTitle}>Refund History</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <ListFilter size={20} color={COLORS.textMain} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardLabel}>TOTAL REFUNDED</Text>
          <View style={styles.summaryCardValueRow}>
            <Text style={styles.summaryCardCurrency}>₱</Text>
            <Text style={styles.summaryCardValue}>42,350.00</Text>
          </View>
          <Text style={styles.summaryCardDate}>October 01 - October 24, 2023</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMuted} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search refund records..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.ledgerContainer}>
          {REFUND_DATA.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionLine} />
              </View>

              {section.data.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                  <View style={[styles.txIconWrapper, { backgroundColor: COLORS.successBg }]}>
                    <ArrowLeftSquare size={22} color={COLORS.successText} strokeWidth={2} />
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
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* DYNAMIC CONTENT SWITCHER */}
        {activeFilter === 'All' && renderAllLedger()}
        {activeFilter === 'Income' && renderIncomeLedger()}
        {activeFilter === 'Expenses' && renderExpensesForm()}
        {activeFilter === 'Refunds' && renderRefundsLedger()}
      </SafeAreaView>

      {/* --- SLEEK FLOATING ICON-ONLY BOTTOM NAV --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]} activeOpacity={0.7}>
            <LayoutGrid size={24} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]} activeOpacity={0.7}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]} activeOpacity={0.7}>
            <BarChart2 size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]} activeOpacity={0.7}>
            <BookOpen size={24} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]} activeOpacity={0.7}>
            <PieChart size={24} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]} activeOpacity={0.7}>
            <Settings size={24} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 20, // Increased to avoid status bar overlap
    paddingBottom: 24,
  },
  iconBtnBack: {
    marginRight: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  exportButton: {
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  /* --- SEARCH BAR --- */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
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

  /* --- FILTER CHIPS --- */
  filtersWrapper: {
    marginBottom: 32,
    marginHorizontal: -24,
  },
  filtersScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  /* --- LEDGER LIST --- */
  ledgerContainer: {
    flex: 1,
  },
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
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
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
    fontSize: 11,
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

  /* --- SUMMARY CARDS (INCOME / REFUNDS) --- */
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 28,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  summaryCardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  summaryCardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  summaryCardCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
  summaryCardValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  summaryCardGrowth: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accent,
    marginLeft: 12,
  },
  summaryCardDate: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  summaryCardSubRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  summaryCardSubBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
  },
  summaryCardSubLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  summaryCardSubValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* --- EXPENSES FORM (ADD MANUAL EXPENSE) --- */
  formLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 24,
  },
  formPropertyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formPropertyPill: {
    flex: 1,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
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
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  formSelectText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  formInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
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
    fontSize: 24,
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
  formFooter: {
    marginTop: 40,
    paddingTop: 16,
  },
  saveExpenseBtn: {
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  saveExpenseBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 140, // Keeps it clear of the floating nav
  },

  /* --- SLEEK FLOATING ICON-ONLY BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center',
    width: '90%', // Modern floating width
    left: '5%',
    right: '5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 36, // Fully rounded pill shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 24, // Perfect circle for icon
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
});