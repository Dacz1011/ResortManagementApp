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
  Animated,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import {
  Bell,
  Shield,
  CircleHelp,
  ChevronRight,
  LogOut,
  Settings as SettingsIcon,
  Building,
  CreditCard,
  Info,
  User,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Camera,
  Image as ImageIcon
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
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
      { id: 'security', icon: Shield, title: 'Security & Access', subtitle: 'Manage staff accounts & credentials' },
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

  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop');
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const openCamera = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  const handleMenuItemPress = (id) => {
    if (id === 'security') {
      navigation.navigate('OwnerAccount');
    } else if (id === 'notif') {
      navigation.navigate('OwnerNotifications');
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
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <SettingsIcon size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Settings</Text>
                </View>
                <TouchableOpacity
                  style={styles.profileAvatarWrap}
                  onPress={() => setShowImagePicker(true)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.cameraBadge}>
                    <Camera size={10} color="#FFFFFF" strokeWidth={3} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>Admin Jr.</Text>
                <Text style={styles.heroSubStat}>Portfolio Owner • Verified Account</Text>
                <TouchableOpacity
                  style={styles.heroActionBtn}
                  activeOpacity={0.8}
                  onPress={() => setShowImagePicker(true)}
                >
                  <Text style={styles.heroActionBtnText}>Edit Profile Picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

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

          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={COLORS.dangerText} strokeWidth={2.5} style={{ marginRight: 10 }} />
            <Text style={styles.logoutButtonText}>Sign Out of Session</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>RESORT PORTFOLIO V3.1.0</Text>
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* IMAGE PICKER MODAL */}
      <Modal
        visible={showImagePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowImagePicker(false)}>
          <View style={[styles.bottomSheet, { paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom, 24) : 24 }]}>
            <View style={styles.bottomSheetIndicator} />
            <Text style={styles.bottomSheetTitle}>Update Profile Photo</Text>
            <View style={styles.pickerOptionsRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={openCamera} activeOpacity={0.7}>
                <View style={styles.pickerIconCircle}>
                  <Camera size={28} color={COLORS.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.pickerOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={openGallery} activeOpacity={0.7}>
                <View style={styles.pickerIconCircle}>
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
  profileAvatarWrap: {
    position: 'relative'
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

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
  bottomSpacer: {
    height: 160,
  },
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
    justifyContent: 'center', flex: 1,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  bottomSheetIndicator: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    textAlign: 'center',
    marginBottom: 24,
  },
  pickerOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  pickerOption: {
    alignItems: 'center',
    gap: 12,
  },
  pickerIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  cancelPickerBtn: {
    height: 56,
    borderRadius: 100,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelPickerBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
});