import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import {
  Bell,
  TrendingUp,
  ChevronDown,
  FileText,
  Download,
  LayoutGrid,
  Calendar,
  BarChart2,
  BookOpen,
  Settings,
  PieChart
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette (Modernized)
const COLORS = {
  background: '#F8FAFC',    // Cool off-white for depth
  primary: '#1A3626',       // Deep luxury forest green
  primaryLight: '#E8F0EA',  // Soft muted green
  primaryDark: '#0D1E14',
  primaryText: '#245236',
  accent: '#A3E635',
  cardBg: '#FFFFFF',
  inputBg: '#F8FAFC',
  textMain: '#0F172A',      // Slate 900
  textMuted: '#64748B',     // Slate 500
  border: '#E2E8F0',
  successText: '#16A34A',
  successBg: '#DCFCE7',
  expenseText: '#EF4444',
  expenseBg: '#FEE2E2',
};

// Filter Options
const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

// Mock Data for Revenue Bars
const REVENUE_DATA = [
  { id: '1', name: "Reine's Beach House", amount: '₱320k', progress: '85%', color: '#1A3626' },
  { id: '2', name: "Ryu's Transient House", amount: '₱210k', progress: '50%', color: '#4A7255' },
  { id: '3', name: "Casa M.O.", amount: '₱312k', progress: '82%', color: '#7AA384' },
  { id: '4', name: "Seasonal Events", amount: '₱140k', progress: '35%', color: '#B6D7A8' },
  { id: '5', name: "Misc Services", amount: '₱82k', progress: '20%', color: '#A9C7B6' },
];

// Mock Data for Reports
const REPORTS_DATA = [
  { id: '1', title: 'July 2023 Financials', size: '2.4 MB • PDF Document' },
  { id: '2', title: 'June 2023 Financials', size: '2.1 MB • PDF Document' },
  { id: '3', title: 'May 2023 Financials', size: '1.9 MB • PDF Document' },
];

export default function OwnerAnalytics({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const activeNav = 'Insights';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* --- MODERN HEADER --- */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerSubtitle}>BUSINESS INTELLIGENCE UNIT</Text>
            <Text style={styles.headerTitle}>Analytics & Reports</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Bell size={22} color={COLORS.textMain} strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          {/* --- HORIZONTAL PROPERTY TABS --- */}
          <View style={styles.tabsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScroll}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab)}
                    style={[styles.tab, isActive && styles.tabActive]}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* --- SUMMARY METRICS BENTO CARDS --- */}
          <View style={styles.metricsRow}>
            <View style={styles.bentoCardHalf}>
              <Text style={styles.metricLabel}>TOTAL REVENUE</Text>
              <Text style={styles.metricValue}>₱842,400</Text>
              <View style={styles.metricTrendRow}>
                <TrendingUp size={14} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.metricTrendText}>+12.4% vs last mo.</Text>
              </View>
            </View>

            <View style={styles.bentoCardHalf}>
              <Text style={styles.metricLabel}>AVG OCCUPANCY</Text>
              <Text style={styles.metricValue}>78.2%</Text>
              <View style={styles.metricTrendRow}>
                <TrendingUp size={14} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.metricTrendText}>+5.1% vs last mo.</Text>
              </View>
            </View>
          </View>

          {/* --- OCCUPANCY TREND CHART BENTO --- */}
          <View style={styles.bentoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Occupancy Trend</Text>
              <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>LAST 30 DAYS</Text>
                <ChevronDown size={14} color={COLORS.textMuted} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* Custom SVG Curve */}
            <View style={styles.svgContainer}>
              <Svg width="100%" height="160" viewBox="0 0 100 50" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.15" />
                    <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>
                {/* Fill Area */}
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25 L 100 50 L 0 50 Z"
                  fill="url(#gradient)"
                />
                {/* Main Line */}
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Active Data Dot */}
                <Circle cx="75" cy="10" r="3" fill={COLORS.primary} stroke="#FFFFFF" strokeWidth={1.5} />
              </Svg>

              {/* X-Axis Labels */}
              <View style={styles.chartXAxis}>
                <Text style={styles.axisLabel}>WK 1</Text>
                <Text style={styles.axisLabel}>WK 2</Text>
                <Text style={styles.axisLabel}>WK 3</Text>
                <Text style={styles.axisLabel}>WK 4</Text>
              </View>
            </View>
          </View>

          {/* --- REVENUE BY PROPERTY BARS BENTO --- */}
          <View style={styles.bentoCard}>
            <Text style={[styles.cardTitle, { marginBottom: 20 }]}>Revenue by Property</Text>

            {REVENUE_DATA.map((item) => (
              <View key={item.id} style={styles.barWrapper}>
                <View style={styles.barHeader}>
                  <Text style={styles.barLabel}>{item.name}</Text>
                  <Text style={styles.barAmount}>{item.amount}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: item.progress, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>

          {/* --- FINANCIAL STATEMENTS LIST BENTO --- */}
          <View style={styles.bentoCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.cardTitle}>Financial Statements</Text>
              <View style={styles.badgeLight}>
                <Text style={styles.badgeLightText}>LATEST</Text>
              </View>
            </View>

            <View style={styles.reportsList}>
              {REPORTS_DATA.map((report) => (
                <TouchableOpacity key={report.id} activeOpacity={0.7} style={styles.reportCard}>
                  <View style={styles.reportIconBg}>
                    <FileText size={22} color={COLORS.primary} strokeWidth={2} />
                    <View style={styles.pdfBadge}>
                      <Text style={styles.pdfBadgeText}>PDF</Text>
                    </View>
                  </View>
                  <View style={styles.reportInfo}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportSubtitle}>{report.size}</Text>
                  </View>
                  <View style={styles.downloadIconWrapper}>
                    <Download size={20} color={COLORS.textMuted} strokeWidth={2.5} />
                  </View>
                </TouchableOpacity>
              ))}

              {/* Load Older Reports Button */}
              <TouchableOpacity activeOpacity={0.7} style={styles.loadMoreBtn}>
                <Text style={styles.loadMoreText}>LOAD OLDER REPORTS</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Extra spacing to scroll past Bottom Nav */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>

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
  safeArea: {
    flex: 1,
  },

  /* --- MODERN HEADER --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 20, // Increased to avoid status bar overlap
    paddingBottom: 24,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: COLORS.expenseRed,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  /* --- TABS --- */
  tabsWrapper: {
    marginBottom: 24,
    marginHorizontal: -24,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* --- SHARED BENTO CARD STYLE --- */
  bentoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  bentoCardHalf: {
    flex: 1,
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

  /* --- METRICS ROW --- */
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  metricTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricTrendText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.successText,
    marginLeft: 4,
  },

  /* --- CHART CARD --- */
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  svgContainer: {
    width: '100%',
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  axisLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },

  /* --- REVENUE BARS --- */
  barWrapper: {
    marginBottom: 16,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  barAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  barTrack: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },

  /* --- FINANCIAL STATEMENTS --- */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeLight: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeLightText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  reportsList: {
    gap: 12,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg, // subtle contrast inside the bento
    borderRadius: 20,
    padding: 16,
  },
  reportIconBg: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pdfBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pdfBadgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '800',
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  downloadIconWrapper: {
    padding: 8,
  },
  loadMoreBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 140, // Keeps content clear of the floating nav
  },

  /* --- FLOATING BOTTOM NAV (Matched, NO FAB) --- */
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