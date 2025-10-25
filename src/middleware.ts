import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const Base_URL_users = process.env.Base_URL_users;

const getUser = async (jwt: string) => {
  try {
    const url = `${Base_URL_users}/users/me`;
    const response = await axios.get(url, {
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
  matcher: ["/account", "/organizations"],
};
