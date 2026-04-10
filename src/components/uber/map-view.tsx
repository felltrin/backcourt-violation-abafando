"use client";

import { useEffect, useRef } from "react";

interface MapViewProps {
  pickupCoords?: { lat: number; lng: number };
  dropoffCoords?: { lat: number; lng: number };
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number };
}

export function MapView({
  pickupCoords,
  dropoffCoords,
  showRoute = false,
  driverLocation,
}: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    // Dark map background
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Draw grid streets
    ctx.strokeStyle = "#252545";
    ctx.lineWidth = 1;

    // Horizontal streets
    for (let i = 0; i < h; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
    // Vertical streets
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }

    // Draw wider main roads
    ctx.strokeStyle = "#303060";
    ctx.lineWidth = 3;
    const mainRoadsH = [h * 0.25, h * 0.5, h * 0.75];
    const mainRoadsV = [w * 0.2, w * 0.5, w * 0.8];
    mainRoadsH.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    });
    mainRoadsV.forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    });

    // Draw diagonal avenue
    ctx.strokeStyle = "#353570";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.1);
    ctx.lineTo(w, h * 0.9);
    ctx.stroke();

    // Draw blocks / buildings
    ctx.fillStyle = "#1f1f3a";
    for (let row = 0; row < h; row += 40) {
      for (let col = 0; col < w; col += 40) {
        if (Math.random() > 0.4) {
          const bx = col + 4;
          const by = row + 4;
          const bw = 32 * (0.6 + Math.random() * 0.3);
          const bh = 32 * (0.6 + Math.random() * 0.3);
          ctx.fillRect(bx, by, bw, bh);
        }
      }
    }

    // Draw parks (green areas)
    ctx.fillStyle = "#1a2e1a";
    ctx.fillRect(w * 0.1, h * 0.6, w * 0.15, h * 0.12);
    ctx.fillRect(w * 0.65, h * 0.2, w * 0.12, h * 0.15);

    // Water feature
    ctx.fillStyle = "#151530";
    ctx.beginPath();
    ctx.ellipse(w * 0.85, h * 0.85, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pickup marker
    const pickupX = pickupCoords ? w * 0.35 : w * 0.5;
    const pickupY = pickupCoords ? h * 0.55 : h * 0.5;

    // Pulsing circle effect
    ctx.beginPath();
    ctx.arc(pickupX, pickupY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(pickupX, pickupY, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fill();

    // Center dot
    ctx.beginPath();
    ctx.arc(pickupX, pickupY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(pickupX, pickupY, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    if (showRoute && dropoffCoords) {
      const dropoffX = w * 0.7;
      const dropoffY = h * 0.3;

      // Route line
      ctx.beginPath();
      ctx.moveTo(pickupX, pickupY);
      ctx.bezierCurveTo(
        pickupX + 60,
        pickupY - 40,
        dropoffX - 60,
        dropoffY + 40,
        dropoffX,
        dropoffY,
      );
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.stroke();

      // Route glow
      ctx.beginPath();
      ctx.moveTo(pickupX, pickupY);
      ctx.bezierCurveTo(
        pickupX + 60,
        pickupY - 40,
        dropoffX - 60,
        dropoffY + 40,
        dropoffX,
        dropoffY,
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 8;
      ctx.stroke();

      // Dropoff marker (square)
      ctx.fillStyle = "#000000";
      ctx.fillRect(dropoffX - 7, dropoffY - 7, 14, 14);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(dropoffX - 5, dropoffY - 5, 10, 10);
    }

    // Driver car icon
    if (driverLocation) {
      const driverX = pickupX - 60;
      const driverY = pickupY - 40;

      ctx.save();
      ctx.translate(driverX, driverY);
      ctx.rotate(Math.PI / 4);

      // Car body
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(-8, -14, 16, 28, 6);
      ctx.fill();

      // Car windows
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(-5, -8, 10, 6);
      ctx.fillRect(-5, 4, 10, 6);

      ctx.restore();
    }
  }, [pickupCoords, dropoffCoords, showRoute, driverLocation]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1a2e]">
      <canvas
        ref={canvasRef}
        className="w-lh h-lh"
        style={{ display: "block" }}
      />
      {/* Map attribution */}
      <div className="bg-background/60 text-muted-foreground absolute right-2 bottom-2 rounded px-2 py-1 text-[10px] backdrop-blur-sm">
        Map data (mock)
      </div>
    </div>
  );
}
