"use client";
import {
  checkAndRefreshToken,
} from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation"; 
import React, { useEffect } from "react";
;
//Không check những page này
const UNAUTHENTICATED_PATH = ["/login", "/logout", "/refresh-token"];
function RefreshToken() {
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathName)) return;

    let interval: any = null;

    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
        router.push("/login");
      },
    });
    const TIMEOUT = 1000;
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
            router.push("/login");
          },
        }),
      TIMEOUT
    );
    return () => {
      clearInterval(interval);
    };
  }, [pathName, router]);
  return <></>;
}

export default RefreshToken;
