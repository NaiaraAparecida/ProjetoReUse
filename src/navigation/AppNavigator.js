import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../components/BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ItemsScreen from '../screens/ItemsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddItemScreen from '../screens/AddItemScreen';
import TradeProcessScreen from '../screens/TradeProcessScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Telas de Autenticação */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Navegação Principal após login */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />

        {/* Telas incluídas no BottomTabNavigator */}
        <Stack.Screen name="Items" component={ItemsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="TradeProcess" component={TradeProcessScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




