import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  Eye,
  EyeOff,
  KeyRound,
  Palmtree,
  Umbrella,
  MountainSnow,
  Info,
  X,
  ChevronLeft
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ROLES = [
  {
    id: 'owner',
    name: 'Owner',
    color1: '#5A4AEE',
    color2: '#7C3AED',
    icon: KeyRound,
  },
  {
    id: 'reine',
    name: "Reine's",
    color1: '#FF7B9C',
    color2: '#FF4D79',
    icon: Palmtree,
  },
  {
    id: 'casa',
    name: 'Casa M.O.',
    color1: '#335C3B',
    color2: '#1E3823',
    icon: Umbrella,
  },
  {
    id: 'ryu',
    name: "Ryu's",
    color1: '#23324B',
    color2: '#162336',
    icon: MountainSnow,
  },
];

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState(ROLES[0]);

  const [showMessage, setShowMessage] = useState(false);
  const toastSlideY = useRef(new Animated.Value(-150)).current;
  const logoFade = useRef(new Animated.Value(1)).current;

  const switchProperty = (role) => {
    Animated.timing(logoFade, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveRole(role);
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (showMessage) {
      Animated.spring(toastSlideY, {
        toValue: Platform.OS === 'ios' ? 60 : 40,
        useNativeDriver: true,
        tension: 40,
        friction: 8
      }).start();

      const timer = setTimeout(closeToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const closeToast = () => {
    Animated.timing(toastSlideY, {
      toValue: -150,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowMessage(false));
  };

  const handleLogin = () => {
    // Role based navigation based on credentials
    if (username === 'Admin123' && password === '123456') {
      navigation.navigate('OwnerDashboard');
    } else if (username === 'Ryu_Admin' && password === '123456') {
      navigation.navigate('RyuHome');
    } else if (username === 'Reine_Admin' && password === '123456') {
      navigation.navigate('ReineHome');
    } else if (username === 'Casa_Admin' && password === '123456') {
      navigation.navigate('CasaHome');
    } else {
      Alert.alert('Invalid Credentials', 'Please check your username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <View style={styles.headerBackground}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={activeRole.color1} />
              <Stop offset="100%" stopColor={activeRole.color2} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>

      <Animated.View style={[styles.toast, { transform: [{ translateY: toastSlideY }] }]}>
        <View style={[styles.toastIcon, { backgroundColor: activeRole.color1 }]}>
          <Info size={18} color="#FFFFFF" />
        </View>
        <Text style={[styles.toastText, { fontFamily: 'Manrope-Bold' }]}>Contact the owner for renewal of passwords.</Text>
        <TouchableOpacity onPress={closeToast} style={styles.toastCloseBtn}>
          <X size={16} color="#94A3B8" />
        </TouchableOpacity>
      </Animated.View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>

          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.brandContainer}>
            <Animated.View style={{ opacity: logoFade, alignItems: 'center' }}>
              <Text style={styles.brandText}>{activeRole.name}</Text>
            </Animated.View>
          </View>

          <View style={styles.mainCard}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

              <Text style={[styles.welcomeTitle, { fontFamily: 'Manrope-ExtraBold' }]}>Welcome Back, Admin!</Text>
              <Text style={[styles.welcomeSubtitle, { fontFamily: 'Manrope-Medium' }]}>Enter your details below</Text>

              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { fontFamily: 'Manrope-Bold' }]}>Username</Text>
                  <TextInput
                    style={[styles.input, { fontFamily: 'Manrope-SemiBold' }]}
                    placeholder="admin@example.com"
                    placeholderTextColor="#CBD5E1"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { fontFamily: 'Manrope-Bold' }]}>Password</Text>
                  <View style={styles.passwordRow}>
                    <TextInput
                      style={[styles.input, { flex: 1, borderBottomWidth: 0, marginBottom: 0, fontFamily: 'Manrope-SemiBold' }]}
                      placeholder="••••••••"
                      placeholderTextColor="#CBD5E1"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                      {showPassword ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputBottomBorder} />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleLogin}
                style={[styles.loginBtn, { backgroundColor: activeRole.color1 }]}
              >
                <Text style={[styles.loginBtnText, { fontFamily: 'Manrope-Bold' }]}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotBtn} onPress={() => setShowMessage(true)}>
                <Text style={[styles.forgotText, { fontFamily: 'Manrope-SemiBold' }]}>Forgot your password?</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={[styles.dividerText, { fontFamily: 'Manrope-Bold' }]}>Select property</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.roleRow}>
                {ROLES.map((role) => {
                  const isSelected = activeRole.id === role.id;
                  const Icon = role.icon;
                  return (
                    <TouchableOpacity
                      key={role.id}
                      activeOpacity={0.7}
                      onPress={() => switchProperty(role)}
                      style={[
                        styles.roleCircle,
                        isSelected ? { backgroundColor: role.color1 } : { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0' }
                      ]}
                    >
                      <Icon size={18} color={isSelected ? '#FFFFFF' : '#94A3B8'} strokeWidth={isSelected ? 2.5 : 2} />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  keyboardView: { flex: 1 },
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: { padding: 4 },
  brandContainer: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  mainCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputSection: { gap: 24, marginBottom: 32 },
  inputContainer: { flexDirection: 'column' },
  inputLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  input: {
    height: 40,
    color: '#0F172A',
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBottomBorder: { height: 1, backgroundColor: '#E2E8F0' },
  eyeBtn: { padding: 8, marginRight: -8 },
  loginBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  loginBtnText: { fontSize: 16, color: '#FFFFFF', letterSpacing: 0.5 },
  forgotBtn: { alignSelf: 'center', marginTop: 20, marginBottom: 32 },
  forgotText: { color: '#64748B', fontSize: 13 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#F1F5F9' },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  roleCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    width: width * 0.92,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 25,
  },
  toastIcon: { padding: 8, borderRadius: 12, marginRight: 15 },
  toastText: { flex: 1, color: '#F8FAFC', fontSize: 13, lineHeight: 18 },
  toastCloseBtn: { padding: 5, marginLeft: 10 },
});