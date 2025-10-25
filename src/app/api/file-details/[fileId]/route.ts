// =============================================================================
// FOR APP ROUTER (app/api/file-details/[fileId]/route.ts)
// =============================================================================

import { NextRequest, NextResponse } from "next/server";

// GET FILE DETAILS
export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    if (!fileId) {
      return NextResponse.json(
        { error: "Bad Request", message: "File ID is required" },
        { status: 400 }
      );
    }

    const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!IMAGEKIT_PRIVATE_KEY) {
      console.error("IMAGEKIT_PRIVATE_KEY not found in environment variables");
      return NextResponse.json(
        {
          error: "Internal server error",
          message: "ImageKit configuration missing",
        },
        { status: 500 }
      );
    }

    const apiUrl = `https://api.imagekit.io/v1/files/${fileId}/details`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${IMAGEKIT_PRIVATE_KEY}:`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = {
          error: "API Error",
          message: responseText,
          status: response.status,
        };
      }

      return NextResponse.json(errorData, { status: response.status });
    }

    const fileDetails = await response.json();

    return NextResponse.json(fileDetails, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error: any) {
    console.error("Error fetching file details:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "Failed to fetch file details",
      },
      { status: 500 }
    );
  }
}

// DELETE FILE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    if (!fileId) {
      return NextResponse.json(
        { error: "Bad Request", message: "File ID is required" },
        { status: 400 }
      );
    }

    const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!IMAGEKIT_PRIVATE_KEY) {
      console.error("IMAGEKIT_PRIVATE_KEY not found in environment variables");
      return NextResponse.json(
        {
          error: "Internal server error",
          message: "ImageKit configuration missing",
        },
        { status: 500 }
      );
    }

    const apiUrl = `https://api.imagekit.io/v1/files/${fileId}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${IMAGEKIT_PRIVATE_KEY}:`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = {
          error: "API Error",
          message: responseText,
          status: response.status,
        };
      }

      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json(
      { success: true, message: "File deleted successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error: any) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "Failed to delete file",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS (App Router)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
