import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bell,
  Shield,
  CircleHelp,
  ChevronRight,
  LogOut,
  Settings as SettingsIcon,
  CheckCircle2,
  Building,
  CreditCard,
  Info,
  User,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  X,
  UserPlus,
  Lock,
  MapPin,
  Settings
} from 'lucide-react-native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Matched strictly to Reine palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
};

// Grouped Settings
const MENU_GROUPS = [
  {
    title: 'PORTFOLIO MANAGEMENT',
    items: [
      { id: 'profile', icon: Building, title: 'Portfolio Profile', subtitle: 'Manage portfolio details & properties' },
      { id: 'billing', icon: CreditCard, title: 'Billing Details', subtitle: 'Payout methods & tax info' },
    ]
  },
  {
    title: 'ACCOUNT & PREFERENCES',
    items: [
      { id: 'personal', icon: User, title: 'Personal Information', subtitle: 'Admin profile details' },
      { id: 'notif', icon: Bell, title: 'Notifications', subtitle: 'Alerts, emails, and messages' },
      { id: 'security', icon: Shield, title: 'Security', subtitle: 'Create Admin accounts & credentials' },
    ]
  },
  {
    title: 'SUPPORT & ABOUT',
    items: [
      { id: 'help', icon: CircleHelp, title: 'Help Center', subtitle: 'Guides and customer support' },
      { id: 'about', icon: Info, title: 'About App', subtitle: 'Version 3.1.0' },
    ]
  }
];

export default function OwnerSettings({ navigation }) {
  const activeNav = 'Settings';
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // --- ADMIN CREATION STATES ---
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = () => {
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  const handleCreateAccount = async () => {
    if (!fullName || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await mockDb.add('users', {
        fullName,
        username: username.toLowerCase().trim(),
        password,
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      });

      Alert.alert('Success', 'Admin account created successfully.');
      setShowAdminModal(false);
      setFullName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error creating admin account:", error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenuItemPress = (id) => {
    if (id === 'security') {
      setShowAdminModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              {/* Top bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <SettingsIcon size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Settings</Text>
                </View>
                <TouchableOpacity style={styles.profileAvatarWrap} onPress={() => {}}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>

              {/* Hero text */}
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>Admin Jr.</Text>
                <Text style={styles.heroSubStat}>Portfolio Owner • Verified Account</Text>
                <TouchableOpacity style={styles.heroActionBtn} activeOpacity={0.8}>
                  <Text style={styles.heroActionBtnText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ── MAIN CONTENT ── */}
        <View style={styles.mainContent}>
          {MENU_GROUPS.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.menuGroup}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
              </View>

              <View style={styles.menuCard}>
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === group.items.length - 1;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      onPress={() => handleMenuItemPress(item.id)}
                      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
                    >
                      <View style={styles.iconBox}>
                        <Icon size={20} color={COLORS.primary} strokeWidth={2.5} />
                      </View>

                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      </View>

                      <ChevronRight size={20} color={COLORS.border} strokeWidth={2.5} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* ── LOGOUT BUTTON ── */}
          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={COLORS.dangerText} strokeWidth={2.5} style={{ marginRight: 10 }} />
            <Text style={styles.logoutButtonText}>Sign Out of Session</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>RESORT PORTFOLIO V3.1.0</Text>
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* --- ADMIN ACCOUNT CREATION MODAL --- */}
      <Modal
        visible={showAdminModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdminModal(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>New Admin Account</Text>
                <TouchableOpacity onPress={() => setShowAdminModal(false)}>
                  <X size={24} color={COLORS.textMain} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>FULL NAME</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor={COLORS.textMuted}
                    value={fullName}
                    onChangeText={setFullName}
                  />

                  <Text style={styles.formLabel}>USERNAME</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    placeholderTextColor={COLORS.textMuted}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                  />

                  <Text style={styles.formLabel}>PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor={COLORS.textMuted}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />

                  <Text style={styles.formLabel}>CONFIRM PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={COLORS.textMuted}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />

                  <TouchableOpacity
                    style={[styles.primarySubmitBtn, isSubmitting && { opacity: 0.7 }]}
                    onPress={handleCreateAccount}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.primarySubmitBtnText}>
                      {isSubmitting ? 'Creating...' : 'Create Admin Account'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <SettingsIcon size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
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

  /* ── HERO ── */
  heroContainer: {
    width: '100%',
    height: 420,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageStyle: {},
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  locationIcon: {
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileAvatarWrap: { position: 'relative' },
  profileAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#FFFFFF' },
  notificationDot: { position: 'absolute', top: 2, right: 2, width: 12, height: 12, backgroundColor: COLORS.primary, borderRadius: 6, borderWidth: 2, borderColor: '#FFFFFF' },

  heroBottomContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  heroMainStat: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    textAlign: 'center',
  },
  heroSubStat: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  heroActionBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginTop: 12,
  },
  heroActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* ── MAIN CONTENT ── */
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  menuGroup: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },

  /* ── MENU CARD ── */
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted
  },

  /* ── LOGOUT & FOOTER ── */
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.dangerBg,
    borderRadius: 24,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutButtonText: {
    color: COLORS.dangerText,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 24,
  },

  /* ── MODAL STYLES ── */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  formGroup: {
    gap: 16,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 15,
    color: COLORS.textMain,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  primarySubmitBtn: {
    height: 60,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  primarySubmitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  bottomSpacer: {
    height: 160,
  },

  /* ── BOTTOM NAV ── */
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
    backgroundColor: COLORS.primary,
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
});