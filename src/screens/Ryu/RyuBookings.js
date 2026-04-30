import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  SlidersHorizontal,
  User,
  Users,
  Wallet,
  X
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../../context/BookingContext';

const { width } = Dimensions.get('window');

// Ryu-specific Palette Adapted to the modern Floating Nav System
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#23324B',       // Ryu Deep Navy
  primaryLight: '#E0E7FF',  // Soft indigo/blue tint
  primaryDark: '#1A2537',   // Deeper navy for gradients/accents
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

export default function RyuBookings({ route, navigation }) {
  const activeNav = 'Bookings';
  const [activeView, setActiveView] = useState('calendar');
  const { getBookings, addBooking } = useBookings();
  const bookings = getBookings('Ryu');

  const insets = useSafeAreaInsets(); // iOS compatibility fix

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // Manual Booking States
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [numDays, setNumDays] = useState('1');
  const [checkInTime, setCheckInTime] = useState('2:00 PM');
  const [checkOutTime, setCheckOutTime] = useState('12:00 PM');
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    if (route.params?.mode === 'manual') {
      setActiveView('manual');
      updateDepartureDate(selectedDate, '1');
    }
  }, [route.params, selectedDate]);

  const updateDepartureDate = (day, daysStr) => {
    const days = parseInt(daysStr);
    if (!isNaN(days) && days > 0) {
      const checkInDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const checkout = new Date(checkInDate);
      checkout.setDate(checkInDate.getDate() + days);

      const formattedDeparture = `${checkout.toLocaleString('default', { month: 'short' })} ${checkout.getDate()}`;
      setDepartureDate(formattedDeparture);
    }
  };

  const handleNumDaysChange = (value) => {
    setNumDays(value);
    updateDepartureDate(selectedDate, value);
  };

  const handleConfirmBooking = () => {
    const days = parseInt(numDays);
    if (!guestName || isNaN(days) || days <= 0) return;

    const newBookings = {};
    const checkInDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
    const checkInStr = `${checkInDate.toLocaleString('default', { month: 'short' })} ${checkInDate.getDate()}`;

    for (let i = 0; i < days; i++) {
      const currentDay = new Date(checkInDate);
      currentDay.setDate(checkInDate.getDate() + i);

      if (currentDay.getMonth() === currentMonth.getMonth() &&
          currentDay.getFullYear() === currentMonth.getFullYear()) {
        newBookings[currentDay.getDate()] = {
          guestName,
          contact,
          email: 'manual@entry.com',
          checkIn: checkInStr,
          checkOut: departureDate,
          status: 'CONFIRMED',
          amount: `₱${(12000 * days).toLocaleString()}.00`,
          fullDates: `${checkInStr} - ${departureDate}`
        };
      }
    }

    addBooking('Ryu', newBookings);
    setActiveView('calendar');
    setGuestName('');
    setContact('');
    setNumDays('1');
  };

  const isSameMonthAsToday = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  const occupiedDates = Object.keys(bookings).map(Number);
  const currentBooking = bookings[selectedDate];

  const handleDatePress = (day) => {
    setSelectedDate(day);
    if (!occupiedDates.includes(day)) {
      setActiveView('manual');
      updateDepartureDate(day, numDays);
    }
  };

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const formatMonth = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleDialGuest = () => {
    if (currentBooking) {
      Linking.openURL(`tel:${currentBooking.contact}`).catch(err => console.error("Couldn't load page", err));
    }
  };

  // --- RENDER: CALENDAR VIEW ---
  const renderCalendarView = () => {
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

    const upcomingCount = Object.keys(bookings).length;

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* HERO IMAGE HEADER */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay} />
          {/* iOS Fix: Replaced SafeAreaView with dynamic View */}
          <View style={[styles.heroSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.greetingText}>Manage Stays</Text>
                <Text style={styles.adminName}>Reservations</Text>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                  <SlidersHorizontal size={20} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Glassmorphism Status Card */}
            <View style={styles.glassCard}>
              <View style={styles.glassHeader}>
                <View style={styles.statusPill}>
                  <CalendarDays size={14} color={COLORS.textMain} strokeWidth={2.5} style={{ marginRight: 6 }} />
                  <Text style={styles.statusText}>{formatMonth(currentMonth).toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.heroMainStat}>{upcomingCount} Upcoming</Text>
              <Text style={styles.heroSubStat}>Bookings scheduled for this month</Text>
            </View>
          </View>
        </ImageBackground>

        {/* MAIN OVERLAPPING SHEET */}
        <View style={styles.mainSheet}>
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
              {days.map((item, index) => {
                if (!item.isCurrentMonth) {
                  return (
                    <View key={`prev-${index}`} style={styles.dayCellContainer}>
                      <Text style={styles.dayTextMuted}>{item.day}</Text>
                    </View>
                  );
                }

                const day = item.day;
                const isOccupied = occupiedDates.includes(day);
                const isSelected = selectedDate === day;
                const isToday = isSameMonthAsToday && today.getDate() === day;

                let cellStyle = [styles.dayCell];
                let textStyle = [styles.dayText];

                if (isSelected) {
                  cellStyle.push(styles.dayCellSelected);
                  textStyle.push(styles.dayTextSelected);
                } else if (isOccupied) {
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
                      {isToday && !isSelected && <View style={styles.todayDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stay Details</Text>
          </View>

          {currentBooking ? (
            <View style={styles.detailsCard}>
              <View style={styles.detailsHeader}>
                <View>
                  <View style={styles.confirmedBadge}>
                    <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 4 }} />
                    <Text style={styles.confirmedBadgeText}>{currentBooking.status}</Text>
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
                <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7}>
                  <X size={20} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8} onPress={handleDialGuest}>
                  <MessageSquare size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }}/>
                  <Text style={styles.messageBtnText}>Message Guest</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconBox}>
                <CalendarPlus size={32} color={COLORS.textMuted} strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyTitle}>Available Date</Text>
              <Text style={styles.emptySub}>Select an occupied date to see details, or tap here to manually book this date.</Text>
              <TouchableOpacity style={styles.bookNowBtn} onPress={() => handleDatePress(selectedDate)}>
                <Text style={styles.bookNowBtnText}>Book {formatMonth(currentMonth).split(' ')[0]} {selectedDate}</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>
    );
  };

  // --- RENDER: MANUAL BOOKING FORM ---
  const renderManualBookingView = () => {
    const formattedDate = `${currentMonth.getMonth() + 1}/${selectedDate < 10 ? '0' + selectedDate : selectedDate}/${currentMonth.getFullYear()}`;

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* HERO IMAGE HEADER */}
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?q=80&w=2000&auto=format&fit=crop' }}
            style={styles.heroHeaderForm}
          >
            <View style={styles.heroOverlay} />
            {/* iOS Fix: Replaced SafeAreaView with dynamic View */}
            <View style={[styles.heroSafeAreaForm, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => setActiveView('calendar')} style={styles.backBtnWrapper}>
                  <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text style={styles.greetingText}>Manual Entry</Text>
                  <Text style={styles.adminName}>New Booking</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* MAIN OVERLAPPING SHEET */}
          <View style={styles.mainSheet}>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Guest Information</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formLabel}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter guest name"
                placeholderTextColor={COLORS.textMuted}
                value={guestName}
                onChangeText={setGuestName}
              />

              <View style={styles.formRow}>
                <View style={{ flex: 1.5 }}>
                  <Text style={styles.formLabel}>CONTACT NUMBER</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+63 000 000 0000"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="phone-pad"
                    value={contact}
                    onChangeText={setContact}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.formLabel}>NIGHTS</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={numDays}
                    onChangeText={handleNumDaysChange}
                  />
                </View>
              </View>

              <Text style={styles.formLabel}>EMAIL ADDRESS <Text style={{fontWeight: '400', textTransform: 'none'}}>(Optional)</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="guest@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Stay Schedule</Text>
            </View>

            <View style={styles.scheduleCard}>
              <View style={styles.formRow}>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabel}>CHECK-IN</Text>
                  <View style={styles.readOnlyBox}>
                    <Text style={styles.readOnlySub}>Arrival</Text>
                    <Text style={styles.readOnlyValueMain}>{formattedDate}</Text>
                    <Text style={styles.readOnlySubTime}>{checkInTime}</Text>
                  </View>
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.formLabel}>CHECK-OUT</Text>
                  <View style={styles.readOnlyBox}>
                    <Text style={styles.readOnlySub}>Departure</Text>
                    <Text style={styles.readOnlyValueMain}>{departureDate || 'Select Nights'}</Text>
                    <Text style={styles.readOnlySubTime}>{checkOutTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Total Amount Due styled in Ryu Primary */}
            <View style={styles.financialCard}>
              <View style={styles.financialHeader}>
                <Text style={styles.financialLabel}>TOTAL AMOUNT DUE</Text>
                <View style={styles.rateBadge}>
                  <Text style={styles.rateText}>FIXED RATE</Text>
                </View>
              </View>
              <View style={styles.financialValueRow}>
                <Text style={styles.financialCurrency}>₱{(12000 * parseInt(numDays || 1)).toLocaleString()}</Text>
                <Text style={styles.financialNight}>.00 / {numDays} night(s)</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleConfirmBooking}>
              <CalendarPlus size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} />
              <Text style={styles.submitBtnText}>Confirm Booking</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {activeView === 'calendar' ? renderCalendarView() : renderManualBookingView()}

      {/* --- SLEEK BLACK PILL BOTTOM NAV (Reine style, Ryu colors) --- */}
      {/* iOS Fix: Guarantee pill sits perfectly above iOS home indicator bar */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Admin</Text>
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
    paddingBottom: 160, // Clear space for the floating nav pill
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-start',
  },
  heroHeaderForm: {
    width: '100%',
    height: 280,
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 37, 55, 0.65)', // Deep Navy Overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  heroSafeAreaForm: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop handled dynamically
  },

  /* Top Nav in Hero */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 16 : 8,
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adminName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  backBtnWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  /* Glassmorphism Status Card */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  heroMainStat: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 4,
  },
  heroSubStat: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
  },

  /* --- OVERLAPPING MAIN SHEET --- */
  mainSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36, // Overlaps the image header
    paddingHorizontal: 24,
    paddingTop: 32,
    flex: 1,
    paddingBottom: 40,
  },

  /* --- CALENDAR GRID --- */
  calendarCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
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

  /* Section Headers */
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },

  /* --- BOOKING DETAILS CARD --- */
  detailsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
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
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  confirmedBadgeText: {
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
    letterSpacing: -0.2,
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
    elevation: 6,
  },
  messageBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Empty State Card */
  emptyCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  bookNowBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bookNowBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- FORM STYLES --- */
  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 8,
    letterSpacing: 1,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
    fontSize: 15,
    color: COLORS.textMain,
    fontWeight: '600',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  halfInput: { flex: 1 },
  scheduleCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  readOnlyBox: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  readOnlySub: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  readOnlyValueMain: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  readOnlySubTime: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },

  /* Financial Card */
  financialCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  financialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  financialLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
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
    color: '#FFFFFF',
  },
  financialValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  financialCurrency: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  financialNight: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 6,
  },
  submitBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 24,
    backgroundColor: COLORS.textMain,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* --- REINE-STYLE BOTTOM NAV (RYU COLORS) --- */
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
    backgroundColor: COLORS.primaryDark, // Uses Ryu's deep navy color
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
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 4,
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});