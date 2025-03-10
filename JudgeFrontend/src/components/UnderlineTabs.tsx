import React, { JSX } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

export function UnderlineTabs({
    data,
}: {
    data: {
        label: string;
        value: string;
        desc: string;
        element: JSX.Element;
    }[];
}) {
    const [activeTab, setActiveTab] = React.useState(data[0].value);

    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                    className:
                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {data.map(({ value, desc, element }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                        {element}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
