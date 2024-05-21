import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  location: string;
  industry: string;
}

const companySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true }
});

export const Company = mongoose.model<ICompany>('Company', companySchema);
