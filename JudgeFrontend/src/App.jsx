import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";
import Layout from "./constants/Layout"; // Import the Layout component
import DashboardPage from "./pages/DashboardPage";
import { LocationProvider } from "./components/services/LocationContextType";

function App() {
    return (
        <BrowserRouter>
            <LocationProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<Layout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/home" element={<UserHomePage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/history" element={<>History</>} />
                    </Route>
                </Routes>
            </LocationProvider>
        </BrowserRouter>
    );
}

export default App;
