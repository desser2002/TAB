  import mongoose, { Document, Schema } from 'mongoose';
  import { IUser } from './User';
  import { ICompany } from './Company';

  // Модель администратора
  export interface IAdmin extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    companyIds: mongoose.Schema.Types.ObjectId[];
  }

  const adminSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }]
  });

  export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
