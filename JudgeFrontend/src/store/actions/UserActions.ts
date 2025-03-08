import { Dispatch } from "redux";
import { loginUser, fetchUsers } from "../../api/UserApi";

// Action Types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const FETCH_USERS = "FETCH_USERS";

// Action Creators
export const login =
    (username: string, password: string) => async (dispatch: Dispatch) => {
        try {
            const user = await loginUser(username, password);
            dispatch({ type: LOGIN_USER, payload: user });
            // After Actions
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_USER });
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    try {
        const users = await fetchUsers();
        dispatch({ type: FETCH_USERS, payload: users });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};
