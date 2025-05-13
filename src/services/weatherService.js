import * as Location from 'expo-location';

const API_KEY = '187bee357f13577949f7ec3ce2a8ed02';

export const getCurrentWeather = async () => {
  try {
    // Verificando permissão de localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permissão de localização negada. Verifique as configurações de permissão do aplicativo.');
    }

    // Obtendo localização atual
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });
    const { latitude, longitude } = location.coords;

    // Fazendo a requisição para a API da OpenWeather
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${API_KEY}`
    );

    const data = await response.json();

    // Verificando se a resposta da API é válida
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao obter o clima. Verifique sua chave de API.');
    }

    // Retornando o clima formatado
    return {
      cidade: data.name || 'Local desconhecido',
      temperatura: data.main?.temp ? `${Math.round(data.main.temp)}°C` : 'N/A',
      descricao: data.weather?.[0]?.description || 'Não disponível',
      icone: data.weather?.[0]?.icon
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        : null,
    };
  } catch (error) {
    // Exibindo mensagem clara de erro
    console.warn('Erro ao obter clima:', error.message);
    return {
      cidade: 'Erro',
      temperatura: 'N/A',
      descricao: error.message.includes('API key') ? 'Chave de API inválida' : 'Erro ao obter clima',
      icone: null,
    };
  }
};


