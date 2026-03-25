import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  User,
  LogOut,
  LogIn,
  Banknote,
  ClipboardList,
  Zap,
  Droplet,
  ChevronRight,
  Home,
  CalendarDays,
  Users,
  Wallet,
  Settings,
  Paintbrush,
  ArrowUpRight
} from 'lucide-react-native';

// Modernized Theme Palette
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#E64E76',       // Vibrant Pink
  primaryLight: '#FDF0F4',  // Very soft pink
  primaryDark: '#BE375A',   // Deep pink for gradients/accents
  textMain: '#0F172A',      // Slate 900 (High contrast)
  textMuted: '#64748B',     // Slate 500
  border: '#F1F5F9',        // Slate 100
  cardBg: '#FFFFFF',

  // Accents
  successBg: '#DCFCE7',
  successText: '#16A34A',
  warningBg: '#FEF9C3',
  warningIcon: '#EAB308',
  infoBg: '#E0F2FE',
  infoIcon: '#0EA5E9',
};

export default function ReineHome({ navigation }) {
  const activeNav = 'Home';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>

        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' }}
              style={styles.profileAvatar}
            />
            <View>
              <Text style={styles.greetingText}>Good Morning,</Text>
              <Text style={styles.headerTitle}>Reine Admin 👋</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- HERO STATUS CARD --- */}
          <View style={styles.heroCard}>
            {/* Decorative Background Elements */}
            <View style={styles.heroCircleTop} />
            <View style={styles.heroCircleBottom} />

            <View style={styles.heroHeader}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusBadgeText}>OCCUPIED</Text>
              </View>
              <Text style={styles.heroSubtitle}>TODAY'S STATUS</Text>
            </View>

            <View style={styles.guestProfileRow}>
              <View style={styles.heroAvatar}>
                <User size={24} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <View style={styles.guestDetails}>
                <Text style={styles.guestName}>Mark J.</Text>
                <Text style={styles.guestCheckout}>Checking out tomorrow • 12:00 PM</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
              <Paintbrush size={18} color={COLORS.primary} strokeWidth={2.5} />
              <Text style={styles.actionButtonText}>Mark as Cleaned</Text>
            </TouchableOpacity>
          </View>

          {/* --- BENTO BOX GRID --- */}
          <View style={styles.bentoGrid}>

            {/* Tall Revenue Card */}
            <View style={[styles.bentoCard, styles.revenueCard]}>
              <View style={styles.bentoIconWrapper}>
                <Banknote size={22} color={COLORS.primary} strokeWidth={2.5} />
              </View>
              <View style={styles.bentoTextWrap}>
                <Text style={styles.bentoLabel}>TODAY'S REVENUE</Text>
                <Text style={styles.revenueValue}>₱12K</Text>
                <View style={styles.trendRow}>
                  <ArrowUpRight size={14} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.trendText}>+15%</Text>
                </View>
              </View>
            </View>

            {/* Stacked Logistics Cards */}
            <View style={styles.bentoCol}>
              <View style={[styles.bentoCard, styles.smallBento]}>
                <View style={styles.bentoHeader}>
                  <Text style={styles.bentoLabelDark}>CHECK-IN</Text>
                  <LogIn size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
                <Text style={styles.smallBentoValue}>2:00 <Text style={styles.amPm}>PM</Text></Text>
                <Text style={styles.smallBentoSub}>2 Guests expected</Text>
              </View>

              <View style={[styles.bentoCard, styles.smallBento]}>
                <View style={styles.bentoHeader}>
                  <Text style={styles.bentoLabelDark}>CHECK-OUT</Text>
                  <LogOut size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
                <Text style={styles.smallBentoValue}>12:00 <Text style={styles.amPm}>PM</Text></Text>
                <Text style={styles.smallBentoSub}>1 Room pending</Text>
              </View>
            </View>

          </View>

          {/* --- ACTIVE TASKS SECTION --- */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Active Tasks</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tasksList}>
            {/* Task 1 */}
            <TouchableOpacity activeOpacity={0.7} style={styles.taskCard}>
              <View style={[styles.taskIconWrapper, { backgroundColor: COLORS.warningBg }]}>
                <Zap size={22} color={COLORS.warningIcon} strokeWidth={2.5} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Meralco Bill</Text>
                <Text style={styles.taskSubtitle}>Due in 2 days • ₱8,240</Text>
              </View>
              <View style={styles.taskAction}>
                <Text style={styles.payNowText}>Pay</Text>
                <ChevronRight size={18} color={COLORS.textMuted} />
              </View>
            </TouchableOpacity>

            {/* Task 2 */}
            <TouchableOpacity activeOpacity={0.7} style={styles.taskCard}>
              <View style={[styles.taskIconWrapper, { backgroundColor: COLORS.infoBg }]}>
                <Droplet size={22} color={COLORS.infoIcon} strokeWidth={2.5} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Water Bill</Text>
                <Text style={styles.taskSubtitle}>Past due • ₱1,150</Text>
              </View>
              <View style={styles.taskAction}>
                <Text style={styles.payNowText}>Pay</Text>
                <ChevronRight size={18} color={COLORS.textMuted} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Spacer for Floating Nav */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>

      {/* --- FLOATING BOTTOM NAVIGATION --- */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>

          <TouchableOpacity style={[styles.navItem, activeNav === 'Home' && styles.navItemActive]} onPress={() => navigation.navigate('ReineHome')}>
            <Home size={22} color={activeNav === 'Home' ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
            {activeNav === 'Home' && <Text style={styles.navTextActive}>Home</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineBookings')}>
            <CalendarDays size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineGuestMgmt')}>
            <Users size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineFinance')}>
            <Wallet size={22} color={COLORS.textMuted} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ReineAdmin')}>
            <Settings size={22} color={COLORS.textMuted} strokeWidth={2.5} />
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
  safeArea: {
    flex: 1,
  },

  /* --- HEADER --- */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  bellButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  /* --- HERO CARD (MODERN) --- */
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  heroCircleTop: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -80,
    right: -40,
  },
  heroCircleBottom: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -60,
    left: -40,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    marginRight: 6,
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  guestProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  heroAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guestDetails: {
    flex: 1,
  },
  guestName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  guestCheckout: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },

  /* --- BENTO BOX GRID --- */
  bentoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  revenueCard: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bentoCol: {
    flex: 1,
    gap: 16,
  },
  smallBento: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  bentoIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bentoTextWrap: {
    marginTop: 'auto',
  },
  bentoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  bentoLabelDark: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -1.5,
    marginBottom: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.successText,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  smallBentoValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  amPm: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  smallBentoSub: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  /* --- ACTIVE TASKS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  tasksList: {
    gap: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  taskIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  taskSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  taskAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payNowText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },

  bottomSpacer: {
    height: 140, // Enough space so floating nav doesn't cover content
  },

  /* --- FLOATING BOTTOM NAV --- */
  floatingNavWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 24,
    left: 24,
    right: 24,
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 72,
    borderRadius: 36,
    paddingHorizontal: 8,
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
    flexDirection: 'row',
    borderRadius: 28,
  },
  navItemActive: {
    backgroundColor: COLORS.primaryLight,
    flex: 1.5, // Make active tab slightly wider to fit text
  },
  navTextActive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: -0.2,
  },
});