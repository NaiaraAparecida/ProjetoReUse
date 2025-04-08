import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TradeProcessScreen = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const storedTrades = await AsyncStorage.getItem('trades');
      const parsed = storedTrades ? JSON.parse(storedTrades) : [];
      setTrades(parsed);
    } catch (error) {
      console.error('Erro ao carregar trocas:', error);
    }
  };

  const updateTradeStatus = async (id, status) => {
    try {
      const updatedTrades = trades.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      setTrades(updatedTrades);
      await AsyncStorage.setItem('trades', JSON.stringify(updatedTrades));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleAccept = (id) => {
    Alert.alert('Confirmar', 'Deseja aceitar essa troca?', [
      {
        text: 'Sim',
        onPress: () => {
          updateTradeStatus(id, 'aceita');
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleReject = (id) => {
    Alert.alert('Confirmar', 'Deseja recusar essa troca?', [
      {
        text: 'Sim',
        onPress: () => {
          updateTradeStatus(id, 'recusada');
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const renderTrade = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.category}>Categoria: {item.category}</Text>

        {/* Status */}
        {item.status && (
          <Text
            style={[
              styles.status,
              item.status === 'aceita'
                ? styles.statusAccepted
                : styles.statusRejected,
            ]}
          >
            Status: {item.status}
          </Text>
        )}

        {!item.status && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.accept]}
              onPress={() => handleAccept(item.id)}
            >
              <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.reject]}
              onPress={() => handleReject(item.id)}
            >
              <Text style={styles.buttonText}>Recusar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Processo de Troca</Text>
      </View>

      {trades.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma proposta de troca encontrada.</Text>
      ) : (
        <FlatList
          data={trades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrade}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default TradeProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 6,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#4CAF50',
  },
  reject: {
    backgroundColor: '#FF5252',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusAccepted: {
    color: '#4CAF50',
  },
  statusRejected: {
    color: '#FF5252',
  },
});
