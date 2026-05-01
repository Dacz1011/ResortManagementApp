import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Settings,
  SlidersHorizontal,
  Users,
  Wallet,
  X
} from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
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

// Ryu Deep Navy Palette applied to Reine's Structure
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#1A2537',        // Ryu Deep Navy for Dark Elements
  surfaceDarkActive: '#23324B',  // Ryu Primary

  primary: '#23324B',            // Ryu Primary
  primaryLight: '#E0E7FF',       // Ryu Light Tint

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const BOOKING_FILTERS = [
  { id: 'all', label: 'All Bookings' },
  { id: 'confirmed', label: '✓ Confirmed' },
  { id: 'available', label: 'Available' },
  { id: 'manual', label: '+ Manual Entry' },
];

export default function RyuBookings({ route, navigation }) {
  const activeNav = 'Bookings';
  const [activeView, setActiveView] = useState('calendar');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { getBookings, addBooking } = useBookings();
  const bookings = getBookings('Ryu');

  const insets = useSafeAreaInsets(); 
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [highlightedRange, setHighlightedRange] = useState([]); 

  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [numDays, setNumDays] = useState('1');
  const [checkInTime] = useState('2:00 PM');
  const [checkOutTime] = useState('12:00 PM');
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (route.params?.mode === 'manual') {
      const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
      if (checkDate < today) {
        Alert.alert('Invalid Date', 'You cannot book dates that have already passed.');
        return;
      }
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
      const formattedDeparture = `${checkout.getMonth() + 1}/${checkout.getDate() < 10 ? '0' + checkout.getDate() : checkout.getDate()}/${checkout.getFullYear()}`;
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
    const newlyBookedDates = []; 

    for (let i = 0; i < days; i++) {
      const currentDay = new Date(checkInDate);
      currentDay.setDate(checkInDate.getDate() + i);
      if (
        currentDay.getMonth() === currentMonth.getMonth() &&
        currentDay.getFullYear() === currentMonth.getFullYear()
      ) {
        newBookings[currentDay.getDate()] = {
          guestName,
          contact,
          email: 'guest@example.com',
          checkIn: `${currentDay.getMonth() + 1}/${currentDay.getDate()}`,
          checkOut: departureDate,
          status: 'CONFIRMED',
          amount: `₱${(12000 * days).toLocaleString()}.00`, // Ryu Rate
        };
        newlyBookedDates.push(currentDay.getDate());
      }
    }

    addBooking('Ryu', newBookings);
    setHighlightedRange(newlyBookedDates); 
    setActiveView('calendar');
    setGuestName('');
    setContact('');
    setNumDays('1');
  };

  const isSameMonthAsToday = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  const occupiedDates = Object.keys(bookings).map(Number);
  const currentBooking = bookings[selectedDate];

  const handleDatePress = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (checkDate < today) {
      Alert.alert('Past Date', 'Selected date is in the past and cannot be booked.');
      return;
    }
    setHighlightedRange([]); 
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
    if (currentBooking) Linking.openURL(`tel:${currentBooking.contact}`).catch((err) => console.error("Couldn't load page", err));
  };

  const renderCalendarView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, isCurrentMonth: true });

    const upcomingCount = Object.keys(bookings).length;

    return (
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        <View style={styles.heroContainer}>
          <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay} />
            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Reservations</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8}>
                  <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>{upcomingCount} Upcoming</Text>
                <Text style={styles.heroSubStat}>Bookings scheduled for {formatMonth(currentMonth)}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {BOOKING_FILTERS.map((filter, index) => {
              const isActive = activeFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[index === 0 ? styles.actionPillDark : styles.actionPillLight, isActive && index !== 0 && styles.actionPillLightActive]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setActiveFilter(filter.id);
                    if (filter.id === 'manual') {
                      const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
                      if (checkDate < today) {
                        Alert.alert('Past Date', 'You cannot book a date in the past.');
                        return;
                      }
                      setActiveView('manual');
                      updateDepartureDate(selectedDate, numDays);
                    }
                  }}
                >
                  <Text style={[index === 0 ? styles.actionPillDarkText : styles.actionPillLightText, isActive && index !== 0 && styles.actionPillLightTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Monthly Calendar</Text></View>
          <View style={styles.calendarCard}>
            <View style={styles.monthSelector}>
              <TouchableOpacity style={styles.monthBtn} onPress={handlePrevMonth}><ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} /></TouchableOpacity>
              <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
              <TouchableOpacity style={styles.monthBtn} onPress={handleNextMonth}><ChevronRight size={24} color={COLORS.textMain} strokeWidth={2.5} /></TouchableOpacity>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.surfaceDark }]} /><Text style={styles.legendText}>Selected/Booked</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} /><Text style={styles.legendText}>Occupied</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.border }]} /><Text style={styles.legendText}>Available</Text></View>
            </View>

            <View style={styles.weekDaysRow}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (<Text key={idx} style={styles.weekDayText}>{day}</Text>))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((item, index) => {
                if (!item.isCurrentMonth) return (<View key={`prev-${index}`} style={styles.dayCellContainer}><Text style={styles.dayTextMuted}>{item.day}</Text></View>);

                const day = item.day;
                const isOccupied = occupiedDates.includes(day);
                const isSelected = selectedDate === day;
                const isJustBooked = highlightedRange.includes(day);
                const isToday = isSameMonthAsToday && today.getDate() === day;
                const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const isPast = checkDate < today;

                let cellStyle = [styles.dayCell];
                let textStyle = [styles.dayText];

                if (isJustBooked || isSelected) {
                  cellStyle.push(styles.dayCellSelected);
                  textStyle.push(styles.dayTextSelected);
                } else if (isOccupied) {
                  cellStyle.push(styles.dayCellOccupied);
                  textStyle.push(styles.dayTextOccupied);
                } else if (isPast) {
                  textStyle.push(styles.dayTextDisabled);
                }

                return (
                  <TouchableOpacity key={day} activeOpacity={isPast ? 1 : 0.8} onPress={() => handleDatePress(day)} style={styles.dayCellContainer}>
                    <View style={cellStyle}>
                      <Text style={textStyle}>{day}</Text>
                      {isToday && !isSelected && !isJustBooked && <View style={styles.todayDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Stay Details</Text></View>

          {currentBooking ? (
            <View style={styles.detailsCard}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop' }} style={styles.detailsCardImage} imageStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                <View style={styles.detailsCardImageOverlay} />
                <View style={styles.detailsCardImageContent}>
                  <View style={styles.confirmedBadge}><CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 4 }} /><Text style={styles.confirmedBadgeText}>{currentBooking.status}</Text></View>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop' }} style={styles.guestAvatarLarge} />
                </View>
              </ImageBackground>

              <View style={styles.detailsCardBody}>
                <View style={styles.cardBodyHeader}><Text style={styles.detailsTitle}>{currentBooking.guestName}</Text><Text style={styles.detailsSubtitle}>{currentBooking.checkIn} — {currentBooking.checkOut}</Text></View>
                <View style={styles.infoList}>
                  <View style={styles.infoRow}><View style={styles.infoIconBox}><Phone size={18} color={COLORS.textMain} strokeWidth={2} /></View><View style={styles.infoTextWrap}><Text style={styles.infoLabel}>CONTACT</Text><Text style={styles.infoValue}>{currentBooking.contact}</Text></View></View>
                  <View style={styles.infoRow}><View style={styles.infoIconBox}><Mail size={18} color={COLORS.textMain} strokeWidth={2} /></View><View style={styles.infoTextWrap}><Text style={styles.infoLabel}>EMAIL</Text><Text style={styles.infoValue}>{currentBooking.email}</Text></View></View>
                </View>

                <View style={styles.divider} />
                <View style={styles.cardFooter}>
                  <Text style={styles.priceAmount}>{currentBooking.amount} <Text style={styles.priceSubtitle}>total</Text></Text>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7}><X size={20} color={COLORS.textMain} strokeWidth={2.5} /></TouchableOpacity>
                    <TouchableOpacity style={styles.blackButton} activeOpacity={0.8} onPress={handleDialGuest}><MessageSquare size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }} /><Text style={styles.blackButtonText}>Message Guest</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconBox}><CalendarPlus size={32} color={COLORS.textMain} strokeWidth={1.5} /></View>
              <Text style={styles.emptyTitle}>Available Date</Text>
              <Text style={styles.emptySub}>Select an occupied date to see details, or tap below to manually book this date.</Text>
              <TouchableOpacity style={styles.blackButton} onPress={() => handleDatePress(selectedDate)} activeOpacity={0.85}><Text style={styles.blackButtonText}>Book {formatMonth(currentMonth).split(' ')[0]} {selectedDate}</Text></TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Month Snapshot</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}><CalendarDays size={24} color="#FFFFFF" style={styles.snapshotIcon} /><View><Text style={styles.snapshotValue}>{upcomingCount} Stays</Text><Text style={styles.snapshotLabel}>Confirmed</Text></View></View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}><Clock size={24} color="#FFFFFF" style={styles.snapshotIcon} /><View><Text style={styles.snapshotValue}>Check-in</Text><Text style={styles.snapshotLabel}>2:00 PM</Text></View></View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}><Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} /><View><Text style={styles.snapshotValue}>₱{(12000 * upcomingCount).toLocaleString()}</Text><Text style={styles.snapshotLabel}>Expected Revenue</Text></View></View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    );
  };

  const renderManualBookingView = () => {
    const formattedDate = `${currentMonth.getMonth() + 1}/${selectedDate < 10 ? '0' + selectedDate : selectedDate}/${currentMonth.getFullYear()}`;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false} style={{ opacity: fadeAnim }}>
          <View style={[styles.heroContainer, { height: 230 }]}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }} style={styles.heroImage} imageStyle={styles.heroImageStyle}>
              <View style={styles.heroOverlay} />
              <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
                <View style={styles.topBar}>
                  <TouchableOpacity onPress={() => setActiveView('calendar')} style={styles.iconBtnDark} activeOpacity={0.8}><ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} /></TouchableOpacity>
                  <View style={styles.locationPill}><CalendarPlus size={14} color="#FFFFFF" style={styles.locationIcon} /><Text style={styles.locationText}>New Booking</Text></View>
                  <View style={{ width: 44 }} />
                </View>
                <View style={styles.heroBottomContent}><Text style={styles.heroMainStat}>{formatMonth(currentMonth).split(' ')[0]} {selectedDate}</Text><Text style={styles.heroSubStat}>Fill in guest details below</Text></View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Guest Information</Text></View>
            <View style={styles.formCard}>
              <Text style={styles.formLabel}>FULL NAME</Text>
              <TextInput style={styles.input} placeholder="Enter guest name" placeholderTextColor={COLORS.textMuted} value={guestName} onChangeText={setGuestName} />

              <View style={styles.formRow}>
                <View style={{ flex: 1.5, marginRight: 12 }}><Text style={styles.formLabel}>CONTACT NUMBER</Text><TextInput style={styles.input} placeholder="+63 000 000 0000" placeholderTextColor={COLORS.textMuted} keyboardType="phone-pad" value={contact} onChangeText={setContact} /></View>
                <View style={{ flex: 1 }}><Text style={styles.formLabel}>NIGHTS</Text><TextInput style={styles.input} placeholder="1" placeholderTextColor={COLORS.textMuted} keyboardType="numeric" value={numDays} onChangeText={handleNumDaysChange} /></View>
              </View>

              <Text style={styles.formLabel}>EMAIL ADDRESS <Text style={{ fontWeight: '400', textTransform: 'none' }}>(Optional)</Text></Text>
              <TextInput style={styles.input} placeholder="guest@example.com" placeholderTextColor={COLORS.textMuted} keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Stay Schedule</Text></View>
            <View style={styles.scheduleCard}>
              <View style={styles.formRow}>
                <View style={[styles.halfInput, { marginRight: 12 }]}><Text style={styles.formLabel}>CHECK-IN</Text><View style={styles.readOnlyBox}><Text style={styles.readOnlySub}>Arrival</Text><Text style={styles.readOnlyValueMain}>{formattedDate}</Text><Text style={styles.readOnlySubTime}>{checkInTime}</Text></View></View>
                <View style={styles.halfInput}><Text style={styles.formLabel}>CHECK-OUT</Text><View style={styles.readOnlyBox}><Text style={styles.readOnlySub}>Departure</Text><Text style={styles.readOnlyValueMain}>{departureDate || 'Select Nights'}</Text><Text style={styles.readOnlySubTime}>{checkOutTime}</Text></View></View>
              </View>
            </View>

            <View style={styles.financialCard}>
              <View style={styles.financialHeader}><Text style={styles.financialLabel}>TOTAL AMOUNT DUE</Text><View style={styles.rateBadge}><Text style={styles.rateText}>FIXED RATE</Text></View></View>
              <View style={styles.divider} />
              <View style={styles.financialValueRow}><Text style={styles.financialCurrency}>₱{(12000 * parseInt(numDays || 1)).toLocaleString()}</Text><Text style={styles.financialNight}>.00 / {numDays} night(s)</Text></View>
            </View>

            <TouchableOpacity style={styles.blackSubmitBtn} activeOpacity={0.85} onPress={handleConfirmBooking}><CalendarPlus size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} /><Text style={styles.blackSubmitBtnText}>Confirm Booking</Text></TouchableOpacity>
          </View>
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      {activeView === 'calendar' ? renderCalendarView() : renderManualBookingView()}

      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem} activeOpacity={0.8}><Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem} activeOpacity={0.8}><CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem} activeOpacity={0.8}><Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem} activeOpacity={0.8}><Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem} activeOpacity={0.8}><Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} /><Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 240 },
  heroImage: { width: '100%', height: '100%' },
  heroImageStyle: {},
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBottomContent: { marginTop: 20 },
  heroMainStat: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, marginBottom: 2 },
  heroSubStat: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100 },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },
  mainContent: { paddingHorizontal: 24, paddingTop: 24 },
  sectionHeader: { marginBottom: 16, marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  calendarCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 28, borderWidth: 1, borderColor: COLORS.border },
  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthBtn: { padding: 4 },
  monthText: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  legendRow: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  weekDayText: { width: '14.28%', textAlign: 'center', fontSize: 11, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1 },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayCellContainer: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  dayCell: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: 'transparent' },
  dayCellOccupied: { backgroundColor: COLORS.primaryLight },
  dayCellSelected: { backgroundColor: COLORS.surfaceDark, transform: [{ scale: 1.1 }] },
  dayText: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  dayTextMuted: { fontSize: 15, fontWeight: '600', color: COLORS.border },
  dayTextOccupied: { color: COLORS.primary },
  dayTextSelected: { color: '#FFFFFF' },
  dayTextDisabled: { color: '#E4E4E7', fontWeight: '400' },
  todayDot: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.surfaceDark },
  detailsCard: { backgroundColor: COLORS.surface, borderRadius: 24, marginBottom: 28, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  detailsCardImage: { width: '100%', height: 160, justifyContent: 'space-between' },
  detailsCardImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  detailsCardImageContent: { flex: 1, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  confirmedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  confirmedBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.successText },
  guestAvatarLarge: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)' },
  detailsCardBody: { padding: 20 },
  cardBodyHeader: { marginBottom: 16 },
  detailsTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.5 },
  detailsSubtitle: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  infoList: { gap: 12, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  infoIconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 14, borderWidth: 1, borderColor: COLORS.border },
  infoTextWrap: { flex: 1 },
  infoLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2, letterSpacing: 0.5 },
  infoValue: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  cardFooter: { gap: 12 },
  priceAmount: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 12 },
  priceSubtitle: { fontSize: 14, fontWeight: '500', color: COLORS.textMuted },
  actionRow: { flexDirection: 'row', gap: 12 },
  cancelBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  blackButton: { flex: 1, flexDirection: 'row', height: 56, borderRadius: 100, backgroundColor: COLORS.surfaceDark, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  blackButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  emptyCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: 28 },
  emptyIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, marginBottom: 8 },
  emptySub: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  snapshotScroll: { gap: 16, paddingBottom: 24 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)', borderRadius: 24 },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  formCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  formLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 0.5, marginLeft: 4 },
  input: { backgroundColor: COLORS.background, borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 15, color: COLORS.textMain, fontWeight: '600', marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  formRow: { flexDirection: 'row' },
  halfInput: { flex: 1 },
  scheduleCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  readOnlyBox: { backgroundColor: COLORS.background, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  readOnlySub: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginBottom: 4 },
  readOnlyValueMain: { fontSize: 15, fontWeight: '700', color: COLORS.textMain, marginBottom: 2 },
  readOnlySubTime: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  financialCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 32, borderWidth: 1, borderColor: COLORS.border },
  financialHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  financialLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 0.5 },
  rateBadge: { backgroundColor: COLORS.background, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  rateText: { fontSize: 11, fontWeight: '700', color: COLORS.textMain },
  financialValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  financialCurrency: { fontSize: 36, fontWeight: '800', color: COLORS.textMain, letterSpacing: -1 },
  financialNight: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted, marginLeft: 6 },
  blackSubmitBtn: { flexDirection: 'row', height: 60, borderRadius: 100, backgroundColor: COLORS.surfaceDark, justifyContent: 'center', alignItems: 'center' },
  blackSubmitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});