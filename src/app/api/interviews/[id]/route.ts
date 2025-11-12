import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Interview } from "@/models/Interview";

// GET single interview
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  // get interview by application ID
  const interview = await Interview.findOne({ applicationID: params.id });
  if (!interview) {
    return NextResponse.json(
      { success: false, message: "Interview not found", data: null },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: "Interview found", data: interview });
}

// PATCH interview (add message or violation, or update status)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();
  const data = await req.json();
  const updateOps: any = {};

  if (data.conversation) {
    updateOps.$push = { conversation: data.conversation };
  }

  if (data.violation) {
    updateOps.$push = { ...updateOps.$push, violations: data.violation };
  }

  // Initialize $set if it doesn't exist
  if (!updateOps.$set) {
    updateOps.$set = {};
  }

  if (data.evaluation) {
    updateOps.$set.evaluation = data.evaluation;
  }

  if (data.status) {
    updateOps.$set.status = data.status;
    updateOps.$set.endedAt = data.endedAt || new Date();
  }
  const updated = await Interview.findOneAndUpdate(
    { applicationID: id },
    updateOps,
    { new: true, runValidators: true } // Added runValidators
  );

  if (!updated)
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });

  return NextResponse.json({success: true, message: "Interview updated successfully", data: updated });
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
