import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Telas
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
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 8,
          height: 65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Items':
              iconName = 'list';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'AddItem':
              iconName = 'add-circle';
              break;
            case 'Trade':
              iconName = 'swap-horizontal';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? size + 6 : size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Items" component={ItemsScreen} options={{ title: 'Itens' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Tab.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{ title: 'Adicionar' }}
      />
      <Tab.Screen
        name="Trade"
        component={TradeProcessScreen}
        options={{ title: 'Trocas' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configurações' ,
        tabBarLabel: 'Config.',
        }}
      />
    </Tab.Navigator>
  );
}
