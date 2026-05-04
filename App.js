import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { BookingProvider } from './src/context/BookingContext';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold
} from '@expo-google-fonts/manrope';
import { mockDb } from './src/services/mockDb';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need here
        await Font.loadAsync({
          'Manrope-Regular': Manrope_400Regular,
          'Manrope-Medium': Manrope_500Medium,
          'Manrope-SemiBold': Manrope_600SemiBold,
          'Manrope-Bold': Manrope_700Bold,
          'Manrope-ExtraBold': Manrope_800ExtraBold,
        });

        // Seed presentation data
        await mockDb.seedPresentationData();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we need this to happen
      // in a specific component, we can pass it down.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <BookingProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <AppNavigator />
      </NavigationContainer>
    </BookingProvider>
  );
}
