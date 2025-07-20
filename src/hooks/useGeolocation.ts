// hooks/useGeolocation.ts
"use client";

import { useEffect, useState } from "react";

interface GeolocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isGranted: boolean;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
    error: null,
    isGranted: false,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isGranted: true,
        });
      },
      (err) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: err.message,
          isGranted: false,
        });
      }
    );
  };

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" as PermissionName }).then((result) => {
        if (result.state === "granted") getLocation();
        // if 'prompt' or 'denied', wait for user to trigger manually
      });
    }
  }, []);

  return { ...location, getLocation };
}
