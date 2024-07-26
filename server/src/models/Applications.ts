import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IApplications extends Document {
  cv_url: string;
  email: string;
  user: IUser["_id"];
  job: IJob["_id"];
}

const ApplicationSchema: Schema = new Schema({
  cv_url: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
});

export const Applications = mongoose.model<IApplications>(
  "Application",
  ApplicationSchema
);
// id int
// cv_url varchar
// user_id int
// job_id
