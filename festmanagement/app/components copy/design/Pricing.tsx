interface LineProps {
  direction: "left" | "right"; // to determine the direction of the line
  width?: string; // customizable width
  height?: string; // customizable height
}

const Line: React.FC<LineProps> = ({ direction, width = "92.5rem", height = "11.0625rem" }) => {
  return (
    <div
      className={`hidden lg:block absolute top-1/2 ${direction === "left" ? "right-full" : "left-full"} w-[${width}] h-[${height}] -translate-y-1/2 pointer-events-none`}
    >
      <img
        className="w-full"
        src={lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
};

export const LeftLine = () => <Line direction="left" />;

export const RightLine = () => <Line direction="right" />;
