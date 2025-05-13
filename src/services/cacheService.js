import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToCache = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar no cache (${key}):`, error);
  }
};

export const loadFromCache = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Erro ao carregar do cache (${key}):`, error);
    return null;
  }
};

export const clearCache = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar o cache:', error);
  }
};

