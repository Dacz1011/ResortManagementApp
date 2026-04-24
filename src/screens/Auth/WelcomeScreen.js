import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Easing,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// The targeted text to animate
const TEXT = "Welcome, Admin";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Master fade for the whole screen (used for the final exit transition)
  const containerOpacity = useRef(new Animated.Value(1)).current;

  // Intro animations
  const iconAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;

  // Array of animated values for each individual letter to "build" the word
  const animatedValues = useRef(
    Array.from({ length: TEXT.length }).map(() => new Animated.Value(0))
  ).current;

  // Ambient background animation values
  const glowAnim1 = useRef(new Animated.Value(0)).current;
  const glowAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Start subtle background ambient glows representing the portfolio
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim1, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim1, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim2, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim2, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();

    // 2. Sequence for the main UI elements
    Animated.sequence([
      // Fade in the top icon ring
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Fade in the brand subtitle
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();

    // 3. Staggered text animation (Builds the word letter by letter)
    const textAnimations = animatedValues.map((val) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 800, // Smooth, deliberate reveal
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );

    // Start building the letters shortly after the icon starts appearing
    setTimeout(() => {
      Animated.stagger(60, textAnimations).start(() => {

        // Expand the sleek bottom line once text is fully built
        Animated.timing(lineAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false, // width interpolation doesn't support native driver
        }).start();

        // 4. Hold the fully built view on screen, then fade out and transition
        setTimeout(() => {
          Animated.timing(containerOpacity, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }).start(() => skipToLogin());
        }, 1600);

      });
    }, 800);

  }, []);

  // Function to safely navigate and prevent going back to this screen
  const skipToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={skipToLogin} // Tap anywhere to skip immediately
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" translucent={true} />

      <Animated.View style={[styles.wrapper, { opacity: containerOpacity }]}>

        {/* Decorative Ambient Background Glows (Portfolio Colors) */}
        <Animated.View
          style={[
            styles.glow,
            styles.glow1,
            {
              opacity: glowAnim1.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.25] }),
              transform: [{ scale: glowAnim1.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) }]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.glow,
            styles.glow2,
            {
              opacity: glowAnim2.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.2] }),
              transform: [{ scale: glowAnim2.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.4] }) }]
            }
          ]}
        />

        <View style={styles.contentContainer}>
          {/* Glassmorphic Premium Icon Reveal */}
          <Animated.View
            style={[
              styles.iconRing,
              {
                opacity: iconAnim,
                transform: [
                  { translateY: iconAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
                  { scale: iconAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }
                ],
              }
            ]}
          >
            <ShieldCheck size={36} color="#FFFFFF" strokeWidth={1.5} />
          </Animated.View>

          {/* Brand Subtitle */}
          <Animated.Text
            style={[
              styles.brandSubtitle,
              {
                opacity: subtitleAnim,
                transform: [
                  { translateY: subtitleAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }
                ]
              }
            ]}
          >
            RESORT PORTFOLIO
          </Animated.Text>

          {/* Staggered Main Text */}
          <View style={styles.textContainer}>
            {TEXT.split('').map((char, index) => {
              const opacity = animatedValues[index];

              // Interpolate a subtle slide up to mimic the text "materializing"
              const translateY = animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [15, 0]
              });

              return (
                <Animated.Text
                  key={index}
                  style={[
                    styles.greetingText,
                    {
                      opacity: opacity,
                      transform: [{ translateY }]
                    },
                    // Design touch: Give "Admin" a bolder weight and crisp white color
                    index > 8 ? styles.textBold : styles.textThin
                  ]}
                >
                  {char === ' ' ? '\u00A0' : char}
                </Animated.Text>
              );
            })}
          </View>

          {/* Decorative Expanding Line */}
          <Animated.View
            style={[
              styles.decorativeLine,
              {
                width: lineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '60%']
                }),
                opacity: lineAnim
              }
            ]}
          />
        </View>

      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep elegant slate matching the login portal
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 10,
  },

  /* --- AMBIENT GLOWS --- */
  glow: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    filter: 'blur(100px)', // For web or advanced blur views
  },
  glow1: {
    top: -height * 0.2,
    left: -width * 0.4,
    backgroundColor: '#E64E76', // Reine Pink influence
  },
  glow2: {
    bottom: -height * 0.2,
    right: -width * 0.4,
    backgroundColor: '#2DD4BF', // Teal / Casa influence
  },

  /* --- ICON RING --- */
  iconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  /* --- TYPOGRAPHY --- */
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 40,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
  },
  textThin: {
    color: '#CBD5E1', // Softer white for "Welcome,"
    fontWeight: '200',
  },
  textBold: {
    color: '#FFFFFF', // Crisp white for "Admin"
    fontWeight: '700',
    letterSpacing: 0,
  },

  /* --- DECORATIVE LINE --- */
  decorativeLine: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
    marginTop: 32,
  },
});