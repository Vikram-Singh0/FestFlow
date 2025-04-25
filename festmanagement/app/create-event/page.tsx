'use client';
import { useRef, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Group } from "three";



// Particle Ring Configuration
const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "6366f1";
const RIGHT_COLOR = "8b5cf6";
const NUM_POINTS = 2500;

interface Point {
  idx: number;
  position: [number, number, number];
  color: string;
}

const getGradientStop = (ratio: number): string => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;
  const c0 = LEFT_COLOR.match(/.{1,2}/g)!.map((oct) => parseInt(oct, 16) * (1 - ratio));
  const c1 = RIGHT_COLOR.match(/.{1,2}/g)!.map((oct) => parseInt(oct, 16) * ratio);
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci.reduce((a, v) => (a << 8) + v, 0).toString(16).padStart(6, "0");
  return `#${color}`;
};

const calculateColor = (x: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  return getGradientStop(ratio);
};

const randomFromInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const createPoints = (count: number, isOuter = false): Point[] => {
  return Array.from({ length: count }, (_, idx) => {
    const randomRadius = randomFromInterval(
      isOuter ? MIN_RADIUS / 2 : MIN_RADIUS,
      isOuter ? MAX_RADIUS * 2 : MAX_RADIUS
    );
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = randomFromInterval(-DEPTH * (isOuter ? 10 : 1), DEPTH * (isOuter ? 10 : 1));

 return {
      idx,
      position: [x, y, z],
      color: calculateColor(x),
    };
  });
};

const pointsInner = createPoints(NUM_POINTS);
const pointsOuter = createPoints(NUM_POINTS / 4, true);

const PointCircle = () => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};
const Point = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};







export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    location: "",
    price: "",
    ticketsAvailable: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          ticketsAvailable: Number(formData.ticketsAvailable),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess("Event created successfully!");
      setFormData({ eventName: "", description: "", location: "", price: "", ticketsAvailable: "" });
    //   setTimeout(() => router.push("/"), 2000); // Redirect after 2 sec
    setTimeout(() => router.push("/event-success"), 2000);

    } catch (err: any) {
      setError(err.message);
    }
  };

  if (status === "loading") return <p className="text-center mt-4">Loading...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-4">Please log in to create an event.</p>;

  return (

<div className="relative min-h-screen w-full overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: [10, -7.5, -5],
          }}
          className="bg-black"
        >
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <directionalLight intensity={0.5} />
          <pointLight position={[-30, 0, -30]} power={10.0} />
          <PointCircle />
        </Canvas>
      </div>





    
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-background/20 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Event</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-white"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-white"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (INR)"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-white"
          required
        />
        <input
          type="number"
          name="ticketsAvailable"
          placeholder="Tickets Available"
          value={formData.ticketsAvailable}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}
