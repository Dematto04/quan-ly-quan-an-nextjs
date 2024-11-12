import authApiRequest from "@/apiRequest/auth";

import { cookies } from "next/headers";
export async function POST() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const refreshToken = (await cookieStore).get("refreshToken")?.value;
  (await cookieStore).delete("accessToken");
  (await cookieStore).delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "Không nhận được acccessToken hoặc refreshToken",
      },
      { status: 200 }
    );
  }
  try {
    const result = await authApiRequest.sLogout({ refreshToken, accessToken });

    return Response.json(result.payload);
  } catch (error: any) {
    return Response.json(
      {
        message: error.message || "Lỗi khi gọi đến server",
      },
      {
        status: 200
      }
    );
  }
}
