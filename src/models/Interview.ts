import mongoose, { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema(
  {
    text: String,
    isAI: Boolean,
    isTechnical: Boolean,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ViolationSchema = new Schema(
  {
    name: String,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const QuestionFeedbackSchema = new Schema(
  {
    answer: String,
    feedback: String,
    masked: Boolean,
    question: String,
    score: Number,
  },
  { _id: false }
);


const EvaluationSchema = new Schema(
  {
    overall_feedback: String,
    question_wise: [QuestionFeedbackSchema],
    total_score: Number,
  },
  { _id: false }
);


const InterviewSchema = new Schema({
  applicationID: { type: String, required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  conversation: [ConversationSchema],
  violations: [ViolationSchema],
  evaluation: EvaluationSchema,
  headPoseCheatingUrl: String,
});

export const Interview =
  models.Interview || model("Interview", InterviewSchema);
