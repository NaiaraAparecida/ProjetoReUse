import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  try {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) throw new Error('Credenciais inválidas');

    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

export const isLoggedIn = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return !!user;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};


