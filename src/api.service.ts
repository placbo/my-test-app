import axios from "axios";

// Types for individual message objects
export interface Message {
  id: number;
  message: string;
  author: string;
  created: string; //timestamp
}

// Types for messages list API response
export interface MessagesApiResponse {
  success: boolean;
  data: Message[];
  count: number;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;
const MESSAGE_SERVICE_PATH = "/message";

export async function fetchMessage(): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}${MESSAGE_SERVICE_PATH}`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw error;
  }
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    const response = await axios.get<MessagesApiResponse>(
      `${API_BASE_URL}/messages`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
