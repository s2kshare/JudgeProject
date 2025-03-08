import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/RootReducer";
import thunk from "redux-thunk";

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
