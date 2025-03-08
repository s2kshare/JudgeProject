import { LOGIN_USER, LOGOUT_USER, FETCH_USERS } from "../actions/UserActions";
import { User } from "../types/UserType";

interface UserState {
    currentUser: User | null;
    users: User[];
}

const initialState: UserState = {
    currentUser: null,
    users: [],
};

const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, currentUser: action.payload };
        case LOGOUT_USER:
            return { ...state, currentUser: null };
        case FETCH_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }
};

export default userReducer;
