import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  FileBarChart,
  Home,
  LogIn,
  MapPin,
  ReceiptText,
  Search,
  Settings,
  Sparkles,
  Star,
  SunMedium,
  Users,
  Wallet,
  Wrench,
  Zap
} from 'lucide-react-native';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useBookings } from '../../context/BookingContext';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Casa Deep Forest Green Palette
const COLORS = {
  background: '#F7F7F9',    
  surface: '#FFFFFF',       
  surfaceDark: '#0D3B10',   // Casa Deep Green
  surfaceDarkActive: '#1B5E20',

  primary: '#1B5E20',       // Casa Primary
  primaryLight: '#E8F5E9',

  textMain: '#18181B',      
  textMuted: '#71717A',     
  border: '#E4E4E7',        

  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  warningBg: '#FEF9C3',
  warningText: '#CA8A04',
  infoBg: '#E0F2FE',
  infoText: '#0EA5E9',
};

const QUICK_ACTIONS = [
  { id: '1', icon: CalendarPlus, label: 'Book', route: 'CasaBookings', params: { mode: 'manual' } },
  { id: '2', icon: ReceiptText, label: 'Expense', route: 'CasaFinance' },
  { id: '3', icon: Wrench, label: 'Fix', route: 'CasaFinance' },
  { id: '4', icon: FileBarChart, label: 'Report', route: 'CasaGuestHistory' },
];

