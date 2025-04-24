// app/models/Event.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
  description: string;
  location: string;
  price: number;
  ticketsAvailable: number;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    ticketsAvailable: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Event || model<IEvent>("Event", EventSchema);
