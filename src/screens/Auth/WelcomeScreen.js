import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Easing,
  Platform,
  ScrollView,
  PanResponder
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, ChevronsRight, ShieldCheck, BarChart3, Building } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Safely calculate dimensions for both mobile and web
const { width: windowWidth, height } = Dimensions.get('window');
// Cap the width at 420px on the web to match the phone shell in _layout.tsx
const activeWidth = Platform.OS === 'web' ? 420 : windowWidth;

// Vibrant Modern Blue matching the reference image
const COLORS = {
  background: '#2962FF',   // Deep vibrant blue
  surfaceLight: '#5C8BFF', // Lighter blue for 3D tops
  surfaceDark: '#1A40CC',  // Darker blue for 3D sides
  cardBg: '#FF9800',       // Vibrant Orange for the floating card
  coinBg: '#FCD34D',       // Gold for coins
  coinFace: '#F59E0B',     // Darker gold face
  textMain: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.75)',
};

const SLIDES = [
  {
    id: '1',
    title: 'Manage properties\nwith pure elegance',
    subtitle: 'Keep all your resort operations in one place with effortless syncing across your entire portfolio.',
  },
  {
    id: '2',
    title: 'Keep your budget\non track with smart\nanalytics',
    subtitle: 'Get a clear view of your spendings and revenues, know exactly where your money is going.',
  },
  {
    id: '3',
    title: 'Elevate your guest\nexperience today',
    subtitle: 'Seamless bookings, instant communications, and priority maintenance logs in the palm of your hand.',
  }
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Intro Fade
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Floating Animations
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;

  // Swipe-to-Login Animations
  const pan = useRef(new Animated.ValueXY()).current;
  // Use activeWidth here so the swipe doesn't stretch across a whole desktop monitor
  const swipeThreshold = activeWidth - 116;

  useEffect(() => {
    // Fade in screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Continuous floating loops for 3D elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, { toValue: -15, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatAnim1, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, { toValue: 10, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatAnim2, { toValue: -5, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Pan Responder for Swipe-to-Login
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        if (gesture.dx > 0 && gesture.dx <= swipeThreshold) {
          pan.setValue({ x: gesture.dx, y: 0 });
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > swipeThreshold * 0.75) {
          // Success! Swipe completed.
          Animated.spring(pan, {
            toValue: { x: swipeThreshold, y: 0 },
            useNativeDriver: true,
          }).start(() => proceedToLogin());
        } else {
          // Snap back if not swiped far enough
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      }
    })
  ).current;

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentIndex(Math.round(index));
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      // Use activeWidth here to scroll the correct distance
      scrollViewRef.current.scrollTo({ x: (currentIndex + 1) * activeWidth, animated: true });
    }
  };

  const proceedToLogin = () => {
    navigation.replace('Login');
  };

  // --------------------------------------------------------
  // CUSTOM 3D GRAPHICS (CSS-Based)
  // --------------------------------------------------------

  const renderGraphic1 = () => (
    <View style={styles.graphicBox}>
      {/* Base */}
      <View style={styles.pedestalShadow} />
      <View style={[styles.pedestalBody, { height: 60, bottom: 40 }]} />
      <View style={[styles.pedestalTop, { bottom: 100 }]} />
      {/* Floating Elements */}
      <Animated.View style={[styles.floatingCard, { transform: [{ translateY: floatAnim1 }, { rotate: '-15deg' }, { skewX: '10deg' }] }]}>
        <View style={styles.cardChip} />
      </Animated.View>
      <Animated.View style={[styles.floatingBox, { right: 20, bottom: 70, transform: [{ translateY: floatAnim2 }] }]}>
        <Building size={32} color="#FFFFFF" strokeWidth={1.5} />
      </Animated.View>
    </View>
  );

  const renderGraphic2 = () => (
    <View style={styles.graphicBox}>
      {/* Cylindrical Base */}
      <View style={styles.pedestalShadow} />
      <View style={styles.pedestalBody} />
      <View style={styles.pedestalTop} />
      {/* Secondary Block */}
      <View style={styles.blockBody} />
      <View style={styles.blockTop} />
      {/* Floating Coin & Data */}
      <Animated.View style={[styles.floatingCoin, { transform: [{ translateY: floatAnim1 }] }]}>
        <View style={styles.coinInner} />
      </Animated.View>
      <Animated.View style={[styles.floatingBox, { backgroundColor: COLORS.surfaceLight, left: 40, top: 40, transform: [{ translateY: floatAnim2 }] }]}>
        <BarChart3 size={32} color={COLORS.surfaceDark} strokeWidth={2} />
      </Animated.View>
    </View>
  );

  const renderGraphic3 = () => (
    <View style={styles.graphicBox}>
      {/* Split Base */}
      <View style={styles.pedestalShadow} />
      <View style={[styles.pedestalBody, { width: 140, left: 40, borderBottomRightRadius: 20 }]} />
      <View style={[styles.pedestalTop, { width: 140, left: 40 }]} />
      <View style={[styles.blockBody, { height: 80, bottom: 20, right: 60 }]} />
      <View style={[styles.blockTop, { bottom: 100, right: 60 }]} />

      {/* Floating Shield */}
      <Animated.View style={[styles.floatingShield, { transform: [{ translateY: floatAnim1 }] }]}>
        <ShieldCheck size={48} color="#FFFFFF" strokeWidth={2} />
      </Animated.View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>

          {/* --- TOP BAR --- */}
          <View style={styles.topBar}>
            <View style={styles.pagination}>
              {SLIDES.map((_, i) => (
                <View key={i} style={[styles.dot, currentIndex === i && styles.dotActive]} />
              ))}
            </View>

            <TouchableOpacity
              style={styles.skipButton}
              activeOpacity={0.7}
              onPress={proceedToLogin}
            >
              <Text style={styles.skipText}>Skip</Text>
              <ChevronRight size={16} color="#FFFFFF" strokeWidth={3} />
            </TouchableOpacity>
          </View>

          {/* --- HORIZONTAL CAROUSEL --- */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            style={styles.scrollView}
          >
            {SLIDES.map((slide, index) => (
              <View key={slide.id} style={[styles.slide, { width: activeWidth }]}>

                {/* Text Content */}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.subtitle}>{slide.subtitle}</Text>
                </View>

                {/* Graphics */}
                <View style={styles.graphicContainer}>
                  {index === 0 && renderGraphic1()}
                  {index === 1 && renderGraphic2()}
                  {index === 2 && renderGraphic3()}
                </View>

              </View>
            ))}
          </ScrollView>

          {/* --- BOTTOM ACTIONS --- */}
          <View style={styles.actionContainer}>
            {currentIndex < 2 ? (
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.85}
                onPress={handleNext}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              // --- CUSTOM SWIPE-TO-LOGIN BUTTON ---
              <View style={styles.swipeTrack}>
                <Text style={styles.swipeText}>Scroll to login</Text>
                <View style={styles.swipeArrows}>
                  <ChevronsRight size={24} color={COLORS.textMuted} strokeWidth={2} />
                </View>
                <Animated.View
                  {...panResponder.panHandlers}
                  style={[
                    styles.swipeThumb,
                    { transform: [{ translateX: pan.x }] }
                  ]}
                >
                  <ChevronRight size={28} color="#FFFFFF" strokeWidth={3} />
                </Animated.View>
              </View>
            )}
          </View>

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 10 : 24,
  },

  /* --- TOP BAR --- */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: Platform.OS === 'android' ? 20 : 10,
    height: 44,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 2,
  },

  /* --- SLIDES --- */
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textMain,
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },

  /* --- 3D GRAPHICS --- */
  graphicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 320,
  },
  graphicBox: {
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  // Pedestal Core
  pedestalShadow: {
    width: 200,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    transform: [{ scaleY: 0.5 }],
  },
  pedestalBody: {
    width: 160,
    height: 100,
    backgroundColor: COLORS.surfaceDark,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    position: 'absolute',
    bottom: 50,
  },
  pedestalTop: {
    width: 160,
    height: 50,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 80,
    position: 'absolute',
    bottom: 150,
  },

  // Blocks
  blockBody: {
    width: 70,
    height: 50,
    backgroundColor: '#1E40AF',
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderBottomRightRadius: 16,
  },
  blockTop: {
    width: 70,
    height: 35,
    backgroundColor: '#60A5FA',
    position: 'absolute',
    bottom: 90,
    right: 40,
    transform: [{ skewX: '-45deg' }],
  },

  // Floating Assets
  floatingCard: {
    width: 120,
    height: 75,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    position: 'absolute',
    top: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: -10, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  cardChip: {
    width: 20,
    height: 14,
    backgroundColor: '#FDE68A',
    borderRadius: 4,
    opacity: 0.8,
  },
  floatingCoin: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.coinBg,
    position: 'absolute',
    left: 20,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  coinInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.coinFace,
  },
  floatingBox: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -8, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ rotate: '10deg' }],
  },
  floatingShield: {
    position: 'absolute',
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },

  /* --- BOTTOM ACTIONS --- */
  actionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  continueButton: {
    width: '100%',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.background,
  },

  /* --- SWIPE TO LOGIN BUTTON --- */
  swipeTrack: {
    width: '100%',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.background,
    position: 'absolute',
    zIndex: 1,
  },
  swipeArrows: {
    position: 'absolute',
    right: 24,
    zIndex: 1,
  },
  swipeThumb: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 6,
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
