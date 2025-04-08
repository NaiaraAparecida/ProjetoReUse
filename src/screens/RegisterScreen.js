import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Preencha todos os campos.');
      return;
    }

    // Simulação de cadastro
    alert('Conta criada com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Logo e nome */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>ReUse</Text>
      </View>

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar Conta</Text>

        <InputField
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
        />
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

        <CustomButton title="Cadastrar" onPress={handleRegister} />

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
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '500',
  },
});
