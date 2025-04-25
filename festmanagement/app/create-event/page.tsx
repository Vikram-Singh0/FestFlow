'use client';
import { useRef, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
<<<<<<< HEAD
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






=======
import { motion } from "framer-motion";
import { Loader2, CalendarCheck, MapPin, DollarSign, Ticket, FileText } from "lucide-react";
>>>>>>> a3e8ed90a7cb3ea0fc03fd642f847ffca2894ab2

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

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

      setFormData({ eventName: "", description: "", location: "", price: "", ticketsAvailable: "" });
      setTimeout(() => router.push("/event-success"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950 py-10 px-4">
        <div className="max-w-xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl border-t-4 border-t-amber-500">
          <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-400 mb-2">Authentication Required</h2>
          <p className="text-amber-600 dark:text-amber-300/80 mb-4">Please log in to create an event.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD

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
=======
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container max-w-2xl mx-auto"
>>>>>>> a3e8ed90a7cb3ea0fc03fd642f847ffca2894ab2
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
            <div className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Create New Event</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Fill in the details to create your event</p>
            </div>

            {error && (
              <div className="bg-red-50/90 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 border-b border-red-100 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Name</label>
                <div className="relative">
                  <CalendarCheck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="eventName"
                    placeholder="Enter event name"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="description"
                    placeholder="Describe your event"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors min-h-[120px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Event location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price (INR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Available Tickets</label>
                  <div className="relative">
                    <Ticket className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="ticketsAvailable"
                      placeholder="100"
                      value={formData.ticketsAvailable}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-70 shadow-lg hover:shadow-purple-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
    </div>
  );
}