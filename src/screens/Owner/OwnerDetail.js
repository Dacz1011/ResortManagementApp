import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, MapPin, Tag, Banknote, Image as ImageIcon, Wrench, AlertCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  successText: '#16A34A',
  expenseText: '#EF4444',
};

export default function OwnerDetail({ route, navigation }) {
  const { item } = route.params;
  const insets = useSafeAreaInsets();

  const isMaintenance = !!item.reportedDate;
  // Handle different property naming for income/expense type
  const isIncome = item.type === 'Income' || item.type === 'income';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Info Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{item.title || item.description}</Text>
          <View style={styles.propertyRow}>
            <MapPin size={14} color={COLORS.textMuted} />
            <Text style={styles.propertyText}>{item.property || item.subtitle}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.iconBox}>
                <Calendar size={18} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{item.date || item.reportedDate}</Text>
              </View>
            </View>

            {item.amount && (
              <View style={styles.detailItem}>
                <View style={styles.iconBox}>
                  <Banknote size={18} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={[styles.detailValue, { color: isIncome ? COLORS.successText : COLORS.expenseText }]}>
                    ₱{Number(item.amount.toString().replace(/[^0-9.]/g, '') || 0).toLocaleString()}
                  </Text>
                </View>
              </View>
            )}

            {(item.utilityType || item.category || item.type) && !isMaintenance && (
              <View style={styles.detailItem}>
                <View style={styles.iconBox}>
                  <Tag size={18} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>{item.utilityType || item.category || item.type}</Text>
                </View>
              </View>
            )}

            {isMaintenance && (
              <View style={styles.detailItem}>
                <View style={styles.iconBox}>
                  <AlertCircle size={18} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Priority</Text>
                  <Text style={styles.detailValue}>{item.priority}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statement Photo / Evidence</Text>
          {item.image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            </View>
          ) : (
            <View style={styles.noImagePlaceholder}>
              <ImageIcon size={48} color={COLORS.border} />
              <Text style={styles.noImageText}>No photo attached</Text>
            </View>
          )}
        </View>

        {isMaintenance && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Open' ? '#FEE2E2' : '#DCFCE7' }]}>
              <Text style={[styles.statusText, { color: item.status === 'Open' ? '#EF4444' : '#16A34A' }]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  scrollContent: { padding: 24, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  propertyText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
