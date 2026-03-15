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
  PieChart,
  Plus
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Exact Colors matching the premium mockup design
const COLORS = {
  background: '#FFFFFF',
  primary: '#1A3626',
  primaryLight: '#E8F0EA',
  primaryText: '#245236',
  accent: '#A3E635',
  cardBg: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#94A3B8',
  borderLight: '#F1F5F9',
  borderCard: '#E2E8F0',
  successText: '#15803D',
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
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Analytics & Reports</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Manrope-Bold' }]}>BUSINESS INTELLIGENCE UNIT</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Bell size={22} color={COLORS.primary} strokeWidth={2} />
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
                  <Text style={[styles.tabText, { fontFamily: 'Manrope-Bold' }, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- SUMMARY METRICS CARDS --- */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={[styles.metricLabel, { fontFamily: 'Manrope-ExtraBold' }]}>TOTAL REVENUE</Text>
            <Text style={[styles.metricValue, { fontFamily: 'Manrope-ExtraBold' }]}>₱842,400</Text>
            <View style={styles.metricTrendRow}>
              <TrendingUp size={14} color={COLORS.successText} strokeWidth={3} />
              <Text style={[styles.metricTrendText, { fontFamily: 'Manrope-Bold' }]}>+12.4% vs last mo.</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.metricLabel, { fontFamily: 'Manrope-ExtraBold' }]}>AVG OCCUPANCY</Text>
            <Text style={[styles.metricValue, { fontFamily: 'Manrope-ExtraBold' }]}>78.2%</Text>
            <View style={styles.metricTrendRow}>
              <TrendingUp size={14} color={COLORS.successText} strokeWidth={3} />
              <Text style={[styles.metricTrendText, { fontFamily: 'Manrope-Bold' }]}>+5.1% vs last mo.</Text>
            </View>
          </View>
        </View>

        {/* --- OCCUPANCY TREND CHART CARD --- */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Occupancy Trend</Text>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={[styles.dropdownText, { fontFamily: 'Manrope-Bold' }]}>LAST 30 DAYS</Text>
              <ChevronDown size={14} color={COLORS.textMuted} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* Custom SVG Curve to match mockup */}
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
              <Text style={[styles.axisLabel, { fontFamily: 'Manrope-Bold' }]}>WK 1</Text>
              <Text style={[styles.axisLabel, { fontFamily: 'Manrope-Bold' }]}>WK 2</Text>
              <Text style={[styles.axisLabel, { fontFamily: 'Manrope-Bold' }]}>WK 3</Text>
              <Text style={[styles.axisLabel, { fontFamily: 'Manrope-Bold' }]}>WK 4</Text>
            </View>
          </View>
        </View>

        {/* --- REVENUE BY PROPERTY BARS --- */}
        <View style={styles.revenueCard}>
          <Text style={[styles.cardTitle, { marginBottom: 20, fontFamily: 'Manrope-ExtraBold' }]}>Revenue by Property</Text>

          {REVENUE_DATA.map((item) => (
            <View key={item.id} style={styles.barWrapper}>
              <View style={styles.barHeader}>
                <Text style={[styles.barLabel, { fontFamily: 'Manrope-Bold' }]}>{item.name}</Text>
                <Text style={[styles.barAmount, { fontFamily: 'Manrope-ExtraBold' }]}>{item.amount}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: item.progress, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* --- FINANCIAL STATEMENTS LIST --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.cardTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Financial Statements</Text>
          <View style={styles.badgeLight}>
            <Text style={[styles.badgeLightText, { fontFamily: 'Manrope-ExtraBold' }]}>LATEST REPORTS</Text>
          </View>
        </View>

        <View style={styles.reportsList}>
          {REPORTS_DATA.map((report) => (
            <TouchableOpacity key={report.id} activeOpacity={0.7} style={styles.reportCard}>
              <View style={styles.reportIconBg}>
                <FileText size={22} color={COLORS.primary} strokeWidth={2} />
                <View style={styles.pdfBadge}>
                  <Text style={[styles.pdfBadgeText, { fontFamily: 'Manrope-ExtraBold' }]}>PDF</Text>
                </View>
              </View>
              <View style={styles.reportInfo}>
                <Text style={[styles.reportTitle, { fontFamily: 'Manrope-Bold' }]}>{report.title}</Text>
                <Text style={[styles.reportSubtitle, { fontFamily: 'Manrope-Medium' }]}>{report.size}</Text>
              </View>
              <View style={styles.downloadIconWrapper}>
                <Download size={20} color={COLORS.textMuted} strokeWidth={2} />
              </View>
            </TouchableOpacity>
          ))}

          {/* Load Older Reports Button */}
          <TouchableOpacity activeOpacity={0.7} style={styles.loadMoreBtn}>
            <Text style={[styles.loadMoreText, { fontFamily: 'Manrope-ExtraBold' }]}>LOAD OLDER REPORTS</Text>
          </TouchableOpacity>
        </View>

        {/* Extra spacing to scroll past Bottom Nav */}
        <View style={{ height: 130 }} />
      </ScrollView>

      {/* --- CUSTOM BOTTOM NAVIGATION BAR --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={24} color={activeNav === 'Property' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Property' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Property' && styles.navTextActive]}>PROPERTY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={24} color={activeNav === 'Bookings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Bookings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Bookings' && styles.navTextActive]}>BOOKINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={24} color={activeNav === 'Finance' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Finance' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Finance' && styles.navTextActive]}>FINANCE</Text>
          </TouchableOpacity>

          <View style={styles.navSpacer} />

          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={24} color={activeNav === 'Ledger' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Ledger' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Ledger' && styles.navTextActive]}>LEDGER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <PieChart size={24} color={activeNav === 'Insights' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Insights' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Insights' && styles.navTextActive]}>INSIGHTS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={24} color={activeNav === 'Settings' ? COLORS.primary : COLORS.textMuted} strokeWidth={activeNav === 'Settings' ? 2.5 : 2} />
            <Text style={[styles.navText, { fontFamily: 'Manrope-Bold' }, activeNav === 'Settings' && styles.navTextActive]}>SETTINGS</Text>
          </TouchableOpacity>

        </View>

        {/* --- FLOATING ACTION BUTTON --- */}
        <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
          <View style={styles.fabInner}>
            <Plus size={32} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' && <View style={styles.homeIndicator} />}
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryText,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 22,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  scrollContent: {
    paddingHorizontal: 24,
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
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  /* --- METRICS ROW --- */
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
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
    color: COLORS.successText,
    marginLeft: 4,
  },

  /* --- CARDS & WIDGETS --- */
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.textMain,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dropdownText: {
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  svgContainer: {
    width: '100%',
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* --- REVENUE BARS --- */
  revenueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
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
    fontSize: 12,
    color: '#475569',
  },
  barAmount: {
    fontSize: 13,
    color: COLORS.textMain,
  },
  barTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
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
    marginBottom: 16,
  },
  badgeLight: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeLightText: {
    fontSize: 10,
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  reportsList: {
    gap: 12,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7F6',
    borderRadius: 16,
    padding: 16,
  },
  reportIconBg: {
    width: 48,
    height: 48,
    backgroundColor: '#E8F0EA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pdfBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pdfBadgeText: {
    color: '#FFFFFF',
    fontSize: 6,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    color: COLORS.textMain,
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  downloadIconWrapper: {
    padding: 8,
  },
  loadMoreBtn: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 12,
    color: '#64748B',
    letterSpacing: 0.5,
  },

  /* --- BOTTOM NAV --- */
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    height: 75,
    borderRadius: 35,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
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
  navSpacer: {
    width: 50,
  },
  fab: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 18,
  },
  fabInner: {
    width: 66,
    height: 66,
    backgroundColor: COLORS.primary,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.background,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 130,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
  }
});