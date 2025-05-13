import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const AddItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [offerType, setOfferType] = useState('');
  const [images, setImages] = useState([]);

  const options = ['Novo', 'Usado', 'Precisa de Reparo'];
  const offers = ['Troca', 'Doação'];

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((img) => img.uri);
      setImages([...images, ...selectedUris]);
    }
  };

  const removeImage = (index) => {
    Alert.alert(
      'Remover Imagem',
      'Deseja remover esta imagem?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setImages(images.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  const handleAddItem = async () => {
    if (!name.trim() || !description.trim() || !condition || !offerType || images.length === 0) {
      Alert.alert('Erro', 'Preencha todos os campos e escolha ao menos uma imagem.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      description,
      condition,
      offerType,
      images,
    };

    try {
      const storedItems = await AsyncStorage.getItem('items');
      const items = storedItems ? JSON.parse(storedItems) : [];
      items.push(newItem);
      await AsyncStorage.setItem('items', JSON.stringify(items));

      Alert.alert('Sucesso', 'Item adicionado com sucesso!');
      resetForm();
      navigation.navigate('Items');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar item. Tente novamente.');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCondition('');
    setOfferType('');
    setImages([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Item</Text>

      <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
        {images.length > 0 ? (
          <ScrollView horizontal>
            {images.map((uri, idx) => (
              <View key={idx} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(idx)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.imageText}>Toque para escolher imagens</Text>
        )}
      </TouchableOpacity>

      <InputField
        placeholder="Nome do Item"
        value={name}
        onChangeText={setName}
      />
      <InputField
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Condição do Item */}
      <Text style={styles.label}>Condição do Item:</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setCondition(opt)}
            style={[styles.optionButton, condition === opt && styles.selectedOption]}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tipo de Oferta */}
      <Text style={styles.label}>Tipo de Oferta:</Text>
      <View style={styles.optionRow}>
        {offers.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setOfferType(opt)}
            style={[styles.optionButton, offerType === opt && styles.selectedOption]}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton title="Publicar Item" onPress={handleAddItem} />
    </ScrollView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 60,
    marginTop: 20, // Evita que o texto fique grudado na câmera

  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    height: 180,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    marginTop: 20, // ✅ Ajuste na margem superior
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
    marginTop: 10, // ✅ Espaçamento entre imagens
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF5252',
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageText: {
    color: '#888',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    color: '#333',
  },
});










