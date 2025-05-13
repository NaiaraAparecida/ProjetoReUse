import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        Alert.alert('Erro', 'Este email já está cadastrado.');
      } else {
        const newUser = { name, email, password };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/reciclagem.jpg')} style={styles.logo} />
        <Text style={styles.logoText}>ReUse</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar Conta</Text>

        <InputField 
          placeholder="Digite seu nome" 
          value={name} 
          onChangeText={setName} 
        />
        <InputField 
          placeholder="Digite seu email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
        <InputField 
          placeholder="Digite sua senha" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />

        <CustomButton 
          title={loading ? <ActivityIndicator color="#FFF" /> : "Cadastrar"} 
          onPress={handleRegister} 
          disabled={loading}
        />

        <Text 
          style={styles.loginText} 
          onPress={() => navigation.navigate('Login')}
        >
          Já tem uma conta? Entrar
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  formContainer: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '500',
  },
});






