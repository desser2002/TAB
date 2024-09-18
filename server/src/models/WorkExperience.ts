// models/WorkExperience.ts
import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для опыта работы
interface IWorkExperience extends Document {
  userId: string;
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
}

// Схема для работы
const WorkExperienceSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

// Модель для работы
const WorkExperience = mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);

export { WorkExperience, IWorkExperience };
