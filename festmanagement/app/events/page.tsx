// app/events/page.tsx
import Event from "@/app/models/Event";
import { connectDB } from "@/app/lib/mongodb";
import EventCard from "@/app/components/EventCard";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  await connectDB();

  const rawEvents = await Event.find().lean();
  const events = rawEvents.map((event: any) => ({
    ...event,
    _id: event._id.toString(),
    createdAt: event.createdAt?.toString(),
    updatedAt: event.updatedAt?.toString(),
  }));

  return (
    <div className=" mx-auto p-6 bg-black h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-300 text-center">Available Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-backgroud/20 backdrop-blur-sm gap-6">
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
