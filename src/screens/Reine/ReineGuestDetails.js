import * as ImagePicker from 'expo-image-picker';
import {
  Calendar,
  Camera,
  CheckCircle2,
  ChevronLeft,
  Image as ImageIcon,
  Mail,
  Phone,
  User,
  Wallet,
  X
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../../context/BookingContext';

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

export default function ReineGuestDetails({ route, navigation }) {
  // Extract guest details passed from the history screen
  const { guest } = route.params || {};
  const { updateGuestPhotos } = useBookings();

  const [checkoutPhoto, setCheckoutPhoto] = useState(guest?.checkoutImage || null);
  const [guestPhoto, setGuestPhoto] = useState(guest?.image || null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [pickerType, setPickerType] = useState('checkout'); // 'guest' or 'checkout'
  const insets = useSafeAreaInsets(); // iOS compatibility fix

  // Fallback if no guest data is found
  if (!guest) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>No Guest Information Found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonFallback}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleImagePicked = (uri) => {
    if (pickerType === 'guest') {
      setGuestPhoto(uri);
    } else {
      setCheckoutPhoto(uri);
    }
  };

  const openCamera = async () => {
    setShowImagePicker(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: pickerType === 'guest' ? [1, 1] : [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      handleImagePicked(result.assets[0].uri);
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
      aspect: pickerType === 'guest' ? [1, 1] : [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      handleImagePicked(result.assets[0].uri);
    }
  };

  const triggerPicker = (type) => {
    setPickerType(type);
    setShowImagePicker(true);
  };

  const handleSave = async () => {
    // Parse checkIn and checkOut from the date string "Oct 5 - Oct 8"
    const dateParts = guest.date.split(' - ');
    const checkIn = dateParts[0];
    const checkOut = dateParts[1];

    const success = await updateGuestPhotos('Reine', guest.name, checkIn, checkOut, {
      image: guestPhoto,
      checkoutImage: checkoutPhoto
    });

    if (success) {
      Alert.alert("Success", "Guest details and documentation have been saved securely.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Could not save changes. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* iOS Fix: Dynamic padding instead of SafeAreaView for precise notch handling */}
      <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtnBack} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerSubtitle}>GUEST RECORD</Text>
            <Text style={styles.headerTitle}>Stay Details</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom + 20, 40) }]}
        >

          {/* PROFILE SUMMARY CARD */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                activeOpacity={0.8}
                onPress={() => triggerPicker('guest')}
              >
                {guestPhoto ? (
                  <Image source={{ uri: guestPhoto }} style={styles.avatarImage} />
                ) : (
                  <User size={32} color={COLORS.primary} strokeWidth={2} />
                )}
                <View style={styles.cameraBadge}>
                  <Camera size={12} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
              <View style={styles.profileTextWrap}>
                <Text style={styles.guestName}>{guest.name}</Text>
                <View style={styles.statusBadge}>
                  <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 4 }} />
                  <Text style={styles.statusBadgeText}>{guest.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <Phone size={16} color={COLORS.textMuted} style={styles.infoIcon} />
                <Text style={styles.infoText}>{guest.phone || 'Not Provided'}</Text>
              </View>
              <View style={styles.infoBox}>
                <Mail size={16} color={COLORS.textMuted} style={styles.infoIcon} />
                <Text style={styles.infoText}>{guest.email || 'Not Provided'}</Text>
              </View>
            </View>
          </View>

          {/* STAY DETAILS CARD */}
          <Text style={styles.sectionLabel}>RESERVATION INFO</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Calendar size={20} color={COLORS.primary} strokeWidth={2} />
              </View>
              <View style={styles.detailTextWrap}>
                <Text style={styles.detailLabel}>Stay Dates</Text>
                <Text style={styles.detailValue}>{guest.date}</Text>
                <Text style={styles.detailSubValue}>{guest.nights} Nights</Text>
              </View>
            </View>

            <View style={[styles.divider, { marginVertical: 16 }]} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Wallet size={20} color={COLORS.primary} strokeWidth={2} />
              </View>
              <View style={styles.detailTextWrap}>
                <Text style={styles.detailLabel}>Total Amount Paid</Text>
                <Text style={styles.detailValue}>{guest.amount}</Text>
                <Text style={styles.detailSubValue}>Fixed Rate</Text>
              </View>
            </View>
          </View>

          {/* CHECKOUT DOCUMENTATION (IMAGE UPLOAD) */}
          <Text style={styles.sectionLabel}>CHECKOUT DOCUMENTATION</Text>
          <View style={styles.uploadCard}>
            <Text style={styles.uploadDesc}>
              Upload a photo of the property or keys as proof of a finished vacation.
            </Text>

            {checkoutPhoto ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: checkoutPhoto }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageBtn} onPress={() => setCheckoutPhoto(null)}>
                  <X size={16} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
                <View style={styles.successBadgeSmall}>
                  <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.successBadgeTextSmall}>Proof Uploaded</Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadBox}
                activeOpacity={0.7}
                onPress={() => triggerPicker('checkout')}
              >
                <Camera size={32} color={COLORS.primary} strokeWidth={1.5} style={{ marginBottom: 12 }} />
                <Text style={styles.uploadText}>Tap to Capture or Upload</Text>
              </TouchableOpacity>
            )}

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveBtn, (!checkoutPhoto && !guestPhoto) && styles.saveBtnDisabled]}
              activeOpacity={0.8}
              disabled={!checkoutPhoto && !guestPhoto}
              onPress={handleSave}
            >
              <Text style={styles.saveBtnText}>Save All Changes</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

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
            <Text style={styles.bottomSheetTitle}>
              {pickerType === 'guest' ? 'Update Guest Photo' : 'Select Proof Source'}
            </Text>
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
  errorText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 20,
  },
  backButtonFallback: {
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  iconBtnBack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  scrollContent: {
    paddingHorizontal: 24,
    // paddingBottom is handled dynamically
  },

  /* PROFILE CARD */
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileTextWrap: {
    flex: 1,
  },
  guestName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  infoRow: {
    gap: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },

  /* SECTION LABELS */
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },

  /* DETAILS CARD */
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailTextWrap: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  detailSubValue: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* UPLOAD CARD */
  uploadCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  uploadDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginBottom: 20,
    lineHeight: 20,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: COLORS.background,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 16,
    gap: 6,
  },
  successBadgeTextSmall: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.successText,
  },
  saveBtn: {
    height: 60,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    // paddingBottom is handled dynamically in component
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