import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const getUser = async (jwt: string) => {
  try {
    const response = await axios.get(`${process.env.Base_URL}:8085/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data.success;
  } catch (error: any) {
    console.error("Error getting user:", error.message);
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value || "";
  const validated = await getUser(jwt);

  if (!validated) {
    // Create redirect response
    const response = NextResponse.redirect(
      new URL("/?error=unauthorized", request.url)
    );
    // Delete the jwt cookie
    response.cookies.delete("jwt");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
