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

  const newInterview = await Interview.create({
    applicationID: data.applicationID,
    startedAt: data.startedAt,
    status: data.status || "ongoing",
    conversation: [],
    violations: [],
  });

  return NextResponse.json(newInterview, { status: 201 });
}
