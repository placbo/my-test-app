import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const MESSAGE_SERVICE_PATH = '/message';

export async function fetchMessage(): Promise<string> {
    try {
        const response = await axios.get(`${API_BASE_URL}${MESSAGE_SERVICE_PATH}`);
        return response.data.message;
    } catch (error) {
        console.error('Error fetching message:', error);
        throw error;
    }
}