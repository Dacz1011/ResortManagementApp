import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Bell,
  CalendarDays,
  Camera,
  ChevronDown,
  ChevronLeft,
  Droplet,
  Home,
  Megaphone,
  Plus,
  PlusCircle,
  Settings,
  ShoppingBag,
  Users,
  Wallet,
  Wind,
  Wrench,
  Zap
} from 'lucide-react-native';
import { useState } from 'react';
import {
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

const { width } = Dimensions.get('window');

// Ryu-specific Palette Adapted to Reine's Design System
const COLORS = {
  background: '#F8FAFC',
  primary: '#23324B',
  primaryLight: '#E0E7FF',
  primaryDark: '#1A2537',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  info: '#3B82F6',
  infoBg: '#DBEAFE',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
};

// Mock Data for Transactions List
const TRANSACTIONS = [
  { id: '1', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Jonathan Rivera', amount: '+ ₱4,500', date: 'Feb 3, 2026', icon: PlusCircle },
  { id: '2', type: 'expense', title: 'Electricity Utility', subtitle: 'Monthly Bill - Meralco', amount: '- ₱8,240', date: 'Feb 2, 2026', icon: Zap },
  { id: '3', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Sarah Jenkins', amount: '+ ₱3,200', date: 'Feb 1, 2026', icon: PlusCircle },
  { id: '4', type: 'expense', title: 'Water Utility', subtitle: 'Monthly Bill - Primewater', amount: '- ₱1,150', date: 'Jan 30, 2026', icon: Droplet },
  { id: '5', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Michael Chen', amount: '+ ₱2,800', date: 'Jan 28, 2026', icon: PlusCircle },
];

export default function RyuFinance({ navigation }) {
  const activeNav = 'Finance';
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const insets = useSafeAreaInsets(); // iOS compatibility fix

  // Form States
  const [utilityAmount, setUtilityAmount] = useState('');
  const [pettyCashCategory, setPettyCashCategory] = useState('Daily Supplies');
  const [itemDesc, setItemDesc] = useState('');
  const [pettyAmount, setPettyAmount] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  // --- RENDER: TRANSACTION LIST (LUXURY OVERLAP) ---
  const renderTransactionList = () => (
    <View style={styles.viewContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>

        {/* FULL BLEED HERO IMAGE */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop' }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay} />

          {/* iOS Fix: Replaced SafeAreaView with dynamic View */}
          <View style={[styles.heroSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
            {/* Top Nav Row */}
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Financial Overview</Text>
                <Text style={styles.adminName}>Transactions</Text>
              </View>

              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                <Bell size={20} color="#FFFFFF" strokeWidth={2.5} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            {/* Glassmorphism Balance Card */}
            <View style={styles.glassCard}>
              <View style={styles.glassHeader}>
                <View style={styles.statusPill}>
                  <Wallet size={14} color={COLORS.textMain} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.statusText}>NET REVENUE (THIS MONTH)</Text>
                </View>
                <View style={styles.trendBadge}>
                  <ArrowUpRight size={14} color={COLORS.success} strokeWidth={3} style={{ marginRight: 2 }} />
                  <Text style={styles.trendText}>+12.5%</Text>
                </View>
              </View>
              <Text style={styles.heroMainStat}>₱42,500<Text style={styles.heroSubDecimals}>.00</Text></Text>
            </View>
          </View>
        </ImageBackground>

        {/* OVERLAPPING MAIN SHEET */}
        <View style={styles.mainSheet}>

          {/* Income vs Expense Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: COLORS.successBg }]}>
                <ArrowDownRight size={18} color={COLORS.success} strokeWidth={3} />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>₱54,200</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: COLORS.dangerBg }]}>
                <ArrowUpRight size={18} color={COLORS.danger} strokeWidth={3} />
              </View>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statValue}>₱11,700</Text>
              </View>
            </View>
          </View>

          {/* List Header */}
          <View style={styles.listHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          <View style={styles.transactionsList}>
            {TRANSACTIONS.map((tx) => {
              const Icon = tx.icon;
              const isIncome = tx.type === 'income';

              return (
                <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.txCard}>
                  <View style={styles.txLeft}>
                    <View style={[
                      styles.txIconWrapper,
                      isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.primaryLight }
                    ]}>
                      <Icon size={20} color={isIncome ? COLORS.success : COLORS.primary} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDesc}>{tx.subtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.txRight}>
                    <Text style={[
                      styles.txAmount,
                      isIncome ? { color: COLORS.success } : { color: COLORS.textMain }
                    ]}>
                      {tx.amount}
                    </Text>
                    <Text style={styles.txDate}>{tx.date}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => setShowExpenseForm(true)}
      >
        <Plus size={24} color="#FFFFFF" strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );

  // --- RENDER: EXPENSE LOGGER FORM (LUXURY OVERLAP) ---
  const renderExpenseLogger = () => (
    <View style={styles.viewContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>

          {/* FULL BLEED HERO IMAGE (Form Version) */}
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroHeaderForm}
          >
            <View style={styles.heroOverlay} />
            {/* iOS Fix: Replaced SafeAreaView with dynamic View */}
            <View style={[styles.heroSafeAreaForm, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => setShowExpenseForm(false)} style={styles.backBtnWrapper}>
                  <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text style={styles.greetingText}>Record Entry</Text>
                  <Text style={styles.adminName}>Expense Logger</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* OVERLAPPING MAIN SHEET */}
          <View style={styles.mainSheet}>

            {/* SECTION 1: UTILITY BILLS */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Zap size={20} color={COLORS.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Utility Bills</Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formLabelDark}>UTILITY TYPE</Text>
              <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.8}>
                <Text style={styles.dropdownText}>Electric Bill</Text>
                <ChevronDown size={20} color={COLORS.textMuted} />
              </TouchableOpacity>

              <Text style={styles.formLabelDark}>AMOUNT DUE</Text>
              <View style={styles.amountInputBox}>
                <View style={styles.pesoBox}><Text style={styles.pesoText}>₱</Text></View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="decimal-pad"
                  value={utilityAmount}
                  onChangeText={setUtilityAmount}
                />
              </View>

              <Text style={styles.formLabelDark}>STATEMENT PHOTO</Text>
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
                <Camera size={28} color={COLORS.textMuted} strokeWidth={2} style={{ marginBottom: 8 }} />
                <Text style={styles.uploadText}>Tap to Upload Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtnSolid} activeOpacity={0.8}>
                <Text style={styles.submitBtnSolidText}>Log Utility Expense</Text>
              </TouchableOpacity>
            </View>

            {/* SECTION 2: PETTY CASH */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Banknote size={20} color={COLORS.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Petty Cash</Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[styles.toggleBtn, pettyCashCategory === 'Daily Supplies' && styles.toggleBtnActive]}
                  onPress={() => setPettyCashCategory('Daily Supplies')}
                  activeOpacity={0.8}
                >
                  <ShoppingBag size={20} color={pettyCashCategory === 'Daily Supplies' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                  <Text style={[styles.toggleText, pettyCashCategory === 'Daily Supplies' && styles.toggleTextActive]}>Supplies</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleBtn, pettyCashCategory === 'Cleaning' && styles.toggleBtnActive]}
                  onPress={() => setPettyCashCategory('Cleaning')}
                  activeOpacity={0.8}
                >
                  <Wind size={20} color={pettyCashCategory === 'Cleaning' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                  <Text style={[styles.toggleText, pettyCashCategory === 'Cleaning' && styles.toggleTextActive]}>Cleaning</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.formLabelDark}>ITEM DESCRIPTION</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 5kg Detergent, Coffee"
                placeholderTextColor={COLORS.textMuted}
                value={itemDesc}
                onChangeText={setItemDesc}
              />

              <Text style={styles.formLabelDark}>TOTAL SPENT</Text>
              <View style={styles.amountInputBox}>
                <View style={styles.pesoBox}><Text style={styles.pesoText}>₱</Text></View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="decimal-pad"
                  value={pettyAmount}
                  onChangeText={setPettyAmount}
                />
              </View>

              <TouchableOpacity style={styles.submitBtnOutline} activeOpacity={0.8}>
                <Text style={styles.submitBtnOutlineText}>Log Petty Cash</Text>
              </TouchableOpacity>
            </View>

            {/* SECTION 3: MAINTENANCE LOG (High Contrast Dark Slate specifically for Ryu) */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Wrench size={20} color={COLORS.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Maintenance Log</Text>
              </View>
            </View>

            <View style={styles.maintenanceCard}>
              <View style={styles.maintenanceAlertBox}>
                <View style={styles.maintenanceAlertIcon}>
                  <Megaphone size={16} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.maintenanceAlertText}>Report issues directly to owner</Text>
              </View>

              <Text style={styles.maintenanceFormLabel}>ISSUE TYPE</Text>
              <TouchableOpacity style={styles.maintenanceDropdown} activeOpacity={0.8}>
                <Text style={styles.maintenanceDropdownText}>Plumbing</Text>
                <ChevronDown size={20} color="#FFFFFF" opacity={0.7} />
              </TouchableOpacity>

              <Text style={styles.maintenanceFormLabel}>DESCRIPTION</Text>
              <TextInput
                style={styles.maintenanceTextArea}
                placeholder="Describe the problem..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                multiline
                textAlignVertical="top"
                value={issueDesc}
                onChangeText={setIssueDesc}
              />

              <View style={styles.maintenanceActionRow}>
                <TouchableOpacity style={styles.maintenanceSubmitBtn} activeOpacity={0.8}>
                  <Text style={styles.maintenanceSubmitBtnText}>Report Issue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.maintenanceCameraBtn} activeOpacity={0.8}>
                  <Camera size={24} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}

      {/* --- SLEEK BLACK PILL BOTTOM NAV (Reine style, Ryu colors) --- */}
      {/* iOS Fix: Guarantee pill sits perfectly above iOS home indicator bar */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowExpenseForm(false); }} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Admin</Text>
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
  viewContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 380, // High height for list view
    justifyContent: 'flex-start',
  },
  heroHeaderForm: {
    width: '100%',
    height: 280, // Shorter height for form view
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 37, 55, 0.65)', // Dark navy overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  heroSafeAreaForm: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop handled dynamically
  },

  /* Top Nav in Hero */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 16 : 8,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adminName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  backBtnWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  /* Glassmorphism Status Card */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Very translucent
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.success,
  },
  heroMainStat: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
  },
  heroSubDecimals: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
  },

  /* --- OVERLAPPING MAIN SHEET --- */
  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36, // Overlaps the image header
    paddingHorizontal: 24,
    paddingTop: 32,
    flex: 1,
  },

  /* --- INCOME VS EXPENSE STATS --- */
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },

  /* --- LIST HEADER --- */
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- TRANSACTIONS LIST --- */
  transactionsList: {
    gap: 16,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  txIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  txDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  txDate: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* --- FAB --- */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 20,
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

  /* --- EXPENSE LOGGER FORM VIEWS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionIconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleForm: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginLeft: 10,
  },
  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  formLabelDark: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 8,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pesoBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pesoText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
    height: '100%',
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: COLORS.background,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  submitBtnSolid: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  submitBtnSolidText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* Petty Cash Toggle */
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    height: 90,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  toggleBtnActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.primaryLight,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 8,
  },
  toggleTextActive: {
    color: COLORS.primary,
  },
  submitBtnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnOutlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },

  /* Maintenance Log (High Contrast Dark Slate specific to Ryu Theme) */
  maintenanceCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  maintenanceAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    paddingBottom: 16,
    marginBottom: 20,
  },
  maintenanceAlertIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  maintenanceAlertText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  maintenanceFormLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  maintenanceDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceDropdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  maintenanceTextArea: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    height: 120,
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  maintenanceSubmitBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white contrast
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintenanceSubmitBtnText: {
    color: COLORS.primaryDark,
    fontSize: 16,
    fontWeight: '800',
  },
  maintenanceCameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomSpacer: {
    height: 160, // Clear space for the floating bottom nav
  },

  /* --- REINE-STYLE BOTTOM NAV (RYU COLORS) --- */
  bottomNavContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark, // Uses Ryu's deep navy color
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 4,
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});