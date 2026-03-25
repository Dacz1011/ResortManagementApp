import React from 'react';
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

const COLORS = {
  background: '#FFFFFF',
  primary: '#E64E76',
  primaryLight: '#FDF0F4',
  textMain: '#1E293B',
  textMuted: '#94A3B8',
  cardBg: '#FFFFFF',
};

const SETTINGS_MENU = [
  { id: '1', icon: Home, title: 'Property Profile', subtitle: 'Manage resort details & images' },
  { id: '2', icon: Bell, title: 'Notification Preferences', subtitle: 'Configure alerts and messages' },
  { id: '3', icon: Shield, title: 'Security', subtitle: 'Password and authentication' },
  { id: '4', icon: HelpCircle, title: 'Support', subtitle: 'Get help and documentation' },
];

export default function ReineAdmin({ navigation }) {
  const activeNav = 'Admin';

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
        <SafeAreaView edges={['top']} style={styles.headerBackground}>
          <View style={styles.headerContent}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                style={styles.avatarImage}
              />
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={24} color={COLORS.primary} fill="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.headerTitle}>Reine's House Admin</Text>
            <Text style={styles.headerSubtitle}>Resort Manager</Text>
          </View>
        </SafeAreaView>

        <View style={styles.settingsCard}>
          {SETTINGS_MENU.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={item.id} activeOpacity={0.7} style={[styles.menuItem, index === SETTINGS_MENU.length - 1 && styles.menuItemLast]}>
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

        <View style={styles.footerContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color={COLORS.primary} strokeWidth={2.5} style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>REINE'S BEACH HOUSE RESORT V2.4.0</Text>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('ReineHome')} style={styles.navItem}>
            <Home size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineBookings')} style={styles.navItem}>
            <CalendarDays size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>Guest</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReineFinance')} style={styles.navItem}>
            <Wallet size={24} color={COLORS.textMuted} strokeWidth={2} />
            <Text style={styles.navText}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineAdmin')}>
            <Settings size={24} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={[styles.navText, styles.navTextActive]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  headerBackground: { backgroundColor: COLORS.primary, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingBottom: 80 },
  headerContent: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 32 },
  avatarWrapper: { position: 'relative', marginBottom: 20 },
  avatarImage: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#FFD1C1', backgroundColor: '#FDECE6' },
  verifiedBadge: { position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 6 },
  headerSubtitle: { fontSize: 14, fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)' },
  settingsCard: { backgroundColor: COLORS.cardBg, borderRadius: 32, marginHorizontal: 24, marginTop: -45, padding: 24, paddingVertical: 32, elevation: 6 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  menuItemLast: { marginBottom: 0 },
  iconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuTextContainer: { flex: 1, paddingRight: 16 },
  menuTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain, marginBottom: 4 },
  menuSubtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  footerContainer: { paddingHorizontal: 24, paddingTop: 32 },
  logoutButton: { flexDirection: 'row', backgroundColor: COLORS.primaryLight, borderRadius: 16, height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  logoutIcon: { marginRight: 10 },
  logoutButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: '800' },
  versionText: { textAlign: 'center', fontSize: 10, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1.5 },
  bottomNavContainer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingBottom: Platform.OS === 'ios' ? 20 : 0 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70, paddingHorizontal: 8 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' },
  navText: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, marginTop: 6 },
  navTextActive: { color: COLORS.primary },
});