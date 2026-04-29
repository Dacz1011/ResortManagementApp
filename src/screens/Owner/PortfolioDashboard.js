import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowRight,
  BarChart2,
  BedDouble,
  Bell,
  BookOpen,
  CalendarDays,
  Car,
  CheckCircle2,
  Coffee,
  Home,
  LayoutGrid,
  MapPin,
  MoreHorizontal,
  PieChart,
  Settings,
  TrendingUp,
  User,
  Users,
  Wallet,
  Waves,
  Wifi
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ── OWNER PORTAL PALETTE ──
// Deliberately distinguished from property-admin Reine Pink.
// Deep forest green primary + teal accent give the owner tier
// an executive, high-trust feel while sharing the same structural
// design language (full-bleed hero, quick pills, snapshot strip,
// card rows, black-pill nav).
const COLORS = {
  background: '#F7F8F6',
  surface:    '#FFFFFF',
  surfaceDark: '#1A3626',      // Deep forest green — owner brand
  surfaceDarkHover: '#0D1E14',

  primary:     '#1A3626',
  primaryLight:'#E8F0EA',
  accent:      '#2DD4BF',      // Teal accent — owner-only highlight
  accentLight: '#CCFBF1',

  textMain:  '#0F172A',
  textMuted: '#64748B',
  border:    '#E2E8F0',

  successBg:   '#DCFCE7',
  successText: '#16A34A',
  warningBg:   '#FEF9C3',
  warningText: '#CA8A04',
  dangerBg:    '#FEE2E2',
  dangerText:  '#EF4444',
};

const PROPERTY_DETAILS = {
  "Reine's Beach": {
    title: "Reine's Beach House",
    capacity: 'Unlimited Pax',
    baseRate: '₱12,000 / night',
    amenities: [
      { icon: Waves,  label: 'Private Pool' },
      { icon: Coffee, label: 'Full Kitchen' },
      { icon: Home,   label: 'Entire House' },
      { icon: Wifi,   label: 'High-Speed Wi-Fi' },
      { icon: Car,    label: '4-Car Parking' },
    ],
  },
  "Ryu's House": {
    title: "Ryu's Transient House",
    capacity: '15 Pax',
    baseRate: '₱8,000 / night',
    amenities: [
      { icon: Home,   label: 'Entire House' },
      { icon: Wifi,   label: 'High-Speed Wi-Fi' },
      { icon: Coffee, label: 'Basic Kitchen' },
      { icon: Car,    label: '2-Car Parking' },
    ],
  },
  "Casa M.O.": {
    title: 'Casa M.O.',
    capacity: '20 Pax',
    baseRate: '₱15,000 / night',
    amenities: [
      { icon: Waves, label: 'Private Pool' },
      { icon: Home,  label: 'Heritage Villa' },
      { icon: Wifi,  label: 'High-Speed Wi-Fi' },
      { icon: Car,   label: '6-Car Parking' },
    ],
  },
};

const PORTFOLIO_TABS = ['All Properties', "Reine's Beach", "Ryu's House", "Casa M.O."];

const PROPERTY_PERFORMANCE = [
  {
    id: '1', tabName: "Reine's Beach",
    name: "Reine's Beach House",
    rev: '₱22.4k', occ: '94%',
    status: 'HIGH DEMAND',
    statusBg: '#DCFCE7', statusText: '#16A34A',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2', tabName: "Ryu's House",
    name: "Ryu's Transient House",
    rev: '₱16.8k', occ: '82%',
    status: 'STABLE',
    statusBg: '#FEF9C3', statusText: '#CA8A04',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
  },
  {
    id: '3', tabName: "Casa M.O.",
    name: 'Casa M.O.',
    rev: '₱26.1k', occ: '78%',
    status: 'GROWING',
    statusBg: '#DCFCE7', statusText: '#16A34A',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  },
];

const HERO_IMAGES = {
  'All Properties': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  "Reine's Beach":  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  "Ryu's House":    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  "Casa M.O.":      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
};

