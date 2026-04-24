import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Bell,
  Calendar,
  Wallet,
  User,
  Info,
  CheckCircle2,
  Clock,
  CheckCheck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Dynamic Theme Configuration with Luxury Images
const THEMES = {
  Reine: {
    primary: '#E64E76',
    primaryLight: '#FDF0F4',
    heroImage: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=2070&auto=format&fit=crop',
  },
  Ryu: {
    primary: '#23324B',
    primaryLight: '#E0E7FF',
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
  },
  Casa: {
    primary: '#1B5E20',
    primaryLight: '#E8F5E9',
    heroImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
  }
};

const COMMON_COLORS = {
  background: '#F4F7FA', // Deep crisp off-white for main sheet
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  cardBg: '#FFFFFF',
};

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'booking',
    title: 'New Booking Request',
    message: 'Jonathan Rivera requested a stay for Feb 10 - Feb 12.',
    time: '2 mins ago',
    icon: Calendar,
    unread: true,
  },
  {
    id: '2',
    type: 'finance',
    title: 'Utility Bill Reminder',
    message: 'Monthly Electricity bill for Reine is due in 3 days.',
    time: '1 hour ago',
    icon: Wallet,
    unread: true,
  },
  {
    id: '3',
    type: 'system',
    title: 'Maintenance Update',
    message: 'Plumbing issue in Room 204 has been marked as resolved.',
    time: '5 hours ago',
    icon: Info,
    unread: false,
  },
  {
    id: '4',
    type: 'guest',
    title: 'Guest Checked In',
    message: 'Michael Chen has arrived and successfully checked in.',
    time: 'Yesterday',
    icon: User,
    unread: false,
  },
];

export default function NotificationScreen({ route, navigation }) {
  const { propertyId } = route.params || { propertyId: 'Reine' };
  const theme = THEMES[propertyId] || THEMES.Reine;

  const renderIcon = (type, IconComponent) => {
    let bgColor = theme.primaryLight;
    let iconColor = theme.primary;

    if (type === 'finance') {
      bgColor = '#FEE2E2';
      iconColor = '#EF4444';
    } else if (type === 'system') {
      bgColor = '#E0F2FE';
      iconColor = '#0EA5E9';
    } else if (type === 'guest') {
      bgColor = '#DCFCE7';
      iconColor = '#16A34A';
    }

    return (
      <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
        <IconComponent size={20} color={iconColor} strokeWidth={2.5} />
      </View>
    );
  };

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <View style={styles.container}>
      {/* Translucent status bar for a full-bleed immersive image effect */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* --- FULL BLEED HERO IMAGE HEADER --- */}
      <ImageBackground
        source={{ uri: theme.heroImage }}
        style={styles.heroHeader}
      >
        {/* Dark gradient overlay for text readability */}
        <View style={styles.heroOverlay} />

        <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
          {/* Top Nav Row */}
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              style={styles.backBtnWrapper}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>{propertyId} Resort</Text>
              <Text style={styles.adminTitle}>Notifications</Text>
            </View>
            <View style={{ width: 44 }} /> {/* Spacer for alignment */}
          </View>

          {/* Glassmorphism Action Card */}
          <View style={styles.glassCard}>
            <View style={styles.glassContent}>
              <View style={styles.unreadBadge}>
                <Bell size={14} color={theme.primary} strokeWidth={2.5} style={{ marginRight: 6 }} />
                <Text style={[styles.unreadBadgeText, { color: theme.primary }]}>
                  {unreadCount} UNREAD
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.markAllBtn}>
                <CheckCheck size={16} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 6 }} />
                <Text style={styles.markAllBtnText}>Mark all as read</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* --- OVERLAPPING MAIN SHEET --- */}
      <View style={styles.mainSheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
          </View>

          <View style={styles.notificationList}>
            {NOTIFICATIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={[
                  styles.notificationCard,
                  item.unread && styles.unreadCard
                ]}
              >
                <View style={styles.cardContent}>
                  {renderIcon(item.type, item.icon)}

                  <View style={styles.textWrap}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.notifTitle, item.unread && styles.notifTitleUnread]}>
                        {item.title}
                      </Text>
                      {item.unread && <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />}
                    </View>
                    <Text style={styles.notifMessage} numberOfLines={2}>
                      {item.message}
                    </Text>
                    <View style={styles.timeRow}>
                      <Clock size={12} color={COMMON_COLORS.textMuted} />
                      <Text style={styles.notifTime}>{item.time}</Text>
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.background,
  },

  /* --- FULL BLEED HERO --- */
  heroHeader: {
    width: '100%',
    height: 280, // Slightly shorter than main dashboards
    justifyContent: 'flex-start',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.55)', // Dark slate overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40, // Space before the overlapping sheet
  },

  /* Top Nav in Hero */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 16 : 8,
  },
  backBtnWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  adminTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  /* Glassmorphism Action Card */
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Translucent
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  glassContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  unreadBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  markAllBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  /* --- OVERLAPPING MAIN SHEET --- */
  mainSheet: {
    backgroundColor: COMMON_COLORS.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -36, // Overlaps the image header
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  /* Section Header */
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COMMON_COLORS.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  /* Notification List & Cards */
  notificationList: {
    gap: 16,
  },
  notificationCard: {
    backgroundColor: COMMON_COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  unreadCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F1F5F9', // Subtle highlight border
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COMMON_COLORS.textMain,
    letterSpacing: -0.2,
  },
  notifTitleUnread: {
    fontWeight: '800',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notifMessage: {
    fontSize: 14,
    color: COMMON_COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notifTime: {
    fontSize: 12,
    fontWeight: '600',
    color: COMMON_COLORS.textMuted,
  },

  bottomSpacer: {
    height: 60,
  },
});