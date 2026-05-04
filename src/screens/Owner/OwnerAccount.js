import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Animated,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  UserPlus,
  Trash2,
  ChevronLeft,
  Building,
  User,
  Lock,
  ChevronDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { mockDb } from '../../services/mockDb';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  surfaceDark: '#18181B',
  primary: '#E64E76',
  primaryLight: '#FFF0F3',
  textMain: '#18181B',
  textMuted: '#71717A',
  border: '#E4E4E7',
  dangerBg: '#FEE2E2',
  dangerText: '#EF4444',
  successBg: '#DCFCE7',
  successText: '#16A34A',
};

const PROPERTIES = [
  'Reine Beach House',
  'Ryu Resort',
  'Casa M.O.'
];

export default function OwnerAccount({ navigation }) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Form States
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);

  // Data States
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    const data = await mockDb.getAll('admin_accounts');
    setAccounts(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [])
  );

  const handleCreateAccount = async () => {
    if (!username || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    const newAccount = {
      fullName,
      username: username.toLowerCase().trim(),
      password,
      property: selectedProperty,
      role: 'ADMIN',
      createdAt: new Date().toISOString()
    };

    const result = await mockDb.add('admin_accounts', newAccount);
    if (result) {
      Alert.alert('Success', 'Account created successfully.');
      setUsername('');
      setPassword('');
      setFullName('');
      fetchAccounts();
    } else {
      Alert.alert('Error', 'Failed to create account.');
    }
    setIsSubmitting(false);
  };

  const handleDeleteAccount = (id, name) => {
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete the account for ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await mockDb.remove('admin_accounts', id);
            if (success) {
              fetchAccounts();
            } else {
              Alert.alert('Error', 'Failed to delete account.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight + 10 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerSubtitle}>ACCOUNT MANAGEMENT</Text>
          <Text style={styles.headerTitle}>Staff Accounts</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={{ opacity: fadeAnim }}
        >
          {/* ── CREATION FORM ── */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CREATE NEW ACCOUNT</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <User size={18} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter employee full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>USERNAME</Text>
              <View style={styles.inputWrapper}>
                <ShieldCheck size={18} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create unique username"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Assign security password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ASSIGN PROPERTY</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowPropertyDropdown(!showPropertyDropdown)}
              >
                <Building size={18} color={COLORS.textMuted} style={styles.inputIcon} />
                <Text style={styles.dropdownValue}>{selectedProperty}</Text>
                <ChevronDown size={20} color={COLORS.textMuted} />
              </TouchableOpacity>

              {showPropertyDropdown && (
                <View style={styles.dropdownContent}>
                  {PROPERTIES.map((prop) => (
                    <TouchableOpacity
                      key={prop}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedProperty(prop);
                        setShowPropertyDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, selectedProperty === prop && styles.dropdownItemTextActive]}>
                        {prop}
                      </Text>
                      {selectedProperty === prop && <CheckCircle2 size={16} color={COLORS.primary} />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
              onPress={handleCreateAccount}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <UserPlus size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.submitBtnText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* ── ACCOUNT LIST ── */}
          <View style={[styles.sectionHeader, { marginTop: 32 }]}>
            <Text style={styles.sectionTitle}>EXISTING ACCOUNTS</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : accounts.length > 0 ? (
            <View style={styles.accountList}>
              {accounts.map((acc) => (
                <View key={acc.id} style={styles.accountCard}>
                  <View style={styles.accountAvatar}>
                    <Text style={styles.avatarText}>{acc.fullName.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountName}>{acc.fullName}</Text>
                    <Text style={styles.accountProperty}>{acc.property}</Text>
                    <Text style={styles.accountUsername}>@{acc.username}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteAccount(acc.id, acc.fullName)}
                  >
                    <Trash2 size={20} color={COLORS.dangerText} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <User size={48} color={COLORS.border} strokeWidth={1} />
              <Text style={styles.emptyText}>No staff accounts found.</Text>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    paddingBottom: 20,
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
    marginRight: 12,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  scrollContent: {
    padding: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 56,
    paddingHorizontal: 16,
  },
  dropdownValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  dropdownContent: {
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  dropdownItemTextActive: {
    color: COLORS.primary,
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  accountList: {
    gap: 12,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  accountProperty: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  accountUsername: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.dangerBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
});
