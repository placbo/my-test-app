import axios from "axios";

// Types for individual message objects
export interface Message {
  id: number;
  message: string;
  author: string;
  created: string; //timestamp
}

// Types for new message request
export interface NewMessageRequest {
  text: string;
  author: string;
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
const MESSAGES_SERVICE_PATH = "/messages";

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
      `${API_BASE_URL}${MESSAGES_SERVICE_PATH}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

export async function postMessage(
  messageData: NewMessageRequest
): Promise<Message> {
  try {
    const response = await axios.post<{ success: boolean; data: Message }>(
      `${API_BASE_URL}${MESSAGES_SERVICE_PATH}`,
      messageData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error posting message:", error);
    throw error;
  }
}
