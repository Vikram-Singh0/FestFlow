import { authOptions } from '@/app/lib/auth';
// app/api/events/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import Event from "@/app/models/Event";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    const { eventName, description, location, price, ticketsAvailable } = body;

    if (!eventName || !description || !location || !price || !ticketsAvailable) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newEvent = await Event.create({
      eventName,
      description,
      location,
      price,
      ticketsAvailable,
    });

    return NextResponse.json({ message: "Event created", event: newEvent }, { status: 201 });
  } catch (err) {
    console.error("Error creating event:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
