import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  short_description: string;
  full_description: string;
  location: string;
  salary: number;
  compani_id: number;
  publication_date: Date
}

const jobSchema: Schema = new Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true },
  full_description: { type: String, required: true },
  location: { type: String, required: true }, // Define location as a required string
  salary: { type: Number, required: true },   // Define salary as a required number
  compani_id: { type: Number, required: true }, // Define company ID as a required number
  publication_date: { type: Date, required: true } // Define publication date as a required date
});

export const Job = mongoose.model<IJob>('Job', jobSchema);
