import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  User,
  Wand2,
  Zap,
  Droplet,
  UserPlus,
  Home,
  Calendar,
  Users,
  Wallet,
  Folder,
  Settings
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Ryu-specific Color Palette (Deep Navy Theme)
const COLORS = {
  background: '#FFFFFF',
  primary: '#23324B',       // Deep Navy Blue
  primaryLight: '#3A4D6B',
  accent: '#E0E7FF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#F1F5F9',
  cardBg: '#FFFFFF',
  warningText: '#C2410C',
  warningBg: '#FFEDD5',
  urgentText: '#B91C1C',
  urgentBg: '#FEE2E2',
  newText: '#1D4ED8',
  newBg: '#DBEAFE',
};

const TOP_TABS = ['Status', 'Bookings', 'Guest Management'];

const ACTIVE_TASKS = [
  { id: '1', title: 'Meralco Bill Due', subtitle: 'Statement for May', status: 'PENDING', icon: Zap, iconColor: '#EA580C', statusBg: COLORS.warningBg, statusText: COLORS.warningText },
  { id: '2', title: 'Water Bill Due', subtitle: 'Due in 2 days', status: 'URGENT', icon: Droplet, iconColor: '#EF4444', statusBg: COLORS.urgentBg, statusText: COLORS.urgentText },
  { id: '3', title: 'Guest Registration', subtitle: 'New booking #1244', status: 'NEW', icon: UserPlus, iconColor: '#3B82F6', statusBg: COLORS.newBg, statusText: COLORS.newText },
];

export default function RyuHome({ navigation }) {
  const [activeTab, setActiveTab] = useState('Status');
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>PROPERTY OVERVIEW</Text>
          <Text style={styles.headerTitle}>Ryu's House Admin</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- TOP TABS --- */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {TOP_TABS.map((tab, index) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, isActive && styles.tabActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>

        {/* --- MAIN STATUS CARD --- */}
        <View style={styles.statusCard}>
          <View style={styles.statusCardHeader}>
            <Text style={styles.statusCardSubtitle}>TODAY'S STATUS</Text>
            <View style={styles.statusPill} />
          </View>
          <Text style={styles.statusCardTitle}>OCCUPIED</Text>

          <View style={styles.guestInfoRow}>
            <View style={styles.guestAvatar}>
              <User size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.guestName}>Mark J</Text>
              <Text style={styles.guestStatus}>Checking out Tomorrow</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Wand2 size={18} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.actionButtonText}>Mark as Cleaned</Text>
          </TouchableOpacity>
        </View>

        {/* --- CHECK-IN / CHECK-OUT ROW --- */}
        <View style={styles.timeCardsRow}>
          <View style={styles.timeCard}>
            <Text style={styles.timeCardLabel}>CHECK-IN</Text>
            <Text style={styles.timeCardValue}>2:00 PM</Text>
            <View style={styles.timeTrack}>
              <View style={[styles.timeFill, { width: '75%' }]} />
            </View>
          </View>

          <View style={styles.timeCard}>
            <Text style={styles.timeCardLabel}>CHECK-OUT</Text>
            <Text style={styles.timeCardValue}>12:00 PM</Text>
            <View style={styles.timeTrack}>
              <View style={[styles.timeFill, { width: '40%', backgroundColor: '#94A3B8' }]} />
            </View>
          </View>
        </View>

        {/* --- FINANCIAL SNAPSHOT --- */}
        <Text style={styles.sectionTitle}>Financial Snapshot</Text>
        <View style={styles.financeCard}>
          <Text style={styles.financeLabel}>TODAY'S REVENUE</Text>
          <Text style={styles.financeValue}>₱12,000</Text>

          {/* Custom Bar Chart using standard Views */}
          <View style={styles.chartContainer}>
            {/* Bars */}
            <View style={styles.chartBarsArea}>
              <View style={[styles.chartBar, { height: '30%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '40%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '25%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '60%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '35%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '45%', backgroundColor: '#F1F5F9' }]} />
              <View style={[styles.chartBar, { height: '80%', backgroundColor: COLORS.primary }]} />
            </View>
            {/* Labels */}
            <View style={styles.chartLabelsArea}>
              <Text style={styles.chartLabel}>MON</Text>
              <Text style={styles.chartLabel}>TUE</Text>
              <Text style={styles.chartLabel}>WED</Text>
              <Text style={styles.chartLabel}>THU</Text>
              <Text style={styles.chartLabel}>FRI</Text>
              <Text style={styles.chartLabel}>SAT</Text>
              <Text style={styles.chartLabel}>SUN</Text>
            </View>
          </View>
        </View>

        {/* --- ACTIVE TASKS --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksList}>
          {ACTIVE_TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <TouchableOpacity key={task.id} activeOpacity={0.7} style={styles.taskCard}>
                <View style={styles.taskIconWrapper}>
                  <Icon size={20} color={task.iconColor} strokeWidth={2} />
                </View>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: task.statusBg }]}>
                  <Text style={[styles.statusText, { color: task.statusText }]}>{task.status}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('RyuHome')} style={styles.navItem}>
            <Home size={24} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Home' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Home' && styles.navTextActive]}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuBookings')} style={styles.navItem}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>BOOKINGS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuGuestMgmt')} style={styles.navItem}>
            <Users size={24} color={activeNav === 'Guest' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Guest' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Guest' && styles.navTextActive]}>GUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuFinance')} style={styles.navItem}>
            <Wallet size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>FINANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
            <Folder size={24} color={activeNav === 'Records' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Records' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Records' && styles.navTextActive]}>RECORDS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RyuAdmin')} style={styles.navItem}>
            <Settings size={24} color={activeNav === 'Setting' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Setting' ? 2.5 : 2} />
            <Text style={[styles.navText, activeNav === 'Setting' && styles.navTextActive]}>SETTING</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 16,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8BA185', // Matches the subtle greenish-grey in mockup
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDECE6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 24,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 24,
  },
  tab: {
    paddingBottom: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },

  /* --- STATUS CARD --- */
  statusCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusCardSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  statusPill: {
    width: 48,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
  },
  statusCardTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 24,
  },
  guestInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  guestAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  guestName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  guestStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },

  /* --- TIME CARDS --- */
  timeCardsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  timeCardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  timeTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  timeFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },

  /* --- FINANCE CARD --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryLight,
    letterSpacing: 0.5,
  },
  financeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  financeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  financeValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -1,
    marginBottom: 24,
  },
  chartContainer: {
    height: 120,
  },
  chartBarsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  chartBar: {
    width: '10%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  chartLabelsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chartLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
  },

  /* --- TASKS LIST --- */
  tasksList: {
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  taskIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  taskSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    fontWeight: '800',
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: COLORS.primary,
  },
});