// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     name: '',
//     email : '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setError('');
//     setSuccess('');

//     const res = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || 'Something went wrong');
//     } else {
//       setSuccess(data.message);
//       setTimeout(() => router.push('/api/auth/signin'), 2000); // Redirect to sign-in page
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-bl from-black via-gray-900 to-indigo-400">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-semibold text-center mb-6">Create an Account</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
//         {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }






// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || 'Something went wrong');
//       } else {
//         setSuccess(data.message);
//         setTimeout(() => router.push('/api/auth/signin'), 2000);
//       }
//     } catch (err) {
//       setError('Failed to connect to the server');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 md:p-8">
//       <Card className="w-full max-w-md mx-auto animate-in fade-in-50 duration-500">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
//           <CardDescription className="text-center">
//             Enter your information to create your account
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <div className="relative">
//                 <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="John Doe"
//                   type="text"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="pl-10"
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   name="email"
//                   placeholder="you@example.com"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   name="password"
//                   placeholder="••••••••"
//                   type="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
            
//             {success && (
//               <Alert className="bg-green-50 text-green-700 border-green-200">
//                 <AlertDescription>{success}</AlertDescription>
//               </Alert>
//             )}
//           </CardContent>
          
//           <CardFooter>
//             <Button 
//               type="submit" 
//               className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

'use client';
import { useRef, Suspense } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setSuccess(data.message);
        setTimeout(() => router.push('/api/auth/signin'), 2000);
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Signup Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md mx-auto bg-background/20 backdrop-blur-sm border border-gray-200/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Create an Account</CardTitle>
            <CardDescription className="text-center font-bold text-white">
              Enter your information to create your FestFlow account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className='text-white'>Full Name</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/70"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className='text-white'>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className='text-white'>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/70"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}