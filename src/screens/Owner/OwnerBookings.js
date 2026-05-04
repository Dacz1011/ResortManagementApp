import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
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
  MapPin,
  SlidersHorizontal,
  X,
  Clock,
  Wallet,
  CalendarDays
} from 'lucide-react-native';
import { useBookings } from '../../context/BookingContext';

const { width } = Dimensions.get('window');

// Matched strictly to Reine palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const PROPERTIES = [
  {
    id: 'Reine',
    name: "Reine's Beach House",
    subtitle: 'Luxury Oceanfront Suites',
    rate: 15000,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    color: '#E64E76',
    lightColor: '#FFF0F3'
  },
  {
    id: 'Ryu',
    name: "Ryu's Transient House",
    subtitle: 'Urban Comfort & Convenience',
    rate: 8000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    color: '#1A2537', // Dark Blueish
    lightColor: '#E0E7FF'
  },
  {
    id: 'Casa',
    name: "Casa M.O.",
    subtitle: 'Traditional Heritage Villa',
    rate: 12000,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
    color: '#013220', // Dark Green
    lightColor: '#E8F5E9'
  },
];

export default function OwnerBookings({ navigation }) {
  const activeNav = 'Bookings';
  const { getBookings, addBooking, deleteStay } = useBookings();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Unified Property State
  const [selectedPropertyId, setSelectedPropertyId] = useState('Reine');
  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);

  // Calendar States
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  // Form States
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [numDays, setNumDays] = useState('1');
  const [checkInTime] = useState('2:00 PM');
  const [checkOutTime] = useState('12:00 PM');
  const [departureDate, setDepartureDate] = useState('');

  // Get real bookings from Context
  const currentPropertyBookings = getBookings(selectedPropertyId) || {};
  const occupiedDates = Object.keys(currentPropertyBookings).map(Number);
  const currentBooking = currentPropertyBookings[selectedDate];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [selectedPropertyId]);

  useEffect(() => {
    updateDepartureDate(selectedDate, numDays);
  }, [selectedDate, numDays, currentMonth]);

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
  };

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const formatMonth = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleDatePress = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (checkDate < today) {
      Alert.alert('Past Date', 'Selected date is in the past.');
      return;
    }
    setSelectedDate(day);
  };

  const handleConfirmBooking = async () => {
    const days = parseInt(numDays);
    if (!fullName || !contact || isNaN(days) || days <= 0) {
      Alert.alert('Missing Info', 'Please fill in guest details and nights.');
      return;
    }

    const newBookings = {};
    const checkInDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);

    for (let i = 0; i < days; i++) {
      const currentDay = new Date(checkInDate);
      currentDay.setDate(checkInDate.getDate() + i);
      if (
        currentDay.getMonth() === currentMonth.getMonth() &&
        currentDay.getFullYear() === currentMonth.getFullYear()
      ) {
        newBookings[currentDay.getDate()] = {
          guestName: fullName,
          contact: contact,
          email: email || 'n/a',
          checkIn: `${currentDay.getMonth() + 1}/${currentDay.getDate()}`,
          checkOut: departureDate,
          status: 'CONFIRMED',
          amount: `₱${(selectedProperty.rate * days).toLocaleString()}.00`,
        };
      }
    }

    await addBooking(selectedPropertyId, newBookings);
    Alert.alert('Success', 'Booking confirmed.');
    setFullName('');
    setContact('');
    setEmail('');
    setNumDays('1');
  };

  const handleCancelBooking = () => {
    if (!currentBooking) return;
    Alert.alert(
      'Cancel Booking',
      `Cancel booking for ${currentBooking.guestName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            await deleteStay(selectedPropertyId, currentBooking.guestName, currentBooking.checkIn, currentBooking.checkOut);
          },
        },
      ]
    );
  };

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

  const upcomingCount = Object.keys(currentPropertyBookings).length;
  const isSameMonthAsToday = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: selectedProperty.image }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              {/* Top bar */}
              <View style={styles.topBar}>
                <TouchableOpacity style={styles.iconBtnDark} onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Reservations</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark}>
                  <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* Hero text */}
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroMainStat}>{upcomingCount} Booked</Text>
                <Text style={styles.heroSubStat}>
                  {selectedProperty.name} • {formatMonth(currentMonth)}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ── PROPERTY TABS (QUICK FILTERS) ── */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {PROPERTIES.map((prop) => {
              const isActive = selectedPropertyId === prop.id;
              return (
                <TouchableOpacity
                  key={prop.id}
                  style={[
                    styles.actionPillLight,
                    isActive && { backgroundColor: prop.lightColor, borderColor: prop.color }
                  ]}
                  onPress={() => setSelectedPropertyId(prop.id)}
                >
                  <Text style={[
                    styles.actionPillLightText,
                    isActive && { color: prop.color, fontWeight: '700' }
                  ]}>
                    {prop.name.split("'")[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── MAIN CONTENT ── */}
        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Availability Calendar</Text>
          </View>

          {/* Calendar Card */}
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
                const isOccupied = occupiedDates.includes(day);
                const isSelected = selectedDate === day;
                const isToday = isSameMonthAsToday && today.getDate() === day;
                const isPast = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < today;

                let cellStyle = [styles.dayCell];
                let textStyle = [styles.dayText];

                if (isSelected) {
                  cellStyle.push({ backgroundColor: selectedProperty.color, transform: [{ scale: 1.1 }] });
                  textStyle.push(styles.dayTextSelected);
                } else if (isOccupied) {
                  cellStyle.push({ backgroundColor: selectedProperty.lightColor });
                  textStyle.push({ color: selectedProperty.color });
                } else if (isPast) {
                  textStyle.push(styles.dayTextDisabled);
                }

                return (
                  <TouchableOpacity
                    key={day}
                    activeOpacity={isPast ? 1 : 0.8}
                    onPress={() => handleDatePress(day)}
                    style={styles.dayCellContainer}
                  >
                    <View style={cellStyle}>
                      <Text style={textStyle}>{day}</Text>
                      {isToday && !isSelected && <View style={[styles.todayDot, { backgroundColor: selectedProperty.color }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {currentBooking ? 'Stay Details' : 'Manual Entry'}
            </Text>
          </View>

          {currentBooking ? (
            /* ── BOOKING DETAIL CARD ── */
            <View style={styles.detailsCard}>
              <View style={styles.detailsCardBody}>
                <View style={styles.cardBodyHeaderRow}>
                  <View>
                    <View style={styles.confirmedBadge}>
                      <CheckCircle2 size={12} color={COLORS.successText} strokeWidth={3} style={{ marginRight: 4 }} />
                      <Text style={styles.confirmedBadgeText}>{currentBooking.status}</Text>
                    </View>
                    <Text style={styles.detailsTitle}>{currentBooking.guestName}</Text>
                    <Text style={styles.detailsSubtitle}>
                      {currentBooking.checkIn} — {currentBooking.checkOut}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.guestAvatarLarge}
                  />
                </View>

                <View style={styles.infoList}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoIconBox}>
                      <Phone size={18} color={COLORS.textMain} strokeWidth={2} />
                    </View>
                    <View style={styles.infoTextWrap}>
                      <Text style={styles.infoLabel}>CONTACT</Text>
                      <Text style={styles.infoValue}>{currentBooking.contact}</Text>
                    </View>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.infoIconBox}>
                      <Mail size={18} color={COLORS.textMain} strokeWidth={2} />
                    </View>
                    <View style={styles.infoTextWrap}>
                      <Text style={styles.infoLabel}>EMAIL</Text>
                      <Text style={styles.infoValue}>{currentBooking.email}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                  <Text style={styles.priceAmount}>
                    {currentBooking.amount}{' '}
                    <Text style={styles.priceSubtitle}>total</Text>
                  </Text>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelBooking}>
                      <X size={20} color={COLORS.textMain} strokeWidth={2.5} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryButton, { backgroundColor: selectedProperty.color }]}>
                      <MessageSquare size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }} />
                      <Text style={styles.primaryButtonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            /* ── MANUAL BOOKING FORM ── */
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <View style={styles.formCard}>
                <Text style={styles.formLabel}>FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter guest name"
                  placeholderTextColor={COLORS.textMuted}
                  value={fullName}
                  onChangeText={setFullName}
                />

                <View style={styles.formRow}>
                  <View style={{ flex: 1.5, marginRight: 12 }}>
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

                <Text style={styles.formLabel}>STAY SCHEDULE</Text>
                <View style={styles.formRow}>
                  <View style={[styles.readOnlyBox, { flex: 1, marginRight: 12 }]}>
                    <Text style={styles.readOnlySub}>Check-in</Text>
                    <Text style={styles.readOnlyValueMain}>{`${currentMonth.getMonth() + 1}/${selectedDate}`}</Text>
                  </View>
                  <View style={[styles.readOnlyBox, { flex: 1 }]}>
                    <Text style={styles.readOnlySub}>Check-out</Text>
                    <Text style={styles.readOnlyValueMain}>{departureDate || '...'}</Text>
                  </View>
                </View>

                <View style={[styles.divider, { marginTop: 24 }]} />

                <View style={styles.financialValueRow}>
                  <Text style={styles.financialCurrency}>
                    ₱{(selectedProperty.rate * parseInt(numDays || 0)).toLocaleString()}
                  </Text>
                  <Text style={styles.financialNight}>.00 total</Text>
                </View>

                <TouchableOpacity
                  style={[styles.primarySubmitBtn, { backgroundColor: selectedProperty.color }]}
                  onPress={handleConfirmBooking}
                >
                  <CalendarPlus size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} />
                  <Text style={styles.primarySubmitBtnText}>Confirm Reservation</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}

          {/* ── SNAPSHOT STRIP ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
            <TouchableOpacity style={styles.snapshotCard}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>₱{(selectedProperty.rate * upcomingCount).toLocaleString()}</Text>
                    <Text style={styles.snapshotLabel}>Exp. Revenue</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapshotCard}>
              <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }} style={styles.snapshotImage} imageStyle={{ borderRadius: 24 }}>
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <CalendarDays size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>{upcomingCount} Bookings</Text>
                    <Text style={styles.snapshotLabel}>Monthly Total</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={[styles.bottomNav, { backgroundColor: selectedProperty.color }]}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 320 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubStat: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', textAlign: 'center' },

  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillLight: { backgroundColor: COLORS.surface, paddingHorizontal: 20, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },

  mainContent: { paddingHorizontal: 24, paddingTop: 16 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  calendarCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 28, borderWidth: 1, borderColor: COLORS.border },
  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthBtn: { padding: 4 },
  monthText: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  weekDayText: { width: '14.28%', textAlign: 'center', fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCellContainer: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  dayCell: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  dayCellOccupied: { backgroundColor: COLORS.primaryLight },
  dayCellSelected: { backgroundColor: COLORS.primary, transform: [{ scale: 1.1 }] },
  dayText: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  dayTextMuted: { fontSize: 15, fontWeight: '600', color: COLORS.border },
  dayTextOccupied: { color: COLORS.primary },
  dayTextSelected: { color: '#FFFFFF' },
  dayTextDisabled: { color: '#E4E4E7', fontWeight: '400' },
  todayDot: { position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary },

  detailsCard: { backgroundColor: COLORS.surface, borderRadius: 24, marginBottom: 28, borderWidth: 1, borderColor: COLORS.border, padding: 20 },
  cardBodyHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  confirmedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  confirmedBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.successText },
  detailsTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 4 },
  detailsSubtitle: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  guestAvatarLarge: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: COLORS.border },
  infoList: { gap: 12, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  infoIconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 14, borderWidth: 1, borderColor: COLORS.border },
  infoTextWrap: { flex: 1 },
  infoLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  cardFooter: { gap: 12 },
  priceAmount: { fontSize: 20, fontWeight: '800', color: COLORS.textMain },
  priceSubtitle: { fontSize: 14, fontWeight: '500', color: COLORS.textMuted },
  actionRow: { flexDirection: 'row', gap: 12 },
  cancelBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  primaryButton: { flex: 1, flexDirection: 'row', height: 56, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },

  formCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 28, borderWidth: 1, borderColor: COLORS.border },
  formLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 0.5 },
  input: { backgroundColor: COLORS.background, borderRadius: 16, paddingHorizontal: 16, height: 56, fontSize: 15, color: COLORS.textMain, fontWeight: '600', marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  formRow: { flexDirection: 'row' },
  readOnlyBox: { backgroundColor: COLORS.background, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  readOnlySub: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginBottom: 4 },
  readOnlyValueMain: { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  financialValueRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 16, marginBottom: 24 },
  financialCurrency: { fontSize: 36, fontWeight: '800', color: COLORS.textMain, letterSpacing: -1 },
  financialNight: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted, marginLeft: 6 },
  primarySubmitBtn: { flexDirection: 'row', height: 60, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  primarySubmitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  snapshotScroll: { gap: 16, paddingBottom: 24 },
  snapshotCard: { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)' },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});