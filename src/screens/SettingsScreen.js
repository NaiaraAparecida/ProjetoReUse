import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import CustomButton from '../components/CustomButton';

const SettingsScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || 'Usuário');
      }
    } catch (error) {
      console.log('Erro ao carregar usuário:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Deslogado', 'Você saiu do aplicativo.');
    navigation.replace('Login');
  };

  const handleClearItems = async () => {
    try {
      await AsyncStorage.removeItem('items');
      Alert.alert('Sucesso', 'Todos os itens foram apagados.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar os itens.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo + Título */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subTitle}>Bem-vindo, {userName}</Text>
      </View>

      {/* Ações */}
      <CustomButton
        title="Editar Perfil"
        onPress={() => navigation.navigate('Profile')}
      />

      <CustomButton
        title="Limpar Itens Cadastrados"
        onPress={handleClearItems}
        backgroundColor="#FFB300"
      />

      <CustomButton
        title="Sair"
        onPress={handleLogout}
        backgroundColor="#FF5252"
      />

      {/* Versão do app */}
      <Text style={styles.version}>
        Versão {Constants.expoConfig?.version || '1.0.0'}
      </Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 6,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  version: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 13,
    color: '#888',
  },
});


