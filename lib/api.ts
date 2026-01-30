import axios from "axios";
import { User } from "@/types/user";

// Accessing environment variables
const API_DATA_URL = process.env.NEXT_PUBLIC_JSON_GENERATOR_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_JSON_GENERATOR_TOKEN;

const api = axios.create({
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (!API_DATA_URL) throw new Error("API URL is missing in .env");

    const response = await api.get(API_DATA_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const cachedData = localStorage.getItem(`lendsqr_user_${id}`);
    if (cachedData) return JSON.parse(cachedData);

    const allUsers = await fetchUsers();
    const user = allUsers.find((u: User) => u.id === id);

    if (user) {
      localStorage.setItem(`lendsqr_user_${id}`, JSON.stringify(user));
      return user;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};
