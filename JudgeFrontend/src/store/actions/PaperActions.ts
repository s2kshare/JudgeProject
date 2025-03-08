import { Dispatch } from "redux";
import { Paper } from "../types/PaperType";
import { getPaperById, getPapers } from "../../api/PaperApi";

export const FETCH_PAPERS = "FETCH_PAPERS";
export const FETCH_PAPER_BY_ID = "FETCH_PAPER_BY_ID";
export const ADD_PAPER = "ADD_PAPER";
export const UPDATE_PAPER = "UPDATE_PAPER";
export const DELETE_PAPER = "DELETE_PAPER";

export const fetchPapers = () => async (dispatch: Dispatch) => {
    try {
        const papers = await getPapers();
        dispatch({ type: FETCH_PAPERS, payload: papers });
    } catch (error) {
        console.error("Error fetching papers:", error);
    }
};

export const fetchPaperById = (id: number) => async (dispatch: Dispatch) => {
    try {
        const paper = await getPaperById(id);
        dispatch({ type: FETCH_PAPER_BY_ID, payload: paper });
    } catch (error) {
        console.error("Error fetching paper by ID:", error);
    }
};

export const addPaper = (paper: Paper) => ({
    type: ADD_PAPER,
    payload: paper,
});

export const updatePaper = (paper: Paper) => ({
    type: UPDATE_PAPER,
    payload: paper,
});

export const deletePaper = (paperId: number) => ({
    type: DELETE_PAPER,
    payload: paperId,
});
