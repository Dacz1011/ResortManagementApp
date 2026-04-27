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
  Easing,
  ScrollView,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Eye,
  EyeOff,
  UserRound,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Smart Property Detection Configuration (Adaptive Colors)
const PROPERTIES = [
  {
    id: 'owner',
    match: '', // Default
    color: '#2962FF', // Vibrant Modern Blue (Matches Welcome Screen)
    name: 'Owner Portal'
  },
  {
    id: 'reine',
    match: 'reine',
    color: '#E64E76', // Vibrant Pink
    name: "Reine's Beach House"
  },
  {
    id: 'casa',
    match: 'casa',
    color: '#1B5E20', // Casa Deep Forest Green
    name: 'Casa M.O.'
  },
  {
    id: 'ryu',
    match: 'ryu',
    color: '#23324B', // Ryu Deep Navy
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const crossfadeAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Handle Hardware Back Button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Welcome');
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [navigation])
  );

  // Initial Load & Floating Animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 3D Element Bobbing Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
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
        useNativeDriver: false,
      }).start();
    }
  }, [username]);

  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start(() => {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* --- DYNAMIC SOLID BACKGROUND CROSSFADE --- */}
      <View style={[styles.absoluteFill, { backgroundColor: prevProp.color }]} />
      <Animated.View style={[styles.absoluteFill, { backgroundColor: activeProp.color, opacity: crossfadeAnim }]} />

      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardWrapper}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>

              {/* --- TOP BAR --- */}
              <View style={styles.topBar}>
                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Welcome')}
                >
                  <ChevronLeft size={28} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* --- 3D ISOMETRIC SECURITY GRAPHIC --- */}
              <View style={styles.graphicContainer}>
                <View style={styles.pedestalShadow} />
                <View style={styles.pedestalBody} />
                <View style={styles.pedestalTop} />

                <Animated.View style={[styles.floatingShield, { transform: [{ translateY: floatAnim }] }]}>
                  <View style={styles.shieldInner}>
                    <ShieldCheck size={42} color={activeProp.color} strokeWidth={2} />
                  </View>
                </Animated.View>
              </View>

              {/* --- TYPOGRAPHY --- */}
              <View style={styles.textContainer}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>
                <Text style={styles.welcomeDesc}>Sign in to securely access your portfolio dashboard and properties.</Text>
              </View>

              {/* --- FORM SECTION --- */}
              <View style={styles.formContainer}>

                {/* Dynamic Property Detection Indicator */}
                <View style={styles.badgeRow}>
                  {activeProp.id !== 'owner' ? (
                    <View style={styles.detectedBadge}>
                      <Sparkles size={12} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 6 }} />
                      <Text style={styles.detectedText}>
                        {activeProp.name} Detected
                      </Text>
                    </View>
                  ) : (
                    <View style={{ height: 28 }} /> // Spacer to prevent layout jump
                  )}
                </View>

                {/* Username Input (Pill Style) */}
                <View style={[styles.inputWrapper, isUserFocused && styles.inputWrapperFocused]}>
                  <UserRound color={isUserFocused ? activeProp.color : '#94A3B8'} size={20} style={styles.inputIcon} strokeWidth={2.5} />
                  <TextInput
                    style={[styles.input, { color: activeProp.color }]}
                    placeholder="Admin Username"
                    placeholderTextColor="#94A3B8"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setIsUserFocused(true)}
                    onBlur={() => setIsUserFocused(false)}
                  />
                </View>

                {/* Password Input (Pill Style) */}
                <View style={[styles.inputWrapper, isPassFocused && styles.inputWrapperFocused]}>
                  <Lock color={isPassFocused ? activeProp.color : '#94A3B8'} size={20} style={styles.inputIcon} strokeWidth={2.5} />
                  <TextInput
                    style={[styles.input, { color: activeProp.color }]}
                    placeholder="Password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    onFocus={() => setIsPassFocused(true)}
                    onBlur={() => setIsPassFocused(false)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn} activeOpacity={0.7}>
                    {showPassword ? (
                      <EyeOff size={20} color={isPassFocused ? activeProp.color : '#94A3B8'} strokeWidth={2.5} />
                    ) : (
                      <Eye size={20} color={isPassFocused ? activeProp.color : '#94A3B8'} strokeWidth={2.5} />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Recover password?</Text>
                </TouchableOpacity>

                {/* Dynamic Action Button (Pill Style) */}
                <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 8 }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleLogin}
                    style={styles.loginBtn}
                  >
                    <Text style={[styles.loginBtnText, { color: activeProp.color }]}>Secure Sign In</Text>
                  </TouchableOpacity>
                </Animated.View>

              </View>

            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2962FF', // Base fallback
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  /* --- TOP BAR --- */
  topBar: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    height: 60,
    justifyContent: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  /* --- 3D ISOMETRIC GRAPHIC --- */
  graphicContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
  },
  pedestalShadow: {
    width: 160,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 100,
    position: 'absolute',
    bottom: 10,
    transform: [{ scaleY: 0.5 }],
  },
  pedestalBody: {
    width: 140,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Adapts to any bg color
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    position: 'absolute',
    bottom: 30,
  },
  pedestalTop: {
    width: 140,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 70,
    position: 'absolute',
    bottom: 80,
  },
  floatingShield: {
    position: 'absolute',
    bottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  shieldInner: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '12deg' }, { skewX: '5deg' }], // Matches the Neo-Brutalism vibe
  },

  /* --- TYPOGRAPHY --- */
  textContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeDesc: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  /* --- FORM CONTAINER --- */
  formContainer: {
    paddingHorizontal: 24,
  },
  badgeRow: {
    alignItems: 'center',
    marginBottom: 16,
    height: 28,
  },
  detectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  detectedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  /* Inputs aligned to Welcome Screen "Continue" Button */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 32, // Pill shape
    height: 64,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputWrapperFocused: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '700',
  },
  eyeBtn: {
    padding: 8,
    marginRight: -8,
  },

  /* --- FORGOT PASSWORD --- */
  forgotBtn: {
    alignSelf: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.9,
  },

  /* --- ACTION BUTTON --- */
  loginBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 32, // Pill shape
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});