export default function PortfolioDashboard({ navigation }) {
  const [activeTab, setActiveTab]           = useState('All Properties');
  const [activeNav, setActiveNav]           = useState('Property');
  const [propertyStatus, setPropertyStatus] = useState('AVAILABLE');

  // Fade-in — same pattern as ReineHome
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const activePropertyDetails = PROPERTY_DETAILS[activeTab];
  const isAllProps = activeTab === 'All Properties';

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
            FULL-BLEED HERO  (matches ReineHome)
            ══════════════════════════════════════════ */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: HERO_IMAGES[activeTab] }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <SafeAreaView edges={['top']} style={styles.safeArea}>
              {/* Top bar — avatar pill (left) + bell (right) */}
              <View style={styles.topBar}>
                <View style={styles.ownerPill}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.ownerAvatar}
                  />
                  <View>
                    <Text style={styles.ownerLabel}>PORTFOLIO OVERVIEW</Text>
                    {!isAllProps && (
                      <View style={styles.liveDotRow}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>Live · Just now</Text>
                      </View>
                    )}
                    {isAllProps && <Text style={styles.ownerName}>Resort Admin</Text>}
                  </View>
                </View>

                <TouchableOpacity style={styles.iconBtnDark} activeOpacity={0.8}>
                  <Bell size={18} color="#FFFFFF" strokeWidth={2.5} />
                  <View style={styles.notifDot} />
                </TouchableOpacity>
              </View>

              {/* Hero bottom — big stat block */}
              <View style={styles.heroBottomContent}>
                {isAllProps ? (
                  <>
                    <Text style={styles.heroMainStat}>
                      ₱54,230<Text style={styles.heroSubDecimals}>.00</Text>
                    </Text>
                    <Text style={styles.heroSubStat}>Total Monthly Revenue</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.heroMainStat}>{activePropertyDetails.title}</Text>
                    <Text style={styles.heroSubStat}>{activePropertyDetails.baseRate}</Text>
                  </>
                )}

                {/* Dark pill — mirrors ReineHome search pill / trendPill */}
                {isAllProps ? (
                  <View style={styles.statPill}>
                    <View style={styles.statPillIconBox}>
                      <TrendingUp size={18} color={COLORS.successText} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.statPillTitle}>+12.4% vs last month</Text>
                      <Text style={styles.statPillSub}>3 properties · 88.5% avg occupancy</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.statPill}>
                    <View style={[styles.statPillIconBox, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successBg : COLORS.warningBg }]}>
                      <View style={[styles.statusDot, { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText }]} />
                    </View>
                    <View>
                      <Text style={styles.statPillTitle}>{propertyStatus}</Text>
                      <Text style={styles.statPillSub}>{activePropertyDetails.capacity} capacity</Text>
                    </View>
                  </View>
                )}
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* ══════════════════════════════════════════
            PROPERTY TAB PILLS  (quick-actions strip)
            ══════════════════════════════════════════ */}
        <View style={styles.quickActionsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {PORTFOLIO_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    tab === 'All Properties' ? styles.actionPillDark : styles.actionPillLight,
                    isActive && tab !== 'All Properties' && styles.actionPillLightActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => { setActiveTab(tab); setPropertyStatus('AVAILABLE'); }}
                >
                  <Text
                    style={[
                      tab === 'All Properties' ? styles.actionPillDarkText : styles.actionPillLightText,
                      isActive && tab !== 'All Properties' && styles.actionPillLightTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ══════════════════════════════════════════
            MAIN CONTENT — branches on tab
            ══════════════════════════════════════════ */}
        <View style={styles.mainContent}>

          {isAllProps ? (
            /* ──────────────────────────────────────
               ALL PROPERTIES VIEW
               ────────────────────────────────────── */
            <>
              {/* KPI BENTO GRID */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Portfolio Logistics</Text>
              </View>

              <View style={styles.bentoGrid}>
                {/* Active Guests */}
                <View style={styles.bentoCard}>
                  <View style={styles.bentoTopRow}>
                    <View style={[styles.bentoIconBox, { backgroundColor: '#EEF2FF' }]}>
                      <Users size={18} color="#4F46E5" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={18} color={COLORS.textMuted} />
                  </View>
                  <Text style={styles.bentoValue}>32</Text>
                  <Text style={styles.bentoLabel}>ACTIVE GUESTS</Text>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: '40%', backgroundColor: '#4F46E5' }]} />
                  </View>
                </View>

                {/* Occupancy Rate */}
                <View style={styles.bentoCard}>
                  <View style={styles.bentoTopRow}>
                    <View style={[styles.bentoIconBox, { backgroundColor: '#FFF7ED' }]}>
                      <BedDouble size={18} color="#EA580C" strokeWidth={2.5} />
                    </View>
                    <MoreHorizontal size={18} color={COLORS.textMuted} />
                  </View>
                  <Text style={styles.bentoValue}>88.5%</Text>
                  <Text style={styles.bentoLabel}>OCCUPANCY RATE</Text>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: '88.5%', backgroundColor: '#EA580C' }]} />
                  </View>
                </View>
              </View>

              {/* ── SNAPSHOT STRIP (mirrors ReineHome Today's Snapshot) ── */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Month Snapshot</Text>
                <TouchableOpacity
                  style={styles.reportBtn}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('OwnerFinance')}
                >
                  <Text style={styles.reportBtnText}>Full Report</Text>
                  <ArrowRight size={13} color={COLORS.primary} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.snapshotScroll}
              >
                {/* NOI */}
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>₱38,150</Text>
                        <Text style={styles.snapshotLabel}>Net Operating Income</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                {/* Expenses */}
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop' }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <TrendingUp size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>₱16,079</Text>
                        <Text style={styles.snapshotLabel}>Total Expenses</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                {/* Properties */}
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <MapPin size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>3 Active</Text>
                        <Text style={styles.snapshotLabel}>Properties</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>

              {/* ── PROPERTY PERFORMANCE LIST — styled like ReineHome largeCard rows ── */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Performance</Text>
              </View>

              <View style={styles.propertyList}>
                {PROPERTY_PERFORMANCE.map((prop) => (
                  <TouchableOpacity
                    key={prop.id}
                    activeOpacity={0.85}
                    onPress={() => setActiveTab(prop.tabName)}
                    style={styles.propertyCard}
                  >
                    {/* Image side */}
                    <Image source={{ uri: prop.image }} style={styles.propertyThumb} />

                    <View style={styles.propertyInfo}>
                      <View style={styles.propertyHeaderRow}>
                        <Text style={styles.propertyName} numberOfLines={1}>{prop.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: prop.statusBg }]}>
                          <Text style={[styles.statusBadgeText, { color: prop.statusText }]}>
                            {prop.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.propertyStatsRow}>
                        <View style={styles.propStatBox}>
                          <Text style={styles.propStatLabel}>REVENUE</Text>
                          <Text style={styles.propStatValue}>{prop.rev}</Text>
                        </View>
                        <View style={styles.propStatDivider} />
                        <View style={styles.propStatBox}>
                          <Text style={styles.propStatLabel}>OCCUPANCY</Text>
                          <Text style={styles.propStatValue}>{prop.occ}</Text>
                        </View>
                        <ArrowRight size={16} color={COLORS.textMuted} style={{ marginLeft: 'auto' }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            /* ──────────────────────────────────────
               SINGLE PROPERTY VIEW
               ────────────────────────────────────── */
            <>
              {/* Details card — styled like ReineBookings detailsCard */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Details</Text>
              </View>

              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[
                    styles.availBadge,
                    { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successBg : COLORS.warningBg },
                  ]}>
                    <View style={[
                      styles.availDot,
                      { backgroundColor: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText },
                    ]} />
                    <Text style={[
                      styles.availText,
                      { color: propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.warningText },
                    ]}>
                      {propertyStatus}
                    </Text>
                  </View>
                  <View style={styles.homeIconBtn}>
                    <Home size={20} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                </View>

                <Text style={styles.detailTitle}>{activePropertyDetails.title}</Text>

                <Text style={styles.amenityHeader}>INCLUDED AMENITIES</Text>
                <View style={styles.amenityGrid}>
                  {activePropertyDetails.amenities.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <View key={idx} style={styles.amenityPill}>
                        <Icon size={13} color={COLORS.primary} strokeWidth={2.5} style={{ marginRight: 6 }} />
                        <Text style={styles.amenityPillText}>{item.label}</Text>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.divider} />

                <View style={styles.detailFooter}>
                  <View>
                    <Text style={styles.footerLabel}>CAPACITY</Text>
                    <Text style={styles.footerValue}>{activePropertyDetails.capacity}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.footerLabel}>BASE RATE</Text>
                    <Text style={styles.footerValue}>{activePropertyDetails.baseRate}</Text>
                  </View>
                </View>
              </View>

              {/* Status toggle card */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Update Status</Text>
                <View style={styles.syncBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.syncText}>SYNCING</Text>
                </View>
              </View>

              <View style={styles.statusCard}>
                <View style={styles.statusToggleRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPropertyStatus('AVAILABLE')}
                    style={[
                      styles.statusToggleBtn,
                      propertyStatus === 'AVAILABLE' && styles.statusToggleBtnActive,
                    ]}
                  >
                    <CheckCircle2
                      size={22}
                      color={propertyStatus === 'AVAILABLE' ? COLORS.successText : COLORS.textMuted}
                      strokeWidth={2}
                    />
                    <Text style={[
                      styles.statusToggleText,
                      propertyStatus === 'AVAILABLE' && styles.statusToggleTextActive,
                    ]}>
                      AVAILABLE
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setPropertyStatus('OCCUPIED')}
                    style={[
                      styles.statusToggleBtn,
                      propertyStatus === 'OCCUPIED' && styles.statusToggleBtnActive,
                    ]}
                  >
                    <User
                      size={22}
                      color={propertyStatus === 'OCCUPIED' ? COLORS.primary : COLORS.textMuted}
                      strokeWidth={2}
                    />
                    <Text style={[
                      styles.statusToggleText,
                      propertyStatus === 'OCCUPIED' && styles.statusToggleTextActive,
                    ]}>
                      OCCUPIED
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Single property snapshot strip */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property Snapshot</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.snapshotScroll}
              >
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: HERO_IMAGES[activeTab] }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <Wallet size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>₱22.4k</Text>
                        <Text style={styles.snapshotLabel}>This Month</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop' }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <BedDouble size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>94%</Text>
                        <Text style={styles.snapshotLabel}>Occupancy</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snapshotCard} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop' }}
                    style={styles.snapshotImage}
                    imageStyle={{ borderRadius: 24 }}
                  >
                    <View style={styles.snapshotOverlay} />
                    <View style={styles.snapshotContent}>
                      <CalendarDays size={24} color="#FFFFFF" style={styles.snapshotIcon} />
                      <View>
                        <Text style={styles.snapshotValue}>8 Stays</Text>
                        <Text style={styles.snapshotLabel}>This Month</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>
            </>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* ══════════════════════════════════════════
          BLACK-PILL BOTTOM NAV — owner tier uses
          the same dark pill as ReineHome but with
          the green primary highlights preserved.
          ══════════════════════════════════════════ */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setActiveNav('Property')} style={styles.navItem} activeOpacity={0.8}>
            <LayoutGrid size={22} color={activeNav === 'Property' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Property' && styles.navTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveNav('Bookings'); navigation.navigate('OwnerBookings'); }} style={styles.navItem} activeOpacity={0.8}>
            <CalendarDays size={22} color={activeNav === 'Bookings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Bookings' && styles.navTextActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveNav('Finance'); navigation.navigate('OwnerFinance'); }} style={styles.navItem} activeOpacity={0.8}>
            <BarChart2 size={22} color={activeNav === 'Finance' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Finance' && styles.navTextActive]}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveNav('Ledger'); navigation.navigate('OwnerLedger'); }} style={styles.navItem} activeOpacity={0.8}>
            <BookOpen size={22} color={activeNav === 'Ledger' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Ledger' && styles.navTextActive]}>Ledger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveNav('Insights'); navigation.navigate('OwnerInsights'); }} style={styles.navItem} activeOpacity={0.8}>
            <PieChart size={22} color={activeNav === 'Insights' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Insights' && styles.navTextActive]}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveNav('Settings'); navigation.navigate('OwnerSettings'); }} style={styles.navItem} activeOpacity={0.8}>
            <Settings size={22} color={activeNav === 'Settings' ? '#FFFFFF' : COLORS.textMuted} />
            <Text style={[styles.navText, activeNav === 'Settings' && styles.navTextActive]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.background },
  scrollContent:{ flexGrow: 1 },

  /* ── HERO ── */
  heroContainer: { width: '100%', height: 360 },
  heroImage:     { width: '100%', height: '100%' },
  heroOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,25,15,0.55)' },
  safeArea: {
    flex: 1, paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 28, justifyContent: 'space-between',
  },

  /* Top bar */
  topBar:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ownerPill:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ownerAvatar:{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  ownerLabel: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.75)', letterSpacing: 1.2, marginBottom: 2 },
  ownerName:  { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  liveDotRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  liveDot:    { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.accent },
  liveText:   { fontSize: 11, fontWeight: '700', color: COLORS.accent },
  iconBtnDark:{
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(30,60,30,0.6)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  notifDot:{
    position: 'absolute', top: 10, right: 10,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: COLORS.dangerText, borderWidth: 2, borderColor: '#FFFFFF',
  },

  /* Hero bottom */
  heroBottomContent: { marginTop: 'auto', gap: 10 },
  heroMainStat:   { fontSize: 40, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  heroSubDecimals:{ fontSize: 22, color: 'rgba(255,255,255,0.65)' },
  heroSubStat:    { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },

  /* Dark stat pill (mirrors ReineHome searchPill / trendPill) */
  statPill:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(10,25,15,0.7)',
    borderRadius: 100, paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  statPillIconBox:{
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.successBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  statusDot:{ width: 10, height: 10, borderRadius: 5 },
  statPillTitle:{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  statPillSub:  { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },

  /* ── QUICK FILTER PILLS ── */
  quickActionsWrapper: { marginTop: 20, marginBottom: 12 },
  quickActionsScroll:  { paddingHorizontal: 24, gap: 10, alignItems: 'center' },
  actionPillDark:{
    backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20,
    height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100,
  },
  actionPillDarkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  actionPillLight:{
    backgroundColor: COLORS.surface, paddingHorizontal: 16,
    height: 44, justifyContent: 'center', borderRadius: 100,
    borderWidth: 1, borderColor: COLORS.border,
  },
  actionPillLightActive:{ backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  actionPillLightText:  { color: COLORS.textMain, fontSize: 14, fontWeight: '600' },
  actionPillLightTextActive:{ color: COLORS.primary, fontWeight: '700' },

  /* ── MAIN CONTENT ── */
  mainContent: { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader:{
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16, marginTop: 8,
  },
  sectionTitle:{ fontSize: 20, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5 },
  reportBtn:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primaryLight, paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 100,
  },
  reportBtnText:{ fontSize: 11, fontWeight: '800', color: COLORS.primary, marginRight: 4 },

  /* ── BENTO KPI ── */
  bentoGrid:{ flexDirection: 'row', gap: 14, marginBottom: 8 },
  bentoCard:{
    flex: 1, backgroundColor: COLORS.surface, borderRadius: 24, padding: 18,
    borderWidth: 1, borderColor: COLORS.border,
  },
  bentoTopRow:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  bentoIconBox:{ width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  bentoValue:{ fontSize: 24, fontWeight: '800', color: COLORS.textMain, letterSpacing: -0.5, marginBottom: 4 },
  bentoLabel:{ fontSize: 9, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 10 },
  progressBg:{ height: 6, backgroundColor: COLORS.border, borderRadius: 3 },
  progressFill:{ height: '100%', borderRadius: 3 },

  /* ── SNAPSHOT STRIP ── */
  snapshotScroll:{ gap: 16, paddingBottom: 8 },
  snapshotCard:  { width: 160, height: 180, borderRadius: 24, overflow: 'hidden' },
  snapshotImage: { width: '100%', height: '100%' },
  snapshotOverlay:{
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.38)', borderRadius: 24,
  },
  snapshotContent:{ flex: 1, padding: 16, justifyContent: 'space-between' },
  snapshotIcon:   { marginBottom: 'auto' },
  snapshotValue:  { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  snapshotLabel:  { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },

  /* ── PROPERTY LIST CARDS ── */
  propertyList: { gap: 14 },
  propertyCard:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  propertyThumb:{ width: 68, height: 68, borderRadius: 18, backgroundColor: COLORS.background },
  propertyInfo: { flex: 1, marginLeft: 14 },
  propertyHeaderRow:{
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  propertyName:{ fontSize: 15, fontWeight: '800', color: COLORS.textMain, flex: 1, marginRight: 8, letterSpacing: -0.2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText:{ fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  propertyStatsRow:{ flexDirection: 'row', alignItems: 'center' },
  propStatBox: { flex: 1 },
  propStatLabel:{ fontSize: 9, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 2 },
  propStatValue:{ fontSize: 14, fontWeight: '800', color: COLORS.textMain },
  propStatDivider:{ width: 1, height: 22, backgroundColor: COLORS.border, marginHorizontal: 12 },

  /* ── SINGLE PROPERTY DETAIL CARD ── */
  detailCard:{
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 24,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  detailHeader:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  availBadge:{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100 },
  availDot:  { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  availText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  homeIconBtn:{ width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  detailTitle:{ fontSize: 26, fontWeight: '800', color: COLORS.primary, letterSpacing: -1, marginBottom: 20 },
  amenityHeader:{ fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1.5, marginBottom: 10 },
  amenityGrid:{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  amenityPill:{
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12,
  },
  amenityPillText:{ fontSize: 11, fontWeight: '700', color: COLORS.textMain },
  divider:{ height: 1, backgroundColor: COLORS.border, marginVertical: 20 },
  detailFooter:{ flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel:{ fontSize: 10, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1, marginBottom: 4 },
  footerValue:{ fontSize: 15, fontWeight: '800', color: COLORS.textMain },

  /* Status toggle card */
  statusCard:{
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 20,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  statusToggleRow:{ flexDirection: 'row', gap: 12 },
  statusToggleBtn:{
    flex: 1, height: 80, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background,
  },
  statusToggleBtnActive:{ backgroundColor: COLORS.successBg, borderColor: COLORS.successText },
  statusToggleText:{ fontSize: 11, fontWeight: '800', color: COLORS.textMuted, marginTop: 8, letterSpacing: 0.5 },
  statusToggleTextActive:{ color: COLORS.textMain },
  syncBadge:{ flexDirection: 'row', alignItems: 'center', gap: 5 },
  syncText:{ fontSize: 10, fontWeight: '800', color: COLORS.accent, letterSpacing: 0.5 },

  bottomSpacer:{ height: 160 },

  /* ── BLACK-PILL BOTTOM NAV (owner = green dark, same pill shape) ── */
  bottomNavContainer:{
    position: 'absolute', bottom: Platform.OS === 'ios' ? 32 : 24,
    alignSelf: 'center', width: '92%', zIndex: 100,
  },
  bottomNav:{
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surfaceDark, borderRadius: 100,
    paddingVertical: 10, paddingHorizontal: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 20,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.45)', marginTop: 3 },
  navTextActive:{ color: '#FFFFFF', fontWeight: '700' },
});