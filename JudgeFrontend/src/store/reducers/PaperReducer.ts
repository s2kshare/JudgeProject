import {
    FETCH_PAPERS,
    FETCH_PAPER_BY_ID,
    ADD_PAPER,
    UPDATE_PAPER,
    DELETE_PAPER,
} from "../actions/PaperActions";
import { Paper } from "../types/PaperType";

interface PapersState {
    papers: Paper[];
    selectedPaper: Paper | null;
}

const initialState: PapersState = {
    papers: [],
    selectedPaper: null,
};

const papersReducer = (state = initialState, action: any): PapersState => {
    switch (action.type) {
        case FETCH_PAPERS:
            return { ...state, papers: action.payload };
        case FETCH_PAPER_BY_ID:
            return { ...state, selectedPaper: action.payload };
        case ADD_PAPER:
            return { ...state, papers: [...state.papers, action.payload] };
        case UPDATE_PAPER:
            return {
                ...state,
                papers: state.papers.map((paper) =>
                    paper.id === action.payload.id ? action.payload : paper
                ),
            };
        case DELETE_PAPER:
            return {
                ...state,
                papers: state.papers.filter(
                    (paper) => paper.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default papersReducer;
