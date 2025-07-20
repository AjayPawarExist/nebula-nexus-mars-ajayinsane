import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 text-white">
      <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-10" />

      <div className="text-center max-w-md space-y-5">
        <h1 className="text-7xl font-bold text-red-500 tracking-tight">404</h1>
        <p className="text-xl font-medium text-neutral-200">Lost on Mars</p>
        <p className="text-sm text-neutral-400">
          This page drifted into space. It might have never existed or just got launched elsewhere.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button
            variant="secondary"
            asChild
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Link href="/">Return to Base</Link>
          </Button>
          <Button
            variant="destructive"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="mailto:contact@ajaypawar.com">Report Issue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
