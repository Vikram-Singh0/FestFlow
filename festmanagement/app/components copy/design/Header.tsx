import { background } from "@/app/assets";


interface RingProps {
  size: string; // to define the size of the ring
  borderColor: string; // to define the border color of the rings
}

const Ring: React.FC<RingProps> = ({ size, borderColor }) => (
  <div
    className={`absolute top-1/2 left-1/2 ${size} border ${borderColor} rounded-full -translate-x-1/2 -translate-y-1/2`}
  />
);

export const Rings = () => (
  <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
    <Ring size="w-[36.125rem] aspect-square" borderColor="border-n-2/10" />
    <Ring size="w-[23.125rem] aspect-square" borderColor="border-n-2/10" />
  </div>
);

export const SideLines = () => (
  <>
    <div className="absolute top-0 left-5 w-0.25 h-full bg-n-6" />
    <div className="absolute top-0 right-5 w-0.25 h-full bg-n-6" />
  </>
);

export const BackgroundCircles = () => (
  <>
    <div className="absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full" />
    <div className="absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full" />
    <div className="absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full" />
  </>
);

export const HamburgerMenu = () => (
  <div className="absolute inset-0 pointer-events-none lg:hidden">
    <div className="absolute inset-0 opacity-[.03]">
      <img
        className="w-full h-full object-cover"
        src={background.src}
        width={688}
        height={953}
        alt="Background"
      />
    </div>

    <Rings />
    <SideLines />
    <BackgroundCircles />
  </div>
);
