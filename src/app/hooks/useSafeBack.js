"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSafeBack() {
  const router = useRouter();

  const safeBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return safeBack;
}
