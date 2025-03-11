import { Spinner } from "@material-tailwind/react";
import SquareCard from "../cards/SquareCard";

export default function OverviewElement() {
    return (
        <div className="w-full h-96 my-3">
            <div className="h-full flex gap-6">
                <div className="flex-2">
                    <SquareCard>
                        <h1 className="text-3xl font-semibold mb-3">
                            System Status
                        </h1>
                        <div className="h-full w-full">
                            <div className="flex w-full gap-4 h-[80%]">
                                <SquareCard>
                                    <h1 className="text-2xl font-semibold">
                                        Judge API
                                    </h1>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Spinner
                                            className="h-1/4 w-1/4"
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        />
                                    </div>
                                </SquareCard>
                                <SquareCard>
                                    <h1 className="text-2xl font-semibold">
                                        Judge Backend
                                    </h1>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Spinner
                                            className="h-1/4 w-1/4"
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        />
                                    </div>
                                </SquareCard>
                            </div>
                        </div>
                    </SquareCard>
                </div>
                <div className="flex-1">
                    <SquareCard>What</SquareCard>
                </div>
            </div>
        </div>
    );
}
