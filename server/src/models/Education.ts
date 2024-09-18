// models/Education.ts
import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для образования
interface IEducation extends Document {
  userId: string;
  university: string;
  specialization: string;
  startYear: number;
  endYear: number;
}

// Схема для образования
const EducationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  university: { type: String, required: true },
  specialization: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true }
});

// Модель для образования
const Education = mongoose.model<IEducation>('Education', EducationSchema);

export { Education, IEducation };
