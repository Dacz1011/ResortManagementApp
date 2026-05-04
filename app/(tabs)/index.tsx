import React from 'react';
// Relative path to your custom welcome screen
import WelcomeScreen from '../../src/screens/Auth/WelcomeScreen';

/**
 * Main Entry Point
 * This file tells Expo Router to display your WelcomeScreen
 * as the first thing a user sees.
 */
export default function Index() {
  return (
    <WelcomeScreen />
  );
}