import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string;
}

const jobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true }
});

export const Job = mongoose.model<IJob>('Job', jobSchema);