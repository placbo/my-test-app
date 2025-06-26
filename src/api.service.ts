import axios from 'axios';

const API_BASE_URL = 'http://api.kasselars.com/';

export async function fetchMessage(): Promise<string> {
    const response = await axios.get(API_BASE_URL);
    return response.data.message;
}