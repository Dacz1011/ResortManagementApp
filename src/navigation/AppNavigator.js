import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';

// Owner Screens
import PortfolioDashboard from '../screens/Owner/PortfolioDashboard';
import OwnerBookings from '../screens/Owner/OwnerBookings';
import OwnerFinance from '../screens/Owner/OwnerFinance';
import OwnerLedger from '../screens/Owner/OwnerLedger';
import OwnerInsights from '../screens/Owner/OwnerInsights';
import OwnerSettings from '../screens/Owner/OwnerSettings';

// Ryu Screens
import RyuHome from '../screens/Ryu/RyuHome';
import RyuBookings from '../screens/Ryu/RyuBookings';
import RyuGuestMgmt from '../screens/Ryu/RyuGuestMgmt';
import RyuFinance from '../screens/Ryu/RyuFinance';
import RyuAdmin from '../screens/Ryu/RyuAdmin';
import RyuGuestHistory from '../screens/Ryu/RyuGuestHistory';
import RyuSettings from '../screens/Ryu/RyuSettings';

// Reine Screens
import ReineHome from '../screens/Reine/ReineHome';
import ReineBookings from '../screens/Reine/ReineBookings';
import ReineGuestMgmt from '../screens/Reine/ReineGuestMgmt';
import ReineFinance from '../screens/Reine/ReineFinance';
import ReineAdmin from '../screens/Reine/ReineAdmin';

// Casa Screens
import CasaHome from '../screens/Casa/CasaHome';
import CasaBookings from '../screens/Casa/CasaBookings';
import CasaGuestMgmt from '../screens/Casa/CasaGuestMgmt';
import CasaFinance from '../screens/Casa/CasaFinance';
import CasaAdmin from '../screens/Casa/CasaAdmin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Owner Portfolio Stack */}
      <Stack.Screen name="OwnerDashboard" component={PortfolioDashboard} />
      <Stack.Screen name="OwnerBookings" component={OwnerBookings} />
      <Stack.Screen name="OwnerFinance" component={OwnerFinance} />
      <Stack.Screen name="OwnerLedger" component={OwnerLedger} />
      <Stack.Screen name="OwnerInsights" component={OwnerInsights} />
      <Stack.Screen name="OwnerSettings" component={OwnerSettings} />

      {/* Ryu Property Stack */}
      <Stack.Screen name="RyuHome" component={RyuHome} />
      <Stack.Screen name="RyuBookings" component={RyuBookings} />
      <Stack.Screen name="RyuGuestMgmt" component={RyuGuestMgmt} />
      <Stack.Screen name="RyuFinance" component={RyuFinance} />
      <Stack.Screen name="RyuAdmin" component={RyuAdmin} />
      <Stack.Screen name="RyuGuestHistory" component={RyuGuestHistory} />
      <Stack.Screen name="RyuSettings" component={RyuSettings} />

      {/* Reine Property Stack */}
      <Stack.Screen name="ReineHome" component={ReineHome} />
      <Stack.Screen name="ReineBookings" component={ReineBookings} />
      <Stack.Screen name="ReineGuestMgmt" component={ReineGuestMgmt} />
      <Stack.Screen name="ReineFinance" component={ReineFinance} />
      <Stack.Screen name="ReineAdmin" component={ReineAdmin} />

      {/* Casa Property Stack */}
      <Stack.Screen name="CasaHome" component={CasaHome} />
      <Stack.Screen name="CasaBookings" component={CasaBookings} />
      <Stack.Screen name="CasaGuestMgmt" component={CasaGuestMgmt} />
      <Stack.Screen name="CasaFinance" component={CasaFinance} />
      <Stack.Screen name="CasaAdmin" component={CasaAdmin} />
    </Stack.Navigator>
  );
};

export default AppNavigator;