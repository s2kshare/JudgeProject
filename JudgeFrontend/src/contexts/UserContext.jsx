import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();
const baseUrl = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const fetchUser = async () => {
    const userObject = localStorage.getItem("judge-project-user");
    var user = JSON.parse(userObject);

    if (user) {
        return user;
    }

    return null;
};

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch user from local storage (or API)
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: Infinity,
    });

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: async ({ username, password }) => {
            const response = await axios.post(baseUrl + "/auth/login", {
                username,
                password,
            });

            if (response.status === 200) {
                var user = {
                    id: response.data.id,
                    role: response.data.role,
                    username: response.data.username,
                };
                localStorage.setItem(
                    "judge-project-user",
                    JSON.stringify(user)
                );
                return response.data;
            }

            throw new Error("Login failed");
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], {
                id: data.id,
                role: data.role,
                username: data.username,
            });
            setTimeout(() => navigate("/"), 0);
        },
    });

    // Logout Mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axios.post(baseUrl + "/auth/logout");
            localStorage.removeItem("judge-project-user");
        },
        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            setTimeout(() => navigate("/login"), 0);
        },
    });

    return (
        <UserContext.Provider
            value={{
                user,
                login: (username, password) =>
                    loginMutation.mutate({ username, password }),
                logout: () => logoutMutation.mutate(),
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
