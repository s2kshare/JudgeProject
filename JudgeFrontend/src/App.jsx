import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";
import Layout from "./constants/Layout";
import DashboardPage from "./pages/DashboardPage";
import { LocationProvider } from "./components/services/LocationContextType";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { Slide, ToastContainer } from "react-toastify";
import { QueryClient } from "../node_modules/@tanstack/query-core/src/queryClient";
import { useQueryClient } from "@tanstack/react-query";

function App() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);
    const { isLoading } = useContext(UserContext);

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Loading...
            </div>
        );
    }

    return (
        <LocationProvider>
            <ToastContainer
                transition={Slide}
                autoClose={2000}
                position="bottom-right"
            />
            <Routes>
                {/* Protected Routes that require the user to be logged in */}
                <Route element={<Layout />}>
                    <Route path="/" element={<UserHomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/history" element={<>History</>} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </LocationProvider>
    );
}

export default App;
