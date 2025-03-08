import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppSidebar from "./components/AppSidebar";

function App() {
    return (
        <BrowserRouter basename="/">
            <div className="min-h-[100vh]">
                <AppSidebar />
                <div className="h-full bg-red-500">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
