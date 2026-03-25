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
  Calendar as CalendarIcon,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Bell,
  CalendarPlus,
  Home,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  X,
  MessageSquare
} from 'lucide-react-native';

// Ryu-specific Palette Adapted to Reine's Design System
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#23324B',       // Ryu Deep Navy
  primaryLight: '#E0E7FF',  // Soft indigo/blue tint
  primaryDark: '#1A2537',   // Deeper navy
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',

  // Accents
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FFEDD5',
  warningText: '#EA580C',
};

export default function RyuBookings({ navigation }) {
  const activeNav = 'Bookings';

  // 'calendar' or 'manual'
  const [activeView, setActiveView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(20);

  const handleDatePress = (day) => {
    setSelectedDate(day);
    // If clicking an empty date, route to manual booking
    if (![5, 6, 7, 11, 12, 20, 21, 22, 24].includes(day)) {
      setActiveView('manual');
    }
  };

  // --- RENDER: CALENDAR VIEW ---
  const renderCalendarView = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <View style={styles.viewContainer}>
        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Manage Reservations</Text>
            <Text style={styles.headerTitle}>Calendar</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <SlidersHorizontal size={20} color={COLORS.textMain} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* --- CALENDAR CARD (MODERN) --- */}
          <View style={styles.calendarCard}>
            {/* Month Selector */}
            <View style={styles.monthSelector}>
              <TouchableOpacity style={styles.monthBtn}>
                <ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} />
              </TouchableOpacity>
              <Text style={styles.monthText}>October 2023</Text>
              <TouchableOpacity style={styles.monthBtn}>
                <ChevronRight size={24} color={COLORS.textMain} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* Week Days */}
            <View style={styles.weekDaysRow}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                <Text key={idx} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysGrid}>
              {/* Empty slots for start of month */}
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>25</Text></View>
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>26</Text></View>
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>27</Text></View>
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>28</Text></View>
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>29</Text></View>
              <View style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>30</Text></View>

              {days.map((day) => {
                const isNavy = [5, 6, 7, 20, 21, 22, 24].includes(day);
                const isDeepNavy = [11, 12].includes(day);
                const isSelected = selectedDate === day;

                let cellStyle = [styles.dayCell];
                let textStyle = [styles.dayText];

                if (isSelected) {
                  cellStyle.push(styles.dayCellSelected);
                  textStyle.push(styles.dayTextSelected);
                } else if (isNavy) {
                  cellStyle.push(styles.dayCellIndigo);
                  textStyle.push(styles.dayTextIndigo);
                } else if (isDeepNavy) {
                  cellStyle.push(styles.dayCellDeepNavy);
                  textStyle.push(styles.dayTextDeepNavy);
                }

                return (
                  <TouchableOpacity
                    key={day}
                    activeOpacity={0.8}
                    onPress={() => handleDatePress(day)}
                    style={styles.dayCellContainer}
                  >
                    <View style={cellStyle}>
                      <Text style={textStyle}>{day}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* --- GUEST DETAILS BENTO CARD --- */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsHeader}>
              <View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>CONFIRMED</Text>
                </View>
                <Text style={styles.detailsTitle}>Guest Details</Text>
                <Text style={styles.detailsSubtitle}>Booking for Oct 20 - Oct 22</Text>
              </View>
              <View style={styles.avatarWrapper}>
                 <User size={28} color={COLORS.primary} strokeWidth={2} />
              </View>
            </View>

            {/* Info Rows */}
            <View style={styles.infoList}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <User size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextWrap}>
                  <Text style={styles.infoLabel}>GUEST NAME</Text>
                  <Text style={styles.infoValue}>Mark J.</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <Phone size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextWrap}>
                  <Text style={styles.infoLabel}>CONTACT</Text>
                  <Text style={styles.infoValue}>+63 912 345 6789</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <Mail size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
                <View style={styles.infoTextWrap}>
                  <Text style={styles.infoLabel}>EMAIL ADDRESS</Text>
                  <Text style={styles.infoValue}>mark.j@example.com</Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7}>
                <X size={20} color={COLORS.textMain} strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8} onPress={() => setActiveView('manual')}>
                <MessageSquare size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }}/>
                <Text style={styles.messageBtnText}>Message Guest</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    );
  };

  // --- RENDER: MANUAL BOOKING VIEW ---
  const renderManualBookingView = () => {
    const formattedDate = `10/${selectedDate < 10 ? '0' + selectedDate : selectedDate}/2023`;

    return (
      <View style={styles.viewContainer}>
        {/* Modern Header */}
        <View style={styles.headerForm}>
          <TouchableOpacity onPress={() => setActiveView('calendar')} style={styles.backButton}>
            <ChevronLeft size={28} color={COLORS.textMain} strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Manual Entry</Text>
            <Text style={styles.headerTitle}>New Booking</Text>
          </View>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentForm}>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter guest name"
                placeholderTextColor={COLORS.textMuted}
              />

              <Text style={styles.formLabel}>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+63 000 000 0000"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
              />

              <Text style={styles.formLabel}>Email Address <Text style={styles.optionalText}>(Optional)</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="guest@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Dates & Times Bento */}
            <View style={styles.dateTimeBento}>
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabelDark}>CHECK-IN</Text>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputBoxSmall}>Time</Text>
                    <Text style={styles.inputBoxValue}>2:00 PM</Text>
                  </View>
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabelDark}>CHECK-OUT</Text>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputBoxSmall}>Time</Text>
                    <Text style={styles.inputBoxValue}>12:00 PM</Text>
                  </View>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabelDark}>ARRIVAL</Text>
                  <View style={styles.inputBoxDate}>
                    <Text style={[styles.placeholderText, { color: COLORS.primary, fontWeight: '800' }]}>{formattedDate}</Text>
                  </View>
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabelDark}>DEPARTURE</Text>
                  <View style={styles.inputBoxDate}>
                    <Text style={styles.placeholderText}>mm/dd/yyyy</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Total Amount Card */}
            <View style={styles.totalCard}>
              <View style={styles.totalHeaderRow}>
                <Text style={styles.totalLabel}>TOTAL AMOUNT DUE</Text>
                <View style={styles.fixedRateBadge}>
                  <Text style={styles.fixedRateText}>FIXED RATE</Text>
                </View>
              </View>
              <View style={styles.totalAmountRow}>
                <Text style={styles.totalCurrency}>₱12,000.00</Text>
                <Text style={styles.totalNight}> / per night</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
              <CalendarPlus size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} />
              <Text style={styles.confirmBtnText}>Confirm Booking</Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {activeView === 'calendar' ? renderCalendarView() : renderManualBookingView()}
      </SafeAreaView>

      {/* --- FLOATING BOTTOM NAVIGATION (Matched to Home) --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuHome')}>
            <Home size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}
            onPress={() => setActiveView('calendar')}
          >
            <CalendarDays size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Bookings</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuGuestMgmt')}>
            <Users size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuFinance')}>
            <Wallet size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RyuAdmin')}>
            <Settings size={22} color={COLORS.textMuted} strokeWidth={2.5} />
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
  safeArea: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  headerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '600',
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  bellButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  scrollContentForm: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- CALENDAR BENTO CARD --- */
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthBtn: {
    padding: 4,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDayText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCellContainer: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayCell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  dayCellIndigo: {
    backgroundColor: COLORS.primaryLight,
  },
  dayCellDeepNavy: {
    backgroundColor: COLORS.primaryDark,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.1 }],
  },
  dayText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  dayTextMuted: {
    fontSize: 15,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  dayTextIndigo: {
    color: COLORS.primary,
  },
  dayTextDeepNavy: {
    color: '#FFFFFF',
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },

  /* --- GUEST DETAILS BENTO CARD --- */
  detailsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  detailsSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoList: {
    gap: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 20,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  messageBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* --- MANUAL BOOKING FORM --- */
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 8,
    marginLeft: 4,
  },
  formLabelDark: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  optionalText: {
    fontWeight: '500',
    color: COLORS.textMuted,
    textTransform: 'none',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    fontSize: 15,
    color: COLORS.textMain,
    fontWeight: '500',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  dateTimeBento: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  inputBox: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    height: 64,
    justifyContent: 'center',
  },
  inputBoxDate: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputBoxSmall: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
    fontWeight: '600',
  },
  inputBoxValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  placeholderText: {
    fontSize: 15,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  totalCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  totalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  fixedRateBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fixedRateText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  totalAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  totalCurrency: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  totalNight: {
    fontSize: 14,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  bottomSpacer: {
    height: 140,
  },

  /* --- FLOATING BOTTOM NAV (Matched from Home) --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 24,
    right: 24,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    flex: 1.5,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  },
});