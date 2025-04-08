import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Preencha todos os campos.');
      return;
    }

    // Aqui você pode usar login() e saveToken/saveUserData (se já configurado)
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      {/* Logo e Nome */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>ReUse</Text>
      </View>

      {/* Entrar */}
      <View style={styles.loginBox}>
        <Text style={styles.title}>Entrar</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        <InputField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <CustomButton title="Login" onPress={handleLogin} />

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
  loginBox: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  registerText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '500',
  },
});
