"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function CopyListenerClient() {
  useEffect(() => {
    const handleCopy = () => {
      toast.success("Copied!", {
        position: "top-center",
      });
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, []);

  return null;
}
