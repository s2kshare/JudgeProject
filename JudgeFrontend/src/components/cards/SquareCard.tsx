export default function SquareCard({
    children,
    bgColor = "bg-[--col-base-300]",
}: {
    children: React.ReactNode;
    bgColor?: string;
}) {
    return (
        <div className={"p-10 w-full shadow-xl rounded-xl h-full " + bgColor}>
            {children}
        </div>
    );
}
