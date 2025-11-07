import mongoose, { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema({
  text: String,
  isAI: Boolean,
  timestamp: Date,
});

const ViolationSchema = new Schema({
  name: String,
  timestamp: Date,
});

const InterviewSchema = new Schema({
  applicationID: { type: String, required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  conversation: [ConversationSchema],
  violations: [ViolationSchema],
});

export const Interview =
  models.Interview || model("Interview", InterviewSchema);
