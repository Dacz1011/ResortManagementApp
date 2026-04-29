import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import {
  BarChart2,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  MapPin,
  PieChart,
  Settings,
  TrendingUp,
  X
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE (green brand, matches PortfolioDashboard) ──
const COLORS = {
  background:  '#F7F8F6',
  surface:     '#FFFFFF',
  surfaceDark: '#1A3626',
  primary:     '#1A3626',
  primaryLight:'#E8F0EA',
  accent:      '#2DD4BF',
  accentLight: '#CCFBF1',
  textMain:    '#0F172A',
  textMuted:   '#64748B',
  border:      '#E2E8F0',
  successBg:   '#DCFCE7',
  successText: '#16A34A',
  dangerBg:    '#FEE2E2',
  dangerText:  '#EF4444',
};

const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

const REVENUE_DATA = [
  { id: '1', name: "Reine's Beach House",   amount: '₱320k', progress: 0.85, color: '#1A3626' },
  { id: '2', name: "Ryu's Transient House", amount: '₱210k', progress: 0.50, color: '#4A7255' },
  { id: '3', name: "Casa M.O.",             amount: '₱312k', progress: 0.82, color: '#7AA384' },
  { id: '4', name: 'Seasonal Events',       amount: '₱140k', progress: 0.35, color: '#B6D7A8' },
  { id: '5', name: 'Misc Services',         amount: '₱82k',  progress: 0.20, color: '#A9C7B6' },
];

const REPORTS_DATA = [
  { id: '1', title: 'July 2023 Financials', size: '2.4 MB • PDF Document' },
  { id: '2', title: 'June 2023 Financials', size: '2.1 MB • PDF Document' },
  { id: '3', title: 'May 2023 Financials',  size: '1.9 MB • PDF Document' },
];

// Snapshot strip images — three distinct resort hero shots
const SNAPSHOT_IMAGES = [
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
];

export default function OwnerInsights({ navigation }) {
  const [activeTab, setActiveTab]               = useState('All Properties');
  const [isExportModalVisible, setExportModal]  = useState(false);
  const [selectedReport, setSelectedReport]     = useState(null);
  const activeNav = 'Insights';

  // Fade-in — matches ReineHome / PortfolioDashboard
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleDownloadPress = (report) => { setSelectedReport(report); setExportModal(true); };
  const handleExport = (type) => {
    setExportModal(false);
    setTimeout(() => Alert.alert('Export Successful', `${selectedReport.title} exported as ${type}.`), 600);
  };

  // Hero image changes with active tab — mirrors PortfolioDashboard
  const heroImages = {
    'All Properties': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    "Reine's":        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    "Ryu's":          'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
    "Casa M.O.":      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ══════════════════════════════════════════
            FULL-BLEED HERO
            ══════════════════════════════════════════ */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: heroImages[activeTab] }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <SafeAreaView edges={['top']} style={styles.safeArea}>
              {/* Top bar */}
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <MapPin size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.locationText}>Analytics & Reports</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8}>
                  <Bell size={18} color="#FFFFFF" strokeWidth={2.5} />
                  <View style={styles.notifDot} />
                </TouchableOpacity>
              </View>

              {/* Hero bottom — big stat + trend pill */}
              <View style={styles.heroBottomContent}>
                <Text style={styles.heroLabel}>BUSINESS INTELLIGENCE UNIT</Text>
                <Text style={styles.heroMainStat}>₱842,400</Text>
                <Text style={styles.heroSubStat}>Total Portfolio Revenue</Text>

                {/* Trend pill — mirrors PortfolioDashboard statPill */}
                <View style={styles.statPill}>
                  <View style={styles.statPillIconBox}>
                    <TrendingUp size={18} color={COLORS.successText} strokeWidth={2.5} />
                  </View>
                  <View>
                    <Text style={styles.statPillTitle}>+12.4% vs last month</Text>
                    <Text style={styles.statPillSub}>78.2% avg occupancy · 3 properties</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* ══════════════════════════════════════════
            PROPERTY FILTER PILLS
            ══════════════════════════════════════════ */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    tab === 'All Properties' ? styles.actionPillDark : styles.actionPillLight,
                    isActive && tab !== 'All Properties' && styles.actionPillLightActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[
                    tab === 'All Properties' ? styles.actionPillDarkText : styles.actionPillLightText,
                    isActive && tab !== 'All Properties' && styles.actionPillLightTextActive,
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ══════════════════════════════════════════
            MAIN CONTENT
            ══════════════════════════════════════════ */}
        <View style={styles.mainContent}>

          {/* ── KPI BENTO PAIR ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Summary Metrics</Text>
          </View>

          <View style={styles.bentoGrid}>
            <View style={styles.bentoCard}>
              <Text style={styles.bentoLabel}>TOTAL REVENUE</Text>
              <Text style={styles.bentoValue}>₱842,400</Text>
              <View style={styles.trendRow}>
                <TrendingUp size={13} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.trendText}>+12.4% vs last mo.</Text>
              </View>
            </View>
            <View style={styles.bentoCard}>
              <Text style={styles.bentoLabel}>AVG OCCUPANCY</Text>
              <Text style={styles.bentoValue}>78.2%</Text>
              <View style={styles.trendRow}>
                <TrendingUp size={13} color={COLORS.successText} strokeWidth={3} />
                <Text style={styles.trendText}>+5.1% vs last mo.</Text>
              </View>
            </View>
          </View>

          {/* ── SNAPSHOT STRIP (mirrors PortfolioDashboard / ReineHome) ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Portfolio Snapshot</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.snapshotScroll}
          >
            {[
              { label: 'Net Income', value: '₱38,150', icon: <TrendingUp size={22} color="#FFF" /> },
              { label: 'Occupancy', value: '88.5%',    icon: <PieChart    size={22} color="#FFF" /> },
              { label: '3 Properties', value: 'Active',icon: <MapPin      size={22} color="#FFF" /> },
            ].map((item, i) => (
              <TouchableOpacity key={i} style={styles.snapshotCard} activeOpacity={0.8}>
                <ImageBackground
                  source={{ uri: SNAPSHOT_IMAGES[i] }}
                  style={styles.snapshotImage}
                  imageStyle={{ borderRadius: 24 }}
                >
                  <View style={styles.snapshotOverlay} />
                  <View style={styles.snapshotContent}>
                    <View style={styles.snapshotIconWrap}>{item.icon}</View>
                    <View>
                      <Text style={styles.snapshotValue}>{item.value}</Text>
                      <Text style={styles.snapshotLabel}>{item.label}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── OCCUPANCY TREND CHART CARD ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Occupancy Trend</Text>
            <TouchableOpacity style={styles.dropdownBtn} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>LAST 30 DAYS</Text>
              <ChevronDown size={13} color={COLORS.textMuted} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.svgContainer}>
              <Svg width="100%" height="160" viewBox="0 0 100 50" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%"   stopColor={COLORS.primary} stopOpacity="0.18" />
                    <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25 L 100 50 L 0 50 Z"
                  fill="url(#grad)"
                />
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Peak dot */}
                <Circle cx="75" cy="10" r="3.5" fill={COLORS.primary} stroke="#FFFFFF" strokeWidth={1.5} />
                {/* Accent dot — teal for owner tier */}
                <Circle cx="40" cy="25" r="2.5" fill={COLORS.accent} stroke="#FFFFFF" strokeWidth={1} />
              </Svg>
              <View style={styles.chartXAxis}>
                {['WK 1', 'WK 2', 'WK 3', 'WK 4'].map((w) => (
                  <Text key={w} style={styles.axisLabel}>{w}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* ── REVENUE BY PROPERTY — styled like largeCard body rows ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue by Property</Text>
          </View>

          <View style={styles.revenueCard}>
            {REVENUE_DATA.map((item, idx) => (
              <View key={item.id} style={[styles.barWrapper, idx < REVENUE_DATA.length - 1 && styles.barWrapperBorder]}>
                <View style={styles.barHeader}>
                  <View style={styles.barLabelRow}>
                    <View style={[styles.barDot, { backgroundColor: item.color }]} />
                    <Text style={styles.barLabel}>{item.name}</Text>
                  </View>
                  <Text style={styles.barAmount}>{item.amount}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${item.progress * 100}%`, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>

          {/* ── FINANCIAL STATEMENTS — image-top card like ReineBookings detailsCard ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Financial Statements</Text>
            <View style={styles.latestBadge}>
              <Text style={styles.latestBadgeText}>LATEST</Text>
            </View>
          </View>

          <View style={styles.statementsCard}>
            {REPORTS_DATA.map((report, idx) => (
              <TouchableOpacity
                key={report.id}
                activeOpacity={0.7}
                style={[styles.reportRow, idx < REPORTS_DATA.length - 1 && styles.reportRowBorder]}
                onPress={() => handleDownloadPress(report)}
              >
                <View style={styles.reportIconBox}>
                  <FileText size={20} color={COLORS.primary} strokeWidth={2} />
                  <View style={styles.pdfBadge}>
                    <Text style={styles.pdfBadgeText}>PDF</Text>
                  </View>
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportSize}>{report.size}</Text>
                </View>
                <View style={styles.downloadBtn}>
                  <Download size={18} color={COLORS.textMuted} strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            ))}

            {/* Divider then load more */}
            <View style={styles.divider} />
            <TouchableOpacity activeOpacity={0.7} style={styles.loadMoreBtn}>
              <Text style={styles.loadMoreText}>LOAD OLDER REPORTS</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ══════════════════════════════════════════
          EXPORT MODAL
          ══════════════════════════════════════════ */}
      <Modal
        visible={isExportModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setExportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => setExportModal(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Export Format</Text>
                <Text style={styles.modalSubtitle}>Select file type to download</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setExportModal(false)}>
                <X size={20} color={COLORS.textMuted} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.exportList}>
              <TouchableOpacity style={styles.exportOption} activeOpacity={0.8} onPress={() => handleExport('PDF')}>
                <View style={[styles.exportIconBox, { backgroundColor: COLORS.dangerBg }]}>
                  <FileText size={24} color={COLORS.dangerText} strokeWidth={2} />
                </View>
                <View style={styles.exportTextWrap}>
                  <Text style={styles.exportTitle}>Adobe PDF Document</Text>
                  <Text style={styles.exportDesc}>Formatted for printing and sharing</Text>
                </View>
                <Download size={18} color={COLORS.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.exportOption} activeOpacity={0.8} onPress={() => handleExport('Excel')}>
                <View style={[styles.exportIconBox, { backgroundColor: COLORS.successBg }]}>
                  <FileSpreadsheet size={24} color={COLORS.successText} strokeWidth={2} />
                </View>
                <View style={styles.exportTextWrap}>
                  <Text style={styles.exportTitle}>Excel Spreadsheet</Text>
                  <Text style={styles.exportDesc}>Raw data for processing (XLSX)</Text>
                </View>
                <Download size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalInfoBox}>
              <CheckCircle2 size={14} color={COLORS.primary} strokeWidth={2.5} style={{ marginRight: 8 }} />
              <Text style={styles.modalInfoText}>Selected: {selectedReport?.title}</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ══════════════════════════════════════════
          DARK GREEN PILL BOTTOM NAV (owner portal)
          ══════════════════════════════════════════ */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('PortfolioDashboard')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color="#FFFFFF" />
            <Text style={[styles.navText, styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.45)'} />
            <Text style={[styles.navText, activeNav === 'Settings' && styles.navTextActive]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },

  /* ── HERO ── */
  heroContainer: { width: '100%', height: 340 },
  heroImage:     { width: '100%', height: '100%' },
  heroOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,25,15,0.56)' },
  safeArea: {
    flex: 1, paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 28, justifyContent: 'space-between',
  },
  topBar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationPill: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(30,60,30,0.6)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  notifDot: {
    position: 'absolute', top: 10, right: 10,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: COLORS.dangerText, borderWidth: 2, borderColor: '#FFFFFF',
  },
  heroBottomContent: { marginTop: 'auto', gap: 8 },
  heroLabel:    { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 },
  heroMainStat: { fontSize: 42, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  heroSubStat:  { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },

  statPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(10,25,15,0.7)',
    borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  statPillIconBox: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.successBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  statPillTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  statPillSub:   { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },

  /* ── QUICK FILTER PILLS ── */
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll:  { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark: {
    backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20,
    height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100,
  },
  actionPillDarkText:      { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight: {
    backgroundColor: COLORS.surface, paddingHorizontal: 16,
    height: 44, justifyContent: 'center', borderRadius: 100,
    borderWidth: 1, borderColor: COLORS.border,
  },
  actionPillLightActive:     { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText:       { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },

  /* ── MAIN CONTENT ── */
  mainContent:  { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16, marginTop: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  /* ── KPI BENTO PAIR ── */
  bentoGrid:  { flexDirection: 'row', gap: 14, marginBottom: 8 },
  bentoCard:  {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: 24, padding: 20,
    borderWidth: 1, borderColor: COLORS.border,
  },
  bentoLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  bentoValue: { fontSize: 22, fontWeight: '800', color: COLORS.primary, letterSpacing: -0.5, marginBottom: 8 },
  trendRow:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText:  { fontSize: 11, fontWeight: '700', color: COLORS.successText },

  /* ── SNAPSHOT STRIP ── */
  snapshotScroll:   { gap: 16, paddingBottom: 8 },
  snapshotCard:     { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage:    { width: '100%', height: '100%' },
  snapshotOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.38)', borderRadius: 24 },
  snapshotContent:  { flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIconWrap: { marginBottom: 'auto' },
  snapshotValue:    { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel:    { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  /* ── CHART CARD ── */
  dropdownBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.primaryLight, paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 100,
  },
  dropdownText: { fontSize: 10, fontWeight: '800', color: COLORS.primary, letterSpacing: 0.5 },
  chartCard: {
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  svgContainer: { width: '100%' },
  chartXAxis:   { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 8 },
  axisLabel:    { fontSize: 10, fontWeight: '700', color: COLORS.textMuted },

  /* ── REVENUE BARS ── */
  revenueCard: {
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  barWrapper:       { paddingVertical: 14 },
  barWrapperBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  barHeader:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  barLabelRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barDot:           { width: 8, height: 8, borderRadius: 4 },
  barLabel:         { fontSize: 13, fontWeight: '700', color: COLORS.textMain },
  barAmount:        { fontSize: 14, fontWeight: '800', color: COLORS.textMain },
  barTrack:         { height: 8, backgroundColor: COLORS.border, borderRadius: 4 },
  barFill:          { height: '100%', borderRadius: 4 },

  /* ── FINANCIAL STATEMENTS ── */
  statementsCard: {
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  latestBadge:     { backgroundColor: COLORS.successBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  latestBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.successText, letterSpacing: 0.5 },
  reportRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  reportRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  reportIconBox: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  pdfBadge: {
    position: 'absolute', bottom: -4, right: -4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 5, paddingVertical: 2,
    borderRadius: 5, borderWidth: 2, borderColor: '#FFFFFF',
  },
  pdfBadgeText: { color: '#FFFFFF', fontSize: 7, fontWeight: '800' },
  reportInfo:   { flex: 1 },
  reportTitle:  { fontSize: 14, fontWeight: '800', color: COLORS.textMain, marginBottom: 3 },
  reportSize:   { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  downloadBtn:  { padding: 8 },
  divider:      { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  loadMoreBtn: {
    borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed',
    borderRadius: 16, paddingVertical: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  loadMoreText: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5 },

  bottomSpacer: { height: 160 },

  /* ── EXPORT MODAL ── */
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(10,25,15,0.45)' },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 36, borderTopRightRadius: 36,
    padding: 24, paddingBottom: Platform.OS === 'ios' ? 44 : 32,
  },
  modalHandle:   { width: 40, height: 5, backgroundColor: COLORS.border, borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  modalHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  modalTitle:    { fontSize: 22, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  modalSubtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted, marginTop: 2 },
  closeBtn:      { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  exportList:    { gap: 12, marginBottom: 20 },
  exportOption:  {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 20,
    padding: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  exportIconBox: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  exportTextWrap:{ flex: 1 },
  exportTitle:   { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 2 },
  exportDesc:    { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },
  modalInfoBox:  {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primaryLight, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 16,
  },
  modalInfoText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },

  /* ── DARK GREEN PILL BOTTOM NAV ── */
  bottomNavContainer: {
    position: 'absolute', bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center', width: '92%', zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surfaceDark, borderRadius: 100,
    paddingVertical: 10, paddingHorizontal: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 20,
  },
  navItem:       { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText:       { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.45)', marginTop: 3 },
  navTextActive: { color: '#FFFFFF', fontWeight: '700' },
});