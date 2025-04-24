import { curve1 } from "@/app/assets";
import { curve2 } from "@/app/assets";

interface CurveProps {
  position: 'left' | 'right';
  image: string;
  size: { width: number, height: number };
  margin: string; // Margin to control the space from the edge
}

const Curve: React.FC<CurveProps> = ({ position, image, size, margin }) => {
  const isLeft = position === 'left';

  return (
    <div
      className={`hidden absolute top-1/2 ${isLeft ? 'right-full' : 'left-full'} w-[${size.width}px] -mt-1 ${isLeft ? `mr-${margin}` : `ml-${margin}`} pointer-events-none xl:block`}
    >
      <img src={image} width={size.width} height={size.height} alt={`Curve ${isLeft ? 1 : 2}`} />
    </div>
  );
};

export const RightCurve = () => (
  <Curve position="right" image={curve2} size={{ width: 162, height: 76 }} margin="10" />
);

export const LeftCurve = () => (
  <Curve position="left" image={curve1} size={{ width: 522, height: 182 }} margin="10" />
);
