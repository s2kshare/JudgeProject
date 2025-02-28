import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";

export function NavbarComponent() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar className=" max-w-[100vw] px-4 py-2 lg:px-8 lg:py-4 flex-1 rounded-none h-20 max-h-20">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Judge Project
                </Typography>
                <div className="flex items-center gap-x-1">
                    <Button
                        variant="text"
                        size="sm"
                        className="hidden lg:inline-block"
                    >
                        <span>Log In</span>
                    </Button>
                    {/* <Button
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block"
                    >
                        <span>Sign Up</span>
                    </Button> */}
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button
                            fullWidth
                            variant="gradient"
                            size="sm"
                            className=""
                        >
                            <span>Sign in</span>
                        </Button>
                    </div>
                </div>
            </MobileNav>
        </Navbar>
    );
}
