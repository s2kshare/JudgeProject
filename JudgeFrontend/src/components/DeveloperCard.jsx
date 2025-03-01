import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";

function DeveloperCard() {
    return (
        <section className="container mx-auto px-8 py-10">
            <Card
                shadow={false}
                className="border border-gray-300 shadow-2xl rounded-2xl overflow-hidden"
            >
                <CardHeader
                    shadow={false}
                    className="h-60 flex items-end justify-center "
                >
                    <div className="relative flex-1 w-full h-5/6 overflow-hidden rounded-xl">
                        <img
                            src="https://images.pexels.com/photos/1480687/pexels-photo-1480687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="dark"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
                        <div className="flex items-center gap-3 mb-3">
                            <Avatar
                                src="/img/avatar1.jpg"
                                alt="avatar"
                                variant="rounded"
                            />
                            <div>
                                <Typography color="blue-gray" variant="h6">
                                    Devontae
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    s2kdevelopshare@gmail.com
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outlined"
                                className="border-gray-300 flex items-center gap-2"
                            >
                                <IoLogoGithub className=" h-5 w-5" />
                                Github
                            </Button>
                            <Button
                                variant="outlined"
                                className="border-gray-300 flex items-center gap-2"
                            >
                                <IoLogoTwitter className=" h-5 w-5" />
                                Twitter
                            </Button>
                        </div>
                    </div>
                    <Typography
                        variant="small"
                        className="font-normal text-gray-600 mt-6"
                    >
                        The Judge System is an automated platform designed for
                        students to submit code assignments and receive instant
                        feedback. Teachers use this system to manage lab
                        assignments and review student submissions, while
                        administrators oversee users, labs, and assessments.
                    </Typography>
                </CardBody>
            </Card>
        </section>
    );
}

export default DeveloperCard;
