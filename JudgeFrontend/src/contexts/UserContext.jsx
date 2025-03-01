import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUID = localStorage.getItem("judge-project-uid");
        const storedRole = localStorage.getItem("judge-project-role");

        if (storedUID && storedRole) {
            setUser({ id: storedUID, role: storedRole });
        }
        // else {
        //     navigate("/");
        // }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(baseUrl + "/api/login", {
                username,
                password,
            });

            if (response.data.success) {
                const { userId, role } = response.data;
                localStorage.setItem("judge-project-uid", userId);
                localStorage.setItem("judge-project-role", role);
                setUser({ id: userId, role });
                navigate("/"); // Redirect after login
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(baseUrl + "/api/logout");

            if (response.data.success) {
                localStorage.removeItem("judge-project-uid");
                localStorage.removeItem("judge-project-role");
                setUser(null);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
        navigate("/");
    };

    const submitLab = () => {
        console.log("submitting lab");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
