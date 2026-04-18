"use client";

import { useEffect, useRef, useState } from "react";

export default function CanvasLoader({ onFinish }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationFrame;
    let start = performance.now();

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const particles = Array.from({ length: 90 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 40 + Math.random() * 180,
      size: 0.6 + Math.random() * 2.2,
      speed: 0.002 + Math.random() * 0.006,
      offset: Math.random() * 1000,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function drawBackground(time, progress) {
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        40,
        width * 0.5,
        height * 0.42,
        Math.max(width, height) * 0.65
      );
      g.addColorStop(0, "rgba(255, 80, 20, 0.28)");
      g.addColorStop(0.35, "rgba(255, 60, 10, 0.12)");
      g.addColorStop(1, "rgba(0, 0, 0, 1)");

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const pulse = 1 + Math.sin(time * 0.002) * 0.04;
      const sunRadius = Math.min(width, height) * 0.16 * pulse;

      const sun = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        0,
        width * 0.5,
        height * 0.42,
        sunRadius
      );
      sun.addColorStop(0, "rgba(255, 120, 40, 1)");
      sun.addColorStop(0.45, "rgba(255, 70, 20, 0.95)");
      sun.addColorStop(1, "rgba(255, 30, 10, 0.3)");

      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.42, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = sun;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.42, sunRadius * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 120, 40, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.42, sunRadius * 1.55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 120, 40, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const lineY = height * 0.72;
      const lineGlow = ctx.createLinearGradient(0, lineY, width, lineY);
      lineGlow.addColorStop(0, "rgba(255, 91, 25, 0)");
      lineGlow.addColorStop(0.5, "rgba(255, 91, 25, 0.7)");
      lineGlow.addColorStop(1, "rgba(255, 91, 25, 0)");

      ctx.beginPath();
      ctx.moveTo(width * 0.18, lineY);
      ctx.lineTo(width * 0.82, lineY);
      ctx.strokeStyle = lineGlow;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const fillWidth = width * 0.34;
      const fillX = width * 0.5 - fillWidth / 2;
      const progressWidth = fillWidth * progress;

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      roundRect(ctx, fillX, lineY + 28, fillWidth, 6, 999);
      ctx.fill();

      const prog = ctx.createLinearGradient(fillX, 0, fillX + progressWidth, 0);
      prog.addColorStop(0, "rgba(255, 150, 90, 0.95)");
      prog.addColorStop(1, "rgba(255, 91, 25, 1)");

      ctx.fillStyle = prog;
      roundRect(ctx, fillX, lineY + 28, progressWidth, 6, 999);
      ctx.fill();
    }

    function drawParticles(time) {
      const cx = width * 0.5;
      const cy = height * 0.42;

      for (const p of particles) {
        const angle = p.angle + time * p.speed;
        const wave = Math.sin(time * 0.0015 + p.offset) * 12;
        const r = p.radius + wave;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.58;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 180, 120, 0.45)";
        ctx.fill();
      }
    }

    function drawText(progress) {
      const titleSize = Math.max(30, Math.min(width * 0.05, 64));
      const smallSize = Math.max(12, Math.min(width * 0.011, 14));
      const lineY = height * 0.72;

      ctx.textAlign = "center";

      ctx.font = `600 ${titleSize}px serif`;
      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.fillText("Loading Experience", width * 0.5, lineY - 52);

      ctx.font = `400 ${smallSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.56)";
      ctx.fillText("Preparing the interface...", width * 0.5, lineY - 18);

      ctx.font = `500 ${smallSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = "rgba(255,140,90,0.95)";
      ctx.fillText(`${Math.round(progress * 100)}%`, width * 0.5, lineY + 54);
    }

    function animate(now) {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / 2600, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);

      ctx.clearRect(0, 0, width, height);
      drawBackground(now, eased);
      drawParticles(now);
      drawText(eased);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          onFinish?.();
        }, 350);
      }
    }

    function roundRect(ctx, x, y, w, h, r) {
      const radius = Math.min(r, h / 2, w / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    }

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}