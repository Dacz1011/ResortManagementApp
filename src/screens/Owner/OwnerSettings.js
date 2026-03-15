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
  ChevronRight
} from 'lucide-react-native';

const COLORS = {
  background: '#FFFFFF',
  primary: '#1A3626',       // Dark forest green
  textMain: '#1E293B',
  textMuted: '#94A3B8',
  borderLight: '#F1F5F9',
  expenseRed: '#EF4444',
};

const SettingItem = ({ icon: Icon, title, onPress, isDestructive = false }) => (
  <TouchableOpacity
    style={styles.settingItem}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={[styles.iconWrapper, isDestructive && { backgroundColor: '#FEF2F2' }]}>
      <Icon size={20} color={isDestructive ? COLORS.expenseRed : COLORS.primary} strokeWidth={2} />
    </View>
    <Text style={[styles.settingTitle, { fontFamily: 'Manrope-Bold' }, isDestructive && { color: COLORS.expenseRed }]}>
      {title}
    </Text>
    {!isDestructive && <ChevronRight size={18} color={COLORS.textMuted} />}
  </TouchableOpacity>
);

export default function OwnerSettings({ navigation }) {
  const handleLogout = () => {
    // Reset navigation to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={[styles.backText, { fontFamily: 'Manrope-Bold' }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- PROFILE SECTION --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          <Text style={[styles.userName, { fontFamily: 'Manrope-ExtraBold' }]}>Admin Jr.</Text>
          <Text style={[styles.userEmail, { fontFamily: 'Manrope-Medium' }]}>jr.resort@mofinow.com</Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={[styles.editProfileText, { fontFamily: 'Manrope-Bold' }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- SETTINGS GROUPS --- */}
        <View style={styles.groupContainer}>
          <Text style={[styles.groupLabel, { fontFamily: 'Manrope-ExtraBold' }]}>ACCOUNT</Text>
          <SettingItem icon={User} title="Personal Information" onPress={() => {}} />
          <SettingItem icon={Lock} title="Password & Security" onPress={() => {}} />
          <SettingItem icon={Shield} title="Data Privacy" onPress={() => {}} />
        </View>

        <View style={styles.groupContainer}>
          <Text style={[styles.groupLabel, { fontFamily: 'Manrope-ExtraBold' }]}>PREFERENCES</Text>
          <SettingItem icon={Bell} title="Notifications" onPress={() => {}} />
          <SettingItem icon={CircleHelp} title="Support & Help" onPress={() => {}} />
        </View>

        <View style={[styles.groupContainer, { marginBottom: 40 }]}>
          <Text style={[styles.groupLabel, { fontFamily: 'Manrope-ExtraBold' }]}>SESSIONS</Text>
          <SettingItem
            icon={LogOut}
            title="Log Out"
            onPress={handleLogout}
            isDestructive={true}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textMain,
  },
  headerRight: {
    width: 80,
  },
  scrollContent: {
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 22,
    color: COLORS.textMain,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  editProfileBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  editProfileText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  groupContainer: {
    marginBottom: 32,
  },
  groupLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textMain,
  }
});
