interface GradientLightProps {
  fromColor?: string;
  toColor?: string;
  size?: string; // Adjust the size of the gradient container
}

export const GradientLight: React.FC<GradientLightProps> = ({
  fromColor = "#28206C", // Default start color
  toColor = "#28206C0", // Default end color with transparency
  size = "w-full aspect-square", // Default size
}) => {
  return (
    <div
      className={`absolute top-0 left-1/4 ${size} bg-radial-gradient from-[${fromColor}] to-[${toColor}] to-70% pointer-events-none`}
    />
  );
};
