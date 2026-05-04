import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

// Owner Screens
import PortfolioDashboard from '../screens/Owner/PortfolioDashboard';
import OwnerBookings from '../screens/Owner/OwnerBookings';
import OwnerFinance from '../screens/Owner/OwnerFinance';
import OwnerLedger from '../screens/Owner/OwnerLedger';
import OwnerInsights from '../screens/Owner/OwnerInsights';
import OwnerSettings from '../screens/Owner/OwnerSettings';
import OwnerMaintenance from '../screens/Owner/OwnerMaintenance';
import OwnerAccount from '../screens/Owner/OwnerAccount';
import OwnerDetail from '../screens/Owner/OwnerDetail';

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
import ReineGuestHistory from '../screens/Reine/ReineGuestHistory';
import ReineGuestDetails from '../screens/Reine/ReineGuestDetails';

// Casa Screens
import CasaHome from '../screens/Casa/CasaHome';
import CasaBookings from '../screens/Casa/CasaBookings';
import CasaGuestMgmt from '../screens/Casa/CasaGuestMgmt';
import CasaFinance from '../screens/Casa/CasaFinance';
import CasaAdmin from '../screens/Casa/CasaAdmin';
import CasaGuestHistory from '../screens/Casa/CasaGuestHistory';

// Generic Screens
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Owner Portfolio Stack */}
      <Stack.Screen name="OwnerDashboard" component={PortfolioDashboard} />
      <Stack.Screen name="OwnerBookings" component={OwnerBookings} />
      <Stack.Screen name="OwnerFinance" component={OwnerFinance} />
      <Stack.Screen name="OwnerLedger" component={OwnerLedger} />
      <Stack.Screen name="OwnerInsights" component={OwnerInsights} />
      <Stack.Screen name="OwnerSettings" component={OwnerSettings} />
      <Stack.Screen name="OwnerMaintenance" component={OwnerMaintenance} />
      <Stack.Screen name="OwnerAccount" component={OwnerAccount} />
      <Stack.Screen name="OwnerDetail" component={OwnerDetail} />
      <Stack.Screen name="OwnerNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Owner' }} />

      {/* Ryu Property Stack */}
      <Stack.Screen name="RyuHome" component={RyuHome} />
      <Stack.Screen name="RyuBookings" component={RyuBookings} />
      <Stack.Screen name="RyuGuestMgmt" component={RyuGuestMgmt} />
      <Stack.Screen name="RyuFinance" component={RyuFinance} />
      <Stack.Screen name="RyuAdmin" component={RyuAdmin} />
      <Stack.Screen name="RyuGuestHistory" component={RyuGuestHistory} />
      <Stack.Screen name="RyuSettings" component={RyuSettings} />
      <Stack.Screen name="RyuNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Ryu' }} />

      {/* Reine Property Stack */}
      <Stack.Screen name="ReineHome" component={ReineHome} />
      <Stack.Screen name="ReineBookings" component={ReineBookings} />
      <Stack.Screen name="ReineGuestMgmt" component={ReineGuestMgmt} />
      <Stack.Screen name="ReineFinance" component={ReineFinance} />
      <Stack.Screen name="ReineAdmin" component={ReineAdmin} />
      <Stack.Screen name="ReineGuestHistory" component={ReineGuestHistory} />
      <Stack.Screen name="ReineGuestDetails" component={ReineGuestDetails} />
      <Stack.Screen name="ReineNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Reine' }} />

      {/* Casa Property Stack */}
      <Stack.Screen name="CasaHome" component={CasaHome} />
      <Stack.Screen name="CasaBookings" component={CasaBookings} />
      <Stack.Screen name="CasaGuestMgmt" component={CasaGuestMgmt} />
      <Stack.Screen name="CasaFinance" component={CasaFinance} />
      <Stack.Screen name="CasaAdmin" component={CasaAdmin} />
      <Stack.Screen name="CasaGuestHistory" component={CasaGuestHistory} />
      <Stack.Screen name="CasaNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Casa' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;