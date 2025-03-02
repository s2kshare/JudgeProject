import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

export function LoginForm() {
    const { login, isLoading, isError, error, isSuccess } =
        useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    console.log(isLoading);

    const handleLoginRequest = async (e) => {
        e.preventDefault();

        try {
            // Await the login process to complete before proceeding
            await login(username, password);
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="h-[100vh] flex items-center">
            {isLoading && (
                <div className="w-full h-full absolute flex items-center justify-center">
                    <Spinner className="absolute h-16 w-16 text-gray-900/50" />
                </div>
            )}
            <Card
                color="transparent"
                shadow={false}
                className={
                    isLoading
                        ? "flex-1 items-center justify-center blur-sm transition-all"
                        : "flex-1 items-center justify-center transition-all"
                }
            >
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to get started.
                </Typography>
                {/* {isError && (
                    <div className="text-red-500 mt-2 text-sm h-4">
                        {error?.message || "An error occurred"}
                    </div>
                )} */}
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Enter Username Here..."
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />

                        <Button onClick={handleLoginRequest}>Submit</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
