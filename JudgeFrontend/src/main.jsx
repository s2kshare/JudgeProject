import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "@material-tailwind/react";
import { UserProvider } from "./contexts/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <UserProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </UserProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
