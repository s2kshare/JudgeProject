import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

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
            const response = await axios.post(baseUrl + "/auth/login", {
                username,
                password,
            });

            console.log(response);

            if (response.status == 200) {
                console.log(response.data);
                const { role } = response.data;
                localStorage.setItem("judge-project-role", role);
                setUser({ role });
                navigate("/");
                return true;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            console.log(baseUrl + "/auth/logout");
            const response = await axios.post(baseUrl + "/auth/logout");

            if (response.status == 200) {
                localStorage.removeItem("judge-project-uid");
                localStorage.removeItem("judge-project-role");
                setUser(null);
                navigate("/login");
            }

            return response;
        } catch (error) {
            console.error("Login failed", error);
        }
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
