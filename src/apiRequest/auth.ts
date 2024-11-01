import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) => {
    return http.post<LoginResType>("/auth/login", body);
  },
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    });
  },
  sLogout: (body: LogoutBodyType & { accessToken: string }) => {
    return http.post(
      "/auth/logout",
      { refreshToken: body.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    );
  },
  logout: () => {
    return http.post("/api/auth/logout", null, { baseUrl: "" });
  },
};

export default authApiRequest;
