import * as ImagePicker from 'expo-image-picker';
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Droplet,
  Home,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Plus,
  PlusCircle,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
  Wind,
  Wrench,
  X,
  Zap
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Fallback images to replace local assets
const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop';

// Matched strictly to ReineHome palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  primaryDark: '#BE375A',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

const UTILITY_TYPES = ['Electric Bill', 'Water Bill', 'Internet/WiFi', 'LPG/Gas', 'Association Dues', 'Others'];
const ISSUE_TYPES = ['Plumbing', 'Electrical', 'Air Conditioning', 'Housekeeping', 'Structural', 'Pool Maintenance', 'Others'];

const TRANSACTIONS = [
  { id: '1', type: 'income',  title: 'Daily Collection',   subtitle: 'Guest: Jonathan Rivera', amount: '+ ₱4,500', date: 'Feb 3, 2026',  icon: PlusCircle },
  { id: '2', type: 'expense', title: 'Electricity Utility', subtitle: 'Monthly Bill - Meralco',  amount: '- ₱8,240', date: 'Feb 2, 2026',  icon: Zap },
  { id: '3', type: 'income',  title: 'Daily Collection',   subtitle: 'Guest: Sarah Jenkins',   amount: '+ ₱3,200', date: 'Feb 1, 2026',  icon: PlusCircle },
  { id: '4', type: 'expense', title: 'Water Utility',      subtitle: 'Monthly Bill - Primewater', amount: '- ₱1,150', date: 'Jan 30, 2026', icon: Droplet },
  { id: '5', type: 'income',  title: 'Daily Collection',   subtitle: 'Guest: Michael Chen',    amount: '+ ₱2,800', date: 'Jan 28, 2026', icon: PlusCircle },
];

