interface GradientProps {
  top?: string;
  left?: string;
  size?: string;
  opacity?: number;
}

export const Gradient: React.FC<GradientProps> = ({
  top = "18.25rem",
  left = "-30.375rem",
  size = "58.85rem",
  opacity = 0.6,
}) => {
  return (
    <div
      className={`absolute top-[${top}] left-[${left}] w-[56.625rem] opacity-[${opacity}] mix-blend-color-dodge pointer-events-none`}
    >
      <div className={`absolute top-1/2 left-1/2 w-[${size}] h-[${size}] -translate-x-3/4 -translate-y-1/2`}>
        <img
          className="w-full"
          src={gradient}
          width={942}
          height={942}
          alt="Gradient"
        />
      </div>
    </div>
  );
};
