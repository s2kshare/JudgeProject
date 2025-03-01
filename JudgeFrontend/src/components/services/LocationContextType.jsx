import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LocationContext = createContext();

const pathNames = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/login": "Login",
};

export const LocationProvider = ({ children }) => {
    const location = useLocation();
    console.log(pathNames[location.pathname]);
    const [path, setPath] = useState(pathNames[location.pathname] || "Home");

    useEffect(() => {
        setPath(pathNames[location.pathname]);
    }, [location.pathname]);

    return (
        <LocationContext.Provider value={{ path }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationService = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error(
            "useLocationService must be used within a LocationProvider"
        );
    }
    return context;
};
