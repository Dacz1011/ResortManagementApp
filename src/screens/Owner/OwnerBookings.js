import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BarChart2,
  BookOpen,
  Calendar,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PieChart,
  Settings,
  Smartphone,
  TrendingUp,
  User,
  Wallet
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE (green brand, matches PortfolioDashboard) ──
const COLORS = {
  background: '#F7F8F6',
  surface:    '#FFFFFF',
  surfaceDark:'#1A3626',     // deep forest green

  primary:     '#1A3626',
  primaryLight:'#E8F0EA',
  accent:      '#2DD4BF',    // teal — owner-only highlight
  accentLight: '#CCFBF1',

  textMain:  '#0F172A',
  textMuted: '#64748B',
  border:    '#E2E8F0',

  successBg:  '#DCFCE7',
  successText:'#16A34A',
  warningBg:  '#FEF9C3',
  warningText:'#CA8A04',
};

const PROPERTIES = [
  { id: 'reine', name: "Reine's Beach House", short: "Reine's", rate: 12000,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' },
  { id: 'ryu',   name: "Ryu's Transient House", short: "Ryu's",  rate: 8000,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' },
  { id: 'casa',  name: "Casa M.O.",             short: "Casa",   rate: 15000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
];

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
  casa: {},
};

export default function OwnerBookings({ navigation }) {
  const activeNav = 'Bookings';

  const [selectedPropertyId, setSelectedPropertyId] = useState('reine');
  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate]   = useState(today.getDate());

  const [fullName,     setFullName]     = useState('');
  const [contact,      setContact]      = useState('');
  const [email,        setEmail]        = useState('');
  const [checkInDate,  setCheckInDate]  = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [checkOutDate, setCheckOutDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const [nights,       setNights]       = useState(1);
  const [totalAmount,  setTotalAmount]  = useState(0);

  // Fade-in — matches ReineHome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const currentPropertyBookings = MOCK_BOOKINGS[selectedPropertyId] || {};
  const occupiedDates = Object.keys(currentPropertyBookings).map(Number);
  const isOccupied    = occupiedDates.includes(selectedDate);
  const currentBooking = currentPropertyBookings[selectedDate];

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffNights = Math.ceil(Math.abs(checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      setNights(diffNights > 0 ? diffNights : 0);
      setTotalAmount(diffNights > 0 ? diffNights * selectedProperty.rate : 0);
    } else {
      setNights(0); setTotalAmount(0);
    }
  }, [checkInDate, checkOutDate, selectedPropertyId]);

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const formatMonth     = (d) => d.toLocaleString('default', { month: 'long', year: 'numeric' });
  const isSameMonthAsToday = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();

  const handleDatePress = (day) => {
    setSelectedDate(day);
    if (!occupiedDates.includes(day)) {
      const auto = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setCheckInDate(auto);
      const autoOut = new Date(auto); autoOut.setDate(auto.getDate() + 1);
      setCheckOutDate(autoOut);
    }
  };

  const handleNumDaysChange = (text) => {
    const n = parseInt(text) || 0;
    setNights(n);
    if (checkInDate && n > 0) {
      const out = new Date(checkInDate); out.setDate(checkInDate.getDate() + n);
      setCheckOutDate(out);
    }
  };

  const handleConfirmBooking = () => {
    if (!fullName || !contact || nights <= 0) {
      Alert.alert('Missing Information', 'Please fill in guest details and valid dates.');
      return;
    }
    Alert.alert(
      'Booking Confirmed',
      `${fullName} booked at ${selectedProperty.name} for ${nights} nights.\nTotal: ₱${totalAmount.toLocaleString()}`,
      [{ text: 'OK', onPress: () => { setFullName(''); setContact(''); setEmail(''); } }]
    );
  };

  const formatDate = (d) => {
    if (!d) return 'mm/dd/yyyy';
    return `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
  };

  const getCalendarDays = () => {
    const year  = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1).getDay();
    const daysInMonth    = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = first - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, isCurrentMonth: true });
    return days;
  };

  const isFormReady = fullName.length > 0 && contact.length > 0 && nights > 0;
  const totalBookings = Object.values(MOCK_BOOKINGS).reduce((sum, prop) => sum + Object.keys(prop).length, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          style={{ opacity: fadeAnim }}
        >

          {/* ══════════════════════════════════════════
              FULL-BLEED HERO
              ══════════════════════════════════════════ */}
          <View style={styles.heroContainer}>
            <ImageBackground
              source={{ uri: selectedProperty.image }}
              style={styles.heroImage}
            >
              <View style={styles.heroOverlay} />

              <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Top bar */}
                <View style={styles.topBar}>
                  <View style={styles.locationPill}>
                    <MapPin size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.locationText}>Reservations</Text>
                  </View>
                  <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <ChevronLeft size={22} color="#FFFFFF" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                {/* Hero bottom */}
                <View style={styles.heroBottomContent}>
                  <Text style={styles.heroLabel}>MONTHLY SUMMARY</Text>
                  <Text style={styles.heroMainStat}>{occupiedDates.length} Bookings</Text>

                  <View style={styles.heroSubRow}>
                    <TrendingUp size={14} color={COLORS.accent} strokeWidth={3} style={{ marginRight: 6 }} />
                    <Text style={styles.heroSubStat}>
                      Across {PROPERTIES.length} properties this month
                    </Text>
                  </View>

                  {/* Portfolio summary pill — mirrors PortfolioDashboard trend pill */}
                  <View style={styles.statPill}>
                    <View style={styles.statPillIconBox}>
                      <TrendingUp size={18} color={COLORS.successText} strokeWidth={2.5} />
                    </View>
                    <View style={styles.statPillTextContent}>
                      <Text style={styles.statPillTitle}>{totalBookings} active stays across all properties</Text>
                      <Text style={styles.statPillSub}>Tap a property tab to filter the calendar</Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>

          {/* ══════════════════════════════════════════
              PROPERTY SELECTOR PILLS
              ══════════════════════════════════════════ */}
          <View style={styles.quickActionsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActionsScroll}
            >
              {PROPERTIES.map((prop) => {
                const isActive = selectedPropertyId === prop.id;
                return (
                  <TouchableOpacity
                    key={prop.id}
                    style={[
                      isActive ? styles.actionPillDark : styles.actionPillLight,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => { setSelectedPropertyId(prop.id); setSelectedDate(today.getDate()); }}
                  >
                    <Text style={isActive ? styles.actionPillDarkText : styles.actionPillLightText}>
                      {prop.short}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* Quick jump pill */}
              <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
                <Text style={styles.actionPillLightText}>All Properties</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPillLight} activeOpacity={0.7}>
                <Text style={styles.actionPillLightText}>Occupied Only</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* ══════════════════════════════════════════
              MAIN CONTENT
              ══════════════════════════════════════════ */}
          <View style={styles.mainContent}>

            {/* Current property context banner */}
            <View style={styles.propertyBanner}>
              <View style={styles.propertyBannerLeft}>
                <Text style={styles.propertyBannerLabel}>VIEWING CALENDAR FOR</Text>
                <Text style={styles.propertyBannerName}>{selectedProperty.name}</Text>
              </View>
              <View style={styles.rateBadge}>
                <Text style={styles.rateText}>₱{selectedProperty.rate.toLocaleString()}/night</Text>
              </View>
            </View>

            {/* ── CALENDAR CARD ── */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Monthly Calendar</Text>
            </View>

            <View style={styles.calendarCard}>
              {/* Month nav */}
              <View style={styles.monthSelector}>
                <TouchableOpacity style={styles.monthBtn} onPress={handlePrevMonth}>
                  <ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
                <TouchableOpacity style={styles.monthBtn} onPress={handleNextMonth}>
                  <ChevronRight size={24} color={COLORS.textMain} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* Legend */}
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.surfaceDark }]} />
                  <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Booked</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.border }]} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
              </View>

              {/* Weekdays */}
              <View style={styles.weekDaysRow}>
                {['SUN','MON','TUE','WED','THU','FRI','SAT'].map((d, i) => (
                  <Text key={i} style={styles.weekDayText}>{d}</Text>
                ))}
              </View>

              {/* Days grid */}
              <View style={styles.daysGrid}>
                {getCalendarDays().map((item, index) => {
                  if (!item.isCurrentMonth) {
                    return (
                      <View key={`p-${index}`} style={styles.dayCellContainer}>
                        <Text style={styles.dayTextMuted}>{item.day}</Text>
                      </View>
                    );
                  }
                  const day = item.day;
                  const isDayOccupied = occupiedDates.includes(day);
                  const isDaySelected = selectedDate === day;
                  const isDayToday    = isSameMonthAsToday && today.getDate() === day;

                  return (
                    <TouchableOpacity
                      key={day}
                      activeOpacity={0.8}
                      onPress={() => handleDatePress(day)}
                      style={styles.dayCellContainer}
                    >
                      <View style={[
                        styles.dayCell,
                        isDaySelected  && styles.dayCellSelected,
                        !isDaySelected && isDayOccupied && styles.dayCellOccupied,
                      ]}>
                        <Text style={[
                          styles.dayText,
                          isDaySelected  && styles.dayTextSelected,
                          !isDaySelected && isDayOccupied && styles.dayTextOccupied,
                        ]}>
                          {day}
                        </Text>
                        {isDayToday && !isDaySelected && <View style={styles.todayDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ── DYNAMIC SECTION: BOOKING DETAILS or FORM ── */}
            <View style={styles.dynamicHeader}>
              <Text style={styles.sectionTitle}>
                {isOccupied ? 'Stay Details' : 'Create Reservation'}
              </Text>
              <Text style={styles.dynamicDate}>
                {formatMonth(currentMonth).split(' ')[0]} {selectedDate}
              </Text>
            </View>

            {isOccupied ? (
              /* ── OCCUPIED: DETAILS CARD (image-top, mirrors ReineBookings detailsCard) ── */
              <View style={styles.detailsCard}>
                <ImageBackground
                  source={{ uri: selectedProperty.image }}
                  style={styles.detailsCardImage}
                  imageStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                >
                  <View style={styles.detailsCardImageOverlay} />
                  <View style={styles.detailsCardImageContent}>
                    <View style={[
                      styles.confirmedBadge,
                      { backgroundColor: currentBooking.status === 'CONFIRMED' ? COLORS.successBg : COLORS.warningBg },
                    ]}>
                      <CheckCircle2
                        size={11}
                        color={currentBooking.status === 'CONFIRMED' ? COLORS.successText : COLORS.warningText}
                        strokeWidth={3}
                        style={{ marginRight: 3 }}
                      />
                      <Text style={[
                        styles.confirmedBadgeText,
                        { color: currentBooking.status === 'CONFIRMED' ? COLORS.successText : COLORS.warningText },
                      ]}>
                        {currentBooking.status}
                      </Text>
                    </View>
                    <View style={styles.guestAvatarBox}>
                      <User size={24} color={COLORS.primary} strokeWidth={2} />
                    </View>
                  </View>
                </ImageBackground>

                <View style={styles.detailsCardBody}>
                  <Text style={styles.detailsTitle}>{currentBooking.guestName}</Text>
                  <Text style={styles.detailsSubtitle}>{currentBooking.checkIn} — {currentBooking.checkOut}</Text>

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

                  {/* Divider + action */}
                  <View style={styles.divider} />
                  <TouchableOpacity style={styles.greenPillBtn} activeOpacity={0.85}>
                    <MessageSquare size={18} color={COLORS.surface} strokeWidth={2.5} style={{ marginRight: 8 }} />
                    <Text style={styles.greenPillBtnText}>Message Guest</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* ── AVAILABLE: BOOKING FORM ── */
              <>
                {/* Guest info card */}
                <View style={styles.formCard}>
                  <Text style={styles.formLabel}>GUEST INFORMATION</Text>
                  <View style={styles.inputWrapper}>
                    <User size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input} placeholder="Full Name"
                      placeholderTextColor={COLORS.textMuted}
                      value={fullName} onChangeText={setFullName}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Smartphone size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input} placeholder="Contact Number"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="phone-pad"
                      value={contact} onChangeText={setContact}
                    />
                  </View>
                  <View style={[styles.inputWrapper, { marginBottom: 0 }]}>
                    <Mail size={20} color={COLORS.textMuted} strokeWidth={2} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input} placeholder="Email Address (Optional)"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="email-address" autoCapitalize="none"
                      value={email} onChangeText={setEmail}
                    />
                  </View>
                </View>

                {/* Stay dates card */}
                <View style={styles.formCard}>
                  <Text style={styles.formLabel}>STAY DURATION</Text>
                  <View style={styles.dateRow}>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateBoxLabel}>CHECK-IN</Text>
                      <View style={styles.dateBoxValue}>
                        <Calendar size={16} color={checkInDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                        <Text style={[styles.dateText, checkInDate && styles.dateTextActive]}>
                          {formatDate(checkInDate)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dateBox}>
                      <Text style={styles.dateBoxLabel}>CHECK-OUT</Text>
                      <View style={styles.dateBoxValue}>
                        <Calendar size={16} color={checkOutDate ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
                        <Text style={[styles.dateText, checkOutDate && styles.dateTextActive]}>
                          {formatDate(checkOutDate)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nightsBadge}>
                    <Text style={styles.nightsBadgeLabel}>Total Nights</Text>
                    <TextInput
                      style={styles.nightsInput}
                      keyboardType="numeric"
                      value={nights.toString()}
                      onChangeText={handleNumDaysChange}
                    />
                  </View>
                </View>

                {/* Financials — dark green card, premium owner feel */}
                <View style={styles.financialsCard}>
                  <View style={styles.financialsHeaderRow}>
                    <Text style={styles.financialsLabel}>TOTAL AMOUNT DUE</Text>
                    <View style={styles.accentBadge}>
                      <Text style={styles.accentBadgeText}>₱{selectedProperty.rate.toLocaleString()}/night</Text>
                    </View>
                  </View>
                  <View style={styles.dividerWhite} />
                  <Text style={[styles.financialsValue, totalAmount > 0 && styles.financialsValueActive]}>
                    ₱ {totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                </View>

                {/* Confirm — green pill button, owner-tier accent */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.confirmBtn, !isFormReady && styles.confirmBtnDisabled]}
                  onPress={handleConfirmBooking}
                >
                  <CalendarPlus
                    size={22}
                    color={isFormReady ? COLORS.surface : '#94A3B8'}
                    strokeWidth={2.5}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.confirmBtnText, !isFormReady && styles.confirmBtnTextDisabled]}>
                    Confirm Booking
                  </Text>
                </TouchableOpacity>
              </>
            )}

          </View>
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>

      {/* ══════════════════════════════════════════
          DARK GREEN PILL BOTTOM NAV (owner portal)
          ══════════════════════════════════════════ */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Settings' && styles.navTextActive]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.background },
  scrollContent:{ flexGrow: 1 },

  /* ── HERO ── */
  heroContainer:{ width: '100%', height: 340 },
  heroImage:    { width: '100%', height: '100%' },
  heroOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,25,15,0.58)' },
  safeArea:{
    flex: 1, paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 28, justifyContent: 'space-between',
  },
  topBar:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  iconBtnDark:{
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(30,60,30,0.6)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  heroBottomContent: {
    marginTop: 'auto',
    gap: 4,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  heroMainStat: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroSubStat: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },

  /* Stat pill in hero */
  statPill:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(10,25,15,0.7)',
    borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  statPillIconBox:{
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.successBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  statPillTextContent: {
    justifyContent: 'center',
  },
  statPillTitle:{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  statPillSub:  { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },

  /* ── PROPERTY PILLS ── */
  quickActionsWrapper:{ marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark:{
    backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20,
    height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100,
  },
  actionPillDarkText:{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight:{
    backgroundColor: COLORS.surface, paddingHorizontal: 16,
    height: 44, justifyContent: 'center', borderRadius: 100,
    borderWidth: 1, borderColor: COLORS.border,
  },
  actionPillLightText:{ color: COLORS.textMain, fontSize: 14, fontWeight: '600' },

  /* ── MAIN CONTENT ── */
  mainContent:{ paddingHorizontal: 24, paddingTop: 8 },

  /* Property context banner — owner-tier differentiator */
  propertyBanner:{
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primaryLight, borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 14, marginBottom: 24,
    borderWidth: 1, borderColor: '#C8DAC8',
  },
  propertyBannerLeft:{},
  propertyBannerLabel:{ fontSize: 9, fontWeight: '800', color: COLORS.primary, letterSpacing: 1, marginBottom: 2 },
  propertyBannerName: { fontSize: 16, fontWeight: '800', color: COLORS.primary, letterSpacing: -0.3 },
  rateBadge:{
    backgroundColor: COLORS.surfaceDark, paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 100,
  },
  rateText:{ fontSize: 12, fontWeight: '800', color: COLORS.accent },

  sectionHeader:{ marginBottom: 16, marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  /* ── CALENDAR ── */
  calendarCard:{
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 28, borderWidth: 1, borderColor: COLORS.border,
  },
  monthSelector:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthBtn:{ padding: 4 },
  monthText:{ fontSize: 18, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  legendRow:{ flexDirection: 'row', gap: 20, marginBottom: 20 },
  legendItem:{ flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText:{ fontSize: 11, fontWeight: '600', color: COLORS.textMuted },

  weekDaysRow:{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  weekDayText:{
    width: '14.28%', textAlign: 'center',
    fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1,
  },
  daysGrid:{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayCellContainer:{
    width: '14.28%', aspectRatio: 1,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  dayCell:{
    width: 36, height: 36, justifyContent: 'center',
    alignItems: 'center', borderRadius: 12,
  },
  dayCellOccupied:{ backgroundColor: COLORS.primaryLight },
  dayCellSelected:{
    backgroundColor: COLORS.surfaceDark,
    transform: [{ scale: 1.1 }],
  },
  dayText:        { fontSize: 15, fontWeight: '700', color: COLORS.textMain },
  dayTextMuted:   { fontSize: 15, fontWeight: '600', color: COLORS.border },
  dayTextOccupied:{ color: COLORS.primary },
  dayTextSelected:{ color: '#FFFFFF' },
  todayDot:{
    position: 'absolute', bottom: 4,
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: COLORS.primary,
  },

  /* ── DYNAMIC HEADER ── */
  dynamicHeader:{
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'baseline', marginBottom: 16,
  },
  dynamicDate:{ fontSize: 13, fontWeight: '700', color: COLORS.primary, letterSpacing: 0.5 },

  /* ── BOOKING DETAILS CARD (image-top) ── */
  detailsCard:{
    backgroundColor: COLORS.surface, borderRadius: 24,
    marginBottom: 24, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  detailsCardImage:{ width: '100%', height: 140 },
  detailsCardImageOverlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,25,15,0.4)',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  detailsCardImageContent:{
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'flex-start', padding: 16,
  },
  confirmedBadge:{
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start',
  },
  confirmedBadgeText:{ fontSize: 10, fontWeight: '800' },
  guestAvatarBox:{
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
  },
  detailsCardBody:{ padding: 20 },
  detailsTitle:   { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.5 },
  detailsSubtitle:{ fontSize: 13, fontWeight: '500', color: COLORS.textMuted, marginBottom: 16 },
  infoList:{ gap: 12, marginBottom: 16 },
  infoRow:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, padding: 14,
    borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  infoIconBox:{
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
    borderWidth: 1, borderColor: COLORS.border,
  },
  infoTextWrap:{ flex: 1 },
  infoLabel:{ fontSize: 10, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2, letterSpacing: 0.5 },
  infoValue:{ fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  divider:{ height: 1, backgroundColor: COLORS.border, marginBottom: 16 },

  /* Green pill action — owner differentiator (accent-toned) */
  greenPillBtn:{
    flexDirection: 'row', height: 56, borderRadius: 100,
    backgroundColor: COLORS.surfaceDark,
    justifyContent: 'center', alignItems: 'center',
  },
  greenPillBtnText:{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' },

  /* ── FORM CARDS ── */
  formCard:{
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 20,
    marginBottom: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  formLabel:{ fontSize: 11, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1, marginBottom: 14 },
  inputWrapper:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 16, paddingHorizontal: 16, height: 56, marginBottom: 12,
  },
  inputIcon:{ marginRight: 12 },
  input:{ flex: 1, height: '100%', fontSize: 15, fontWeight: '600', color: COLORS.textMain },

  dateRow:{ flexDirection: 'row', gap: 12, marginBottom: 12 },
  dateBox:{
    flex: 1, backgroundColor: COLORS.background, borderRadius: 16,
    padding: 14, borderWidth: 1, borderColor: COLORS.border,
  },
  dateBoxLabel:{ fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  dateBoxValue:{ flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateText:   { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  dateTextActive:{ color: COLORS.textMain, fontWeight: '800' },

  nightsBadge:{
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primaryLight, borderRadius: 16,
    paddingHorizontal: 20, paddingVertical: 14,
    borderWidth: 1, borderColor: '#C8DAC8',
  },
  nightsBadgeLabel:{ fontSize: 14, fontWeight: '700', color: COLORS.primary },
  nightsInput:{ fontSize: 18, fontWeight: '800', color: COLORS.primary, textAlign: 'right', minWidth: 40 },

  /* Financial card — deep green, premium owner identity */
  financialsCard:{
    backgroundColor: COLORS.surfaceDark, borderRadius: 24,
    padding: 24, marginBottom: 20,
  },
  financialsHeaderRow:{
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  financialsLabel:{ fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.75)', letterSpacing: 1 },
  accentBadge:{ backgroundColor: 'rgba(45,212,191,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  accentBadgeText:{ fontSize: 11, fontWeight: '800', color: COLORS.accent },
  dividerWhite:{ height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 16 },
  financialsValue:{ fontSize: 36, fontWeight: '800', color: 'rgba(255,255,255,0.35)', letterSpacing: -1 },
  financialsValueActive:{ color: '#FFFFFF' },

  /* Confirm button */
  confirmBtn:{
    flexDirection: 'row', height: 64, borderRadius: 100,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.surfaceDark, marginBottom: 8,
  },
  confirmBtnDisabled:{ backgroundColor: COLORS.border },
  confirmBtnText:{ fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  confirmBtnTextDisabled:{ color: '#94A3B8' },

  bottomSpacer:{ height: 160 },

  /* ── DARK GREEN PILL BOTTOM NAV (owner portal) ── */
  bottomNavContainer:{
    position: 'absolute', bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center', width: '92%', zIndex: 100,
  },
  bottomNav:{
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surfaceDark, borderRadius: 100,
    paddingVertical: 10, paddingHorizontal: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 20,
  },
  navItem:{ alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText:{ fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.45)', marginTop: 3 },
  navTextActive:{ color: '#FFFFFF', fontWeight: '700' },
});