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
  Landmark,
  Bell,
  Plus,
  Zap,
  Droplet,
  ChevronLeft,
  UserCircle,
  Trees,
  ChevronDown,
  Camera,
  ShoppingBag,
  Wind,
  Wrench,
  Megaphone,
  Home,
  Calendar,
  Users,
  Wallet,
  Folder,
  Settings,
  Banknote
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#FAFAFA',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#3A4D6B',
  accent: '#3B82F6',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  successText: '#1E3A8A',   // Navy blue for income amounts in mockup
  expenseText: '#DC2626',   // Red for expenses
  darkCardBg: '#1E293B',    // Dark background for maintenance log
};

const TRANSACTIONS = [
  { id: '1', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Jonathan Rivera', amount: '+ ₱4,500', date: 'Feb 3, 2026', icon: Plus, iconColor: '#1E3A8A', bg: '#F1F5F9' },
  { id: '2', type: 'expense', title: 'Electricity Utility', subtitle: 'Monthly Bill - Meralco', amount: '- ₱8,240', date: 'Feb 2, 2026', icon: Zap, iconColor: '#DC2626', bg: '#FEF2F2' },
  { id: '3', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Sarah Jenkins', amount: '+ ₱3,200', date: 'Feb 1, 2026', icon: Plus, iconColor: '#1E3A8A', bg: '#F1F5F9' },
  { id: '4', type: 'expense', title: 'Water Utility', subtitle: 'Monthly Bill - Primewater', amount: '- ₱1,150', date: 'Jan 30, 2026', icon: Droplet, iconColor: '#DC2626', bg: '#FEF2F2' },
  { id: '5', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Michael Chen', amount: '+ ₱2,800', date: 'Jan 28, 2026', icon: Plus, iconColor: '#1E3A8A', bg: '#F1F5F9' },
];

export default function RyuFinance({ navigation }) {
  const [activeNav, setActiveNav] = useState('Finance');
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Form States
  const [pettyCashCategory, setPettyCashCategory] = useState('Daily Supplies');
  const [utilityAmount, setUtilityAmount] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [pettyAmount, setPettyAmount] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  // --- RENDER: TRANSACTION LIST ---
  const renderTransactionList = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconBg}>
            <Landmark size={24} color={COLORS.primary} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Transaction Management</Text>
            <Text style={styles.headerSubtitle}>RYU'S TRANSIENT HOUSE</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={styles.listHeaderRow}>
          <View>
            <Text style={styles.listTitle}>Recent Transactions</Text>
            <Text style={styles.listSubtitle}>Activity for this property</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {TRANSACTIONS.map((tx) => {
            const Icon = tx.icon;
            const isIncome = tx.type === 'income';

            return (
              <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.txCard}>
                <View style={styles.txLeft}>
                  <View style={[styles.txIconWrapper, { backgroundColor: tx.bg }]}>
                    <Icon size={20} color={tx.iconColor} strokeWidth={2.5} />
                  </View>
                  <View>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txDesc}>{tx.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.txRight}>
                  <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.expenseText }]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>

      {/* Floating Action Button (Shows Form) */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => setShowExpenseForm(true)}
      >
        <View style={styles.fabInner}>
          <Plus size={32} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </TouchableOpacity>
    </>
  );

  // --- RENDER: EXPENSE LOGGER FORM ---
  const renderExpenseLogger = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => setShowExpenseForm(false)}
          >
            <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={styles.headerIconBgLight}>
            <Trees size={22} color={COLORS.primary} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Ryu's Expense Logger</Text>
            <Text style={[styles.headerSubtitle, { color: '#16A34A' }]}>ON-SITE ADMIN</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconButtonLight} activeOpacity={0.7}>
          <UserCircle size={24} color={COLORS.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>

          {/* SECTION 1: UTILITY BILLS */}
          <View style={styles.sectionTitleRow}>
            <Zap size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Utility Bills</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formLabel}>Utility Type</Text>
            <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.8}>
              <Text style={styles.dropdownText}>Electric Bill</Text>
              <ChevronDown size={20} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Text style={styles.formLabel}>Amount Due</Text>
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

            <Text style={styles.formLabel}>Bill Statement Photo</Text>
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
              <Camera size={28} color={COLORS.primary} strokeWidth={2} style={{ marginBottom: 8 }} />
              <Text style={styles.uploadText}>Upload Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtnNavy} activeOpacity={0.8}>
              <Text style={styles.submitBtnNavyText}>Log Utility Expense</Text>
            </TouchableOpacity>
          </View>

          {/* SECTION 2: PETTY CASH */}
          <View style={styles.sectionTitleRow}>
            <Banknote size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Petty Cash</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, pettyCashCategory === 'Daily Supplies' && styles.toggleBtnActive]}
                onPress={() => setPettyCashCategory('Daily Supplies')}
                activeOpacity={0.8}
              >
                <ShoppingBag size={20} color={pettyCashCategory === 'Daily Supplies' ? COLORS.primary : COLORS.textMuted} />
                <Text style={[styles.toggleText, pettyCashCategory === 'Daily Supplies' && styles.toggleTextActive]}>Daily Supplies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleBtn, pettyCashCategory === 'Cleaning' && styles.toggleBtnActive]}
                onPress={() => setPettyCashCategory('Cleaning')}
                activeOpacity={0.8}
              >
                <Wind size={20} color={pettyCashCategory === 'Cleaning' ? COLORS.primary : COLORS.textMuted} />
                <Text style={[styles.toggleText, pettyCashCategory === 'Cleaning' && styles.toggleTextActive]}>Cleaning</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>Item Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 5kg Detergent, Coffee"
              placeholderTextColor={COLORS.textMuted}
              value={itemDesc}
              onChangeText={setItemDesc}
            />

            <Text style={styles.formLabel}>Total Spent</Text>
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

          {/* SECTION 3: MAINTENANCE LOG */}
          <View style={styles.sectionTitleRow}>
            <Wrench size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Maintenance Log</Text>
          </View>

          <View style={styles.darkFormCard}>
            <View style={styles.darkAlertBox}>
              <View style={styles.darkAlertIcon}>
                <Megaphone size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.darkAlertText}>Report issues directly to owner</Text>
            </View>

            <Text style={styles.darkFormLabel}>Issue Type</Text>
            <TouchableOpacity style={styles.darkDropdown} activeOpacity={0.8}>
              <Text style={styles.darkDropdownText}>Plumbing</Text>
              <ChevronDown size={20} color="#94A3B8" />
            </TouchableOpacity>

            <Text style={styles.darkFormLabel}>Description</Text>
            <TextInput
              style={styles.darkTextArea}
              placeholder="Describe the problem..."
              placeholderTextColor="#64748B"
              multiline
              textAlignVertical="top"
              value={issueDesc}
              onChangeText={setIssueDesc}
            />

            <View style={styles.darkActionRow}>
              <TouchableOpacity style={styles.submitBtnWhite} activeOpacity={0.8}>
                <Text style={styles.submitBtnWhiteText}>Report Issue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.darkCameraBtn} activeOpacity={0.8}>
                <Camera size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 130 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Content Switcher */}
      {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem}>
            <Home size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem}>
            <Calendar size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>BOOKINGS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>GUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Wallet size={24} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={[styles.navText, styles.navTextActive]}>FINANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
            <Folder size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>RECORDS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
            <Settings size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>SETTING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },

  /* --- COMMON HEADER --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconBg: {
    width: 44,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerIconBgLight: {
    width: 44,
    height: 44,
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconButtonLight: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },

  /* --- TRANSACTIONS LIST VIEW --- */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  transactionsList: {
    gap: 16,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  txIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  txDesc: {
    fontSize: 11,
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
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
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
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* --- EXPENSE LOGGER FORM VIEW --- */
  formScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginLeft: 8,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  pesoBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pesoText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryLight,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
    height: '100%',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMain,
    marginBottom: 20,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#F8FAFC',
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  submitBtnNavy: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnNavyText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  /* Petty Cash specific */
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    height: 90,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  toggleBtnActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 8,
  },
  toggleTextActive: {
    color: COLORS.textMain,
  },
  submitBtnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.textMain,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnOutlineText: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: '800',
  },

  /* Dark Card (Maintenance Log) */
  darkFormCard: {
    backgroundColor: COLORS.darkCardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
  },
  darkAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 16,
    marginBottom: 20,
  },
  darkAlertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  darkAlertText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#E2E8F0',
  },
  darkFormLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 8,
  },
  darkDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  darkDropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  darkTextArea: {
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    height: 100,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  darkActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  submitBtnWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnWhiteText: {
    color: COLORS.darkCardBg,
    fontSize: 15,
    fontWeight: '800',
  },
  darkCameraBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- BOTTOM NAV STYLES ---
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 16,
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
});