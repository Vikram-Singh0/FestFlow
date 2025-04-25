// 'use client';

// type EventProps = {
//   event: {
//     _id: string;
//     eventName: string;
//     description: string;
//     location: string;
//     price: number;
//     ticketsAvailable: number;
//   };
// };

// export default function EventCard({ event }: EventProps) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
//       <div>
//         <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
//         <p className="text-gray-700 text-sm mb-2">{event.description}</p>
//         <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
//         <p className="text-sm text-gray-500">💰 ₹{event.price}</p>
//         <p className="text-sm text-gray-500">🎟️ Tickets: {event.ticketsAvailable}</p>
//       </div>
//       <button
//         className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//         onClick={() => {
//           console.log(`Buying ticket for: ${event.eventName}`);
//         }}
//       >
//         Buy
//       </button>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';

// declare global {
//   interface Window {
//     ethereum?: {
//       request: (args: { method: string }) => Promise<any>;
//     };
//   }
// }

// type EventProps = {
//   event: {
//     _id: string;
//     eventName: string;
//     description: string;
//     location: string;
//     price: number;
//     ticketsAvailable: number;
//   };
// };

// export default function EventCard({ event }: EventProps) {
//   const [walletAddress, setWalletAddress] = useState("");

//   const handleBuyClick = async () => {
//     if (typeof window === "undefined" || !window.ethereum) {
//       alert("Please install MetaMask to proceed.");
//       return;
//     }

//     try {
//       // Request wallet connection
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       if (accounts.length > 0) {
//         const address = accounts[0];
//         setWalletAddress(address);
//         console.log("Wallet connected:", address);

//         // You can now proceed to trigger payment or NFT logic
//         alert(`Connected to wallet: ${address}`);
//       }
//     } catch (err) {
//       console.error("MetaMask error:", err);
//       alert("Failed to connect wallet.");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
//       <div>
//         <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
//         <p className="text-gray-700 text-sm mb-2">{event.description}</p>
//         <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
//         <p className="text-sm text-gray-500">💰 ₹{event.price}</p>
//         <p className="text-sm text-gray-500">🎟️ Tickets: {event.ticketsAvailable}</p>
//       </div>
//       <button
//         className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//         onClick={handleBuyClick}
//       >
//         Buy
//       </button>
//     </div>
//   );
// }




'use client';

import { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<any>;
    };
  }
}

type EventProps = {
  event: {
    _id: string;
    eventName: string;
    description: string;
    location: string;
    price: number;
    ticketsAvailable: number;
  };
};

const ROTATION_RANGE = 15; // Reduced rotation for a more subtle effect
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default function EventCard({ event }: EventProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Original wallet connection function (unchanged)
  const handleBuyClick = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to proceed.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        console.log("Wallet connected:", address);
        alert(`Connected to wallet: ${address}`);
      }
    } catch (err) {
      console.error("MetaMask error:", err);
      alert("Failed to connect wallet.");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between relative h-full"
    >
      {/* 3D depth effect for content */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
          <p className="text-gray-700 text-sm mb-2">{event.description}</p>
          <p className="text-sm text-gray-500 mb-1">📍 {event.location}</p>
          <p className="text-sm text-gray-500">💰 ₹{event.price}</p>
          <p className="text-sm text-gray-500">🎟️ Tickets: {event.ticketsAvailable}</p>
        </div>
        
        <button
          style={{ transform: "translateZ(30px)" }}
          className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          onClick={handleBuyClick}
        >
          Buy
        </button>
      </div>
    </motion.div>
  );
}