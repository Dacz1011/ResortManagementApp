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
  ArrowRight,
  MapPin,
  CalendarPlus
} from 'lucide-react-native';

// Premium Color Palette (Matched to PortfolioDashboard)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep Forest Green
  primaryLight: '#E8F0EA',  // Soft Green for active states
  primaryDark: '#0D1E14',   // Darker green
  accent: '#2DD4BF',        // Teal
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',       // Very light slate for inputs

  successBg: '#DCFCE7',
  successText: '#16A34A',
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
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${m}/${d}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER --- */}
        <View style={styles.headerForm}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Manual Entry</Text>
            <Text style={styles.headerTitle}>New Booking</Text>
          </View>
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
                  <Text style={styles.stepNumActive}>1</Text>
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>PROPERTY</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, (fullName && contact) && styles.stepCircleActive]}>
                  <Text style={(fullName && contact) ? styles.stepNumActive : styles.stepNum}>2</Text>
                </View>
                <Text style={[styles.stepLabel, (fullName && contact) && styles.stepLabelActive]}>DETAILS</Text>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, (nights > 0) && styles.stepCircleActive]}>
                  <Text style={(nights > 0) ? styles.stepNumActive : styles.stepNum}>3</Text>
                </View>
                <Text style={[styles.stepLabel, (nights > 0) && styles.stepLabelActive]}>PAYMENT</Text>
              </View>
            </View>

            {/* --- PROPERTY BENTO CARD --- */}
            <View style={styles.bentoCard}>
              <Text style={styles.bentoLabelDark}>SELECT PROPERTY</Text>
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
                        <Text style={[styles.propertyName, isSelected && styles.propertyNameActive]}>{prop.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                           <MapPin size={12} color={isSelected ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} style={{ marginRight: 4 }}/>
                           <Text style={[styles.propertySubtitle, isSelected && styles.propertySubtitleActive]}>{prop.subtitle}</Text>
                        </View>
                      </View>
                      <View style={styles.radioContainer}>
                        {isSelected ? (
                          <CheckCircle2 size={24} color={COLORS.primary} strokeWidth={2.5} />
                        ) : (
                          <Circle size={24} color={COLORS.border} strokeWidth={2} />
                        )}
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>

            {/* --- GUEST DETAILS BENTO CARD --- */}
            <View style={styles.bentoCard}>
              <Text style={styles.bentoLabelDark}>GUEST INFORMATION</Text>
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <User size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={COLORS.textMuted}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Smartphone size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="phone-pad"
                    value={contact}
                    onChangeText={setContact}
                  />
                </View>
              </View>
            </View>

            {/* --- DATES BENTO CARD --- */}
            <View style={styles.bentoCard}>
              <View style={styles.bentoHeaderRow}>
                <Text style={styles.bentoLabelDark}>STAY DURATION</Text>
                <TouchableOpacity onPress={mockSetDates} style={styles.autoFillBtn}>
                  <Text style={styles.autoFillText}>AUTO-FILL</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.durationRow}>
                <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7} onPress={mockSetDates}>
                  <Text style={styles.dateLabel}>CHECK-IN</Text>
                  <View style={styles.dateValueRow}>
                    <Calendar size={18} color={checkInDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                    <Text style={[styles.dateValue, checkInDate && styles.dateValueActive]}>
                      {formatDate(checkInDate)}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7} onPress={mockSetDates}>
                  <Text style={styles.dateLabel}>CHECK-OUT</Text>
                  <View style={styles.dateValueRow}>
                    <Calendar size={18} color={checkOutDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                    <Text style={[styles.dateValue, checkOutDate && styles.dateValueActive]}>
                      {formatDate(checkOutDate)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {nights > 0 && (
                <View style={styles.calculatedStayBox}>
                  <Text style={styles.calcStayLabel}>Calculated Stay:</Text>
                  <Text style={styles.calcStayValue}>{nights} nights</Text>
                </View>
              )}
            </View>

            {/* --- FINANCIALS BENTO CARD --- */}
            <View style={[styles.bentoCard, styles.financialsBento]}>
              <View style={styles.financialsHeaderRow}>
                <Text style={styles.financialsLabel}>TOTAL AMOUNT DUE</Text>
                <View style={styles.rateBadge}>
                  <Text style={styles.rateText}>₱{selectedProperty.rate.toLocaleString()}/night</Text>
                </View>
              </View>
              <Text style={[styles.financialsValue, totalAmount > 0 && styles.financialsValueActive]}>
                ₱ {totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </Text>
            </View>

            {/* --- CONFIRM BUTTON --- */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.confirmBtn, (!fullName || !contact || nights === 0) && styles.confirmBtnDisabled]}
              onPress={handleConfirmBooking}
            >
              <CalendarPlus size={22} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} />
              <Text style={styles.confirmBtnText}>Confirm Booking</Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  keyboardView: {
    flex: 1,
  },

  /* --- MODERN HEADER --- */
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '700',
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

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- STEPPER --- */
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  stepItem: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
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
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.border,
  },
  stepNumActive: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    color: COLORS.primary,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginTop: 15,
    marginHorizontal: 8,
    borderRadius: 1,
  },

  /* --- BENTO CARDS --- */
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  bentoLabelDark: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  bentoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  /* --- PROPERTY LIST --- */
  propertyList: {
    gap: 12,
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: COLORS.background,
    borderRadius: 20,
    padding: 16,
    backgroundColor: COLORS.inputBg,
  },
  propertyCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.2,
  },
  propertyNameActive: {
    color: COLORS.primary,
  },
  propertySubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  propertySubtitleActive: {
    color: COLORS.primary,
  },
  radioContainer: {
    marginLeft: 16,
  },

  /* --- INPUTS --- */
  inputGroup: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },

  /* --- DATES --- */
  autoFillBtn: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 16,
  },
  autoFillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  datePickerBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    padding: 16,
    height: 72,
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  dateValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 8,
  },
  dateValueActive: {
    color: COLORS.textMain,
    fontWeight: '800',
  },
  calculatedStayBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  calcStayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  calcStayValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- FINANCIALS BENTO --- */
  financialsBento: {
    backgroundColor: COLORS.primary,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  financialsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  financialsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  rateBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rateText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
  },
  financialsValue: {
    fontSize: 36,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: -1,
  },
  financialsValueActive: {
    color: '#FFFFFF',
  },

  /* --- CONFIRM BUTTON --- */
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 40, // Space before the end of scroll
  },
  confirmBtnDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmBtnText: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: '800',
  },

  bottomSpacer: {
    height: 40,
  },
});