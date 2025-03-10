import { Dispatch } from "redux";
import { LabSubmission } from "../types/LabSubmissionType";
import {
    getLabSubmissions,
    getLabSubmissionById,
    createLabSubmission,
    updateLabSubmission,
    deleteLabSubmission,
} from "../../api/LabSubmissionApi";

// Action Types
export const FETCH_LAB_SUBMISSIONS = "FETCH_LAB_SUBMISSIONS";
export const FETCH_LAB_SUBMISSION_BY_ID = "FETCH_LAB_SUBMISSION_BY_ID";
export const ADD_LAB_SUBMISSION = "ADD_LAB_SUBMISSION";
export const UPDATE_LAB_SUBMISSION = "UPDATE_LAB_SUBMISSION";
export const DELETE_LAB_SUBMISSION = "DELETE_LAB_SUBMISSION";

// Action Creators
export const fetchLabSubmissions = () => async (dispatch: Dispatch) => {
    try {
        const submissions = await getLabSubmissions();
        dispatch({ type: FETCH_LAB_SUBMISSIONS, payload: submissions });
    } catch (error) {
        console.error("Error fetching submissions:", error);
    }
};

export const fetchLabSubmissionById =
    (id: number) => async (dispatch: Dispatch) => {
        try {
            const submission = await getLabSubmissionById(id);
            dispatch({ type: FETCH_LAB_SUBMISSION_BY_ID, payload: submission });
        } catch (error) {
            console.error("Error fetching submission:", error);
        }
    };

export const addLabSubmission =
    (submission: LabSubmission) => async (dispatch: Dispatch) => {
        try {
            const newSubmission = await createLabSubmission(submission);
            dispatch({ type: ADD_LAB_SUBMISSION, payload: newSubmission });
        } catch (error) {
            console.error("Error adding submission:", error);
        }
    };

export const updateLabSubmissionAction =
    (submission: LabSubmission) => async (dispatch: Dispatch) => {
        try {
            const updatedSubmission = await updateLabSubmission(submission);
            dispatch({
                type: UPDATE_LAB_SUBMISSION,
                payload: updatedSubmission,
            });
        } catch (error) {
            console.error("Error updating submission:", error);
        }
    };

export const deleteLabSubmissionAction =
    (id: number) => async (dispatch: Dispatch) => {
        try {
            await deleteLabSubmission(id);
            dispatch({ type: DELETE_LAB_SUBMISSION, payload: id });
        } catch (error) {
            console.error("Error deleting submission:", error);
        }
    };
