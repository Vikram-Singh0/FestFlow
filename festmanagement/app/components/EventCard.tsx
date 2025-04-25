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

'use client';

import { useState } from 'react';

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

export default function EventCard({ event }: EventProps) {
  const [walletAddress, setWalletAddress] = useState("");

  const handleBuyClick = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to proceed.");
      return;
    }

    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        console.log("Wallet connected:", address);

        // You can now proceed to trigger payment or NFT logic
        alert(`Connected to wallet: ${address}`);
      }
    } catch (err) {
      console.error("MetaMask error:", err);
      alert("Failed to connect wallet.");
    }
  };

  return (
    <div className=" shadow-md rounded-xl p-6 flex flex-col  bg-background/20 backdrop:blur-sm justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-300">{event.eventName}</h2>
        <p className="text-slate-400 text-sm mb-2">{event.description}</p>
        <p className="text-sm text-gray-400 mb-1">📍 {event.location}</p>
        <p className="text-sm text-gray-400">💰 ₹{event.price}</p>
        <p className="text-sm text-gray-400">🎟️ Tickets: {event.ticketsAvailable}</p>
      </div>
      <button
        className="mt-4 bg-background/20 border-2 bg-blue-300 border-blue-500 backdrop-blur-sm text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        onClick={handleBuyClick}
      >
        Buy
      </button>
    </div>
  );
}
