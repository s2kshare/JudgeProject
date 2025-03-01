import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export function LoginForm() {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginRequest = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <Card
            color="transparent"
            shadow={false}
            className="flex-1 items-center justify-center"
        >
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to get started.
            </Typography>
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
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
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
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />

                    <Button onClick={handleLoginRequest}>Submit</Button>
                </div>
            </form>
        </Card>
    );
}
