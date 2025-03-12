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

function App() {
    const [navOpen, setNavOpen] = useState(true);

    const toggleNav = () => {
        setNavOpen((prev) => !prev);
    };

    // Close sidebar when window resizes below `xl` (1280px)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1280) {
                setNavOpen(true);
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
                    animate={{ marginLeft: navOpen ? "20%" : "0%" }}
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
                </motion.div>
            </div>
        </BrowserRouter>
    );
}

export default App;
