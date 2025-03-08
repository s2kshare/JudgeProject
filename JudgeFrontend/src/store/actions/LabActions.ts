import { Dispatch } from "redux";
import { Lab } from "../types/LabType";
import { getLabById, getLabs } from "../../api/LabApi";

// Action Types
export const FETCH_LABS = "FETCH_LABS";
export const FETCH_LAB_BY_ID = "FETCH_LAB_BY_ID";
export const ADD_LAB = "ADD_LAB";
export const UPDATE_LAB = "UPDATE_LAB";
export const DELETE_LAB = "DELETE_LAB";

// Action Creators
export const fetchLabs = () => async (dispatch: Dispatch) => {
    try {
        const labs = await getLabs();
        dispatch({ type: FETCH_LABS, payload: labs });
    } catch (error) {
        console.error("Error fetching labs:", error);
    }
};

export const fetchLabById = (id: number) => async (dispatch: Dispatch) => {
    try {
        const lab = await getLabById(id);
        dispatch({ type: FETCH_LAB_BY_ID, payload: lab });
    } catch (error) {
        console.error("Error fetching lab:", error);
    }
};

export const addLab = (lab: Lab) => ({
    type: ADD_LAB,
    payload: lab,
});

export const updateLab = (lab: Lab) => ({
    type: UPDATE_LAB,
    payload: lab,
});

export const deleteLab = (labId: number) => ({
    type: DELETE_LAB,
    payload: labId,
});
