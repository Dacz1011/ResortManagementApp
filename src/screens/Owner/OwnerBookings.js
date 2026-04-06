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
  ChevronRight,
  CheckCircle2,
  User,
  Smartphone,
  Calendar,
  CalendarPlus,
  LayoutGrid,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  Phone,
  Mail,
  MessageSquare,
  X,
  Plus
} from 'lucide-react-native';

// Modern Premium Palette (Owner Portal)
const COLORS = {
  background: '#F8FAFC',    // slate-50
  primary: '#1A3626',       // Deep Forest Green
  primaryLight: '#E8F0EA',  // Soft Green background
  primaryDark: '#0D1E14',   // Darker green
  accent: '#A3E635',        // Lime green accent
  textMain: '#0F172A',      // slate-900
  textMuted: '#64748B',     // slate-500
  border: '#E2E8F0',        // slate-200
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',       // slate-50
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const PROPERTIES = [
  { id: 'reine', name: "Reine's Beach House", subtitle: 'Luxury Oceanfront Suites', rate: 12000 },
  { id: 'ryu', name: "Ryu's Transient House", subtitle: 'Urban Comfort & Convenience', rate: 8000 },
  { id: 'casa', name: "Casa M.O.", subtitle: 'Traditional Heritage Villa', rate: 15000 },
];

// Mock Bookings Database for Calendar visualization
const MOCK_BOOKINGS = {
  reine: {
    15: { guestName: 'Jonathan Rivera', contact: '+63 912 345 6789', email: 'jonathan@example.com', checkIn: 'Oct 15', checkOut: 'Oct 18', status: 'CONFIRMED' },
    16: { guestName: 'Jonathan Rivera', contact: '+63 912 345 6789', email: 'jonathan@example.com', checkIn: 'Oct 15', checkOut: 'Oct 18', status: 'CONFIRMED' },
    17: { guestName: 'Jonathan Rivera', contact: '+63 912 345 6789', email: 'jonathan@example.com', checkIn: 'Oct 15', checkOut: 'Oct 18', status: 'CONFIRMED' },
  },
  ryu: {
    22: { guestName: 'Sarah Jenkins', contact: '+63 998 765 4321', email: 'sarah.j@example.com', checkIn: 'Oct 22', checkOut: 'Oct 24', status: 'PENDING' },
    23: { guestName: 'Sarah Jenkins', contact: '+63 998 765 4321', email: 'sarah.j@example.com', checkIn: 'Oct 22', checkOut: 'Oct 24', status: 'PENDING' },
  },
  casa: {}
};

export default function OwnerBookings({ navigation }) {
  const activeNav = 'Bookings';

  // Unified Property State
  const [selectedPropertyId, setSelectedPropertyId] = useState('reine');
  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);

  // Calendar States
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // Form States
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [checkOutDate, setCheckOutDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const [nights, setNights] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Derive occupied dates and current booking for the selected property
  const currentPropertyBookings = MOCK_BOOKINGS[selectedPropertyId] || {};
  const occupiedDates = Object.keys(currentPropertyBookings).map(Number);
  const isOccupied = occupiedDates.includes(selectedDate);
  const currentBooking = currentPropertyBookings[selectedDate];

  // --- USE EFFECTS ---
  // Auto-calculate financial totals based on selected dates and property rates
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

  // --- CALENDAR HELPERS ---
  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const formatMonth = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });
  const isSameMonthAsToday = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();

  // Handle interacting with the calendar grid
  const handleDatePress = (day) => {
    setSelectedDate(day);

    if (!occupiedDates.includes(day)) {
      // Auto-prefill the manual form dates when an empty slot is clicked
      const autoCheckIn = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setCheckInDate(autoCheckIn);

      const autoCheckOut = new Date(autoCheckIn);
      autoCheckOut.setDate(autoCheckIn.getDate() + 1);
      setCheckOutDate(autoCheckOut);
    }
  };

  // --- FORM HELPERS ---
  const handleNumDaysChange = (text) => {
    const parsedNights = parseInt(text) || 0;
    setNights(parsedNights);

    if (checkInDate && parsedNights > 0) {
      const newCheckOut = new Date(checkInDate);
      newCheckOut.setDate(checkInDate.getDate() + parsedNights);
      setCheckOutDate(newCheckOut);
    }
  };

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
      [{ text: 'OK', onPress: () => {
        setFullName('');
        setContact('');
        setEmail('');
        // We simulate refreshing the data here in a real app
      }}]
    );
  };

  const formatDate = (date) => {
    if (!date) return 'mm/dd/yyyy';
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${m}/${d}/${date.getFullYear()}`;
  };

  const isDetailsComplete = fullName.length > 0 && contact.length > 0;
  const isPaymentComplete = nights > 0;

  // Render Calendar Helper
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    return days;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} translucent={true} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>Manage Stays</Text>
            <Text style={styles.headerTitle}>Reservations</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            {/* --- PROPERTY TABS --- */}
            <View style={styles.tabsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                {PROPERTIES.map((prop) => {
                  const isActive = selectedPropertyId === prop.id;
                  return (
                    <TouchableOpacity
                      key={prop.id}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelectedPropertyId(prop.id);
                        setSelectedDate(today.getDate()); // Reset date on property switch
                      }}
                      style={[styles.tab, isActive && styles.tabActive]}
                    >
                      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                        {prop.name.split(' ')[0]} {/* Short name */}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* --- CALENDAR BENTO CARD --- */}
            <View style={styles.calendarCard}>
              <View style={styles.monthSelector}>
                <TouchableOpacity style={styles.monthBtn} onPress={handlePrevMonth}>
                  <ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
                <TouchableOpacity style={styles.monthBtn} onPress={handleNextMonth}>
                  <ChevronRight size={24} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.weekDaysRow}>
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                  <Text key={idx} style={styles.weekDayText}>{day}</Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {getCalendarDays().map((item, index) => {
                  if (!item.isCurrentMonth) {
                    return (
                      <View key={`prev-${index}`} style={styles.dayCellContainer}>
                        <Text style={styles.dayTextMuted}>{item.day}</Text>
                      </View>
                    );
                  }

                  const day = item.day;
                  const isDayOccupied = occupiedDates.includes(day);
                  const isDaySelected = selectedDate === day;
                  const isDayToday = isSameMonthAsToday && today.getDate() === day;

                  let cellStyle = [styles.dayCell];
                  let textStyle = [styles.dayText];

                  if (isDaySelected) {
                    cellStyle.push(styles.dayCellSelected);
                    textStyle.push(styles.dayTextSelected);
                  } else if (isDayOccupied) {
                    cellStyle.push(styles.dayCellOccupied);
                    textStyle.push(styles.dayTextOccupied);
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
                        {isDayToday && !isDaySelected && <View style={styles.todayDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* --- DYNAMIC CONTEXT AREA --- */}
            <View style={styles.dynamicHeaderRow}>
              <Text style={styles.sectionTitle}>
                {isOccupied ? 'Stay Details' : 'Create Reservation'}
              </Text>
              <Text style={styles.sectionContextDate}>
                {formatMonth(currentMonth).split(' ')[0]} {selectedDate}
              </Text>
            </View>

            {isOccupied ? (
              /* ==========================================
                 OCCUPIED: DETAILS VIEW
                 ========================================== */
              <View style={styles.detailsCard}>
                <View style={styles.detailsHeader}>
                  <View>
                    <View style={styles.statusBadge}>
                      <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 4 }} />
                      <Text style={styles.statusBadgeText}>{currentBooking.status}</Text>
                    </View>
                    <Text style={styles.detailsTitle}>{currentBooking.guestName}</Text>
                    <Text style={styles.detailsSubtitle}>{currentBooking.checkIn} — {currentBooking.checkOut}</Text>
                  </View>
                  <View style={styles.guestAvatarLarge}>
                    <User size={28} color={COLORS.primary} strokeWidth={2} />
                  </View>
                </View>

                <View style={styles.infoList}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoIconBox}>
                      <Phone size={18} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <View style={styles.infoTextWrap}>
                      <Text style={styles.infoLabel}>CONTACT</Text>
                      <Text style={styles.infoValue}>{currentBooking.contact}</Text>
                    </View>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.infoIconBox}>
                      <Mail size={18} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <View style={styles.infoTextWrap}>
                      <Text style={styles.infoLabel}>EMAIL</Text>
                      <Text style={styles.infoValue}>{currentBooking.email}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8}>
                    <MessageSquare size={18} color={COLORS.primaryDark} strokeWidth={2.5} style={{ marginRight: 8 }}/>
                    <Text style={styles.messageBtnText}>Message Guest</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* ==========================================
                 AVAILABLE: MANUAL BOOKING FORM
                 ========================================== */
              <View>
                {/* Guest Details Bento */}
                <View style={styles.bentoCard}>
                  <Text style={styles.bentoLabel}>GUEST INFORMATION</Text>
                  <View style={styles.listContainer}>
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

                    <View style={styles.inputWrapper}>
                      <Mail size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
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
                </View>

                {/* Dates Bento */}
                <View style={styles.bentoCard}>
                  <Text style={styles.bentoLabel}>STAY DURATION</Text>

                  <View style={styles.durationRow}>
                    <View style={styles.datePickerBox}>
                      <Text style={styles.dateLabel}>CHECK-IN</Text>
                      <View style={styles.dateValueRow}>
                        <Calendar size={18} color={checkInDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                        <Text style={[styles.dateValue, checkInDate && styles.dateValueActive]}>
                          {formatDate(checkInDate)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.datePickerBox}>
                      <Text style={styles.dateLabel}>CHECK-OUT</Text>
                      <View style={styles.dateValueRow}>
                        <Calendar size={18} color={checkOutDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                        <Text style={[styles.dateValue, checkOutDate && styles.dateValueActive]}>
                          {formatDate(checkOutDate)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.calculatedStayBox}>
                    <Text style={styles.calcStayLabel}>Total Nights:</Text>
                    <TextInput
                      style={styles.nightsInput}
                      keyboardType="numeric"
                      value={nights.toString()}
                      onChangeText={handleNumDaysChange}
                    />
                  </View>
                </View>

                {/* Financials Bento */}
                <View style={styles.financialsBento}>
                  <View style={styles.financialsHeaderRow}>
                    <Text style={styles.financialsLabel}>TOTAL AMOUNT DUE</Text>
                    <View style={styles.rateBadge}>
                      <Text style={styles.rateText}>
                        ₱{selectedProperty.rate.toLocaleString()}/night
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.financialsValue, totalAmount > 0 && styles.financialsValueActive]}>
                    ₱ {totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.confirmBtn, (!isDetailsComplete || !isPaymentComplete) && styles.confirmBtnDisabled]}
                  onPress={handleConfirmBooking}
                >
                  <CalendarPlus
                    size={22}
                    color={(!isDetailsComplete || !isPaymentComplete) ? '#94A3B8' : COLORS.primaryDark}
                    strokeWidth={2.5}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[styles.confirmBtnText, (!isDetailsComplete || !isPaymentComplete) && styles.confirmBtnTextDisabled]}>
                    Confirm Booking
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* --- FULL-WIDTH EXPANDING PILL BOTTOM NAV --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Overview</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Bookings</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Finance</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledger</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <PieChart size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Insights</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} activeOpacity={0.7} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Settings</Text>}
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
  keyboardView: {
    flex: 1,
  },

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: {
    marginRight: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F1F5F9', // slate-100
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  /* --- SCROLL CONTENT --- */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 140, // Clear the bottom nav securely
  },

  /* --- TABS (CALENDAR FILTER) --- */
  tabsContainer: {
    marginBottom: 20,
    marginHorizontal: -20, // Negative margin to allow full-bleed scroll
  },
  tabsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* --- CALENDAR GRID --- */
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthBtn: { padding: 4 },
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
  dayCellOccupied: {
    backgroundColor: COLORS.primaryLight,
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
  dayTextOccupied: {
    color: COLORS.primary,
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },
  todayDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },

  /* --- DYNAMIC SECTION HEADERS --- */
  dynamicHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  sectionContextDate: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* --- BOOKING DETAILS CARD (Occupied) --- */
  detailsCard: {
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
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
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
  guestAvatarLarge: {
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
  infoTextWrap: { flex: 1 },
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
  messageBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  messageBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },

  /* --- SHARED BENTO STYLES --- */
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  bentoLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },

  /* --- GUEST INPUTS --- */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background, // slate-50
    borderWidth: 1,
    borderColor: COLORS.border,
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

  /* --- DATES (MANUAL ENTRY) --- */
  durationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  datePickerBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 16,
    height: 72,
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 16,
  },
  calcStayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  nightsInput: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'right',
    minWidth: 40,
  },
  calcStayValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- FINANCIALS BENTO --- */
  financialsBento: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
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
    letterSpacing: 1.5,
  },
  rateBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    height: 64,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmBtnDisabled: {
    backgroundColor: COLORS.border, // slate-200
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  confirmBtnTextDisabled: {
    color: '#94A3B8', // slate-400
  },

  /* --- FULL-WIDTH EXPANDING PILL BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 16,
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  },
});