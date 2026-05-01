import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

// Owner Screens
import OwnerBookings from '../screens/Owner/OwnerBookings';
import OwnerFinance from '../screens/Owner/OwnerFinance';
import OwnerInsights from '../screens/Owner/OwnerInsights';
import OwnerLedger from '../screens/Owner/OwnerLedger';
import OwnerSettings from '../screens/Owner/OwnerSettings';
import PortfolioDashboard from '../screens/Owner/PortfolioDashboard';

// Ryu Screens
import RyuAdmin from '../screens/Ryu/RyuAdmin';
import RyuBookings from '../screens/Ryu/RyuBookings';
import RyuGuestHistory from '../screens/Ryu/RyuGuestHistory';
import RyuGuestMgmt from '../screens/Ryu/RyuGuestMgmt';
import RyuHome from '../screens/Ryu/RyuHome';
import RyuSettings from '../screens/Ryu/RyuSettings';

// Reine Screens
import ReineAdmin from '../screens/Reine/ReineAdmin';
import ReineBookings from '../screens/Reine/ReineBookings';
import ReineGuestDetails from '../screens/Reine/ReineGuestDetails';
import ReineGuestHistory from '../screens/Reine/ReineGuestHistory';
import ReineGuestMgmt from '../screens/Reine/ReineGuestMgmt';
import ReineHome from '../screens/Reine/ReineHome';
import ReinePropertyProfile from '../screens/Reine/ReinePropertyProfile';

// Casa Screens
import CasaAdmin from '../screens/Casa/CasaAdmin';
import CasaBookings from '../screens/Casa/CasaBookings';
import CasaGuestHistory from '../screens/Casa/CasaGuestHistory';
import CasaGuestMgmt from '../screens/Casa/CasaGuestMgmt';
import CasaHome from '../screens/Casa/CasaHome';

// Generic Screens
import NotificationScreen from '../screens/NotificationScreen';
import PropertyFinanceScreen from '../screens/PropertyFinanceScreen';

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

      {/* Ryu Property Stack */}
      <Stack.Screen name="RyuHome" component={RyuHome} />
      <Stack.Screen name="RyuBookings" component={RyuBookings} />
      <Stack.Screen name="RyuGuestMgmt" component={RyuGuestMgmt} />
      <Stack.Screen name="RyuFinance" component={PropertyFinanceScreen} initialParams={{ propertyId: 'Ryu' }} />
      <Stack.Screen name="RyuAdmin" component={RyuAdmin} />
      <Stack.Screen name="RyuGuestHistory" component={RyuGuestHistory} />
      <Stack.Screen name="RyuSettings" component={RyuSettings} />
      <Stack.Screen name="RyuNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Ryu' }} />

      {/* Reine Property Stack */}
      <Stack.Screen name="ReineHome" component={ReineHome} />
      <Stack.Screen name="ReineBookings" component={ReineBookings} />
      <Stack.Screen name="ReineGuestMgmt" component={ReineGuestMgmt} />
      <Stack.Screen name="ReineFinance" component={PropertyFinanceScreen} initialParams={{ propertyId: 'Reine' }} />
      <Stack.Screen name="ReineAdmin" component={ReineAdmin} />
      <Stack.Screen name="ReineGuestHistory" component={ReineGuestHistory} />
      <Stack.Screen name="ReineGuestDetails" component={ReineGuestDetails} />
      <Stack.Screen name="ReineNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Reine' }} />
      <Stack.Screen name="ReinePropertyProfile" component={ReinePropertyProfile} />

      {/* Casa Property Stack */}
      <Stack.Screen name="CasaHome" component={CasaHome} />
      <Stack.Screen name="CasaBookings" component={CasaBookings} />
      <Stack.Screen name="CasaGuestMgmt" component={CasaGuestMgmt} />
      <Stack.Screen name="CasaFinance" component={PropertyFinanceScreen} initialParams={{ propertyId: 'Casa' }} />
      <Stack.Screen name="CasaAdmin" component={CasaAdmin} />
      <Stack.Screen name="CasaGuestHistory" component={CasaGuestHistory} />
      <Stack.Screen name="CasaNotifications" component={NotificationScreen} initialParams={{ propertyId: 'Casa' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;