import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Interview } from "@/models/Interview";

// GET all interviews
export async function GET() {
  await connectDB();
  const interviews = await Interview.find();
  return NextResponse.json(interviews);
}

// CREATE new interview
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  // check if an interview with the same applicationID already exists
  const existingInterview = await Interview.findOne({ applicationID: data.applicationID });
  if (existingInterview) {
    return NextResponse.json({ success: false, message: "Interview with the same applicationID already exists" }, { status: 409 });
  }
  
  const newInterview = await Interview.create({
    applicationID: data.applicationID,
    startedAt: data.startedAt,
    status: data.status || "ongoing",
    conversation: [],
    violations: [],
  });

  return NextResponse.json({success: true, message: "Interview created successfully", data: newInterview}, { status: 201 });
}
