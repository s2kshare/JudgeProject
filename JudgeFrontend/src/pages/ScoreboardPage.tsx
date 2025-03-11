import React from "react";
import ScoreboardCard from "../components/cards/ScoreboardCard";

export default function ScoreboardPage() {
    const PAPER_NAME = "ITC502: Programming";

    return (
        <>
            <h1 className="text-3xl font-semibold mb-3">
                {PAPER_NAME} Scoreboard
            </h1>
            <div className="my-8">
                <ScoreboardCard />
            </div>
            <div className="my-8">
                <ScoreboardCard />
            </div>
            <div className="my-8">
                <ScoreboardCard />
            </div>
            <div className="my-8">
                <ScoreboardCard />
            </div>
            <div className="my-8">
                <ScoreboardCard />
            </div>
        </>
    );
}
