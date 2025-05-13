import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'eco_tip';

export const fetchEcoTip = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    const tip = `${data.content} — ${data.author}`;
    await AsyncStorage.setItem(CACHE_KEY, tip);
    return tip;
  } catch (error) {
    console.warn('Erro ao buscar dica, carregando cache:', error.message);
    const cachedTip = await AsyncStorage.getItem(CACHE_KEY);
    return cachedTip || 'Reduza, Reuse, Recicle!';
  }
};
