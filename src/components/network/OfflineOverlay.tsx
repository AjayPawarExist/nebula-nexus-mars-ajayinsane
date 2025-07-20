"use client";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function OfflineOverlay() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 backdrop-blur-xs bg-black/20 pointer-events-auto" />
      <div className="relative z-10 text-center text-xl font-bold text-red-800 bg-red-100 border border-red-300 rounded-lg p-6 shadow-lg max-w-md mx-auto">
        ⚠️ <span className="uppercase">You&apos;re offline!</span><br />
        <span className="text-base font-medium normal-case">
          Please check your internet connection.
        </span>
      </div>
    </div>
  );
}
