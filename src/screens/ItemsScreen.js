import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/ItemCard';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const ItemsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadItems);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterItems();
  }, [search, category, items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setItems(parsedItems);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  const filterItems = () => {
    let results = items;

    if (search) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      results = results.filter(item => item.category === category);
    }

    setFilteredItems(results);
  };

  const renderItem = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() => navigation.navigate('AddItem', { item })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header com logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/reciclagem.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Itens Disponíveis</Text>
      </View>

      {/* Barra de busca */}
      <TextInput
        placeholder="Buscar item por nome..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      {/* Filtro por categoria */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Todas as Categorias" value="" />
          <Picker.Item label="Eletrônicos" value="Eletrônicos" />
          <Picker.Item label="Roupas" value="Roupas" />
          <Picker.Item label="Livros" value="Livros" />
          <Picker.Item label="Brinquedos" value="Brinquedos" />
        </Picker>
      </View>

      {/* Lista de itens ou mensagem vazia */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum item encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Botão flutuante "+" */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddItem')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50',
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
    justifyContent: 'center',
  },
  picker: {
    color: '#333',
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
});

