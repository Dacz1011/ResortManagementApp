import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Waves,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  Camera,
  Edit3
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#E64E76', // Vibrant Reine Pink
  primaryLight: '#FDF0F4',
  textMain: '#0F172A',
  textMuted: '#64748B',
  background: '#F8FAFC',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
};

const AMENITIES = [
  { icon: Wifi, label: 'High-speed Wifi' },
  { icon: Waves, label: 'Infinity Pool' },
  { icon: Coffee, label: 'Complimentary Breakfast' },
  { icon: ShieldCheck, label: '24/7 Security' },
];

export default function ReinePropertyProfile({ navigation }) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* --- FLOATING HEADER --- */}
      <Animated.View
        style={[
          styles.floatingHeader,
          {
            paddingTop: insets.top,
            opacity: headerOpacity,
            backgroundColor: '#FFFFFF',
          }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnDark}>
            <ChevronLeft size={24} color={COLORS.textMain} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Profile</Text>
          <TouchableOpacity style={styles.editBtnDark}>
            <Edit3 size={20} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* --- HERO IMAGE SECTION --- */}
        <View style={styles.heroWrapper}>
          <Animated.Image
            source={{ uri: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' }}
            style={[styles.heroImage, { transform: [{ scale: imageScale }] }]}
          />
          <View style={styles.heroOverlay} />

          <SafeAreaView edges={['top']} style={styles.heroControls}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={20} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.mainContent}>
          <View style={styles.titleSection}>
            <View style={styles.badgeRow}>
              <View style={styles.ratingBadge}>
                <Star size={12} color="#EAB308" fill="#EAB308" />
                <Text style={styles.ratingText}>4.9 (128 Reviews)</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.resortName}>Reine's Beach House</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color={COLORS.primary} strokeWidth={2} />
              <Text style={styles.locationText}>Station 1, Boracay Island, Philippines</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* --- DESCRIPTION --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Property</Text>
            <Text style={styles.description}>
              Reine's Beach House offers a luxurious escape with direct access to the pristine White Beach.
              Our property combines modern architecture with tropical elements, featuring expansive ocean views,
              private infinity pools, and world-class hospitality. Perfect for families and couples seeking
              tranquility and elegance.
            </Text>
          </View>

          {/* --- AMENITIES --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Amenities</Text>
            <View style={styles.amenityGrid}>
              {AMENITIES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View key={index} style={styles.amenityItem}>
                    <View style={styles.amenityIconBox}>
                      <Icon size={20} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <Text style={styles.amenityLabel}>{item.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* --- DETAILS & POLICIES --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details & Policies</Text>
            <View style={styles.policyCard}>
              <View style={styles.policyRow}>
                <Clock size={18} color={COLORS.textMuted} />
                <View style={styles.policyTextGroup}>
                  <Text style={styles.policyLabel}>Check-in Time</Text>
                  <Text style={styles.policyValue}>02:00 PM</Text>
                </View>
              </View>
              <View style={[styles.policyRow, { marginBottom: 0 }]}>
                <Clock size={18} color={COLORS.textMuted} />
                <View style={styles.policyTextGroup}>
                  <Text style={styles.policyLabel}>Check-out Time</Text>
                  <Text style={styles.policyValue}>12:00 PM</Text>
                </View>
              </View>
            </View>
          </View>

          {/* --- CONTACT INFO --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactCard}>
              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <Phone size={18} color={COLORS.primary} />
                </View>
                <Text style={styles.contactText}>+63 912 345 6789</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <Mail size={18} color={COLORS.primary} />
                </View>
                <Text style={styles.contactText}>contact@reinebeach.com</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </Animated.ScrollView>

      {/* --- SAVE/EDIT BUTTON --- */}
      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
          <Text style={styles.primaryBtnText}>Edit Property Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  /* --- FLOATING HEADER --- */
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  backBtnDark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  editBtnDark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  /* --- HERO SECTION --- */
  heroWrapper: {
    height: 350,
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cameraBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  /* --- MAIN CONTENT --- */
  mainContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleSection: {
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCE8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#854D0E',
    marginLeft: 4,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.5,
  },
  resortName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -1,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 24,
  },

  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 24,
    fontWeight: '500',
  },

  /* --- AMENITIES --- */
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: (width - 60) / 2,
  },
  amenityIconBox: {
    marginRight: 10,
  },
  amenityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMain,
    flex: 1,
  },

  /* --- POLICIES --- */
  policyCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  policyTextGroup: {
    marginLeft: 12,
  },
  policyLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  policyValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },

  /* --- CONTACT --- */
  contactCard: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },

  /* --- BOTTOM ACTIONS --- */
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});