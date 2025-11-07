import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Interview } from "@/models/Interview";

// GET single interview
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const interview = await Interview.findById(params.id);
  if (!interview) {
    return NextResponse.json(
      { success: false, error: "Interview not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: interview });
}

// PATCH interview (add message or violation, or update status)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await req.json();
  const updateOps: any = {};

  // Add conversation message
  if (data.conversation) updateOps.$push = { conversation: data.conversation };

  // Add violation
  if (data.violation)
    updateOps.$push = { ...updateOps.$push, violations: data.violation };

  // Update status / end time
  if (data.status)
    updateOps.$set = {
      status: data.status,
      endedAt: data.endedAt || new Date(),
    };

  const updated = await Interview.findByIdAndUpdate(params.id, updateOps, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE interview
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const deleted = await Interview.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Interview deleted successfully" });
}
