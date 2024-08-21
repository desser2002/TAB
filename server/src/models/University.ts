import mongoose, { Document, Schema } from "mongoose";

export interface IUniversity extends Document {
  name: string;
  location: string;
}

const universitySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

export const University = mongoose.model<IUniversity>(
  "University",
  universitySchema
);
