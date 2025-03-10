import {
    FETCH_LAB_SUBMISSIONS,
    FETCH_LAB_SUBMISSION_BY_ID,
    ADD_LAB_SUBMISSION,
    UPDATE_LAB_SUBMISSION,
    DELETE_LAB_SUBMISSION,
} from "../actions/LabSubmissionActions";
import { LabSubmission } from "../types/LabSubmissionType";

interface LabSubmissionsState {
    submissions: LabSubmission[];
    selectedSubmission: LabSubmission | null;
}

const initialState: LabSubmissionsState = {
    submissions: [],
    selectedSubmission: null,
};

const labSubmissionsReducer = (
    state = initialState,
    action: any
): LabSubmissionsState => {
    switch (action.type) {
        case FETCH_LAB_SUBMISSIONS:
            return { ...state, submissions: action.payload };
        case FETCH_LAB_SUBMISSION_BY_ID:
            return { ...state, selectedSubmission: action.payload };
        case ADD_LAB_SUBMISSION:
            return {
                ...state,
                submissions: [...state.submissions, action.payload],
            };
        case UPDATE_LAB_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.map((submission) =>
                    submission.id === action.payload.id
                        ? action.payload
                        : submission
                ),
            };
        case DELETE_LAB_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(
                    (submission) => submission.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default labSubmissionsReducer;
