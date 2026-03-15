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
  Calendar,
  Users,
  Wallet,
  Folder,
  Settings,
  Check
} from 'lucide-react-native';

// Deep Navy Blue Theme (Ryu's Transient House)
const COLORS = {
  background: '#FAFAFA',
  primary: '#23324B',       // Deep Navy Blue (Header & Buttons)
  primaryLight: '#3A4D6B',
  accent: '#3B82F6',
  textMain: '#0F172A',
  textMuted: '#94A3B8',
  border: '#F1F5F9',
  cardBg: '#FFFFFF',
  badgeBg: '#FFFFFF',
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

export default function RyuSettings({ navigation }) {
  const activeNav = 'Setting';

  const handleLogout = () => {
    // Reset navigation to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >

        {/* --- DARK NAVY HEADER --- */}
        <SafeAreaView edges={['top']} style={styles.headerBackground}>
          <View style={styles.headerContent}>

            {/* Avatar Profile */}
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                style={styles.avatarImage}
              />
              <View style={styles.verifiedBadge}>
                <Check size={10} color={COLORS.primary} strokeWidth={3} />
              </View>
            </View>

            {/* Profile Info */}
            <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Ryu's Transient House Admin</Text>
            <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Medium' }]}>Resort Admin</Text>

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
                  <Icon size={22} color={COLORS.primary} strokeWidth={2} />
                </View>

                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, { fontFamily: 'Manrope-Bold' }]}>{item.title}</Text>
                  <Text style={[styles.menuSubtitle, { fontFamily: 'Manrope-Medium' }]}>{item.subtitle}</Text>
                </View>

                <ChevronRight size={20} color={COLORS.border} strokeWidth={2.5} />
              </TouchableOpacity>
            )
          })}

        </View>

        {/* --- LOGOUT BUTTON --- */}
        <View style={styles.footerContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#FFFFFF" strokeWidth={2.5} style={styles.logoutIcon} />
            <Text style={[styles.logoutButtonText, { fontFamily: 'Manrope-ExtraBold' }]}>Logout</Text>
          </TouchableOpacity>

          <Text style={[styles.versionText, { fontFamily: 'Manrope-ExtraBold' }]}>RYU'S TRANSIENT HOUSE V2.4.0</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem}>
            <Home size={24} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Home' && styles.navTextActive]}>HOME</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Bookings' && styles.navTextActive]}>BOOKINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Guest' && styles.navTextActive]}>GUEST</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem}>
            <Wallet size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Finance' && styles.navTextActive]}>FINANCE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestHistory')} style={styles.navItem}>
            <Folder size={24} color={activeNav === 'Records' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Records' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Records' && styles.navTextActive]}>RECORDS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RyuSettings')} style={styles.navItem}>
            <Settings size={24} color={activeNav === 'Setting' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Setting' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Setting' && styles.navTextActive]}>SETTING</Text>
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

  /* --- DARK NAVY HEADER --- */
  headerBackground: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
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
    borderColor: '#FFD1C1', // Matches the peach outline in mockup
    backgroundColor: '#FDECE6',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.badgeBg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8', // Muted slate color for subtitle
  },

  /* --- OVERLAPPING CARD --- */
  settingsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: -40, // Pulls the card up into the dark header
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
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  /* --- FOOTER & LOGOUT --- */
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
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
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});
