import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  User,
  Bell,
  Lock,
  Shield,
  CircleHelp,
  LogOut,
  ChevronRight,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  PieChart,
  Settings,
  CheckCircle2
} from 'lucide-react-native';

// Premium Color Palette (Modernized)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep luxury forest green
  primaryLight: '#E8F0EA',  // Soft muted green
  primaryDark: '#0D1E14',
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',        // Slate 200
  cardBg: '#FFFFFF',
  expenseRed: '#EF4444',
  expenseBg: '#FEE2E2',
};

const SettingItem = ({ icon: Icon, title, onPress, isLast = false }) => (
  <TouchableOpacity
    style={[styles.settingItem, !isLast && styles.settingItemBorder]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.iconWrapper}>
      <Icon size={20} color={COLORS.primary} strokeWidth={2.5} />
    </View>
    <Text style={styles.settingTitle}>
      {title}
    </Text>
    <ChevronRight size={18} color={COLORS.textMuted} strokeWidth={2.5} />
  </TouchableOpacity>
);

export default function OwnerSettings({ navigation }) {
  const activeNav = 'Settings';

  const handleLogout = () => {
    // Reset navigation to Login screen
    if (navigation && navigation.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>

        {/* --- VIBRANT COLORED HEADER (Reine Layout) --- */}
        <SafeAreaView edges={['top']} style={styles.headerBackground}>

          <View style={styles.headerTopRow}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTopTitle}>Settings</Text>
            <View style={{ width: 44 }} /> {/* Spacer to center title */}
          </View>

          <View style={styles.headerContent}>
            {/* Avatar Profile */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarText}>AJ</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={24} color={COLORS.primary} fill="#FFFFFF" strokeWidth={2} />
              </View>
            </View>

            {/* Profile Info */}
            <Text style={styles.headerTitle}>Admin Jr.</Text>
            <Text style={styles.headerSubtitle}>jr.resort@mofinow.com</Text>

            <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.8}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>

        {/* --- OVERLAPPING SETTINGS CARD --- */}
        <View style={styles.settingsCard}>

          <Text style={styles.groupLabel}>ACCOUNT</Text>
          <SettingItem icon={User} title="Personal Information" onPress={() => {}} />
          <SettingItem icon={Lock} title="Password & Security" onPress={() => {}} />
          <SettingItem icon={Shield} title="Data Privacy" onPress={() => {}} isLast={true} />

          <Text style={[styles.groupLabel, { marginTop: 24 }]}>PREFERENCES</Text>
          <SettingItem icon={Bell} title="Notifications" onPress={() => {}} />
          <SettingItem icon={CircleHelp} title="Support & Help" onPress={() => {}} isLast={true} />

        </View>

        {/* --- FOOTER & LOGOUT --- */}
        <View style={styles.footerContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={COLORS.expenseRed} strokeWidth={2.5} style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>RESORT PORTFOLIO V3.1.0</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- FLOATING BOTTOM NAVIGATION (NO FAB) --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={[styles.navItem, activeNav === 'Property' && styles.navItemActive]}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Property' && <Text style={styles.navTextActive}>Props</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={[styles.navItem, activeNav === 'Bookings' && styles.navItemActive]}>
            <Calendar size={22} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Bookings' && <Text style={styles.navTextActive}>Book</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={[styles.navItem, activeNav === 'Finance' && styles.navItemActive]}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Finance' && <Text style={styles.navTextActive}>Fin</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={[styles.navItem, activeNav === 'Ledger' && styles.navItemActive]}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Ledger' && <Text style={styles.navTextActive}>Ledg</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={[styles.navItem, activeNav === 'Insights' && styles.navItemActive]}>
            <PieChart size={22} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Insights' && <Text style={styles.navTextActive}>Data</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={[styles.navItem, activeNav === 'Settings' && styles.navItemActive]}>
            <Settings size={22} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Settings' && <Text style={styles.navTextActive}>Set</Text>}
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
  },

  /* --- VIBRANT COLORED HEADER --- */
  headerBackground: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 80, // Extra padding to allow card to overlap
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTopTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 104,
    height: 104,
    borderRadius: 36, // Modern squircle
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  editProfileBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  /* --- OVERLAPPING CARD --- */
  settingsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: -45, // Pulls the card up into the header
    padding: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 6,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
  },

  /* --- FOOTER & LOGOUT --- */
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.expenseBg,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: COLORS.expenseRed,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },

  bottomSpacer: {
    height: 140, // Keeps content clear of the floating nav
  },

  /* --- FLOATING BOTTOM NAV --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
    width: '100%',
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
    flexDirection: 'column',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  navText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});