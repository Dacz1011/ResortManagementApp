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
  TrendingUp,
  Settings,
  Plus,
  ListFilter,
  ChevronDown,
  ArrowLeftSquare
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Exact Colors matching the premium mockup design
const COLORS = {
  background: '#FFFFFF',
  primary: '#1A3626',       // Deep luxury forest green
  primaryLight: '#E8F0EA',  // Soft muted green
  primaryText: '#245236',   // Slightly lighter green
  accent: '#A3E635',
  cardBg: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#94A3B8',
  borderLight: '#F1F5F9',
  borderCard: '#E2E8F0',
  successText: '#15803D',   // Dark green for income
  expenseText: '#EF4444',   // Red for expenses
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
          <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Transaction Ledger</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Bold' }]}>HISTORY & RECORDS</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <Download size={20} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.primaryText} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontFamily: 'Manrope-Medium' }]}
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
                <Text style={[styles.filterText, { fontFamily: 'Manrope-Bold' }, activeFilter === filter && styles.filterTextActive]}>
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
                <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>{section.title}</Text>
                <View style={styles.sectionLine} />
              </View>

              {section.data.map((item) => {
                const Icon = item.icon;
                const isIncome = item.type === 'income';
                return (
                  <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                    <View style={styles.txIconWrapper}>
                      <Icon size={22} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <View style={styles.txDetails}>
                      <Text style={[styles.txTitle, { fontFamily: 'Manrope-Bold' }]}>{item.title}</Text>
                      <Text style={[styles.txSubtitle, { fontFamily: 'Manrope-ExtraBold' }]}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.txFinancials}>
                      <Text style={[styles.txAmount, { fontFamily: 'Manrope-Bold' }, { color: isIncome ? COLORS.successText : COLORS.expenseText }]}>
                        {item.amount}
                      </Text>
                      <Text style={[styles.txMethod, { fontFamily: 'Manrope-Bold' }]}>{item.method}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          ))}
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>
    </>
  );

  // --- RENDER: INCOME LEDGER ---
  const renderIncomeLedger = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Income Ledger</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Bold' }]}>REVENUE ONLY</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <ListFilter size={20} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.primaryLight} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontFamily: 'Manrope-Medium' }]}
            placeholder="Search income entries..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryCardLabel, { fontFamily: 'Manrope-ExtraBold' }]}>TOTAL INCOME (OCT 2023)</Text>
          <View style={styles.summaryCardValueRow}>
            <Text style={[styles.summaryCardCurrency, { fontFamily: 'Manrope-Bold' }]}>₱</Text>
            <Text style={[styles.summaryCardValue, { fontFamily: 'Manrope-Bold' }]}>30,350.00</Text>
            <Text style={[styles.summaryCardGrowth, { fontFamily: 'Manrope-Bold' }]}>+12% vs last month</Text>
          </View>

          <View style={styles.summaryCardSubRow}>
            <View style={styles.summaryCardSubBox}>
              <Text style={[styles.summaryCardSubLabel, { fontFamily: 'Manrope-ExtraBold' }]}>BOOKINGS</Text>
              <Text style={[styles.summaryCardSubValue, { fontFamily: 'Manrope-Bold' }]}>₱4,500.00</Text>
            </View>
            <View style={styles.summaryCardSubBox}>
              <Text style={[styles.summaryCardSubLabel, { fontFamily: 'Manrope-ExtraBold' }]}>RENTALS</Text>
              <Text style={[styles.summaryCardSubValue, { fontFamily: 'Manrope-Bold' }]}>₱25,000.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.ledgerContainer}>
          {INCOME_DATA.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>{section.title}</Text>
                <View style={styles.sectionLine} />
              </View>

              {section.data.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                  <View style={[styles.txIconWrapper, { backgroundColor: '#F0FDF4' }]}>
                    <Plus size={22} color={COLORS.successText} strokeWidth={2.5} />
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={[styles.txTitle, { fontFamily: 'Manrope-Bold' }]}>{item.title}</Text>
                    <Text style={[styles.txSubtitle, { fontFamily: 'Manrope-ExtraBold' }]}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.txFinancials}>
                    <Text style={[styles.txAmount, { fontFamily: 'Manrope-Bold', color: COLORS.successText }]}>+₱{item.amount}</Text>
                    <Text style={[styles.txMethod, { fontFamily: 'Manrope-Bold' }]}>{item.method}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>
    </>
  );

  // --- RENDER: ADD MANUAL EXPENSE ---
  const renderExpensesForm = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Add Manual Expense</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>

        {/* Select Property */}
        <Text style={[styles.formLabel, { fontFamily: 'Manrope-ExtraBold' }]}>SELECT PROPERTY</Text>
        <View style={styles.formPropertyRow}>
          {["Reine's", "Ryu's", "Casa M.O."].map((prop) => (
            <TouchableOpacity
              key={prop}
              activeOpacity={0.8}
              onPress={() => setExpenseProperty(prop)}
              style={[styles.formPropertyPill, expenseProperty === prop && styles.formPropertyPillActive]}
            >
              <Text style={[styles.formPropertyText, { fontFamily: 'Manrope-Bold' }, expenseProperty === prop && styles.formPropertyTextActive]}>
                {prop}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expense Category */}
        <Text style={[styles.formLabel, { fontFamily: 'Manrope-ExtraBold' }]}>EXPENSE CATEGORY</Text>
        <TouchableOpacity style={styles.formSelectBox} activeOpacity={0.8}>
          <Text style={[styles.formSelectText, { fontFamily: 'Manrope-SemiBold' }]}>Select category</Text>
          <ChevronDown size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Amount */}
        <Text style={[styles.formLabel, { fontFamily: 'Manrope-ExtraBold' }]}>AMOUNT</Text>
        <View style={styles.formInputBox}>
          <View style={styles.pesoIconWrapper}>
            <Text style={[styles.pesoIconText, { fontFamily: 'Manrope-ExtraBold' }]}>₱</Text>
          </View>
          <TextInput
            style={[styles.formAmountInput, { fontFamily: 'Manrope-Bold' }]}
            placeholder="0.00"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="decimal-pad"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
        </View>

        {/* Date */}
        <Text style={[styles.formLabel, { fontFamily: 'Manrope-ExtraBold' }]}>DATE</Text>
        <View style={styles.formInputBox}>
          <TextInput
            style={[styles.formInput, { fontFamily: 'Manrope-SemiBold' }]}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={COLORS.textMuted}
            value={expenseDate}
            onChangeText={setExpenseDate}
          />
        </View>

        {/* Save Button */}
        <View style={styles.formFooter}>
          <TouchableOpacity activeOpacity={0.8} style={styles.saveExpenseBtn} onPress={() => setActiveFilter('All')}>
            <Text style={[styles.saveExpenseBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>Save Expense</Text>
          </TouchableOpacity>
          <View style={styles.formIndicator} />
        </View>

        <View style={{ height: 130 }} />
      </ScrollView>
    </>
  );

  // --- RENDER: REFUND HISTORY ---
  const renderRefundsLedger = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtnBack} onPress={() => setActiveFilter('All')} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Refund History</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Bold' }]}>REFUND LEDGER ONLY</Text>
        </View>
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
          <ListFilter size={20} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryCardLabel, { fontFamily: 'Manrope-ExtraBold' }]}>TOTAL REFUNDED</Text>
          <View style={styles.summaryCardValueRow}>
            <Text style={[styles.summaryCardCurrency, { fontFamily: 'Manrope-Bold' }]}>₱</Text>
            <Text style={[styles.summaryCardValue, { fontFamily: 'Manrope-Bold' }]}>42,350.00</Text>
          </View>
          <Text style={[styles.summaryCardDate, { fontFamily: 'Manrope-Medium' }]}>October 01 - October 24, 2023</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.primaryText} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontFamily: 'Manrope-Medium' }]}
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
                <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>{section.title}</Text>
                <View style={styles.sectionLine} />
              </View>

              {section.data.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.transactionCard}>
                  <View style={[styles.txIconWrapper, { backgroundColor: '#F8FAFC' }]}>
                    <ArrowLeftSquare size={22} color={COLORS.successText} strokeWidth={2} />
                  </View>
                  <View style={styles.txDetails}>
                    <Text style={[styles.txTitle, { fontFamily: 'Manrope-Bold' }]}>{item.title}</Text>
                    <Text style={[styles.txSubtitle, { fontFamily: 'Manrope-ExtraBold' }]}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.txFinancials}>
                    <Text style={[styles.txAmount, { fontFamily: 'Manrope-Bold', color: COLORS.successText }]}>{item.amount}</Text>
                    <Text style={[styles.txMethod, { fontFamily: 'Manrope-Bold' }]}>{item.method}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* DYNAMIC CONTENT SWITCHER */}
      {activeFilter === 'All' && renderAllLedger()}
      {activeFilter === 'Income' && renderIncomeLedger()}
      {activeFilter === 'Expenses' && renderExpensesForm()}
      {activeFilter === 'Refunds' && renderRefundsLedger()}

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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 24,
  },
  iconBtnBack: {
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: 1.5,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- SEARCH BAR --- */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
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
    color: COLORS.primaryText,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderLight,
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
    borderColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  txIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
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
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primaryText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
    fontWeight: '600',
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
    color: 'rgba(255,255,255,0.7)',
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
    fontWeight: '600',
    color: COLORS.accent,
    marginLeft: 12,
  },
  summaryCardDate: {
    fontSize: 13,
    fontWeight: '500',
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
    borderRadius: 16,
    padding: 16,
  },
  summaryCardSubLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
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
    color: COLORS.primaryText,
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formPropertyPillActive: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 64,
  },
  formSelectText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  formInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 64,
  },
  pesoIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 6,
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
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
    height: '100%',
  },
  formFooter: {
    marginTop: 40,
    marginBottom: 40,
    borderTopWidth: 1,
    borderColor: COLORS.borderLight,
    paddingTop: 32,
  },
  saveExpenseBtn: {
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  saveExpenseBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  formIndicator: {
    width: 140,
    height: 5,
    backgroundColor: COLORS.borderCard,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 24,
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
    backgroundColor: COLORS.cardBg,
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
