import { combineReducers } from "redux";

import userReducer from "./UserReducer";
import paperReducer from "./PaperReducer";
import labsReducer from "./LabReducer";
import labSubmissionsReducer from "./LabSubmissionReducer";

const rootReducer = combineReducers({
    user: userReducer,
    papers: paperReducer,
    labs: labsReducer,
    labSubmissions: labSubmissionsReducer,
});

export default rootReducer;
