"use client";

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function RefreshTokenPage() {
 
  const searchParam = useSearchParams();
  const refreshTokenFromUrl = searchParam.get("refreshToken");
  const redirectPathname = searchParam.get("redirect");
  const router = useRouter();
  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: ()=> {
          router.push(redirectPathname || '/')
        },
      })
    } else{
      router.push('/')
    }
  
  }, [router, refreshTokenFromUrl, redirectPathname]);
  return <div>Refreshing...</div>;
}

export default RefreshTokenPage;
