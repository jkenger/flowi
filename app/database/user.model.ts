import { Document, Schema, models, model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  password?: string;
  bio?: string;
  avatar: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: Schema.Types.ObjectId[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String },
  bio: { type: String },
  avatar: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
});

const User =
  models.User || model<IUser>("User", UserSchema);

export default User;
