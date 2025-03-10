import React from "react";
import { UnderlineTabs } from "../components/UnderlineTabs";
import { JUDGE_ADMIN_TABS } from "../lib/constants";

export default function DashboardPage() {
    return (
        <>
            <UnderlineTabs data={JUDGE_ADMIN_TABS} />
        </>
    );
}
