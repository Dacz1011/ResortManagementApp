import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

import OwnerBookings from '../screens/Owner/OwnerBookings';
import OwnerFinance from '../screens/Owner/OwnerFinance';
import OwnerInsights from '../screens/Owner/OwnerInsights';
import OwnerLedger from '../screens/Owner/OwnerLedger';
import OwnerSettings from '../screens/Owner/OwnerSettings';
import PortfolioDashboard from '../screens/Owner/PortfolioDashboard';

import RyuAdmin from '../screens/Ryu/RyuAdmin';
import RyuBookings from '../screens/Ryu/RyuBookings';
import RyuFinance from '../screens/Ryu/RyuFinance';
import RyuGuestHistory from '../screens/Ryu/RyuGuestHistory';
import RyuGuestMgmt from '../screens/Ryu/RyuGuestMgmt';
import RyuHome from '../screens/Ryu/RyuHome';

import ReineAdmin from '../screens/Reine/ReineAdmin';
import ReineBookings from '../screens/Reine/ReineBookings';
import ReineFinance from '../screens/Reine/ReineFinance';
import ReineGuestHistory from '../screens/Reine/ReineGuestHistory';
import ReineGuestMgmt from '../screens/Reine/ReineGuestMgmt';
import ReineHome from '../screens/Reine/ReineHome';

import CasaAdmin from '../screens/Casa/CasaAdmin';
import CasaBookings from '../screens/Casa/CasaBookings';
import CasaFinance from '../screens/Casa/CasaFinance';
import CasaGuestHistory from '../screens/Casa/CasaGuestHistory';
import CasaGuestMgmt from '../screens/Casa/CasaGuestMgmt';
import CasaHome from '../screens/Casa/CasaHome';

import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="OwnerDashboard" component={PortfolioDashboard} />
      <Stack.Screen name="OwnerBookings" component={OwnerBookings} />
      <Stack.Screen name="OwnerFinance" component={OwnerFinance} />
      <Stack.Screen name="OwnerLedger" component={OwnerLedger} />
      <Stack.Screen name="OwnerInsights" component={OwnerInsights} />
      <Stack.Screen name="OwnerSettings" component={OwnerSettings} />

      <Stack.Screen name="RyuHome" component={RyuHome} />
      <Stack.Screen name="RyuBookings" component={RyuBookings} />
      <Stack.Screen name="RyuGuestMgmt" component={RyuGuestMgmt} />
      <Stack.Screen name="RyuFinance" component={RyuFinance} />
      <Stack.Screen name="RyuAdmin" component={RyuAdmin} />
      <Stack.Screen name="RyuGuestHistory" component={RyuGuestHistory} />
      <Stack.Screen name="RyuNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Ryu' }} />

      <Stack.Screen name="ReineHome" component={ReineHome} />
      <Stack.Screen name="ReineBookings" component={ReineBookings} />
      <Stack.Screen name="ReineGuestMgmt" component={ReineGuestMgmt} />
      <Stack.Screen name="ReineFinance" component={ReineFinance} />
      <Stack.Screen name="ReineAdmin" component={ReineAdmin} />
      <Stack.Screen name="ReineGuestHistory" component={ReineGuestHistory} />
      <Stack.Screen name="ReineNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Reine' }} />

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