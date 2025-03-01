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

function App() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // If no user is logged in, navigate to login page
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

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
