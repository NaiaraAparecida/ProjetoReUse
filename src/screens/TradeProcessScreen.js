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
      const parsedTrades = storedTrades ? JSON.parse(storedTrades) : [];
      setTrades(parsedTrades);
    } catch (error) {
      console.error('Erro ao carregar trocas:', error);
    }
  };

  const updateTradeStatus = async (id, status) => {
    try {
      const updatedTrades = trades.map((trade) =>
        trade.id === id ? { ...trade, status } : trade
      );
      setTrades(updatedTrades);
      await AsyncStorage.setItem('trades', JSON.stringify(updatedTrades));
    } catch (error) {
      console.error('Erro ao atualizar status da troca:', error);
    }
  };

  const handleAccept = (id) => {
    Alert.alert('Confirmar', 'Deseja aceitar essa troca?', [
      { text: 'Sim', onPress: () => updateTradeStatus(id, 'aceita') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleReject = (id) => {
    Alert.alert('Confirmar', 'Deseja recusar essa troca?', [
      { text: 'Sim', onPress: () => updateTradeStatus(id, 'recusada') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const renderTrade = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.status}>Status: {item.status || "Pendente"}</Text>
        <View style={styles.actions}>
          {!item.status && (
            <>
              <TouchableOpacity style={styles.accept} onPress={() => handleAccept(item.id)}>
                <Text style={styles.actionText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reject} onPress={() => handleReject(item.id)}>
                <Text style={styles.actionText}>Recusar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processo de Troca</Text>

      <FlatList
        data={trades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrade}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma troca disponível.</Text>}
      />
    </View>
  );
};

export default TradeProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 20, // Evita que o texto fique grudado na câmera

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4CAF50',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  accept: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  reject: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});