export default function ReineFinance({ navigation }) {
  const activeNav = 'Finance';
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Fade-in entrance — matches ReineHome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // Form states
  const [utilityType, setUtilityType]           = useState(UTILITY_TYPES[0]);
  const [utilityAmount, setUtilityAmount]         = useState('');
  const [utilityImage, setUtilityImage]           = useState(null);
  const [pettyCashCategory, setPettyCashCategory] = useState('Daily Supplies');
  const [itemDesc, setItemDesc]                   = useState('');
  const [pettyAmount, setPettyAmount]             = useState('');
  const [issueType, setIssueType]                 = useState(ISSUE_TYPES[0]);
  const [issueDesc, setIssueDesc]                 = useState('');
  const [maintenanceImage, setMaintenanceImage]   = useState(null);
  const [showUtilityDropdown, setShowUtilityTypeDropdown] = useState(false);
  const [showIssueDropdown, setShowIssueDropdown]         = useState(false);
  const [showImagePicker, setShowImagePicker]             = useState(false);
  const [activePickerType, setActivePickerType]           = useState(null);

  const handleUploadImage = (type) => { setActivePickerType(type); setShowImagePicker(true); };

  const openCamera = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission Denied', 'Camera access is required.'); return; }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) {
      if (activePickerType === 'utility') setUtilityImage(result.assets[0].uri);
      if (activePickerType === 'maintenance') setMaintenanceImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission Denied', 'Gallery access is required.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) {
      if (activePickerType === 'utility') setUtilityImage(result.assets[0].uri);
      if (activePickerType === 'maintenance') setMaintenanceImage(result.assets[0].uri);
    }
  };

  // ─────────────────────────────────────────────
  // RENDER: TRANSACTION LIST VIEW
  // ─────────────────────────────────────────────
  const renderTransactionList = () => (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      style={{ opacity: fadeAnim }}
    >
      {/* ── FULL-BLEED HERO ── */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: HERO_IMAGE_URL }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.safeArea}>
            {/* Top bar — location pill + bell icon */}
            <View style={styles.topBar}>
              <View style={styles.locationPill}>
                <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                <Text style={styles.locationText}>Finance</Text>
              </View>
              <TouchableOpacity
                style={styles.iconBtnDark}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ReineNotifications')}
              >
                <Bell size={18} color="#FFFFFF" strokeWidth={2.5} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            {/* Hero bottom — big stat + trend badge */}
            <View style={styles.heroBottomContent}>
              <View style={styles.revenueHeader}>
                <Text style={styles.heroMainStat}>
                  ₱42,500<Text style={styles.heroSubDecimals}>.00</Text>
                </Text>
                <Text style={styles.heroSubStat}>Net Revenue — This Month</Text>
              </View>

              <View style={styles.trendPill}>
                <View style={styles.trendPillIconBox}>
                  <TrendingUp size={18} color={COLORS.successText} strokeWidth={2.5} />
                </View>
                <View style={styles.trendPillTextWrap}>
                  <Text style={styles.trendPillTitle}>+12.5% vs last month</Text>
                  <Text style={styles.trendPillSubtitle}>Income ₱54,200 · Expenses ₱11,700</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* ── QUICK ACTION PILLS ── */}
      <View style={styles.quickActionsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsScroll}
        >
          <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8}>
            <Text style={styles.actionPillDarkText}>All Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
            <Text style={styles.actionPillLightText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
            <Text style={styles.actionPillLightText}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
            <Text style={styles.actionPillLightText}>This Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionPillLight}
            activeOpacity={0.7}
            onPress={() => setShowExpenseForm(true)}
          >
            <Text style={styles.actionPillLightText}>+ Log Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* ── MAIN CONTENT ── */}
      <View style={styles.mainContent}>

        {/* ── SNAPSHOT STRIP ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Month Snapshot</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.snapshotScroll}
        >
          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
              style={styles.snapshotImage}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <ArrowDownRight size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View>
                  <Text style={styles.snapshotValue}>₱54,200</Text>
                  <Text style={styles.snapshotLabel}>Total Income</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }}
              style={styles.snapshotImage}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <ArrowUpRight size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View>
                  <Text style={styles.snapshotValue}>₱11,700</Text>
                  <Text style={styles.snapshotLabel}>Total Expenses</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }}
              style={styles.snapshotImage}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View>
                  <Text style={styles.snapshotValue}>₱42,500</Text>
                  <Text style={styles.snapshotLabel}>Net Revenue</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>

        {/* ── RECENT ACTIVITY ── */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
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
                  <View style={[
                    styles.txIconWrapper,
                    { backgroundColor: isIncome ? COLORS.successBg : COLORS.primaryLight },
                  ]}>
                    <Icon size={20} color={isIncome ? COLORS.successText : COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txDesc}>{tx.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.txRight}>
                  <Text style={[
                    styles.txAmount,
                    { color: isIncome ? COLORS.successText : COLORS.textMain },
                  ]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>
      <View style={styles.bottomSpacer} />
    </Animated.ScrollView>
  );

  // ─────────────────────────────────────────────
  // RENDER: EXPENSE LOGGER FORM
  // ─────────────────────────────────────────────
  const renderExpenseLogger = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ── FORM HERO ── */}
        <View style={[styles.heroContainer, { height: 220 }]}>
          <ImageBackground
            source={{ uri: HERO_IMAGE_URL }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />
            <SafeAreaView edges={['top']} style={styles.safeArea}>
              <View style={styles.topBar}>
                <TouchableOpacity
                  onPress={() => setShowExpenseForm(false)}
                  style={styles.iconBtnDark}
                  activeOpacity={0.8}
                >
                  <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={styles.locationPill}>
                  <Banknote size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Expense Logger</Text>
                </View>
                <View style={{ width: 44 }} />
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>Record Entry</Text>
                <Text style={styles.heroSubStat}>Log utilities, petty cash & issues</Text>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* ── FORM CONTENT ── */}
        <View style={styles.mainContent}>

          {/* ── UTILITY BILLS ── */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}>
                <Zap size={18} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <Text style={styles.sectionTitleForm}>Utility Bills</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formLabel}>UTILITY TYPE</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              activeOpacity={0.8}
              onPress={() => setShowUtilityTypeDropdown(!showUtilityDropdown)}
            >
              <Text style={styles.dropdownText}>{utilityType}</Text>
              <ChevronDown size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
            {showUtilityDropdown && (
              <View style={styles.dropdownMenu}>
                {UTILITY_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => { setUtilityType(type); setShowUtilityTypeDropdown(false); }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      utilityType === type && { color: COLORS.primary, fontWeight: '800' },
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.formLabel}>AMOUNT DUE</Text>
            <View style={styles.amountInputBox}>
              <View style={styles.pesoBox}>
                <Text style={styles.pesoText}>₱</Text>
              </View>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="decimal-pad"
                value={utilityAmount}
                onChangeText={setUtilityAmount}
              />
            </View>

            <Text style={styles.formLabel}>STATEMENT PHOTO</Text>
            {utilityImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: utilityImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => setUtilityImage(null)}>
                  <X size={16} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
                <View style={styles.successBadgeSmall}>
                  <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.successBadgeTextSmall}>Photo Attached</Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadBox}
                activeOpacity={0.7}
                onPress={() => handleUploadImage('utility')}
              >
                <Camera size={28} color={COLORS.textMuted} strokeWidth={2} style={{ marginBottom: 8 }} />
                <Text style={styles.uploadText}>Tap to Upload Photo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.pinkSubmitBtn} activeOpacity={0.85}>
              <Text style={styles.pinkSubmitBtnText}>Log Utility Expense</Text>
            </TouchableOpacity>
          </View>

          {/* ── PETTY CASH ── */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}>
                <Banknote size={18} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <Text style={styles.sectionTitleForm}>Petty Cash</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  pettyCashCategory === 'Daily Supplies' && styles.toggleBtnActive,
                ]}
                onPress={() => setPettyCashCategory('Daily Supplies')}
                activeOpacity={0.8}
              >
                <ShoppingBag
                  size={20}
                  color={pettyCashCategory === 'Daily Supplies' ? COLORS.primary : COLORS.textMuted}
                  strokeWidth={2.5}
                />
                <Text style={[
                  styles.toggleText,
                  pettyCashCategory === 'Daily Supplies' && { color: COLORS.primary },
                ]}>
                  Supplies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  pettyCashCategory === 'Cleaning' && styles.toggleBtnActive,
                ]}
                onPress={() => setPettyCashCategory('Cleaning')}
                activeOpacity={0.8}
              >
                <Wind
                  size={20}
                  color={pettyCashCategory === 'Cleaning' ? COLORS.primary : COLORS.textMuted}
                  strokeWidth={2.5}
                />
                <Text style={[
                  styles.toggleText,
                  pettyCashCategory === 'Cleaning' && { color: COLORS.primary },
                ]}>
                  Cleaning
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>ITEM DESCRIPTION</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 5kg Detergent, Coffee"
              placeholderTextColor={COLORS.textMuted}
              value={itemDesc}
              onChangeText={setItemDesc}
            />

            <Text style={styles.formLabel}>TOTAL SPENT</Text>
            <View style={styles.amountInputBox}>
              <View style={styles.pesoBox}>
                <Text style={styles.pesoText}>₱</Text>
              </View>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="decimal-pad"
                value={pettyAmount}
                onChangeText={setPettyAmount}
              />
            </View>

            <TouchableOpacity style={styles.outlineSubmitBtn} activeOpacity={0.85}>
              <Text style={styles.outlineSubmitBtnText}>Log Petty Cash</Text>
            </TouchableOpacity>
          </View>

          {/* ── MAINTENANCE LOG ── */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}>
                <Wrench size={18} color={COLORS.primary} strokeWidth={2.5} />
              </View>
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
            <TouchableOpacity
              style={styles.maintenanceDropdown}
              activeOpacity={0.8}
              onPress={() => setShowIssueDropdown(!showIssueDropdown)}
            >
              <Text style={styles.maintenanceDropdownText}>{issueType}</Text>
              <ChevronDown size={20} color="#FFFFFF" opacity={0.7} />
            </TouchableOpacity>
            {showIssueDropdown && (
              <View style={styles.maintenanceDropdownMenu}>
                {ISSUE_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.maintenanceDropdownItem}
                    onPress={() => { setIssueType(type); setShowIssueDropdown(false); }}
                  >
                    <Text style={[
                      styles.maintenanceDropdownItemText,
                      issueType === type && { fontWeight: '800', opacity: 1 },
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.maintenanceFormLabel}>DESCRIPTION</Text>
            <TextInput
              style={styles.maintenanceTextArea}
              placeholder="Describe the problem..."
              placeholderTextColor="rgba(255,255,255,0.5)"
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
              <TouchableOpacity style={styles.maintenanceSubmitBtn} activeOpacity={0.85}>
                <Text style={styles.maintenanceSubmitBtnText}>Report Issue</Text>
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
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* Image picker modal */}
      <Modal
        visible={showImagePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowImagePicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetIndicator} />
            <Text style={styles.bottomSheetTitle}>Select Source</Text>
            <View style={styles.pickerOptionsRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={openCamera} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: COLORS.primaryLight }]}>
                  <Camera size={28} color={COLORS.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.pickerOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={openGallery} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: COLORS.primaryLight }]}>
                  <ImageIcon size={28} color={COLORS.primary} strokeWidth={2.5} />
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
    </KeyboardAvoidingView>
  );

  // ─────────────────────────────────────────────
  // ROOT
  // ─────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}

      {!showExpenseForm && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.fab}
          onPress={() => setShowExpenseForm(true)}
        >
          <Plus size={24} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      )}

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ReineHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowExpenseForm(false); }} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },

  /* ── HERO ── */
  heroContainer: { width: '100%', height: 320 },
  heroImage: { width: '100%', height: '100%' },
  heroImageStyle: {},
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 28,
  },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(30,30,30,0.6)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  notificationDot: {
    position: 'absolute', top: 10, right: 12,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.primary,
    borderWidth: 2, borderColor: '#FFFFFF',
  },

  /* Hero bottom */
  heroBottomContent: { marginTop: 15, gap: 12 },
  revenueHeader: { gap: 2 },
  heroMainStat: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  heroSubDecimals: { fontSize: 24, color: 'rgba(255,255,255,0.7)' },
  heroSubStat: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  trendPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(24,24,27,0.65)',
    borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  trendPillIconBox: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.successBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  trendPillTextWrap: {},
  trendPillTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  trendPillSubtitle: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },

  /* ── QUICK FILTER PILLS ── */
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: {
    backgroundColor: COLORS.primary, paddingHorizontal: 20,
    height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100,
  },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, paddingHorizontal: 16,
    height: 44, justifyContent: 'center', borderRadius: 100,
    borderWidth: 1, borderColor: COLORS.border,
  },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },

  /* ── MAIN CONTENT ── */
  mainContent: { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader: { marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  /* ── SNAPSHOT STRIP ── */
  snapshotScroll: { gap: 16, paddingBottom: 8 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.32)', borderRadius: 24,
  },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  /* ── TRANSACTION LIST ── */
  listHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16, marginTop: 8,
  },
  viewAllText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  transactionsList: { gap: 14 },
  txCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  txLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  txIconWrapper: {
    width: 48, height: 48, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  txTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 3, letterSpacing: -0.2 },
  txDesc: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 16, fontWeight: '800', marginBottom: 4, letterSpacing: -0.5 },
  txDate: { fontSize: 11, fontWeight: '500', color: COLORS.textMuted },

  /* FAB */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 110,
    right: 24,
    width: 60, height: 60, borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 8, zIndex: 10,
  },

  /* ── EXPENSE FORM ── */
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 8 },
  sectionIconTitle: { flexDirection: 'row', alignItems: 'center' },
  sectionIconBox: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  sectionTitleForm: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  formCard: {
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 28, borderWidth: 1, borderColor: COLORS.border,
  },
  formLabel: {
    fontSize: 11, fontWeight: '700', color: COLORS.textMuted,
    marginBottom: 8, letterSpacing: 0.5, marginLeft: 4,
  },
  dropdownInput: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.background, borderRadius: 16,
    paddingHorizontal: 20, height: 56, marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dropdownText: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
  dropdownMenu: {
    backgroundColor: COLORS.surface, borderRadius: 16, padding: 8,
    marginBottom: 20, borderWidth: 1, borderColor: COLORS.border,
  },
  dropdownItem: { padding: 14, borderRadius: 12 },
  dropdownItemText: { fontSize: 14, color: COLORS.textMain, fontWeight: '500' },
  amountInputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 16,
    paddingHorizontal: 20, height: 56, marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.border,
  },
  pesoBox: {
    width: 28, height: 28, borderRadius: 8,
    borderWidth: 1.5, borderColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  pesoText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  amountInput: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain, height: '100%' },
  textInput: {
    backgroundColor: COLORS.background, borderRadius: 16,
    paddingHorizontal: 20, height: 56, fontSize: 15,
    fontWeight: '600', color: COLORS.textMain, marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.border,
  },
  uploadBox: {
    borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: 20, height: 120,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
    backgroundColor: COLORS.background,
  },
  uploadText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  imagePreviewContainer: { position: 'relative', marginBottom: 24 },
  imagePreview: { width: '100%', height: 180, borderRadius: 20 },
  removeImageBtn: {
    position: 'absolute', top: 12, right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center',
  },
  successBadgeSmall: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.successBg, alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginTop: 12, gap: 6,
  },
  successBadgeTextSmall: { fontSize: 11, fontWeight: '800', color: COLORS.successText },

  pinkSubmitBtn: {
    height: 60, borderRadius: 100, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  pinkSubmitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  outlineSubmitBtn: {
    height: 60, borderRadius: 100, backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: COLORS.primary,
  },
  outlineSubmitBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },

  toggleRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  toggleBtn: {
    flex: 1, height: 88, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  toggleBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, borderWidth: 2 },
  toggleText: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted, marginTop: 8 },

  /* Maintenance card */
  maintenanceCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 24, padding: 24, marginBottom: 32,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
  },
  maintenanceAlertBox: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.15)',
    paddingBottom: 16, marginBottom: 20,
  },
  maintenanceAlertIcon: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  maintenanceAlertText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  maintenanceFormLabel: {
    fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.8)',
    marginBottom: 8, letterSpacing: 0.5, marginLeft: 4,
  },
  maintenanceDropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16,
    paddingHorizontal: 20, height: 56, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceDropdownText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  maintenanceDropdownMenu: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 8,
    marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceDropdownItem: { padding: 14, borderRadius: 12 },
  maintenanceDropdownItemText: { fontSize: 14, color: '#FFFFFF', opacity: 0.8 },
  maintenanceTextArea: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16,
    paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18,
    height: 120, fontSize: 15, fontWeight: '500', color: '#FFFFFF',
    marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  maintenanceImagePreviewContainer: { position: 'relative', marginBottom: 20 },
  maintenanceImagePreview: { width: '100%', height: 150, borderRadius: 16 },
  maintenanceActionRow: { flexDirection: 'row', gap: 12 },
  maintenanceSubmitBtn: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 100, height: 56,
    justifyContent: 'center', alignItems: 'center',
  },
  maintenanceSubmitBtnText: { fontSize: 16, fontWeight: '800', color: COLORS.primaryDark },
  maintenanceCameraBtn: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  bottomSpacer: { height: 160 },

  /* ── PINK PILL BOTTOM NAV ── */
  bottomNavContainer: {
    position: 'absolute', bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center', width: '90%', zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primary, borderRadius: 100,
    paddingVertical: 12, paddingHorizontal: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 20,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },

  /* Modal */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  bottomSheetIndicator: {
    width: 40, height: 5, backgroundColor: COLORS.border,
    borderRadius: 3, alignSelf: 'center', marginBottom: 20,
  },
  bottomSheetTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, textAlign: 'center', marginBottom: 24 },
  pickerOptionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  pickerOption: { alignItems: 'center', gap: 12 },
  pickerIconCircle: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  pickerOptionText: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  cancelPickerBtn: {
    height: 56, borderRadius: 100, backgroundColor: COLORS.background,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  cancelPickerBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.textMuted },
});