import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/ItemCard';
import { getCurrentWeather } from '../services/weatherService';
import { Ionicons } from '@expo/vector-icons';

const ItemsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadItems();
    fetchWeather();
  }, []);

  useEffect(() => {
    filterItems();
  }, [search, items]);

  const fetchWeather = async () => {
    const data = await getCurrentWeather();
    setWeather(data);
  };

  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    setItems(parsedItems);
  };

  const filterItems = () => {
    const results = items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Itens Disponíveis</Text>
        {weather && (
          <View style={styles.weatherContainer}>
            <Image source={{ uri: weather.icone }} style={styles.weatherIcon} />
            <Text>{weather.cidade}: {weather.temperatura}</Text>
          </View>
        )}

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar item por nome..."
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredItems.length ? filteredItems : items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard item={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item encontrado.</Text>}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
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
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemsScreen;








