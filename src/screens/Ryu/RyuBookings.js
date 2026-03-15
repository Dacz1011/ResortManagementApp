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
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Calendar as CalendarIcon,
  LayoutGrid,
  Users,
  Wallet,
  Folder,
  Settings,
  Home
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#F8FAFC',
  primary: '#23324B',
  primaryLight: '#3A4D6B',
  accent: '#3B82F6',        // Soft blue for selected dates
  textMain: '#0F172A',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
  success: '#10B981'
};

// Mock data for upcoming bookings
const UPCOMING_BOOKINGS = [
  { id: '1', name: 'Mark J.', date: 'Oct 15 - Oct 18', status: 'Confirmed' },
  { id: '2', name: 'Sarah L.', date: 'Oct 22 - Oct 25', status: 'Pending' },
];

export default function RyuBookings({ navigation }) {
  // Navigation & View State
  const [activeNav, setActiveNav] = useState('Bookings');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Form State
  const [selectedDate, setSelectedDate] = useState(null);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  // Handle clicking a date on the calendar
  const handleDatePress = (day) => {
    setSelectedDate(`10/${day < 10 ? '0'+day : day}/2023`);
    setIsFormVisible(true);
  };

  // --- RENDER: CALENDAR VIEW ---
  const renderCalendarView = () => {
    // Simple calendar generation for October (starts on Sunday for demo)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <View style={styles.calendarViewContainer}>
        {/* Header */}
        <View style={styles.headerCal}>
          <View>
            <Text style={styles.headerSubtitleCal}>RYU'S TRANSIENT HOUSE</Text>
            <Text style={styles.headerTitleCal}>Bookings Calendar</Text>
          </View>
          <TouchableOpacity style={styles.todayBtn}>
            <Text style={styles.todayBtnText}>Today</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentCal}>

          {/* Custom Calendar Card */}
          <View style={styles.calendarCard}>
            <View style={styles.monthSelector}>
              <TouchableOpacity style={styles.monthBtn}>
                <ChevronLeft size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.monthText}>October 2023</Text>
              <TouchableOpacity style={styles.monthBtn}>
                <ChevronRight size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDaysRow}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, idx) => (
                <Text key={idx} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((day) => {
                // Mocking some occupied/highlighted days
                const isOccupied = day >= 15 && day <= 18;
                const isSelected = selectedDate === `10/${day < 10 ? '0'+day : day}/2023`;

                return (
                  <TouchableOpacity
                    key={day}
                    activeOpacity={0.7}
                    onPress={() => handleDatePress(day)}
                    style={[
                      styles.dayCell,
                      isOccupied && styles.dayCellOccupied,
                      isSelected && styles.dayCellSelected
                    ]}
                  >
                    <Text style={[
                      styles.dayText,
                      isOccupied && styles.dayTextOccupied,
                      isSelected && styles.dayTextSelected
                    ]}>
                      {day}
                    </Text>
                    {/* Small dot indicator for availability */}
                    {!isOccupied && !isSelected && <View style={styles.availableDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Upcoming Bookings */}
          <Text style={styles.sectionTitleCal}>UPCOMING BOOKINGS</Text>
          {UPCOMING_BOOKINGS.map((booking) => (
            <View key={booking.id} style={styles.upcomingCard}>
              <View style={styles.upcomingIconBg}>
                <User size={20} color={COLORS.primary} />
              </View>
              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingName}>{booking.name}</Text>
                <Text style={styles.upcomingDate}>{booking.date}</Text>
              </View>
              <View style={[styles.statusBadge, booking.status === 'Pending' && { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.statusText, booking.status === 'Pending' && { color: '#B45309' }]}>
                  {booking.status}
                </Text>
              </View>
            </View>
          ))}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem}>
              <Home size={24} color={COLORS.textMuted} strokeWidth={2} />
              <Text style={styles.navText}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <CalendarIcon size={24} color={COLORS.primary} strokeWidth={2.5} />
              <Text style={[styles.navText, styles.navTextActive]}>BOOKINGS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem}>
              <Users size={24} color={COLORS.textMuted} strokeWidth={2} />
              <Text style={styles.navText}>GUEST</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem}>
              <Wallet size={24} color={COLORS.textMuted} strokeWidth={2} />
              <Text style={styles.navText}>FINANCE</Text>
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
      </View>
    );
  };

  // --- RENDER: MANUAL BOOKING FORM VIEW ---
  const renderFormView = () => {
    return (
      <View style={styles.formViewContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => setIsFormVisible(false)} // Go back to calendar
          >
            <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Booking for Ryu's House</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

            {/* GUEST INFORMATION */}
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

            {/* STAY DURATION */}
            <View style={styles.sectionHeaderRow}>
              <CalendarIcon size={16} color={COLORS.primary} strokeWidth={2.5} />
              <Text style={styles.sectionTitle}>STAY DURATION</Text>
            </View>

            <View style={styles.durationRow}>
              <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7}>
                <Text style={styles.dateLabel}>CHECK-IN</Text>
                <Text style={styles.dateValue}>{selectedDate || 'mm/dd/yyyy'}</Text>
                <Text style={styles.timeSubtext}>At 2:00 PM</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.datePickerBox} activeOpacity={0.7}>
                <Text style={styles.dateLabel}>CHECK-OUT</Text>
                <Text style={styles.dateValue}>mm/dd/yyyy</Text>
                <Text style={styles.timeSubtext}>At 12:00 PM</Text>
              </TouchableOpacity>
            </View>

            {/* FINANCIALS */}
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

        {/* FIXED BOTTOM CONFIRM BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.confirmBtn}
            onPress={() => {
              // Reset and go back to calendar for demo
              setIsFormVisible(false);
              setFullName('');
              setContact('');
            }}
          >
            <Text style={styles.confirmBtnText}>Confirm Booking</Text>
            <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2.5} style={styles.btnIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {isFormVisible ? renderFormView() : renderCalendarView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // --- CALENDAR VIEW STYLES ---
  calendarViewContainer: {
    flex: 1,
  },
  headerCal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  headerSubtitleCal: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitleCal: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  todayBtn: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
  },
  todayBtnText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '800',
  },
  scrollContentCal: {
    paddingHorizontal: 24,
  },
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthBtn: {
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDayText: {
    width: '14%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayCellOccupied: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  dayTextOccupied: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  availableDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.success,
    position: 'absolute',
    bottom: 6,
  },
  sectionTitleCal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryLight,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  upcomingIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  upcomingDate: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },

  // --- BOTTOM NAV STYLES ---
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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

  // --- FORM VIEW STYLES ---
  formViewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  }
});