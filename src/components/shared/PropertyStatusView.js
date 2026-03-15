import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Home,
  Waves,
  Coffee,
  Wifi,
  Car,
  CheckCircle2,
  User
} from 'lucide-react-native';

// Modernized Luxury Color Palette (Ideally imported from src/theme/colors.js)
const COLORS = {
  primary: '#163321',
  primaryLight: '#245236',
  accent: '#A5D6A7',
  background: '#F8FAFC',
  textMain: '#0F172A',
  textMuted: '#64748B',
  successGreen: '#E2FBE8',
  successText: '#15803D',
};

// Detailed Data for the Property View
const PROPERTY_DETAILS = {
  "Reine's Beach": {
    fullName: "Reine's Beach House",
    capacity: "Unlimited Pax",
    baseRate: "₱12,000/night",
    amenities: [
      { icon: Waves, label: "Private Pool" },
      { icon: Coffee, label: "Full Kitchen" },
      { icon: Home, label: "Entire House" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Car, label: "4-Car Parking" },
    ]
  },
  "Ryu's House": {
    fullName: "Ryu's Transient House",
    capacity: "15 Pax",
    baseRate: "₱8,000/night",
    amenities: [
      { icon: Home, label: "Entire House" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Coffee, label: "Basic Kitchen" },
      { icon: Car, label: "2-Car Parking" },
    ]
  },
  "Casa M.O.": {
    fullName: "Casa M.O.",
    capacity: "20 Pax",
    baseRate: "₱15,000/night",
    amenities: [
      { icon: Waves, label: "Private Pool" },
      { icon: Home, label: "Heritage Villa" },
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Car, label: "6-Car Parking" },
    ]
  }
};

export default function PropertyStatusView({ propertyKey }) {
  const [propertyStatus, setPropertyStatus] = useState('AVAILABLE');

  const details = PROPERTY_DETAILS[propertyKey];

  if (!details) return null;

  return (
    <View style={styles.propertyDetailContainer}>
      <View style={styles.propertyDetailCard}>

        {/* Detail Header */}
        <View style={styles.propCardHeader}>
          <View style={styles.propStatusPill}>
            <View style={styles.propStatusDot} />
            <Text style={styles.propStatusPillText}>{propertyStatus}</Text>
          </View>
          <View style={styles.propIconWrapper}>
            <Home size={22} color={COLORS.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.propDetailTitle}>{details.fullName}</Text>

        {/* Amenities Grid */}
        <Text style={styles.propSectionSubtitle}>INCLUDED AMENITIES</Text>
        <View style={styles.amenitiesWrapper}>
          {details.amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <View key={i} style={styles.amenityPill}>
                <Icon size={16} color={COLORS.primary} strokeWidth={2} />
                <Text style={styles.amenityText}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.propDivider} />

        {/* Footer Stats */}
        <View style={styles.propFooterStats}>
          <View>
            <Text style={styles.propStatLabel}>CAPACITY</Text>
            <Text style={styles.propStatValue}>{details.capacity}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.propStatLabel}>BASE RATE</Text>
            <Text style={styles.propStatValue}>{details.baseRate}</Text>
          </View>
        </View>
      </View>

      {/* Update Status Section */}
      <View style={styles.updateSection}>
        <View style={styles.updateHeaderRow}>
          <View>
            <Text style={styles.updateTitle}>Update Entire Property</Text>
            <Text style={styles.updateSubtitle}>{details.fullName}</Text>
          </View>
          <View style={styles.syncBadge}>
            <Text style={styles.syncBadgeText}>SYNCING</Text>
          </View>
        </View>

        <View style={styles.updateButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.updateBtn, propertyStatus === 'AVAILABLE' && styles.updateBtnActive]}
            onPress={() => setPropertyStatus('AVAILABLE')}
          >
            <CheckCircle2 size={28} color={propertyStatus === 'AVAILABLE' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2.5} />
            <Text style={[styles.updateBtnText, propertyStatus === 'AVAILABLE' && styles.updateBtnTextActive]}>
              AVAILABLE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.updateBtn, propertyStatus === 'OCCUPIED' && styles.updateBtnActive]}
            onPress={() => setPropertyStatus('OCCUPIED')}
          >
            <User size={28} color={propertyStatus === 'OCCUPIED' ? COLORS.textMain : COLORS.textMuted} strokeWidth={2.5} />
            <Text style={[styles.updateBtnText, propertyStatus === 'OCCUPIED' && styles.updateBtnTextActive]}>
              OCCUPIED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  propertyDetailContainer: {
    marginTop: 10,
  },
  propertyDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
    marginBottom: 24,
  },
  propCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  propStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  propStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.successText,
    marginRight: 6,
  },
  propStatusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.successText,
    letterSpacing: 0.5,
  },
  propIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propDetailTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -1,
    marginBottom: 24,
    lineHeight: 38,
  },
  propSectionSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  amenitiesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  amenityText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMain,
    marginLeft: 8,
  },
  propDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  propFooterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propStatLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  propStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  updateSection: {
    marginTop: 8,
  },
  updateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  updateSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  syncBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  syncBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryLight,
    letterSpacing: 0.5,
  },
  updateButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  updateBtn: {
    flex: 1,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  updateBtnActive: {
    backgroundColor: '#F4FBF6',
    borderColor: COLORS.accent,
  },
  updateBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 12,
    letterSpacing: 0.5,
  },
  updateBtnTextActive: {
    color: COLORS.textMain,
  }
});