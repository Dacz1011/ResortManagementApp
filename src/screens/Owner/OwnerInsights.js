import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  Alert,
  ImageBackground,
  Animated,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
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
  FileSpreadsheet,
  X,
  CheckCircle2,
  MapPin,
  SlidersHorizontal,
  Image as ImageIcon
} from 'lucide-react-native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

// Matched strictly to Reine palette
const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  surfaceDarkActive: '#27272A',

  primary: '#E64E76',
  primaryLight: '#FFF0F3',

  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',

  success: '#10B981',
  successBg: '#DCFCE7',
  successText: '#16A34A',
  expenseText: '#EF4444',
  expenseBg: '#FEE2E2',
};

// Filter Options
const TABS = ['All Properties', "Reine's", "Ryu's", "Casa M.O."];

// Hero Images for different tabs
const HERO_IMAGES = {
  'All Properties': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
  "Reine's": 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  "Ryu's": 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
  "Casa M.O.": 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
};

export default function OwnerInsights({ navigation }) {
  const [activeTab, setActiveTab] = useState('All Properties');
  const [isExportModalVisible, setExportModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real Data States
  const [stats, setStats] = useState({
    totalRevenue: 0,
    occupancyRate: 0,
    totalBookings: 0,
    revenueByProperty: [],
    trendData: [],
    reports: [
      { id: '1', title: 'August 2023 Financials', size: '2.4 MB • PDF Document' },
      { id: '2', title: 'July 2023 Financials', size: '2.1 MB • PDF Document' },
      { id: '3', title: 'June 2023 Financials', size: '1.9 MB • PDF Document' },
    ]
  });

  const activeNav = 'Insights';
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dailyCollections = await mockDb.getAll('dailyCollections');
      const rooms = await mockDb.getAll('rooms');
      const bookings = await mockDb.getAll('bookings') || [];

      // Filter based on active tab
      let filteredCollections = dailyCollections;
      let filteredRooms = rooms;
      let filteredBookings = bookings;

      if (activeTab !== 'All Properties') {
        const propMatch = activeTab.replace("'s", "");
        filteredCollections = dailyCollections.filter(item => item.property.includes(propMatch));
        filteredRooms = rooms.filter(r => r.property.includes(propMatch));
        filteredBookings = bookings.filter(b => b.property?.includes(propMatch));
      }

      // Calculate Total Revenue
      const totalRev = filteredCollections.reduce((sum, item) => sum + Number(item.amount), 0);

      // Calculate Occupancy
      const occupiedRooms = filteredRooms.filter(r => r.isOccupied).length;
      const totalRoomsCount = filteredRooms.length || 1;
      const occRate = (occupiedRooms / totalRoomsCount) * 100;

      // Group Revenue by Property for the bars
      const propertyMap = {};
      const barDataSource = activeTab === 'All Properties' ? dailyCollections : filteredCollections;

      barDataSource.forEach(item => {
        const prop = item.property;
        propertyMap[prop] = (propertyMap[prop] || 0) + Number(item.amount);
      });

      const colors = ['#E64E76', '#FB7185', '#FDA4AF', '#FECDD3'];
      const revenueByProp = Object.keys(propertyMap).map((name, index) => {
        const amount = propertyMap[name];
        const progress = totalRev > 0 ? (amount / totalRev) * 100 : 0;
        return {
          id: index.toString(),
          name,
          amount: `₱${(amount / 1000).toFixed(1)}k`,
          progress: `${progress}%`,
          color: colors[index % colors.length]
        };
      });

      setStats(prev => ({
        ...prev,
        totalRevenue: totalRev,
        occupancyRate: occRate,
        totalBookings: filteredBookings.length + filteredCollections.length, // Transactions + Bookings
        revenueByProperty: revenueByProp
      }));

    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [activeTab])
  );

  const handleDownloadPress = (report) => {
    setSelectedReport(report);
    setExportModalVisible(true);
  };

  const handleExport = (type) => {
    setExportModalVisible(false);
    setTimeout(() => {
      Alert.alert(
        "Export Successful",
        `${selectedReport.title} has been exported as ${type}.`,
        [{ text: "OK" }]
      );
    }, 600);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ opacity: fadeAnim }}
      >
        {/* ── FULL-BLEED HERO ── */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: HERO_IMAGES[activeTab] }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : StatusBar.currentHeight + 8 }]}>
              <View style={styles.topBar}>
                <View style={styles.locationPill}>
                  <PieChart size={14} color="#FFFFFF" style={styles.locationIcon} />
                  <Text style={styles.locationText}>Analytics</Text>
                </View>
                <TouchableOpacity style={styles.iconBtnDark}>
                  <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.heroBottomContent}>
                <Text style={styles.heroSubStat}>BUSINESS INTELLIGENCE</Text>
                <Text style={styles.heroMainStat}>₱{stats.totalRevenue.toLocaleString()}</Text>
                <View style={styles.trendPill}>
                  <TrendingUp size={16} color={COLORS.successText} strokeWidth={3} />
                  <Text style={styles.trendPillText}>Live Statistics</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ── QUICK TAB PILLS ── */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.actionPillLight, isActive && styles.actionPillLightActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.actionPillLightText, isActive && styles.actionPillLightTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>

          {/* ── GROWTH OVERVIEW VISUAL CARD ── */}
          <View style={styles.imageCard}>
             <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop' }}
                style={styles.statsPreviewImage}
                imageStyle={{ borderRadius: 24 }}
             >
                <View style={styles.statsImageOverlay}>
                    <View style={styles.overlayTextContent}>
                        <ImageIcon size={20} color="#FFFFFF" />
                        <Text style={styles.statsImageText}>Growth Overview</Text>
                    </View>
                    <Text style={styles.overlaySubtext}>Visualizing your property performance data</Text>
                </View>
             </ImageBackground>
          </View>

          {/* ── METRICS BENTO ── */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>REVENUE</Text>
              <Text style={styles.metricValue}>₱{(stats.totalRevenue / 1000).toFixed(0)}k</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>OCCUPANCY</Text>
              <Text style={styles.metricValue}>{stats.occupancyRate.toFixed(0)}%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>TXNS</Text>
              <Text style={styles.metricValue}>{stats.totalBookings}</Text>
            </View>
          </View>

          {/* ── TREND CHART ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Curve</Text>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.svgContainer}>
              <Svg width="100%" height="160" viewBox="0 0 100 50" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.15" />
                    <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25 L 100 50 L 0 50 Z"
                  fill="url(#gradient)"
                />
                <Path
                  d="M 0 45 C 15 40, 25 42, 40 25 C 50 12, 60 40, 75 10 C 80 0, 95 10, 100 25"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <Circle cx="75" cy="10" r="3" fill={COLORS.primary} stroke="#FFFFFF" strokeWidth={1.5} />
              </Svg>
              <View style={styles.chartXAxis}>
                <Text style={styles.axisLabel}>JAN</Text>
                <Text style={styles.axisLabel}>FEB</Text>
                <Text style={styles.axisLabel}>MAR</Text>
                <Text style={styles.axisLabel}>APR</Text>
                <Text style={styles.axisLabel}>MAY</Text>
              </View>
            </View>
          </View>

          {/* ── REVENUE BY PROPERTY ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Property Distribution</Text>
          </View>

          <View style={styles.barsCard}>
            {stats.revenueByProperty.length > 0 ? (
              stats.revenueByProperty.map((item) => (
                <View key={item.id} style={styles.barWrapper}>
                  <View style={styles.barHeader}>
                    <Text style={styles.barLabel}>{item.name}</Text>
                    <Text style={styles.barAmount}>{item.amount}</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: item.progress, backgroundColor: item.color }]} />
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', color: COLORS.textMuted, padding: 20 }}>No property data available.</Text>
            )}
          </View>

          {/* ── REPORTS ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Financial Statements</Text>
          </View>

          <View style={styles.reportsContainer}>
            {stats.reports.map((report) => (
              <TouchableOpacity
                key={report.id}
                activeOpacity={0.7}
                style={styles.reportItem}
                onPress={() => handleDownloadPress(report)}
              >
                <View style={styles.reportIconBox}>
                  <FileText size={22} color={COLORS.primary} strokeWidth={2} />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportSubtitle}>{report.size}</Text>
                </View>
                <Download size={20} color={COLORS.textMuted} strokeWidth={2.5} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* --- EXPORT OPTIONS MODAL --- */}
      <Modal
        visible={isExportModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setExportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setExportModalVisible(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Export Format</Text>
                <Text style={styles.modalSubtitle}>Select file type to download</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setExportModalVisible(false)}>
                <X size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
            <View style={styles.exportList}>
              <TouchableOpacity style={styles.exportOption} onPress={() => handleExport('PDF')}>
                <View style={[styles.exportIconBox, { backgroundColor: COLORS.expenseBg }]}><FileText size={24} color={COLORS.expenseText} /></View>
                <View style={{ flex: 1 }}><Text style={styles.exportTitle}>Adobe PDF</Text><Text style={styles.exportDesc}>For printing/sharing</Text></View>
                <Download size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportOption} onPress={() => handleExport('Excel')}>
                <View style={[styles.exportIconBox, { backgroundColor: COLORS.successBg }]}><FileSpreadsheet size={24} color={COLORS.successText} /></View>
                <View style={{ flex: 1 }}><Text style={styles.exportTitle}>Excel Spreadsheet</Text><Text style={styles.exportDesc}>Raw data (XLSX)</Text></View>
                <Download size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── PINK PILL BOTTOM NAV ── */}
      <View style={[styles.bottomNavContainer, { bottom: Platform.OS === 'ios' ? Math.max(insets.bottom + 10, 32) : 24 }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerDashboard')} style={styles.navItem}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookings')} style={styles.navItem}>
            <Calendar size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerFinance')} style={styles.navItem}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerLedger')} style={styles.navItem}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerInsights')} style={styles.navItem}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} style={styles.navItem}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  heroContainer: { width: '100%', height: 380 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  safeArea: { flex: 1, paddingHorizontal: 24, paddingBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60 },
  locationPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  locationIcon: { marginRight: 6 },
  locationText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  iconBtnDark: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(30,30,30,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBottomContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  heroMainStat: { fontSize: 44, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, textAlign: 'center' },
  heroSubStat: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: 1.5, textAlign: 'center' },
  trendPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 },
  trendPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', marginLeft: 8 },

  quickActionsWrapper: { marginTop: 24, marginBottom: 12 },
  quickActionsScroll: { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillLight: { backgroundColor: COLORS.surface, paddingHorizontal: 20, height: 44, justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: COLORS.border },
  actionPillLightActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText: { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive: { color: COLORS.primary, fontWeight: '700' },

  mainContent: { paddingHorizontal: 24, paddingTop: 16 },

  imageCard: { width: '100%', height: 180, marginBottom: 24, borderRadius: 24, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  statsPreviewImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  statsImageOverlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  overlayTextContent: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  statsImageText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18, letterSpacing: -0.5 },
  overlaySubtext: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },

  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },

  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  metricLabel: { fontSize: 9, fontWeight: '800', color: COLORS.textMuted, marginBottom: 6, letterSpacing: 1 },
  metricValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },

  chartCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  svgContainer: { width: '100%' },
  chartXAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 4 },
  axisLabel: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted },

  barsCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  barWrapper: { marginBottom: 16 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  barLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textMain },
  barAmount: { fontSize: 14, fontWeight: '800', color: COLORS.textMain },
  barTrack: { height: 8, backgroundColor: COLORS.background, borderRadius: 4 },
  barFill: { height: '100%', borderRadius: 4 },

  reportsContainer: { backgroundColor: COLORS.surface, borderRadius: 24, paddingHorizontal: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  reportItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: COLORS.background },
  reportIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textMain, marginBottom: 2 },
  reportSubtitle: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },

  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 36, borderTopRightRadius: 36, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textMain },
  modalSubtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  exportList: { gap: 12, marginBottom: 24 },
  exportOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 20, padding: 16 },
  exportIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  exportTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textMain },
  exportDesc: { fontSize: 12, fontWeight: '500', color: COLORS.textMuted },

  bottomSpacer: { height: 160 },
  bottomNavContainer: { position: 'absolute', alignSelf: 'center', width: '90%', zIndex: 100 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 100, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 20 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});