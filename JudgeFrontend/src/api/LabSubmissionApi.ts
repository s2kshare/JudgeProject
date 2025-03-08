import axios from "./ApiClient";
import { LabSubmission } from "../store/types/LabSubmissionType";

// Fetch all submissions
export const getLabSubmissions = async (): Promise<LabSubmission[]> => {
    const response = await axios.get("/labSubmissions");
    return response.data;
};

// Fetch a single submission by ID
export const getLabSubmissionById = async (
    id: number
): Promise<LabSubmission> => {
    const response = await axios.get(`/labSubmissions/${id}`);
    return response.data;
};

// Create a new submission
export const createLabSubmission = async (
    submission: Omit<LabSubmission, "id">
): Promise<LabSubmission> => {
    const response = await axios.post("/labSubmissions", submission);
    return response.data;
};

// Update an existing submission
export const updateLabSubmission = async (
    submission: LabSubmission
): Promise<LabSubmission> => {
    const response = await axios.put(
        `/labSubmissions/${submission.id}`,
        submission
    );
    return response.data;
};

// Delete a submission by ID
export const deleteLabSubmission = async (id: number): Promise<void> => {
    await axios.delete(`/labSubmissions/${id}`);
};
