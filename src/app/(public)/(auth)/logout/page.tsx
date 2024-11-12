"use client";

import { useAppContext } from "@/components/app-provider";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams();
  const refreshTokenFromUrl = searchParam.get("refreshToken");
  const accessTokenFromUrl = searchParam.get("accessToken");
  const router = useRouter();
  const {setIsAuth} = useAppContext()
  useEffect(() => {
    if (
      (refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl === getAccessTokenFromLocalStorage())
    ) {
      mutateAsync().then(() => {
        setIsAuth(false)
        router.push("/login");
      });
    } else {
      router.push('/')
    }
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl, setIsAuth]);
  return <div>Logout...</div>;
}

export default Logout;
