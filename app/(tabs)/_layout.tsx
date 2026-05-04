import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';

/**
 * Root Layout
 * Optimized for both Native (Android/iOS) and Web (Vercel).
 * This layout ensures a mobile-responsive "phone shell" view on desktop browsers.
 */
export default function RootLayout() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    // Darker background to contrast with the phone shell
    backgroundColor: '#121212',
    ...Platform.select({
      web: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    // Platform specific constraints to mimic a phone
    ...Platform.select({
      web: {
        maxWidth: 420,
        maxHeight: 850,
        borderRadius: 40,
        overflow: 'hidden',
        // Shadow to give it elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 40,
        elevation: 20,
        marginVertical: 40,
        // Optional: Adding a subtle border to mimic phone edges
        borderWidth: 8,
        borderColor: '#1e1e1e',
      },
      default: {
        maxWidth: '100%',
      }
    }),
  },
});
