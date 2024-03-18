import { Document, Schema, models, model } from "mongoose";

export interface IAnswer extends Document{
  content: string;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer