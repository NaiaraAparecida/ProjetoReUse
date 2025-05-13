import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

const SettingsScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('Usuário');
  const [email, setEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || 'Usuário');
        setEmail(user.email || '');
        setUserAvatar(user.avatar || null);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const handleClearItems = async () => {
    await AsyncStorage.removeItem('items');
    Alert.alert('Sucesso', 'Todos os itens foram apagados.');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Você deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={userAvatar ? { uri: userAvatar } : require('../../assets/reciclagem.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        <CustomButton 
          title="Editar Perfil" 
          onPress={() => navigation.navigate('Profile')} 
        />
        <CustomButton 
          title="Limpar Itens Cadastrados" 
          onPress={handleClearItems} 
          backgroundColor="#FFB300" 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Aplicativo</Text>
        <Text style={styles.infoText}>Versão: 1.0.0</Text>
        <Text style={styles.infoText}>Desenvolvido por: ReUse Team</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <CustomButton 
          title="Sair" 
          onPress={handleLogout} 
          backgroundColor="#FF5252" 
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});











