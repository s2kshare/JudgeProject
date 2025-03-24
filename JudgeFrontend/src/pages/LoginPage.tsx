import React, { useState } from "react";
import { JUDGE_NAME } from "../lib/constants";
import { motion } from "framer-motion";
import { login } from "../store/actions/UserActions";
import { useAppDispatch } from "../hooks/hooks";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
            // Dispatch the login action
            try {
                await dispatch(login(username, password));
                navigate("/");
            } catch (error) {
                const axiosError = error as AxiosError;
                setError(axiosError.message);
            }
        } else {
            setError("Both username and password are required.");
        }
    };

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-[--col-base-300]">
            <div className="bg-[--col-base-100] p-8 rounded-xl shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    {JUDGE_NAME}
                </h1>
                <h3 className="text-xl text-center text-gray-600 mb-6">
                    Login to Your Account
                </h3>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{
                            scale: 0.95,
                            transition: { duration: 0.1, type: "spring" },
                        }}
                        onClick={handleLogin}
                        className="w-full py-2 bg-[--col-dark-300] text-white font-semibold rounded-lg hover:bg-[--col-dark-100] transition duration-300"
                    >
                        Log In
                    </motion.button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-indigo-600 hover:underline"
                        >
                            hahaa L bozo
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
