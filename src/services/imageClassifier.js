// src/services/imageService.js
const CLARIFAI_API_KEY = 'd160aeeac6d340778e779c68798ee4a0';
const CLARIFAI_MODEL_ID = 'general-detection';

// Função para classificar a imagem usando o modelo Clarifai
export const classifyImage = async (imageUri) => {
  try {
    const base64 = await toBase64(imageUri);
    if (!base64) {
      throw new Error('Erro ao converter imagem para base64.');
    }

    const response = await fetch(`https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${CLARIFAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [{ data: { image: { base64 } } }],
      }),
    });

    const data = await response.json();
    if (!data.outputs || data.outputs.length === 0) {
      throw new Error('Nenhum resultado retornado pela API.');
    }

    const concepts = data.outputs[0]?.data?.concepts || [];
    if (concepts.length === 0) {
      throw new Error('Nenhuma categoria detectada.');
    }

    // Ordena por confiabilidade e retorna os nomes das categorias
    return concepts.sort((a, b) => b.value - a.value).map((c) => c.name);
  } catch (error) {
    console.error('Erro na classificação de imagem:', error);
    return [];
  }
};

// Função para converter a imagem para base64
const toBase64 = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    return await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao converter para base64:', error);
    return null;
  }
};

