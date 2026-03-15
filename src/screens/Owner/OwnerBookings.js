import React, { useState, useEffect } from 'react';
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
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  CheckCircle2,
  Circle,
  User,
  Smartphone,
  Calendar,
  Send,
  ArrowRight
} from 'lucide-react-native';

const COLORS = {
  background: '#FFFFFF',
  primary: '#1A3626',       // Dark forest green from mockup
  primaryLight: '#E8F0EA',  // Light green background for summary
  textMain: '#1E293B',
  textMuted: '#94A3B8',
  borderLight: '#CBD5E1',
  borderGreen: '#A3B8AA',   // Subtle green border for inputs
  success: '#15803D',
};

const PROPERTIES = [
  { id: 'reine', name: "Reine's Beach House", subtitle: 'Luxury Oceanfront Suites', rate: 12000 },
  { id: 'ryu', name: "Ryu's Transient House", subtitle: 'Urban Comfort & Convenience', rate: 8000 },
  { id: 'casa', name: "Casa M.O.", subtitle: 'Traditional Heritage Villa', rate: 15000 },
];

export default function OwnerBookings({ navigation }) {
  const [selectedPropertyId, setSelectedPropertyId] = useState('reine');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);

  // Calculate nights and total whenever dates or property change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffNights > 0 ? diffNights : 0);

      if (diffNights > 0) {
        setTotalAmount(diffNights * selectedProperty.rate);
      } else {
        setTotalAmount(0);
      }
    } else {
      setNights(0);
      setTotalAmount(0);
    }
  }, [checkInDate, checkOutDate, selectedPropertyId]);

  const handleConfirmBooking = () => {
    if (!fullName || !contact || !checkInDate || !checkOutDate) {
      Alert.alert('Missing Information', 'Please fill in all guest and stay details.');
      return;
    }

    if (nights <= 0) {
      Alert.alert('Invalid Dates', 'Check-out date must be after check-in date.');
      return;
    }

    Alert.alert(
      'Booking Confirmed',
      `Success! ${fullName} has been booked for ${selectedProperty.name} for ${nights} nights.\n\nTotal: ₱${totalAmount.toLocaleString()}`,
      [{ text: 'OK', onPress: () => navigation.navigate('OwnerDashboard') }]
    );
  };

  // Mocking date selection for now since external pickers require specific setup
  const mockSetDates = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2); // 2 nights
    setCheckInDate(today);
    setCheckOutDate(tomorrow);
  };

  const formatDate = (date) => {
    if (!date) return 'mm/dd/yyyy';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={[styles.backText, { fontFamily: 'Manrope-Bold' }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Manual Booking</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- STEPPER --- */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleActive]}>
                <Text style={[styles.stepNumActive, { fontFamily: 'Manrope-Bold' }]}>1</Text>
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelActive, { fontFamily: 'Manrope-ExtraBold' }]}>PROPERTY</Text>
            </View>

            <View style={styles.stepLine} />

            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={[styles.stepNum, { fontFamily: 'Manrope-Bold' }]}>2</Text>
              </View>
              <Text style={[styles.stepLabel, { fontFamily: 'Manrope-ExtraBold' }]}>DETAILS</Text>
            </View>

            <View style={styles.stepLine} />

            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={[styles.stepNum, { fontFamily: 'Manrope-Bold' }]}>3</Text>
              </View>
              <Text style={[styles.stepLabel, { fontFamily: 'Manrope-ExtraBold' }]}>PAYMENT</Text>
            </View>
          </View>

          {/* --- SELECT PROPERTY --- */}
          <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>SELECT PROPERTY</Text>
          <View style={styles.propertyList}>
            {PROPERTIES.map((prop) => {
              const isSelected = selectedPropertyId === prop.id;
              return (
                <TouchableOpacity
                  key={prop.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedPropertyId(prop.id)}
                  style={[styles.propertyCard, isSelected && styles.propertyCardActive]}
                >
                  <View style={styles.propertyInfo}>
                    <Text style={[styles.propertyName, { fontFamily: 'Manrope-Bold' }]}>{prop.name}</Text>
                    <Text style={[styles.propertySubtitle, { fontFamily: 'Manrope-Medium' }]}>{prop.subtitle}</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    {isSelected ? (
                      <CheckCircle2 size={24} color={COLORS.primary} strokeWidth={2} />
                    ) : (
                      <Circle size={24} color={COLORS.borderLight} strokeWidth={2} />
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* --- GUEST INFORMATION --- */}
          <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>GUEST INFORMATION</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <User size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { fontFamily: 'Manrope-SemiBold' }]}
                placeholder="Full Name"
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Smartphone size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { fontFamily: 'Manrope-SemiBold' }]}
                placeholder="Contact Number"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={contact}
                onChangeText={setContact}
              />
            </View>
          </View>

          {/* --- STAY DURATION --- */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>STAY DURATION</Text>
            <TouchableOpacity onPress={mockSetDates}>
              <Text style={{ fontSize: 10, color: COLORS.success, fontFamily: 'Manrope-Bold' }}>AUTO-FILL DATES</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.durationRow}>
            <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7} onPress={mockSetDates}>
              <Text style={[styles.dateLabel, { fontFamily: 'Manrope-ExtraBold' }]}>CHECK-IN</Text>
              <View style={styles.dateValueRow}>
                <Calendar size={18} color={COLORS.primary} />
                <Text style={[styles.dateValue, { fontFamily: 'Manrope-Bold', color: checkInDate ? COLORS.textMain : COLORS.textMuted }]}>
                  {formatDate(checkInDate)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7} onPress={mockSetDates}>
              <Text style={[styles.dateLabel, { fontFamily: 'Manrope-ExtraBold' }]}>CHECK-OUT</Text>
              <View style={styles.dateValueRow}>
                <Calendar size={18} color={COLORS.primary} />
                <Text style={[styles.dateValue, { fontFamily: 'Manrope-Bold', color: checkOutDate ? COLORS.textMain : COLORS.textMuted }]}>
                  {formatDate(checkOutDate)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.calculatedStayBox}>
            <Text style={[styles.calcStayLabel, { fontFamily: 'Manrope-Bold' }]}>Calculated Stay:</Text>
            <Text style={[styles.calcStayValue, { fontFamily: 'Manrope-ExtraBold' }]}>
              {nights > 0 ? `${nights} nights` : '- nights'}
            </Text>
          </View>

          {/* --- FINANCIALS --- */}
          <Text style={[styles.sectionTitle, { fontFamily: 'Manrope-ExtraBold' }]}>FINANCIALS</Text>
          <View style={styles.financialsBox}>
            <Text style={[styles.financialsLabel, { fontFamily: 'Manrope-Bold' }]}>TOTAL AMOUNT DUE</Text>
            <Text style={[styles.financialsValue, { fontFamily: 'Manrope-Bold', color: totalAmount > 0 ? COLORS.textMain : '#D1D5DB' }]}>
              ₱ {totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- BOTTOM CONFIRM BUTTON --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.confirmBtn}
          onPress={handleConfirmBooking}
        >
          <Text style={[styles.confirmBtnText, { fontFamily: 'Manrope-Bold' }]}>Confirm Booking</Text>
          <Send size={20} color="#FFFFFF" strokeWidth={2} style={{ marginLeft: 8 }} />
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
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textMain,
  },
  headerRight: {
    width: 80,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepItem: {
    alignItems: 'center',
    width: 70,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepNum: {
    fontSize: 14,
    color: COLORS.borderLight,
  },
  stepNumActive: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 10,
    color: COLORS.borderLight,
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    color: COLORS.primary,
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginTop: 18,
    marginHorizontal: -10,
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  propertyList: {
    gap: 12,
    marginBottom: 24,
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  propertyCardActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: 15,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 15,
    color: COLORS.textMain,
    marginBottom: 4,
  },
  propertySubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  radioContainer: {
    marginLeft: 16,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.textMain,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  datePickerBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    padding: 14,
  },
  dateLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  dateValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateValue: {
    fontSize: 14,
    color: COLORS.textMain,
    marginLeft: 8,
  },
  calculatedStayBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F7F4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  calcStayLabel: {
    fontSize: 14,
    color: COLORS.primary,
  },
  calcStayValue: {
    fontSize: 14,
    color: COLORS.primary,
  },
  financialsBox: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 16,
    padding: 20,
    paddingBottom: 32,
  },
  financialsLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  financialsValue: {
    fontSize: 32,
  },
  bottomSpacer: {
    height: 40,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});
