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

  const [errors, setErrors] = useState({});

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((img) => img.uri)]);
    }
  };

  const handleAddItem = async () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória.';
    if (!condition) newErrors.condition = 'Selecione a condição.';
    if (!offerType) newErrors.offerType = 'Selecione o tipo de oferta.';
    if (images.length === 0) newErrors.images = 'Escolha ao menos uma imagem.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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
      setName('');
      setDescription('');
      setCondition('');
      setOfferType('');
      setImages([]);
      navigation.navigate('Items');
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      Alert.alert('Erro', 'Erro ao salvar item. Tente novamente.');
    }
  };

  const options = ['Novo', 'Usado', 'Precisa de Reparo'];
  const offers = ['Troca', 'Doação'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/reciclagem.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Adicionar Item</Text>
      </View>

      <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
        {images.length > 0 ? (
          <ScrollView horizontal>
            {images.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.imageText}>Toque para escolher imagens</Text>
        )}
      </TouchableOpacity>
      {errors.images && <Text style={styles.error}>{errors.images}</Text>}

      <InputField
        label="Nome do Item"
        value={name}
        onChangeText={setName}
        placeholder="Ex: Livro, Celular..."
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <InputField
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="Escreva detalhes sobre o item"
        multiline
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <View style={styles.fieldGroupHorizontal}>
        <Text style={styles.label}>Condição do Item</Text>
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
        {errors.condition && <Text style={styles.error}>{errors.condition}</Text>}
      </View>

      <View style={styles.fieldGroupHorizontal}>
        <Text style={styles.label}>Tipo de Oferta</Text>
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
        {errors.offerType && <Text style={styles.error}>{errors.offerType}</Text>}
      </View>

      <CustomButton title="Toque para publicar" onPress={handleAddItem} />
    </ScrollView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 4,
    color: '#4CAF50',
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    height: 180,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  imageText: {
    color: '#888',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 6,
  },
  fieldGroupHorizontal: {
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 6,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginLeft: 4,
    marginBottom: 6,
  },
});

