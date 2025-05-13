import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ItemsScreen from '../screens/ItemsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddItemScreen from '../screens/AddItemScreen';
import TradeProcessScreen from '../screens/TradeProcessScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Items: 'list',
            Profile: 'person',
            AddItem: 'add-circle',
            Trade: 'swap-horizontal',
            Settings: 'settings',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Items" component={ItemsScreen} options={{ title: 'Itens' }} />
      <Tab.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Adicionar' }} />
      <Tab.Screen name="Trade" component={TradeProcessScreen} options={{ title: 'Trocas' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Tab.Navigator>
  );
}




