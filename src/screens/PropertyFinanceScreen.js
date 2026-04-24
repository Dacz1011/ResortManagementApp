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
  StatusBar,
  Image,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
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
  ArrowDownRight,
  X,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Dynamic Theme Configuration with Luxury Images
const THEMES = {
  Reine: {
    primary: '#E64E76',
    primaryLight: '#FDF0F4',
    primaryDark: '#BE375A',
    home: 'ReineHome',
    bookings: 'ReineBookings',
    guestMgmt: 'ReineGuestMgmt',
    finance: 'ReineFinance',
    admin: 'ReineAdmin',
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
    heroFormImage: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=2070&auto=format&fit=crop',
  },
  Ryu: {
    primary: '#23324B',
    primaryLight: '#E0E7FF',
    primaryDark: '#1A2537',
    home: 'RyuHome',
    bookings: 'RyuBookings',
    guestMgmt: 'RyuGuestMgmt',
    finance: 'RyuFinance',
    admin: 'RyuAdmin',
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    heroFormImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
  },
  Casa: {
    primary: '#1B5E20',
    primaryLight: '#E8F5E9',
    primaryDark: '#0D3B10',
    home: 'CasaHome',
    bookings: 'CasaBookings',
    guestMgmt: 'CasaGuestMgmt',
    finance: 'CasaFinance',
    admin: 'CasaAdmin',
    heroImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
    heroFormImage: 'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop',
  }
};

