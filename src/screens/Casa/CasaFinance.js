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
import { useEffect, useRef, useState, useCallback } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Casa Deep Forest Green Palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#0D3B10',        // Casa Dark Green
  surfaceDarkActive: '#1B5E20',

  primary: '#1B5E20',            // Casa Primary
  primaryLight: '#E8F5E9',       // Casa Light Tint
  primaryDark: '#0A2E0C',

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

export default function CasaFinance({ navigation }) {
  const activeNav = 'Finance';
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ income: 0, expenses: 0, net: 0 });
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const collections = await mockDb.getAll('dailyCollections');
      const electricity = await mockDb.getAll('electricityBills');
      const water = await mockDb.getAll('waterBills');
      const pettyCash = await mockDb.getAll('pettyCash');

      const propertyName = "Casa M.O.";

      const myCollections = collections.filter(c => c.property === propertyName);
      const myElectricity = electricity.filter(e => e.property === propertyName);
      const myWater = water.filter(w => w.property === propertyName);
      const myPettyCash = pettyCash.filter(p => p.property === propertyName);

      const allTx = [
        ...myCollections.map(c => ({ id: c.id, type: 'income', title: 'Daily Collection', subtitle: `Guest Stay`, amount: `+ ₱${Number(c.amount).toLocaleString()}`, date: c.date, icon: PlusCircle, rawAmount: Number(c.amount) })),
        ...myElectricity.map(e => ({ id: e.id, type: 'expense', title: 'Electricity Utility', subtitle: 'Monthly Bill', amount: `- ₱${Number(e.amount).toLocaleString()}`, date: e.date, icon: Zap, rawAmount: Number(e.amount) })),
        ...myWater.map(w => ({ id: w.id, type: 'expense', title: 'Water Utility', subtitle: 'Monthly Bill', amount: `- ₱${Number(w.amount).toLocaleString()}`, date: w.date, icon: Droplet, rawAmount: Number(w.amount) })),
        ...myPettyCash.map(p => ({ id: p.id, type: 'expense', title: p.category, subtitle: p.description, amount: `- ₱${Number(p.amount).toLocaleString()}`, date: p.date, icon: Banknote, rawAmount: Number(p.amount) }))
      ];

      allTx.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(allTx.slice(0, 10));

      const totalIncome = myCollections.reduce((sum, c) => sum + Number(c.amount), 0);
      const totalExpenses = myElectricity.reduce((sum, e) => sum + Number(e.amount), 0) +
                            myWater.reduce((sum, w) => sum + Number(w.amount), 0) +
                            myPettyCash.reduce((sum, p) => sum + Number(p.amount), 0);

      setStats({
        income: totalIncome,
        expenses: totalExpenses,
        net: totalIncome - totalExpenses
      });
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFinanceData();
    }, [])
  );

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

  const handleLogUtility = async () => {
    if (!utilityAmount) { Alert.alert('Error', 'Please enter an amount.'); return; }
    const collection = utilityType === 'Electric Bill' ? 'electricityBills' : (utilityType === 'Water Bill' ? 'waterBills' : 'otherExpenses');
    const success = await mockDb.add(collection, {
      property: "Casa M.O.",
      amount: utilityAmount,
      date: new Date().toISOString().split('T')[0],
      type: utilityType,
      image: utilityImage
    });
    if (success) {
      Alert.alert('Success', 'Utility expense logged successfully.');
      setUtilityAmount('');
      setUtilityImage(null);
      fetchFinanceData();
    }
  };

  const handleLogPettyCash = async () => {
    if (!pettyAmount || !itemDesc) { Alert.alert('Error', 'Please fill in all fields.'); return; }
    const success = await mockDb.add('pettyCash', {
      property: "Casa M.O.",
      amount: pettyAmount,
      description: itemDesc,
      category: pettyCashCategory,
      date: new Date().toISOString().split('T')[0]
    });
    if (success) {
      Alert.alert('Success', 'Petty cash entry logged successfully.');
      setPettyAmount('');
      setItemDesc('');
      fetchFinanceData();
    }
  };

  const handleReportIssue = async () => {
    if (!issueDesc) { Alert.alert('Error', 'Please enter a description.'); return; }
    const success = await mockDb.add('maintenance', {
      property: "Casa M.O.",
      description: issueDesc,
      status: 'Open',
      priority: 'Medium',
      reportedDate: new Date().toISOString().split('T')[0],
      type: issueType,
      image: maintenanceImage
    });
    if (success) {
      Alert.alert('Success', 'Issue reported to maintenance.');
      setIssueDesc('');
      setMaintenanceImage(null);
    }
  };

  const renderTransactionList = () => (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      style={{ opacity: fadeAnim }}
    >
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.heroOverlay} />
          <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
            <View style={styles.topBar}>
              <View style={styles.locationPill}>
                <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                <Text style={styles.locationText}>Finance</Text>
              </View>
              <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8}>
                <Bell size={18} color="#FFFFFF" strokeWidth={2.5} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroBottomContent}>
              <Text style={styles.heroMainStat}>
                ₱{stats.net.toLocaleString()}<Text style={styles.heroSubDecimals}>.00</Text>
              </Text>
              <Text style={styles.heroSubStat}>Net Revenue — This Month</Text>

              <View style={styles.trendPill}>
                <View style={styles.trendPillIconBox}>
                  <TrendingUp size={18} color={COLORS.successText} strokeWidth={2.5} />
                </View>
                <View style={styles.trendPillTextWrap}>
                  <Text style={styles.trendPillTitle}>Overall Portfolio Status</Text>
                  <Text style={styles.trendPillSubtitle}>Income ₱{stats.income.toLocaleString()} · Expenses ₱{stats.expenses.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.quickActionsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
          <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8}><Text style={styles.actionPillDarkText}>All Activity</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}><Text style={styles.actionPillLightText}>Income</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}><Text style={styles.actionPillLightText}>Expenses</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}><Text style={styles.actionPillLightText}>This Month</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7} onPress={() => setShowExpenseForm(true)}>
            <Text style={styles.actionPillLightText}>+ Log Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Month Snapshot</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <ArrowDownRight size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View><Text style={styles.snapshotValue}>₱{stats.income.toLocaleString()}</Text><Text style={styles.snapshotLabel}>Total Income</Text></View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <ArrowUpRight size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View><Text style={styles.snapshotValue}>₱{stats.expenses.toLocaleString()}</Text><Text style={styles.snapshotLabel}>Total Expenses</Text></View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
              <View style={styles.snapshotOverlay} />
              <View style={styles.snapshotContent}>
                <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                <View><Text style={styles.snapshotValue}>₱{stats.net.toLocaleString()}</Text><Text style={styles.snapshotLabel}>Net Revenue</Text></View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {transactions.length > 0 ? (
            transactions.map((tx) => {
              const Icon = tx.icon;
              const isIncome = tx.type === 'income';
              return (
                <TouchableOpacity key={tx.id} activeOpacity={0.7} style={styles.txCard}>
                  <View style={styles.txLeft}>
                    <View style={[styles.txIconWrapper, { backgroundColor: isIncome ? COLORS.successBg : COLORS.primaryLight }]}>
                      <Icon size={20} color={isIncome ? COLORS.successText : COLORS.primary} strokeWidth={2.5} />
                    </View>
                    <View><Text style={styles.txTitle}>{tx.title}</Text><Text style={styles.txDesc}>{tx.subtitle}</Text></View>
                  </View>
                  <View style={styles.txRight}>
                    <Text style={[styles.txAmount, { color: isIncome ? COLORS.successText : COLORS.textMain }]}>{tx.amount}</Text>
                    <Text style={styles.txDate}>{tx.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ padding: 40, alignItems: 'center' }}>
                <Text style={{ color: COLORS.textMuted }}>No transactions found.</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </Animated.ScrollView>
  );

  const renderExpenseLogger = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        <View style={[styles.heroContainer, { height: 220 }]}>
          <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay} />
            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setShowExpenseForm(false)} style={styles.iconBtnDark} activeOpacity={0.8}>
                  <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={styles.locationPill}><Banknote size={14} color="#FFFFFF" style={styles.locationIcon} /><Text style={styles.locationText}>Expense Logger</Text></View>
                <View style={{ width: 44 }} />
              </View>
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>Record Entry</Text>
                <Text style={styles.heroSubStat}>Log utilities, petty cash & issues</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}><Zap size={18} color={COLORS.primary} strokeWidth={2.5} /></View>
              <Text style={styles.sectionTitleForm}>Utility Bills</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formLabel}>UTILITY TYPE</Text>
            <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.8} onPress={() => setShowUtilityTypeDropdown(!showUtilityDropdown)}>
              <Text style={styles.dropdownText}>{utilityType}</Text><ChevronDown size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
            {showUtilityDropdown && (
              <View style={styles.dropdownMenu}>
                {UTILITY_TYPES.map((type) => (
                  <TouchableOpacity key={type} style={styles.dropdownItem} onPress={() => { setUtilityType(type); setShowUtilityTypeDropdown(false); }}>
                    <Text style={[styles.dropdownItemText, utilityType === type && { color: COLORS.primary, fontWeight: '800' }]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.formLabel}>AMOUNT DUE</Text>
            <View style={styles.amountInputBox}>
              <View style={styles.pesoBox}><Text style={styles.pesoText}>₱</Text></View>
              <TextInput style={styles.amountInput} placeholder="0.00" placeholderTextColor={COLORS.textMuted} keyboardType="decimal-pad" value={utilityAmount} onChangeText={setUtilityAmount} />
            </View>

            <Text style={styles.formLabel}>STATEMENT PHOTO</Text>
            {utilityImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: utilityImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => setUtilityImage(null)}><X size={16} color="#FFFFFF" strokeWidth={3} /></TouchableOpacity>
                <View style={styles.successBadgeSmall}><CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} /><Text style={styles.successBadgeTextSmall}>Photo Attached</Text></View>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => handleUploadImage('utility')}>
                <Camera size={28} color={COLORS.textMuted} strokeWidth={2} style={{ marginBottom: 8 }} />
                <Text style={styles.uploadText}>Tap to Upload Photo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.blackSubmitBtn} activeOpacity={0.85} onPress={handleLogUtility}>
              <Text style={styles.blackSubmitBtnText}>Log Utility Expense</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}><Banknote size={18} color={COLORS.primary} strokeWidth={2.5} /></View>
              <Text style={styles.sectionTitleForm}>Petty Cash</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.toggleRow}>
              <TouchableOpacity style={[styles.toggleBtn, pettyCashCategory === 'Daily Supplies' && styles.toggleBtnActive]} onPress={() => setPettyCashCategory('Daily Supplies')} activeOpacity={0.8}>
                <ShoppingBag size={20} color={pettyCashCategory === 'Daily Supplies' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                <Text style={[styles.toggleText, pettyCashCategory === 'Daily Supplies' && { color: COLORS.primary }]}>Supplies</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleBtn, pettyCashCategory === 'Cleaning' && styles.toggleBtnActive]} onPress={() => setPettyCashCategory('Cleaning')} activeOpacity={0.8}>
                <Wind size={20} color={pettyCashCategory === 'Cleaning' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                <Text style={[styles.toggleText, pettyCashCategory === 'Cleaning' && { color: COLORS.primary }]}>Cleaning</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLabel}>ITEM DESCRIPTION</Text>
            <TextInput style={styles.textInput} placeholder="e.g. 5kg Detergent, Coffee" placeholderTextColor={COLORS.textMuted} value={itemDesc} onChangeText={setItemDesc} />

            <Text style={styles.formLabel}>TOTAL SPENT</Text>
            <View style={styles.amountInputBox}>
              <View style={styles.pesoBox}><Text style={styles.pesoText}>₱</Text></View>
              <TextInput style={styles.amountInput} placeholder="0.00" placeholderTextColor={COLORS.textMuted} keyboardType="decimal-pad" value={pettyAmount} onChangeText={setPettyAmount} />
            </View>

            <TouchableOpacity style={styles.outlineSubmitBtn} activeOpacity={0.85} onPress={handleLogPettyCash}>
              <Text style={styles.outlineSubmitBtnText}>Log Petty Cash</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconTitle}>
              <View style={styles.sectionIconBox}><Wrench size={18} color={COLORS.primary} strokeWidth={2.5} /></View>
              <Text style={styles.sectionTitleForm}>Maintenance Log</Text>
            </View>
          </View>

          <View style={styles.maintenanceCard}>
            <View style={styles.maintenanceAlertBox}>
              <View style={styles.maintenanceAlertIcon}><Megaphone size={16} color="#FFFFFF" strokeWidth={2.5} /></View>
              <Text style={styles.maintenanceAlertText}>Report issues directly to owner</Text>
            </View>

            <Text style={styles.maintenanceFormLabel}>ISSUE TYPE</Text>
            <TouchableOpacity style={styles.maintenanceDropdown} activeOpacity={0.8} onPress={() => setShowIssueDropdown(!showIssueDropdown)}>
              <Text style={styles.maintenanceDropdownText}>{issueType}</Text><ChevronDown size={20} color="#FFFFFF" opacity={0.7} />
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
            <TextInput style={styles.maintenanceTextArea} placeholder="Describe the problem..." placeholderTextColor="rgba(255,255,255,0.5)" multiline textAlignVertical="top" value={issueDesc} onChangeText={setIssueDesc} />

            {maintenanceImage && (
              <View style={styles.maintenanceImagePreviewContainer}>
                <Image source={{ uri: maintenanceImage }} style={styles.maintenanceImagePreview} />
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => setMaintenanceImage(null)}><X size={16} color="#FFFFFF" strokeWidth={3} /></TouchableOpacity>
              </View>
            )}

            <View style={styles.maintenanceActionRow}>
              <TouchableOpacity style={styles.maintenanceSubmitBtn} activeOpacity={0.85} onPress={handleReportIssue}>
                <Text style={styles.maintenanceSubmitBtnText}>Report Issue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.maintenanceCameraBtn, maintenanceImage && { backgroundColor: 'rgba(255,255,255,0.4)' }]} activeOpacity={0.8} onPress={() => handleUploadImage('maintenance')}>
                <Camera size={24} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
      
      <Modal visible={showImagePicker} transparent animationType="fade" onRequestClose={() => setShowImagePicker(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowImagePicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetIndicator} />
            <Text style={styles.bottomSheetTitle}>Select Source</Text>
            <View style={styles.pickerOptionsRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={openCamera} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: COLORS.primaryLight }]}><Camera size={28} color={COLORS.primary} strokeWidth={2.5} /></View>
                <Text style={styles.pickerOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={openGallery} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: COLORS.primaryLight }]}><ImageIcon size={28} color={COLORS.primary} strokeWidth={2.5} /></View>
                <Text style={styles.pickerOptionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelPickerBtn} onPress={() => setShowImagePicker(false)}><Text style={styles.cancelPickerBtnText}>Cancel</Text></TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {showExpenseForm ? renderExpenseLogger() : renderTransactionList()}
      {!showExpenseForm && (
        <TouchableOpacity activeOpacity={0.9} style={styles.fab} onPress={() => setShowExpenseForm(true)}>
          <Plus size={24} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      )}

      {/* ── BLACK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('CasaHome')} style={styles.navItem} activeOpacity={0.8}><Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaBookings')} style={styles.navItem} activeOpacity={0.8}><CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaGuestMgmt')} style={styles.navItem} activeOpacity={0.8}><Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowExpenseForm(false); }} style={styles.navItem} activeOpacity={0.8}><Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaAdmin')} style={styles.navItem} activeOpacity={0.8}><Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 260 },
  heroImage: { width: '100%', height: '100%' },
  heroImageStyle: {},
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(27, 94, 32, 0.65)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 28, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  notificationDot: { position: 'absolute', top: 10, right: 12, width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary, borderWidth: 2, borderColor: '#FFFFFF' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  heroMainStat: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubDecimals: { fontSize: 24, color: 'rgba(255,255,255,0.7)' },
  heroSubStat: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginBottom: 4, textAlign: 'center' },
  trendPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(24,24,27,0.65)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  trendPillIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.successBg, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  trendPillTextWrap: {},
  trendPillTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  trendPillSubtitle: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100 },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  mainContent: { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader: { marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  snapshotScroll: { gap: 16, paddingBottom: 8 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)', borderRadius: 24 },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 8 },
  viewAllText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  transactionsList: { gap: 14 },
  txCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  txLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  txIconWrapper: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  txTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 3, letterSpacing: -0.2 },
  txDesc: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 16, fontWeight: '800', marginBottom: 4, letterSpacing: -0.5 },
  txDate: { fontSize: 11, fontWeight: '500', color: COLORS.textMuted },
  fab: { position: 'absolute', bottom: Platform.OS === 'ios' ? 120 : 110, right: 24, width: 60, height: 60, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8, zIndex: 10 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 8 },
  sectionIconTitle: { flexDirection: 'row', alignItems: 'center' },
  sectionIconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  sectionTitleForm: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  formCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 28, borderWidth: 1, borderColor: COLORS.border },
  formLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 0.5, marginLeft: 4 },
  dropdownInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.background, borderRadius: 16, paddingHorizontal: 20, height: 56, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  dropdownText: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
  dropdownMenu: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 8, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  dropdownItem: { padding: 14, borderRadius: 12 },
  dropdownItemText: { fontSize: 14, color: COLORS.textMain, fontWeight: '500' },
  amountInputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 16, paddingHorizontal: 20, height: 56, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  pesoBox: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  pesoText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  amountInput: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textMain, height: '100%' },
  textInput: { backgroundColor: COLORS.background, borderRadius: 16, paddingHorizontal: 20, height: 56, fontSize: 15, fontWeight: '600', color: COLORS.textMain, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  uploadBox: { borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: 20, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 24, backgroundColor: COLORS.background },
  uploadText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  imagePreviewContainer: { position: 'relative', marginBottom: 24 },
  imagePreview: { width: '100%', height: 180, borderRadius: 20 },
  removeImageBtn: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  successBadgeSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successBg, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginTop: 12, gap: 6 },
  successBadgeTextSmall: { fontSize: 11, fontWeight: '800', color: COLORS.successText },
  blackSubmitBtn: { height: 60, borderRadius: 100, backgroundColor: COLORS.surfaceDark, justifyContent: 'center', alignItems: 'center' },
  blackSubmitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  outlineSubmitBtn: { height: 60, borderRadius: 100, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.surfaceDark },
  outlineSubmitBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.surfaceDark },
  toggleRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  toggleBtn: { flex: 1, height: 88, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  toggleBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, borderWidth: 2 },
  toggleText: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted, marginTop: 8 },
  maintenanceCard: { backgroundColor: COLORS.primaryDark, borderRadius: 24, padding: 24, marginBottom: 32, shadowColor: COLORS.primaryDark, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  maintenanceAlertBox: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.15)', paddingBottom: 16, marginBottom: 20 },
  maintenanceAlertIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  maintenanceAlertText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  maintenanceFormLabel: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.8)', marginBottom: 8, letterSpacing: 0.5, marginLeft: 4 },
  maintenanceDropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, paddingHorizontal: 20, height: 56, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  maintenanceDropdownText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  maintenanceDropdownMenu: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 8, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  maintenanceDropdownItem: { padding: 14, borderRadius: 12 },
  maintenanceDropdownItemText: { fontSize: 14, color: '#FFFFFF', opacity: 0.8 },
  maintenanceTextArea: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18, height: 120, fontSize: 15, fontWeight: '500', color: '#FFFFFF', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  maintenanceImagePreviewContainer: { position: 'relative', marginBottom: 20 },
  maintenanceImagePreview: { width: '100%', height: 150, borderRadius: 16 },
  maintenanceActionRow: { flexDirection: 'row', gap: 12 },
  maintenanceSubmitBtn: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 100, height: 56, justifyContent: 'center', alignItems: 'center' },
  maintenanceSubmitBtnText: { fontSize: 16, fontWeight: '800', color: COLORS.primaryDark },
  maintenanceCameraBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  bottomSheetIndicator: { width: 40, height: 5, backgroundColor: COLORS.border, borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  bottomSheetTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, textAlign: 'center', marginBottom: 24 },
  pickerOptionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  pickerOption: { alignItems: 'center', gap: 12 },
  pickerIconCircle: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  pickerOptionText: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  cancelPickerBtn: { height: 56, borderRadius: 100, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  cancelPickerBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.textMuted },
});