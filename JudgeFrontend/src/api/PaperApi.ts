import axios from "./ApiClient";
import { Paper } from "../store/types/PaperType";

// Fetch all papers
export const getPapers = async (): Promise<Paper[]> => {
    const response = await axios.get("/papers");
    return response.data;
};

// Fetch a single paper by ID
export const getPaperById = async (id: number): Promise<Paper> => {
    const response = await axios.get(`/papers/${id}`);
    return response.data;
};

// Create a new paper
export const createPaper = async (paper: Omit<Paper, "id">): Promise<Paper> => {
    const response = await axios.post("/papers", paper);
    return response.data;
};

// Update an existing paper
export const updatePaper = async (paper: Paper): Promise<Paper> => {
    const response = await axios.put(`/papers/${paper.id}`, paper);
    return response.data;
};

// Delete a paper by ID
export const deletePaper = async (id: number): Promise<void> => {
    await axios.delete(`/papers/${id}`);
};
