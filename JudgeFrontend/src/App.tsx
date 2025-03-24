import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Component Imports
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";

// Page Imports
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
    const [navOpen, setNavOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const toggleNav = () => {
        setNavOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 700);
            if (window.innerWidth < 700) {
                setNavOpen(true); // Optionally force the sidebar open on small screens
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <BrowserRouter basename="/">
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <AppSidebar isOpen={navOpen} />

                {/* Main Content (animated margin-left) */}
                <motion.div
                    className="flex-1 bg-[--col-base-100]"
                    animate={
                        !isSmallScreen && { marginLeft: navOpen ? "20%" : "0%" }
                    } // Apply animation only if not small screen
                    transition={{
                        ease: "easeInOut",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5,
                    }}
                >
                    <div className="h-24">
                        <Navbar navOpen={navOpen} toggleNav={toggleNav} />
                    </div>
                    <div className="p-4 md:p-10">
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
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </div>
                </motion.div>
            </div>
        </BrowserRouter>
    );
}

export default App;