const COMMON_COLORS = {
  background: '#F4F7FA', // Deep crisp off-white for main sheet
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

const UTILITY_TYPES = ['Electric Bill', 'Water Bill', 'Internet/WiFi', 'LPG/Gas', 'Association Dues', 'Others'];
const ISSUE_TYPES = ['Plumbing', 'Electrical', 'Air Conditioning', 'Housekeeping', 'Structural', 'Pool Maintenance', 'Others'];

const TRANSACTIONS = [
  { id: '1', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Jonathan Rivera', amount: '+ ₱4,500', date: 'Feb 3, 2026', icon: PlusCircle },
  { id: '2', type: 'expense', title: 'Electricity Utility', subtitle: 'Monthly Bill - Meralco', amount: '- ₱8,240', date: 'Feb 2, 2026', icon: Zap },
  { id: '3', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Sarah Jenkins', amount: '+ ₱3,200', date: 'Feb 1, 2026', icon: PlusCircle },
  { id: '4', type: 'expense', title: 'Water Utility', subtitle: 'Monthly Bill - Primewater', amount: '- ₱1,150', date: 'Jan 30, 2026', icon: Droplet },
  { id: '5', type: 'income', title: 'Daily Collection', subtitle: 'Guest: Michael Chen', amount: '+ ₱2,800', date: 'Jan 28, 2026', icon: PlusCircle },
];

export default function PropertyFinanceScreen({ route, navigation }) {
  const { propertyId } = route.params || { propertyId: 'Reine' };
  const theme = THEMES[propertyId] || THEMES.Reine;
  const activeNav = 'Finance';
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Form States
  const [utilityType, setUtilityType] = useState(UTILITY_TYPES[0]);
  const [utilityAmount, setUtilityAmount] = useState('');
  const [utilityImage, setUtilityImage] = useState(null);

  const [pettyCashCategory, setPettyCashCategory] = useState('Daily Supplies');
  const [itemDesc, setItemDesc] = useState('');
  const [pettyAmount, setPettyAmount] = useState('');

  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [issueDesc, setIssueDesc] = useState('');
  const [maintenanceImage, setMaintenanceImage] = useState(null);

  const [showUtilityDropdown, setShowUtilityTypeDropdown] = useState(false);
  const [showIssueDropdown, setShowIssueDropdown] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [activePickerType, setActivePickerType] = useState(null);

  const handleUploadImage = async (type) => {
    setActivePickerType(type);
    setShowImagePicker(true);
  };

  const openCamera = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) {
      if (activePickerType === 'utility') setUtilityImage(result.assets[0].uri);
      if (activePickerType === 'maintenance') setMaintenanceImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need gallery permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) {
      if (activePickerType === 'utility') setUtilityImage(result.assets[0].uri);
      if (activePickerType === 'maintenance') setMaintenanceImage(result.assets[0].uri);
    }
  };

  // --- RENDER: TRANSACTION LIST (LUXURY OVERLAP) ---
  const renderTransactionList = () => (
    <View style={styles.viewContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>

        {/* FULL BLEED HERO IMAGE */}
        <ImageBackground source={{ uri: theme.heroImage }} style={styles.heroHeader}>
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Financial Overview</Text>
                <Text style={styles.adminName}>Transactions</Text>
              </View>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                <Bell size={20} color="#FFFFFF" strokeWidth={2.5} />
                <View style={[styles.notificationDot, { backgroundColor: theme.primary }]} />
              </TouchableOpacity>
            </View>

            {/* Glassmorphism Balance Card */}
            <View style={styles.glassCard}>
              <View style={styles.glassHeader}>
                <View style={styles.statusPill}>
                  <Wallet size={14} color={COMMON_COLORS.textMain} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.statusText}>NET REVENUE (THIS MONTH)</Text>
                </View>
                <View style={styles.trendBadge}>
                  <ArrowUpRight size={14} color={COMMON_COLORS.successText} strokeWidth={3} style={{ marginRight: 2 }} />
                  <Text style={styles.trendText}>+12.5%</Text>
                </View>
              </View>
              <Text style={styles.heroMainStat}>₱42,500<Text style={styles.heroSubDecimals}>.00</Text></Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* OVERLAPPING MAIN SHEET */}
        <View style={styles.mainSheet}>

          {/* Income vs Expense Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: COMMON_COLORS.successBg }]}>
                <ArrowDownRight size={18} color={COMMON_COLORS.successText} strokeWidth={3} />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>₱54,200</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: COMMON_COLORS.dangerBg }]}>
                <ArrowUpRight size={18} color={COMMON_COLORS.dangerText} strokeWidth={3} />
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
              <Text style={[styles.viewAllText, { color: theme.primary }]}>View All</Text>
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
                      isIncome ? { backgroundColor: COMMON_COLORS.successBg } : { backgroundColor: theme.primaryLight }
                    ]}>
                      <Icon size={20} color={isIncome ? COMMON_COLORS.successText : theme.primary} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDesc}>{tx.subtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.txRight}>
                    <Text style={[styles.txAmount, isIncome ? { color: COMMON_COLORS.successText } : { color: COMMON_COLORS.textMain }]}>
                      {tx.amount}
                    </Text>
                    <Text style={styles.txDate}>{tx.date}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.fab, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
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
          <ImageBackground source={{ uri: theme.heroFormImage }} style={styles.heroHeaderForm}>
            <View style={styles.heroOverlay} />
            <SafeAreaView edges={['top']} style={styles.heroSafeAreaForm}>
              <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => setShowExpenseForm(false)} style={styles.backBtnWrapper}>
                  <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text style={styles.greetingText}>Record Entry</Text>
                  <Text style={styles.adminName}>Expense Logger</Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          {/* OVERLAPPING MAIN SHEET */}
          <View style={styles.mainSheet}>

            {/* UTILITY BILLS */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Zap size={20} color={theme.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Utility Bills</Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formLabelDark}>UTILITY TYPE</Text>
              <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.8} onPress={() => setShowUtilityTypeDropdown(!showUtilityDropdown)}>
                <Text style={styles.dropdownText}>{utilityType}</Text>
                <ChevronDown size={20} color={COMMON_COLORS.textMuted} />
              </TouchableOpacity>
              {showUtilityDropdown && (
                <View style={styles.dropdownMenu}>
                  {UTILITY_TYPES.map((type) => (
                    <TouchableOpacity key={type} style={styles.dropdownItem} onPress={() => { setUtilityType(type); setShowUtilityTypeDropdown(false); }}>
                      <Text style={[styles.dropdownItemText, utilityType === type && { color: theme.primary, fontWeight: '800' }]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text style={styles.formLabelDark}>AMOUNT DUE</Text>
              <View style={styles.amountInputBox}>
                <View style={[styles.pesoBox, { borderColor: theme.primary }]}><Text style={[styles.pesoText, { color: theme.primary }]}>₱</Text></View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={COMMON_COLORS.textMuted}
                  keyboardType="decimal-pad"
                  value={utilityAmount}
                  onChangeText={setUtilityAmount}
                />
              </View>

              <Text style={styles.formLabelDark}>STATEMENT PHOTO</Text>
              {utilityImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: utilityImage }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.removeImageBtn} onPress={() => setUtilityImage(null)}>
                    <X size={16} color="#FFFFFF" strokeWidth={3} />
                  </TouchableOpacity>
                  <View style={styles.successBadgeSmall}>
                    <CheckCircle2 size={12} color={COMMON_COLORS.successText} strokeWidth={3} />
                    <Text style={styles.successBadgeTextSmall}>Photo Attached</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => handleUploadImage('utility')}>
                  <Camera size={28} color={COMMON_COLORS.textMuted} strokeWidth={2} style={{ marginBottom: 8 }} />
                  <Text style={styles.uploadText}>Tap to Upload Photo</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.submitBtnSolid, { backgroundColor: theme.primary, shadowColor: theme.primary }]} activeOpacity={0.8}>
                <Text style={styles.submitBtnSolidText}>Log Utility Expense</Text>
              </TouchableOpacity>
            </View>

            {/* PETTY CASH */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Banknote size={20} color={theme.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Petty Cash</Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[styles.toggleBtn, pettyCashCategory === 'Daily Supplies' && { borderColor: theme.primary, backgroundColor: theme.primaryLight, borderWidth: 2 }]}
                  onPress={() => setPettyCashCategory('Daily Supplies')}
                  activeOpacity={0.8}
                >
                  <ShoppingBag size={20} color={pettyCashCategory === 'Daily Supplies' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={2.5} />
                  <Text style={[styles.toggleText, pettyCashCategory === 'Daily Supplies' && { color: theme.primary }]}>Supplies</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleBtn, pettyCashCategory === 'Cleaning' && { borderColor: theme.primary, backgroundColor: theme.primaryLight, borderWidth: 2 }]}
                  onPress={() => setPettyCashCategory('Cleaning')}
                  activeOpacity={0.8}
                >
                  <Wind size={20} color={pettyCashCategory === 'Cleaning' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={2.5} />
                  <Text style={[styles.toggleText, pettyCashCategory === 'Cleaning' && { color: theme.primary }]}>Cleaning</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.formLabelDark}>ITEM DESCRIPTION</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 5kg Detergent, Coffee"
                placeholderTextColor={COMMON_COLORS.textMuted}
                value={itemDesc}
                onChangeText={setItemDesc}
              />

              <Text style={styles.formLabelDark}>TOTAL SPENT</Text>
              <View style={styles.amountInputBox}>
                <View style={[styles.pesoBox, { borderColor: theme.primary }]}><Text style={[styles.pesoText, { color: theme.primary }]}>₱</Text></View>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={COMMON_COLORS.textMuted}
                  keyboardType="decimal-pad"
                  value={pettyAmount}
                  onChangeText={setPettyAmount}
                />
              </View>

              <TouchableOpacity style={[styles.submitBtnOutline, { borderColor: theme.primary }]} activeOpacity={0.8}>
                <Text style={[styles.submitBtnOutlineText, { color: theme.primary }]}>Log Petty Cash</Text>
              </TouchableOpacity>
            </View>

            {/* MAINTENANCE LOG (Dark Themed Card) */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconTitle}>
                <Wrench size={20} color={theme.primary} strokeWidth={2.5} />
                <Text style={styles.sectionTitleForm}>Maintenance Log</Text>
              </View>
            </View>

            <View style={[styles.maintenanceCard, { backgroundColor: theme.primaryDark, shadowColor: theme.primaryDark }]}>
              <View style={styles.maintenanceAlertBox}>
                <View style={styles.maintenanceAlertIcon}>
                  <Megaphone size={16} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.maintenanceAlertText}>Report issues directly to owner</Text>
              </View>

              <Text style={styles.maintenanceFormLabel}>ISSUE TYPE</Text>
              <TouchableOpacity style={styles.maintenanceDropdown} activeOpacity={0.8} onPress={() => setShowIssueDropdown(!showIssueDropdown)}>
                <Text style={styles.maintenanceDropdownText}>{issueType}</Text>
                <ChevronDown size={20} color="#FFFFFF" opacity={0.7} />
              </TouchableOpacity>
              {showIssueDropdown && (
                <View style={styles.maintenanceDropdownMenu}>
                  {ISSUE_TYPES.map((type) => (
                    <TouchableOpacity key={type} style={styles.maintenanceDropdownItem} onPress={() => { setIssueType(type); setShowIssueDropdown(false); }}>
                      <Text style={[styles.maintenanceDropdownItemText, issueType === type && { fontWeight: '800', opacity: 1 }]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

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

              {maintenanceImage && (
                <View style={styles.maintenanceImagePreviewContainer}>
                  <Image source={{ uri: maintenanceImage }} style={styles.maintenanceImagePreview} />
                  <TouchableOpacity style={styles.removeImageBtn} onPress={() => setMaintenanceImage(null)}>
                    <X size={16} color="#FFFFFF" strokeWidth={3} />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.maintenanceActionRow}>
                <TouchableOpacity style={styles.maintenanceSubmitBtn} activeOpacity={0.8}>
                  <Text style={[styles.maintenanceSubmitBtnText, { color: theme.primaryDark }]}>Report Issue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.maintenanceCameraBtn, maintenanceImage && { backgroundColor: 'rgba(255,255,255,0.4)' }]}
                  activeOpacity={0.8}
                  onPress={() => handleUploadImage('maintenance')}
                >
                  <Camera size={24} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Sheet Modal for Image Picking */}
      <Modal visible={showImagePicker} transparent={true} animationType="fade" onRequestClose={() => setShowImagePicker(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowImagePicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetIndicator} />
            <Text style={styles.bottomSheetTitle}>Select Source</Text>
            <View style={styles.pickerOptionsRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={openCamera} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: theme.primaryLight }]}>
                  <Camera size={28} color={theme.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.pickerOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={openGallery} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: theme.primaryLight }]}>
                  <ImageIcon size={28} color={theme.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.pickerOptionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelPickerBtn} onPress={() => setShowImagePicker(false)}>
              <Text style={styles.cancelPickerBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}

      {/* --- MODERN FULL-WIDTH BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(theme.home)} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Home' && { backgroundColor: theme.primaryLight }]}>
              <Home size={22} color={activeNav === 'Home' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Home' && { color: theme.primary, fontWeight: '800' }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(theme.bookings)} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Bookings' && { backgroundColor: theme.primaryLight }]}>
              <CalendarDays size={22} color={activeNav === 'Bookings' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Bookings' && { color: theme.primary, fontWeight: '800' }]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(theme.guestMgmt)} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Guest' && { backgroundColor: theme.primaryLight }]}>
              <Users size={22} color={activeNav === 'Guest' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Guest' && { color: theme.primary, fontWeight: '800' }]}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => { setShowExpenseForm(false); }} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Finance' && { backgroundColor: theme.primaryLight }]}>
              <Wallet size={22} color={activeNav === 'Finance' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Finance' && { color: theme.primary, fontWeight: '800' }]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(theme.admin)} activeOpacity={0.7}>
            <View style={[styles.navIconWrapper, activeNav === 'Admin' && { backgroundColor: theme.primaryLight }]}>
              <Settings size={22} color={activeNav === 'Admin' ? theme.primary : COMMON_COLORS.textMuted} strokeWidth={activeNav === 'Admin' ? 2.5 : 2} />
            </View>
            <Text style={[styles.navText, activeNav === 'Admin' && { color: theme.primary, fontWeight: '800' }]}>Admin</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.background,
  },
  viewContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Reduced from 120
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
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // Dark overlay
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
    paddingTop: Platform.OS === 'android' ? 32 : 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    color: COMMON_COLORS.textMain,
    letterSpacing: 0.5,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COMMON_COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
    color: COMMON_COLORS.successText,
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
    backgroundColor: COMMON_COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36,
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
    backgroundColor: COMMON_COLORS.cardBg,
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
    color: COMMON_COLORS.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COMMON_COLORS.textMain,
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
    color: COMMON_COLORS.textMain,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '800',
  },

  /* --- TRANSACTIONS LIST --- */
  transactionsList: {
    gap: 16,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COMMON_COLORS.cardBg,
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
    color: COMMON_COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  txDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: COMMON_COLORS.textMuted,
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
    color: COMMON_COLORS.textMuted,
  },

  /* --- FAB --- */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: COMMON_COLORS.textMain,
    letterSpacing: -0.5,
    marginLeft: 10,
  },
  formCard: {
    backgroundColor: COMMON_COLORS.cardBg,
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
    color: COMMON_COLORS.textMuted,
    marginBottom: 8,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COMMON_COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COMMON_COLORS.border,
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: COMMON_COLORS.textMain,
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 8, marginBottom: 20, borderWidth: 1, borderColor: COMMON_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  dropdownItem: { padding: 16, borderRadius: 12 },
  dropdownItemText: { fontSize: 14, color: COMMON_COLORS.textMain, fontWeight: '500' },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COMMON_COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COMMON_COLORS.border,
  },
  pesoBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pesoText: {
    fontSize: 14,
    fontWeight: '800',
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COMMON_COLORS.textMain,
    height: '100%',
  },
  textInput: {
    backgroundColor: COMMON_COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    fontSize: 15,
    fontWeight: '600',
    color: COMMON_COLORS.textMain,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COMMON_COLORS.border,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COMMON_COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: COMMON_COLORS.background,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: COMMON_COLORS.textMuted,
  },
  imagePreviewContainer: { position: 'relative', marginBottom: 24 },
  imagePreview: { width: '100%', height: 180, borderRadius: 20, backgroundColor: COMMON_COLORS.inputBg },
  removeImageBtn: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  successBadgeSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: COMMON_COLORS.successBg, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginTop: 12, gap: 6 },
  successBadgeTextSmall: { fontSize: 11, fontWeight: '800', color: COMMON_COLORS.successText },
  submitBtnSolid: {
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: COMMON_COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COMMON_COLORS.background,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COMMON_COLORS.textMuted,
    marginTop: 8,
  },
  submitBtnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnOutlineText: {
    fontSize: 16,
    fontWeight: '800',
  },

  /* Maintenance Log */
  maintenanceCard: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceDropdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  maintenanceDropdownMenu: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 8, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  maintenanceDropdownItem: { padding: 16, borderRadius: 12 },
  maintenanceDropdownItemText: { fontSize: 14, color: '#FFFFFF', opacity: 0.8 },
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
  maintenanceImagePreviewContainer: { position: 'relative', marginBottom: 20 },
  maintenanceImagePreview: { width: '100%', height: 150, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
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

  /* --- MODERN FULL-WIDTH BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 15,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconWrapper: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: COMMON_COLORS.textMuted,
  },

  /* Modal Styles */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  bottomSheetIndicator: { width: 40, height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  bottomSheetTitle: { fontSize: 20, fontWeight: '800', color: COMMON_COLORS.textMain, textAlign: 'center', marginBottom: 24 },
  pickerOptionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  pickerOption: { alignItems: 'center', gap: 12 },
  pickerIconCircle: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  pickerOptionText: { fontSize: 15, fontWeight: '700', color: COMMON_COLORS.textMain },
  cancelPickerBtn: { height: 60, borderRadius: 20, backgroundColor: COMMON_COLORS.inputBg, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COMMON_COLORS.border },
  cancelPickerBtnText: { fontSize: 16, fontWeight: '700', color: COMMON_COLORS.textMuted },
});