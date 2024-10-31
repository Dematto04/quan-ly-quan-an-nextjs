"use client";

import { getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

function Logout() {
  const { mutateAsync } = useLogoutMutation();
  const searchParam = useSearchParams()
  const refreshTokenFromUrl = searchParam.get('refreshToken')
  const router = useRouter();
  useEffect(() => {
    if(refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()){
        return
    }
    mutateAsync().then((res) => {
      router.push("/login");
    });
  }, [mutateAsync, router]);
  return <div>Logout...</div>;
}

export default Logout;
