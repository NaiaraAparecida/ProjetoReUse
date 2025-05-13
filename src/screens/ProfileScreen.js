import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({ name: '', email: '', avatar: null });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Sucesso', 'Perfil atualizado!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Image 
            source={user.avatar ? { uri: user.avatar } : require('../../assets/reciclagem.jpg')} 
            style={styles.avatar} 
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name || 'Seu Nome'}</Text>
        <Text style={styles.userEmail}>{user.email || 'Seu Email'}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Editar Perfil</Text>

        <TextInput 
          value={user.name} 
          onChangeText={(text) => setUser({ ...user, name: text })} 
          style={styles.input} 
          placeholder="Nome"
          editable={editing}
        />
        <TextInput 
          value={user.email} 
          style={styles.input} 
          placeholder="Email"
          editable={false}
        />

        {editing ? (
          <CustomButton title="Salvar" onPress={handleSave} />
        ) : (
          <CustomButton title="Editar Perfil" onPress={() => setEditing(true)} />
        )}

        <CustomButton title="Sair" onPress={handleLogout} backgroundColor="#FF5252" />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 24,
    alignItems: 'center',
    marginTop: 20, // Evita que o texto fique grudado na câmera

    
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#E0E0E0',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
  },
});








