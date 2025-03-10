import {
    FETCH_LABS,
    FETCH_LAB_BY_ID,
    ADD_LAB,
    UPDATE_LAB,
    DELETE_LAB,
} from "../actions/LabActions";
import { Lab } from "../types/LabType";

interface LabsState {
    labs: Lab[];
    selectedLab: Lab | null;
}

const initialState: LabsState = {
    labs: [],
    selectedLab: null,
};

const labsReducer = (state = initialState, action: any): LabsState => {
    switch (action.type) {
        case FETCH_LABS:
            return { ...state, labs: action.payload };
        case FETCH_LAB_BY_ID:
            return { ...state, selectedLab: action.payload };
        case ADD_LAB:
            return { ...state, labs: [...state.labs, action.payload] };
        case UPDATE_LAB:
            return {
                ...state,
                labs: state.labs.map((lab) =>
                    lab.id === action.payload.id ? action.payload : lab
                ),
            };
        case DELETE_LAB:
            return {
                ...state,
                labs: state.labs.filter((lab) => lab.id !== action.payload),
            };
        default:
            return state;
    }
};

export default labsReducer;
