import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Home,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  CheckCircle2
} from 'lucide-react-native';

// Reine's Beach House Theme (Vibrant Pink & Clean White)
const COLORS = {
  background: '#FFFFFF',
  primary: '#E64E76',       // Vibrant Pink
  primaryLight: '#FDF0F4',  // Very soft pink for backgrounds
  primaryMuted: '#F9A8BB',  // Muted pink
  textMain: '#1E293B',      // Dark Slate
  textMuted: '#94A3B8',     // Slate Gray
  border: '#F8FAFC',
  cardBg: '#FFFFFF',
};

const SETTINGS_MENU = [
  {
    id: '1',
    icon: Home,
    title: 'Property Profile',
    subtitle: 'Manage resort details & images'
  },
  {
    id: '2',
    icon: Bell,
    title: 'Notification Preferences',
    subtitle: 'Configure alerts and messages'
  },
  {
    id: '3',
    icon: Shield,
    title: 'Security',
    subtitle: 'Password and authentication'
  },
  {
    id: '4',
    icon: HelpCircle,
    title: 'Support',
    subtitle: 'Get help and documentation'
  },
];

export default function ReineSettings({ navigation }) {
  const activeNav = 'Admin';

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
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >

        {/* --- VIBRANT PINK HEADER --- */}
        <SafeAreaView edges={['top']} style={styles.headerBackground}>
          <View style={styles.headerContent}>

            {/* Avatar Profile */}
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                style={styles.avatarImage}
              />
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={24} color={COLORS.primary} fill="#FFFFFF" strokeWidth={2} />
              </View>
            </View>

            {/* Profile Info */}
            <Text style={styles.headerTitle}>Reine's House Admin</Text>
            <Text style={styles.headerSubtitle}>Resort Manager</Text>

          </View>
        </SafeAreaView>

        {/* --- OVERLAPPING SETTINGS CARD --- */}
        <View style={styles.settingsCard}>

          {SETTINGS_MENU.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === SETTINGS_MENU.length - 1;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={[styles.menuItem, isLast && styles.menuItemLast]}
              >
                <View style={styles.iconBox}>
                  <Icon size={22} color={COLORS.primary} strokeWidth={2.5} />
                </View>

                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>

                <ChevronRight size={20} color="#CBD5E1" strokeWidth={2.5} />
              </TouchableOpacity>
            )
          })}

        </View>

        {/* --- LOGOUT BUTTON --- */}
        <View style={styles.footerContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={COLORS.primary} strokeWidth={2.5} style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>REINE'S BEACH HOUSE RESORT V2.4.0</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ReineHome')} style={styles.navItem}>
            <Home size={24} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ReineBookings')} style={styles.navItem}>
            <CalendarDays size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ReineGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ReineFinance')} style={styles.navItem}>
            <Wallet size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineAdmin')}>
            <Settings size={24} color={activeNav === 'Admin' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Admin' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Admin' && styles.navTextActive]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* --- VIBRANT PINK HEADER --- */
  headerBackground: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 80, // Extra padding to allow card to overlap
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#FFD1C1', // Light peach outline matching mockup
    backgroundColor: '#FDECE6',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)', // Muted white
  },

  /* --- OVERLAPPING CARD --- */
  settingsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: -45, // Pulls the card up into the pink header
    padding: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  menuItemLast: {
    marginBottom: 0,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* --- FOOTER & LOGOUT --- */
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight, // Soft pink background
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: COLORS.primary, // Vibrant pink text
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

  /* --- BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 6,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});