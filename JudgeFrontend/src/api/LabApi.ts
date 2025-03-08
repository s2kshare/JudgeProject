import axios from "./ApiClient";
import { Lab } from "../store/types/LabType";

// Fetch all labs
export const getLabs = async (): Promise<Lab[]> => {
    const response = await axios.get("/labs");
    return response.data;
};

// Fetch a single lab by ID
export const getLabById = async (id: number): Promise<Lab> => {
    const response = await axios.get(`/labs/${id}`);
    return response.data;
};

// Create a new lab
export const createLab = async (lab: Omit<Lab, "id">): Promise<Lab> => {
    const response = await axios.post("/labs", lab);
    return response.data;
};

// Update an existing lab
export const updateLab = async (lab: Lab): Promise<Lab> => {
    const response = await axios.put(`/labs/${lab.id}`, lab);
    return response.data;
};

// Delete a lab by ID
export const deleteLab = async (id: number): Promise<void> => {
    await axios.delete(`/labs/${id}`);
};
