// Job.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ICompany } from './Company';

export interface IJob extends Document {
  title: string;
  short_description: string;
  full_description: string;
  location: string;
  salary: number;
  company: ICompany['_id'];
  publication_date: Date;
}

const jobSchema: Schema = new Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true },
  full_description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  publication_date: { type: Date, required: true }
});

export const Job = mongoose.model<IJob>('Job', jobSchema);
