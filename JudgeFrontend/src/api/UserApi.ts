import axios from "./ApiClient";
import { User } from "../store/types/UserType";

// Login user
export const loginUser = async (
    username: string,
    password: string
): Promise<User> => {
    const response = await axios.post("/auth/login", { username, password });
    return response.data;
};

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get("/users");
    return response.data;
};
