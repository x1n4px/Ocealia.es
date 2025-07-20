


import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;;



// Función para convertir un archivo de imagen a Base64
const toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Quitamos el prefijo 'data:...'
    reader.onerror = (error) => reject(error);
});

/**
 * Llama al endpoint de solo texto.
 * @param {Array} history - El historial de la conversación.
 * @returns {Object} - La respuesta de la IA.
 */
export const callTextAPI = async (history:String) => {
    try {
        const response = await axios.post(`${API_URL}/aquaguia`, { history });
        return response.data;
    } catch (error) {
        console.error("Error en la llamada a la API de texto:", error);
        return { role: 'model', parts: 'Lo siento, hubo un error al procesar tu solicitud de texto.' };
    }
};

/**
 * Llama al endpoint de visión (texto + imagen).
 * @param {String} prompt - El texto del usuario.
 * @param {File} imageFile - El archivo de imagen.
 * @returns {Object} - La respuesta de la IA.
 */
export const callVisionAPI = async (prompt:String, imageFile:any) => {
    try {
        const imageB64 = await toBase64(imageFile);
        const mimeType = imageFile.type;
        console.log(prompt)
        const response = await axios.post(`${API_URL}/vision`, {
            prompt,
            imageB64,
            mimeType,
        });
        return response.data;
    } catch (error) {
        console.error("Error en la llamada a la API de visión:", error);
        return { role: 'model', parts: 'Lo siento, hubo un error al procesar la imagen.' };
    }
};