export default function CasaHome({ navigation }) {
  const activeNav = 'Home';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const { getBookings, refreshBookings } = useBookings();
  const bookingsData = getBookings('Casa');
  const [tasks, setTasks] = useState([]);

  // Refresh bookings whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      refreshBookings();
    }, [refreshBookings])
  );

  // Calculate stats dynamically
  const { totalRevenue, activeGuest, arrivalCount } = useMemo(() => {
    const bookings = Object.values(bookingsData);
    const revenue = bookings.reduce((sum, b) => {
      const amt = parseInt(b.amount?.replace(/[₱,\.]/g, '') || '0') / 100;
      return sum + amt;
    }, 0);

    const active = bookings.find(b => b.status === 'CONFIRMED') || { guestName: 'No Active Guests', status: 'N/A' };
    const arrivals = bookings.filter(b => b.status === 'PENDING').length;

    return {
      totalRevenue: revenue,
      activeGuest: active,
      arrivalCount: arrivals
    };
  }, [bookingsData]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Load Tasks from MockDb
    const loadTasks = async () => {
      const storedTasks = await mockDb.getAll('casa_tasks');
      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        const defaultTasks = [
          { id: '1', title: 'Plumbing Check', subtitle: 'Scheduled for 2:00 PM', type: 'maintenance' },
          { id: '2', title: 'Electricity Bill', subtitle: 'Due in 2 days • ₱8,240', type: 'finance' },
          { id: '3', title: 'Housekeeping', subtitle: 'Cleaning required for Room A', type: 'service' },
        ];
        setTasks(defaultTasks);
        await mockDb.saveAll('casa_tasks', defaultTasks);
      }
    };
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* --- HERO BANNER --- */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop' }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.heroSafeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 10 }]}>
              {/* Top Bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={16} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Casa M.O. Resort</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CasaAdmin')} style={styles.profileAvatarWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop' }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
              </View>

              {/* Bottom Content */}
              <View style={styles.heroBottomContent}>
                <Text style={styles.greetingSub}>WELCOME BACK</Text>
                <Text style={styles.greetingText}>Ready to Manage{'\n'}Your Property?</Text>

                <TouchableOpacity style={styles.searchBar} activeOpacity={0.9} onPress={() => navigation.navigate('CasaGuestMgmt')}>
                  <Search size={22} color="rgba(255,255,255,0.7)" />
                  <View style={styles.searchTextWrap}>
                    <Text style={styles.searchTitle}>Search guests or bookings...</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* --- HORIZONTAL QUICK ACTIONS PILLS --- */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            <TouchableOpacity style={styles.actionPillDark} activeOpacity={0.8} onPress={() => navigation.navigate('CasaBookings', { mode: 'manual' })}>
              <Text style={styles.actionPillDarkText}>Quick Actions</Text>
            </TouchableOpacity>

            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionPillLight}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate(action.route, action.params)}
                >
                  <Icon size={16} color={COLORS.textMain} style={{ marginRight: 6 }} />
                  <Text style={styles.actionPillLightText}>{action.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>

          {/* --- CURRENTLY HOSTING --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Currently Hosting</Text>
          </View>

          <View style={styles.largeCard}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop' }}
              style={styles.cardImageTop}
            >
              <View style={styles.cardImageOverlay}>
                <View style={styles.cardFavoriteBtn}>
                  <CheckCircle2 size={18} color="#FFFFFF" />
                </View>
              </View>
            </ImageBackground>

            <View style={styles.cardBody}>
              <View style={styles.cardBodyHeader}>
                <Text style={styles.cardTitle}>{activeGuest.guestName}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color={COLORS.textMain} fill={COLORS.textMain} />
                  <Text style={styles.ratingText}>VIP</Text>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>Checking out {activeGuest.checkOut || 'soon'}</Text>
              <Text style={styles.cardTags}>{activeGuest.status} • {activeGuest.email || 'Verified Guest'}</Text>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <Text style={styles.priceAmount}>{activeGuest.amount || '₱0.00'} <Text style={styles.priceSubtitle}>total</Text></Text>
                <TouchableOpacity style={styles.blackButton} activeOpacity={0.8}>
                  <Text style={styles.blackButtonText}>Mark Cleaned</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* --- TODAY'S SNAPSHOT --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Snapshot</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snapshotScroll}>
            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.7} onPress={() => navigation.navigate('CasaFinance')}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <DollarSign size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>₱{(totalRevenue / 1000).toFixed(1)}K</Text>
                    <Text style={styles.snapshotLabel}>Total Revenue</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.7} onPress={() => navigation.navigate('CasaBookings')}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <LogIn size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>{arrivalCount} Arrivals</Text>
                    <Text style={styles.snapshotLabel}>Expected Today</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.9}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop' }}
                style={styles.snapshotImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.snapshotOverlay} />
                <View style={styles.snapshotContent}>
                  <SunMedium size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                  <View>
                    <Text style={styles.snapshotValue}>28°C • Sunny</Text>
                    <Text style={styles.snapshotLabel}>High Tide: 2:30 PM</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>

          {/* --- PRIORITY ALERTS --- */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Priority Alerts</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CasaFinance')}>
              <Text style={styles.viewAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tasksList}>
            {tasks.map((task) => {
              const isMaintenance = task.type === 'maintenance';
              const isFinance = task.type === 'finance';
              return (
                <TouchableOpacity key={task.id} style={styles.taskCard} activeOpacity={0.7}>
                  <View style={[styles.taskIconWrapper, {
                    backgroundColor: isMaintenance ? COLORS.dangerBg : isFinance ? COLORS.warningBg : COLORS.infoBg
                  }]}>
                    {isMaintenance ? <Wrench size={20} color={COLORS.dangerText} strokeWidth={2.5} /> :
                     isFinance ? <Zap size={20} color={COLORS.warningText} strokeWidth={2.5} /> :
                     <Sparkles size={20} color={COLORS.infoText} strokeWidth={2.5} />}
                  </View>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                  </View>
                  <View style={styles.taskAction}>
                     <Text style={[styles.actionTextResolve, { color: isMaintenance ? COLORS.dangerText : COLORS.warningText }]}>
                       {isMaintenance ? 'Resolve' : isFinance ? 'Pay' : ''}
                     </Text>
                     <ChevronRight size={18} color={COLORS.textMuted} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>
      </Animated.ScrollView>

      {/* --- BOTTOM NAV --- */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('CasaHome')} style={styles.navItem} activeOpacity={0.8}>
            <Home size={22} color={activeNav === 'Home' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaGuestMgmt')} style={styles.navItem} activeOpacity={0.8}>
            <Users size={22} color={activeNav === 'Guest' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaFinance')} style={styles.navItem} activeOpacity={0.8}>
            <Wallet size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CasaAdmin')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Admin' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, paddingBottom: 120 },
  heroContainer: { width: '100%', height: 420, backgroundColor: COLORS.surfaceDark },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(27, 94, 32, 0.65)' },
  heroSafeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 60, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(24, 24, 27, 0.45)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.15)' },
  locationIcon: { marginRight: 8 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },
  profileAvatarWrap: { position: 'relative' },
  profileAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#FFFFFF' },
  notificationDot: { position: 'absolute', top: 2, right: 2, width: 12, height: 12, backgroundColor: COLORS.primary, borderRadius: 6, borderWidth: 2, borderColor: '#FFFFFF' },
  heroBottomContent: { marginTop: 'auto', marginBottom: 10 },
  greetingSub: { fontSize: 13, fontWeight: '800', color: '#FFFFFF', letterSpacing: 2, marginBottom: 10, opacity: 0.9 },
  greetingText: { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1.2, lineHeight: 46, marginBottom: 32 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(24, 24, 27, 0.4)', borderRadius: 24, paddingHorizontal: 24, paddingVertical: 18, width: '100%', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  searchTextWrap: { marginLeft: 14 },
  searchTitle: { fontSize: 16, fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)' },
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100 },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  mainContent: { paddingHorizontal: 24 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 16 },
  sectionHeader: { marginTop: 12, marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  viewAllText: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  largeCard: { backgroundColor: COLORS.surface, borderRadius: 24, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  cardImageTop: { width: '100%', height: 240, justifyContent: 'flex-start', alignItems: 'flex-end' },
  cardImageOverlay: { padding: 16 },
  cardFavoriteBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  cardBody: { padding: 20 },
  cardBodyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain, flex: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 14, fontWeight: '800', color: COLORS.textMain, marginLeft: 6 },
  cardSubtitle: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted, marginBottom: 4 },
  cardTags: { fontSize: 13, fontWeight: '500', color: '#A1A1AA', marginBottom: 16 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceAmount: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  priceSubtitle: { fontSize: 14, fontWeight: '500', color: COLORS.textMuted },
  blackButton: { backgroundColor: COLORS.surfaceDark, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 100 },
  blackButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  snapshotScroll: { gap: 16, paddingBottom: 8 },
  snapshotCard: { width: 150, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)', borderRadius: 24 },
  snapshotContent: { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon: { marginBottom: 'auto' },
  snapshotValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  tasksList: { gap: 12 },
  taskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  taskIconWrapper: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 4, letterSpacing: -0.2 },
  taskSubtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  taskAction: { flexDirection: 'row', alignItems: 'center' },
  actionTextResolve: { fontSize: 13, fontWeight: '800', color: COLORS.dangerText, marginRight: 4 },
  actionTextPay: { fontSize: 13, fontWeight: '800', color: COLORS.warningText, marginRight: 4 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surfaceDark, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});
