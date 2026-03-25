import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Plus,
  Zap,
  Droplet,
  ChevronLeft,
  ChevronDown,
  Camera,
  ShoppingBag,
  Wind,
  Wrench,
  Megaphone,
  Home,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  Banknote,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react-native';

// Ryu-specific Palette Adapted to Reine's Design System
const COLORS = {
  background: '#F8FAFC',    // Cool off-white
  primary: '#23324B',       // Ryu Deep Navy
  primaryLight: '#E0E7FF',  // Indigo/Blue tint for soft backgrounds
  primaryDark: '#1A2537',   // Deeper navy for gradients/accents
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',

  // Accents
  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  infoBg: '#DBEAFE',
  infoIcon: '#1D4ED8',
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

  // Form States
  const [utilityAmount, setUtilityAmount] = useState('');
  const [pettyCashCategory, setPettyCashCategory] = useState('Daily Supplies');
  const [itemDesc, setItemDesc] = useState('');
  const [pettyAmount, setPettyAmount] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  // --- RENDER: TRANSACTION LIST ---
  const renderTransactionList = () => (
    <View style={styles.viewContainer}>

      {/* --- MODERN HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Financial Overview</Text>
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- HERO BALANCE CARD (Reine Adaptive Design) --- */}
        <View style={styles.heroCard}>
          {/* Decorative Background Elements */}
          <View style={styles.heroCircleTop} />
          <View style={styles.heroCircleBottom} />

          <View style={styles.heroHeader}>
            <Text style={styles.heroSubtitle}>NET REVENUE (THIS MONTH)</Text>
            <View style={styles.trendPill}>
              <ArrowUpRight size={14} color={COLORS.successText} strokeWidth={3} />
              <Text style={styles.trendText}>+12.5%</Text>
            </View>
          </View>

          <Text style={styles.heroBalance}>₱42,500.00</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <View style={styles.heroStatIconWrapper}>
                <ArrowDownRight size={16} color={COLORS.successText} strokeWidth={3} />
              </View>
              <View>
                <Text style={styles.heroStatLabel}>Income</Text>
                <Text style={styles.heroStatValue}>₱54,200</Text>
              </View>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <View style={[styles.heroStatIconWrapper, { backgroundColor: COLORS.dangerBg }]}>
                <ArrowUpRight size={16} color={COLORS.dangerText} strokeWidth={3} />
              </View>
              <View>
                <Text style={styles.heroStatLabel}>Expenses</Text>
                <Text style={styles.heroStatValue}>₱11,700</Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- LIST HEADER --- */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRANSACTIONS LIST --- */}
        <View style={styles.transactionsList}>
          {TRANSACTIONS.map((tx) => {
            const Icon = tx.icon;
            const isIncome = tx.type === 'income';

            return (
              <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.txCard}>
                <View style={styles.txLeft}>
                  <View style={[styles.txIconWrapper, isIncome ? { backgroundColor: COLORS.successBg } : { backgroundColor: COLORS.primaryLight }]}>
                    <Icon size={20} color={isIncome ? COLORS.successText : COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txDesc}>{tx.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.txRight}>
                  <Text style={[styles.txAmount, isIncome ? { color: COLORS.successText } : { color: COLORS.textMain }]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Floating Action Button (Squircle shape) */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => setShowExpenseForm(true)}
      >
        <View style={styles.fabInner}>
          <Plus size={28} color="#FFFFFF" strokeWidth={3} />
        </View>
      </TouchableOpacity>
    </View>
  );

  // --- RENDER: EXPENSE LOGGER FORM ---
  const renderExpenseLogger = () => (
    <View style={styles.viewContainer}>
      {/* Modern Header for Form */}
      <View style={styles.headerForm}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => setShowExpenseForm(false)}>
          <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
        </TouchableOpacity>
        <View>
          <Text style={styles.greetingText}>Record Entry</Text>
          <Text style={styles.headerTitle}>Expense Logger</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentForm}>

          {/* SECTION 1: UTILITY BILLS */}
          <View style={styles.sectionTitleRow}>
            <Zap size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitleForm}>Utility Bills</Text>
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
          <View style={styles.sectionTitleRow}>
            <Banknote size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitleForm}>Petty Cash</Text>
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

          {/* SECTION 3: MAINTENANCE LOG (Navy Themed) */}
          <View style={styles.sectionTitleRow}>
            <Wrench size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitleForm}>Maintenance Log</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}
      </SafeAreaView>

      {/* --- FLOATING BOTTOM NAVIGATION (Pill Shape) --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuHome')}>
            <Home size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuBookings')}>
            <CalendarDays size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuGuestMgmt')}>
            <Users size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]} onPress={() => { setShowExpenseForm(false); }}>
            <Wallet size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Finance</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuAdmin')}>
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
  viewContainer: {
    flex: 1,
  },
  keyboardView: {
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
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
  scrollContentForm: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- HERO BALANCE CARD (REINE DESIGN) --- */
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -80,
    right: -40,
  },
  heroCircleBottom: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -60,
    left: -40,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.successText,
  },
  heroBalance: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.5,
    marginBottom: 32,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 16,
  },
  heroStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  heroStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  heroStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },

  /* --- TRANSACTIONS LIST --- */
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* --- EXPENSE LOGGER FORM VIEW --- */
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
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
  },
  formLabelDark: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
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
    backgroundColor: COLORS.inputBg,
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
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    fontSize: 15,
    fontWeight: '500',
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
    backgroundColor: COLORS.inputBg,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  submitBtnSolid: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    height: 60,
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
    backgroundColor: COLORS.inputBg,
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnOutlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },

  /* Maintenance Log (Solid Deep Navy Card) */
  maintenanceCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: COLORS.primaryDark,
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
    backgroundColor: '#FFFFFF',
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
    height: 140,
  },

  /* --- FLOATING BOTTOM NAV (PILL SHAPE) --- */
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