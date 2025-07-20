"use client"

import React from "react";
import { ShootingStars } from "./shooting-stars";

export default function Star() {
  return (
    <>
      {/* Shooting stars with varied colors and speeds */}
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStars
        starColor="#FF0099"
        trailColor="#FFB800"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
      />
      <ShootingStars
        starColor="#00FF9E"
        trailColor="#00B8FF"
        minSpeed={20}
        maxSpeed={40}
        minDelay={1500}
        maxDelay={3500}
      />

      {/* Static star background */}
      <div className="stars absolute inset-0 -z-10"></div>

      <style jsx>{`
        .stars {
          background-image:
            radial-gradient(1px 1px at 10% 20%, #eee, transparent),
            radial-gradient(1px 1px at 30% 80%, #fff, transparent),
            radial-gradient(1px 1px at 50% 50%, #aaa, transparent),
            radial-gradient(1px 1px at 70% 10%, #fff, transparent),
            radial-gradient(1px 1px at 90% 60%, #ccc, transparent),
            radial-gradient(1px 1px at 20% 70%, #fff, transparent),
            radial-gradient(1px 1px at 40% 30%, #ddd, transparent),
            radial-gradient(1px 1px at 60% 90%, #eee, transparent),
            radial-gradient(1px 1px at 80% 40%, #bbb, transparent),
            radial-gradient(1px 1px at 25% 25%, #fff, transparent);
          background-repeat: repeat;
          background-size: 300px 300px;
          animation: twinkle 6s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
