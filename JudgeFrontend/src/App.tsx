// Hook Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Component Imports
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";

// Page Imports
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    const [navOpen, toggleNavOpen] = useState(false);

    const toggleNav = () => {
        /**
         * Toggle the state of the navigation menu
         */
        toggleNavOpen(!navOpen);
    };

    return (
        <BrowserRouter basename="/">
            <div className="min-h-screen flex">
                {/* Sidebar (hidden on smaller screens) */}
                <AppSidebar />

                {/* Main Content (adjusts margin based on screen size) */}
                <div className="flex-1 bg-[--col-base-200] ml-0 md:ml-[20%]">
                    <div className="h-24">
                        <Navbar navOpen={navOpen} toggleNav={toggleNav} />
                    </div>
                    <div className="p-10">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route
                                path="/scoreboard"
                                element={<ScoreboardPage />}
                            />
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
