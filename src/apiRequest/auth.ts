import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
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
  sRefreshToken: (body: RefreshTokenBodyType) => {
    return http.post<RefreshTokenResType>("/auth/refresh-token", body);
  },
  async refreshToken(){
    if(this.refreshTokenRequest){
      return this.refreshToken
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>("/api/auth/refresh-token", null, {
      baseUrl: "",
    });
    const result = await this.refreshTokenRequest
    this.refreshTokenRequest = null
    return result
  },
};

export default authApiRequest;
