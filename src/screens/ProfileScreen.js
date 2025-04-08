import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
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
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Sucesso', 'Dados atualizados!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo ReUse */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>ReUse</Text>
      </View>

      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Image
          source={
            user.avatar
              ? { uri: user.avatar }
              : require('../../assets/perfil.jpg')
          }
          style={styles.avatar}
        />
        <Text style={styles.editPhotoText}>Toque para alterar foto</Text>
      </TouchableOpacity>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          editable={editing}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          style={[styles.input, !editing && styles.disabledInput]}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          editable={editing}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          style={[styles.input, !editing && styles.disabledInput]}
        />

        {editing ? (
          <CustomButton title="Salvar" onPress={handleSave} />
        ) : (
          <CustomButton title="Editar Perfil" onPress={() => setEditing(true)} />
        )}

        <CustomButton
          title="Sair"
          onPress={handleLogout}
          backgroundColor="#FF5252"
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  avatarContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  editPhotoText: {
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  },
  form: {
    width: '100%',
    marginTop: 24,
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#e6e6e6',
    color: '#999',
  },
});


