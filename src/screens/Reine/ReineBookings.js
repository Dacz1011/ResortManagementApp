import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  User,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react-native';

const COLORS = {
  background: '#FFFFFF',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#3A4D6B',
  textMain: '#0F172A',
  textMuted: '#94A3B8',
  border: '#CBD5E1',
  borderFocus: '#94A3B8',
};

export default function RyuBookings({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Booking for Ryu's House</Text>
        </View>
        <View style={{ width: 40 }} /> {/* Spacer for centering */}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- GUEST INFORMATION --- */}
          <View style={styles.sectionHeaderRow}>
            <User size={16} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>GUEST INFORMATION</Text>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <User size={20} color={COLORS.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Phone size={20} color={COLORS.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={contact}
                onChangeText={setContact}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Mail size={20} color={COLORS.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address (Optional)"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* --- STAY DURATION --- */}
          <View style={styles.sectionHeaderRow}>
            <Calendar size={16} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>STAY DURATION</Text>
          </View>

          <View style={styles.durationRow}>
            <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7}>
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>mm/dd/yyyy</Text>
              <Text style={styles.timeSubtext}>At 2:00 PM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7}>
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>mm/dd/yyyy</Text>
              <Text style={styles.timeSubtext}>At 12:00 PM</Text>
            </TouchableOpacity>
          </View>

          {/* --- FINANCIALS --- */}
          <View style={styles.sectionHeaderRow}>
            <Wallet size={16} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>FINANCIALS</Text>
          </View>

          <View style={styles.financialsBox}>
            <View>
              <Text style={styles.financialsLabel}>TOTAL AMOUNT DUE</Text>
              <View style={styles.amountRow}>
                <Text style={styles.currencySymbol}>₱</Text>
                <Text style={styles.financialsValue}>12,000.00</Text>
              </View>
            </View>
            <View style={styles.badgeFixed}>
              <Text style={styles.badgeFixedText}>FIXED RATE</Text>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- FIXED BOTTOM CONFIRM BUTTON --- */}
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.85} style={styles.confirmBtn}>
          <Text style={styles.confirmBtnText}>Confirm Booking</Text>
          <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2.5} style={styles.btnIcon} />
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>

    </SafeAreaView>
  );
}

// Ensure standard Lucide icon mapping to Wallet for financials
import { Wallet } from 'lucide-react-native';

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
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  /* --- SECTION TYPOGRAPHY --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginLeft: 8,
  },

  /* --- GUEST INFO INPUTS --- */
  inputGroup: {
    gap: 16,
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.textMain,
    fontWeight: '500',
  },

  /* --- STAY DURATION --- */
  durationRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  datePickerBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: 8,
    letterSpacing: 1,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  timeSubtext: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* --- FINANCIALS --- */
  financialsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  financialsLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryLight,
    letterSpacing: 1,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },
  financialsValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  badgeFixed: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  badgeFixedText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryLight,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 60,
  },

  /* --- FOOTER / CONFIRM BUTTON --- */
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 0 : 24,
    backgroundColor: '#FFFFFF',
  },
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  btnIcon: {
    marginLeft: 12,
  },
  homeIndicator: {
    width: 130,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 8,
  }
});