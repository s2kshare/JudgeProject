import React from "react";

export default function ScoreboardCard() {
    const full_name = "Devontae What";
    const score = 32400;
    const position = 1;
    const labsCompleted = 32;
    const labcount = 40;
    const failed_attempts = 24;

    return (
        <div className="min-h-40 h-40 w-full">
            <div className="flex p-4 flex-col bg-[--col-base-300] shadow-xl rounded-xl h-full">
                <div className="flex flex-2 w-full justify-between">
                    <div className="flex-1">
                        <h1>Position</h1>
                        <h3 className="font-bold text-3xl">#{position}</h3>
                    </div>
                    <div className="flex-2">
                        <h1>Name</h1>
                        <h3 className="font-bold text-3xl">{full_name}</h3>
                    </div>
                    <div className="flex-1">
                        <h1>Score</h1>
                        <h3 className="font-bold text-3xl">{score}</h3>
                    </div>
                </div>
                <hr className="my-3 border-black" />
                <div className="flex-1 flex gap-3 justify-end items-center">
                    <p>
                        Labs Completed: {labsCompleted} / {labcount}
                    </p>
                    <p>-</p>
                    <p>Failed Attempts: {failed_attempts}</p>
                </div>
            </div>
        </div>
    );
}
