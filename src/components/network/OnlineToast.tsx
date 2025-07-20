"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function OnlineToast() {
  const isOnline = useNetworkStatus();
  const last = useRef(isOnline);

  useEffect(() => {
    if (last.current !== isOnline) {
      const showToast = () => {
        if (isOnline) {
          toast.success("You're back online", { position: "top-center" });
        } else {
          toast.warning("You're offline", { position: "top-center" });
        }
      };
      showToast();
      last.current = isOnline;
    }
  }, [isOnline]);

  return null;
}
