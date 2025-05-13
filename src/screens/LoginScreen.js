import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { login } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (error) {
      console.error('Erro de Login:', error);
      Alert.alert('Erro', 'Erro de rede. Verifique sua conexão.');
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
        <Text style={styles.title}>Entrar</Text>

        <InputField 
          placeholder="Digite seu email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          style={styles.input}
        />
        <InputField 
          placeholder="Digite sua senha" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={styles.input}
        />

        <CustomButton 
          title={loading ? <ActivityIndicator color="#FFF" /> : "Login"} 
          onPress={handleLogin} 
          disabled={loading}
        />

        <Text 
          style={styles.registerText} 
          onPress={() => navigation.navigate('Register')}
        >
          Não tem uma conta? Cadastre-se
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
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
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '500',
    fontSize: 16,
  },
});





