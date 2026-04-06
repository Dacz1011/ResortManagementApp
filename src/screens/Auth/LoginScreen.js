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
  ImageBackground,
  Easing,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Eye,
  EyeOff,
  UserRound,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Base Colors unified with the rest of the application
const COLORS = {
  background: '#F8FAFC',
  cardBg: '#FFFFFF',
  textMain: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  inputBg: '#F8FAFC',
};

// Smart Property Detection Configuration
const PROPERTIES = [
  {
    id: 'owner',
    match: '', // Default
    color: '#0F172A', // Deep Slate for Owner
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    name: 'Owner Portal'
  },
  {
    id: 'reine',
    match: 'reine',
    color: '#E64E76', // Vibrant Pink
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    name: "Reine's Beach House"
  },
  {
    id: 'casa',
    match: 'casa',
    color: '#1B5E20', // Casa Deep Forest Green
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1887&auto=format&fit=crop',
    name: 'Casa M.O.'
  },
  {
    id: 'ryu',
    match: 'ryu',
    color: '#23324B', // Ryu Deep Navy
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    name: "Ryu's Transient House"
  },
];

export default function LoginScreen() {
  const navigation = useNavigation();

  // Form State
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Focus State for Inputs
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  // Dynamic Property State
  const [activeProp, setActiveProp] = useState(PROPERTIES[0]);
  const [prevProp, setPrevProp] = useState(PROPERTIES[0]);

  // Animations
  const slideUpAnim = useRef(new Animated.Value(80)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const crossfadeAnim = useRef(new Animated.Value(1)).current;

  // Initial Load Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Watch username to dynamically switch backgrounds and themes
  useEffect(() => {
    const lowerUser = username.toLowerCase();
    let matched = PROPERTIES[0]; // Fallback to Owner

    if (lowerUser.includes(PROPERTIES[1].match)) matched = PROPERTIES[1];
    else if (lowerUser.includes(PROPERTIES[2].match)) matched = PROPERTIES[2];
    else if (lowerUser.includes(PROPERTIES[3].match)) matched = PROPERTIES[3];

    if (matched.id !== activeProp.id) {
      setPrevProp(activeProp);
      setActiveProp(matched);
      crossfadeAnim.setValue(0);
      Animated.timing(crossfadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [username]);

  const handleLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.96, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start(() => {
      // Role based navigation logic based purely on credentials
      const user = username.trim();

      if (user === 'Admin123' && password === '123456') {
        navigation.navigate('OwnerDashboard');
      } else if (user === 'Ryu_Admin' && password === '123456') {
        navigation.navigate('RyuHome');
      } else if (user === 'Reine_Admin' && password === '123456') {
        navigation.navigate('ReineHome');
      } else if (user === 'Casa_Admin' && password === '123456') {
        navigation.navigate('CasaHome');
      } else {
        Alert.alert('Authentication Failed', 'Please verify your credentials and try again.');
      }
    });
  };

  // Dynamically change accent color based on typed username for premium feedback
  const activeAccentColor = activeProp.color;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* --- FULL BLEED IMMERSIVE BACKGROUND WITH CROSSFADE --- */}
      <View style={styles.heroHeader}>
        {/* Layer 1: Previous Image (For Crossfade) */}
        <Image source={{ uri: prevProp.image }} style={styles.absoluteFill} resizeMode="cover" />

        {/* Layer 2: Active Image */}
        <Animated.Image
          source={{ uri: activeProp.image }}
          style={[styles.absoluteFill, { opacity: crossfadeAnim }]}
          resizeMode="cover"
        />

        {/* Luxury Dark Gradient Overlay */}
        <View style={styles.heroOverlay} />

        <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
          <Animated.View style={[styles.welcomeContainer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
            <View style={styles.brandRow}>
              <ShieldCheck size={28} color="#FFFFFF" strokeWidth={2} style={{ marginRight: 12 }} />
              <Text style={styles.brandSubtitle}>RESORT PORTFOLIO</Text>
            </View>
            <Text style={styles.welcomeTitle}>Secure Access.</Text>
            <Text style={styles.welcomeDesc}>Log in with your assigned credentials to manage your designated property.</Text>
          </Animated.View>
        </SafeAreaView>
      </View>

      {/* --- BOTTOM SHEET FORM --- */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Fix for Android dark gap issue
        style={styles.keyboardWrapper}
      >
        <Animated.View
          style={[
            styles.mainSheet,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          {/* Decorative Drag Handle */}
          <View style={styles.dragHandle} />

          <View style={styles.formContainer}>
            <View style={styles.formHeaderRow}>
              <Text style={styles.sectionLabel}>AUTHENTICATION</Text>

              {/* Dynamic Property Detection Indicator */}
              {activeProp.id !== 'owner' && (
                <View style={styles.detectedBadge}>
                  <Sparkles size={12} color={activeProp.color} strokeWidth={2.5} style={{ marginRight: 4 }} />
                  <Text style={[styles.detectedText, { color: activeProp.color }]}>
                    {activeProp.name} Detected
                  </Text>
                </View>
              )}
            </View>

            {/* Username Input */}
            <View style={[
              styles.inputWrapper,
              isUserFocused && { borderColor: activeProp.color, backgroundColor: '#FFFFFF' }
            ]}>
              <UserRound color={isUserFocused ? activeProp.color : COLORS.textMuted} size={20} style={styles.inputIcon} strokeWidth={2.5} />
              <TextInput
                style={styles.input}
                placeholder="Admin Username"
                placeholderTextColor={COLORS.textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setIsUserFocused(true)}
                onBlur={() => setIsUserFocused(false)}
              />
            </View>

            {/* Password Input */}
            <View style={[
              styles.inputWrapper,
              isPassFocused && { borderColor: activeProp.color, backgroundColor: '#FFFFFF' }
            ]}>
              <Lock color={isPassFocused ? activeProp.color : COLORS.textMuted} size={20} style={styles.inputIcon} strokeWidth={2.5} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                {showPassword ? (
                  <EyeOff size={20} color={isPassFocused ? activeProp.color : COLORS.textMuted} strokeWidth={2.5} />
                ) : (
                  <Eye size={20} color={isPassFocused ? activeProp.color : COLORS.textMuted} strokeWidth={2.5} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
              <Text style={[styles.forgotText, { color: activeProp.color }]}>Recover password?</Text>
            </TouchableOpacity>

            {/* Dynamic Action Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 16 }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleLogin}
                style={[
                  styles.loginBtn,
                  { backgroundColor: activeProp.color, shadowColor: activeProp.color }
                ]}
              >
                <Text style={styles.loginBtnText}>Secure Sign In</Text>
                <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  heroHeader: {
    width: '100%',
    height: height * 0.65, // Extends slightly lower to blend with the sheet smoothly
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.70)', // Dark luxury overlay
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? 60 : 40,
  },
  welcomeContainer: {
    marginTop: height * 0.1, // Positions text beautifully in the top third
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 12,
  },
  welcomeDesc: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    lineHeight: 24,
    paddingRight: 20,
  },

  /* --- OVERLAPPING MAIN SHEET --- */
  keyboardWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainSheet: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40, // Keeps it comfortably off the bottom edge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 24,
  },
  dragHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 32,
  },

  /* --- FORM CONTAINER --- */
  formContainer: {
    paddingHorizontal: 32,
  },
  formHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  detectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  detectedText: {
    fontSize: 10,
    fontWeight: '800',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 20,
    height: 64,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: '600',
  },
  eyeBtn: {
    padding: 8,
    marginRight: -8,
  },

  /* --- FORGOT PASSWORD --- */
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 24,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
  },

  /* --- ACTION BUTTON --- */
  loginBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});