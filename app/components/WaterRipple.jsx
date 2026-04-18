"use client";

import { useEffect, useRef } from "react";

export default function WaterRipple() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width = 0;
    let height = 0;
    let raf = 0;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      moved: false,
    };

    const nodesCount = 18;
    const nodes = Array.from({ length: nodesCount }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }));

    let idleFade = 1;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const cx = width * 0.5;
      const cy = height * 0.5;

      mouse.x = mouse.tx = cx;
      mouse.y = mouse.ty = cy;

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].x = cx;
        nodes[i].y = cy;
        nodes[i].vx = 0;
        nodes[i].vy = 0;
      }
    }

    function onMove(e) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.moved = true;
      idleFade = 1;
    }

    function onLeave() {
      mouse.moved = false;
    }

    function updateTrail() {
      mouse.x += (mouse.tx - mouse.x) * 0.3;
      mouse.y += (mouse.ty - mouse.y) * 0.3;

      nodes[0].x = mouse.x;
      nodes[0].y = mouse.y;
      nodes[0].vx = 0;
      nodes[0].vy = 0;

      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const p = nodes[i];

        p.vx = (prev.x - p.x) * 0.22;
        p.vy = (prev.y - p.y) * 0.22;

        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(prev.x - p.x) < 0.01) p.x = prev.x;
        if (Math.abs(prev.y - p.y) < 0.01) p.y = prev.y;
      }

      const speed = Math.hypot(mouse.tx - mouse.x, mouse.ty - mouse.y);

      if (speed < 0.08 && !mouse.moved) {
        idleFade *= 0.94;
      } else {
        idleFade += (1 - idleFade) * 0.15;
      }

      return speed;
    }

    function getSmoothPoint(i) {
      const p0 = nodes[Math.max(i - 1, 0)];
      const p1 = nodes[i];
      const p2 = nodes[Math.min(i + 1, nodes.length - 1)];
      const p3 = nodes[Math.min(i + 2, nodes.length - 1)];

      return { p0, p1, p2, p3 };
    }

    function catmullRom(p0, p1, p2, p3, t) {
      const t2 = t * t;
      const t3 = t2 * t;

      return {
        x:
          0.5 *
          ((2 * p1.x) +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          ((2 * p1.y) +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      };
    }

    function buildRibbon(speed) {
      const boost = Math.min(speed * 0.25, 4);
      const headWidth = 6 + boost;

      const samplesPerSegment = 4;
      const smoothPoints = [];

      for (let i = 0; i < nodes.length - 1; i++) {
        const { p0, p1, p2, p3 } = getSmoothPoint(i);

        for (let s = 0; s < samplesPerSegment; s++) {
          const t = s / samplesPerSegment;
          smoothPoints.push(catmullRom(p0, p1, p2, p3, t));
        }
      }

      smoothPoints.push({
        x: nodes[nodes.length - 1].x,
        y: nodes[nodes.length - 1].y,
      });

      return { smoothPoints, headWidth };
    }

    function drawRibbon(speed) {
      ctx.clearRect(0, 0, width, height);

      if (idleFade < 0.02) return;

      const { smoothPoints, headWidth } = buildRibbon(speed);
      if (smoothPoints.length < 2) return;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < smoothPoints.length - 1; i++) {
        const p1 = smoothPoints[i];
        const p2 = smoothPoints[i + 1];

        const prev = smoothPoints[Math.max(i - 1, 0)];
        const next = smoothPoints[Math.min(i + 2, smoothPoints.length - 1)];

        const dx1 = p2.x - prev.x;
        const dy1 = p2.y - prev.y;
        const len1 = Math.hypot(dx1, dy1) || 1;
        const nx1 = -dy1 / len1;
        const ny1 = dx1 / len1;

        const dx2 = next.x - p1.x;
        const dy2 = next.y - p1.y;
        const len2 = Math.hypot(dx2, dy2) || 1;
        const nx2 = -dy2 / len2;
        const ny2 = dx2 / len2;

        const t1 = 1 - i / (smoothPoints.length - 1);
        const t2 = 1 - (i + 1) / (smoothPoints.length - 1);

        const w1 = Math.max(0.05, headWidth * Math.pow(t1, 1.55) * idleFade);
        const w2 = Math.max(0.05, headWidth * Math.pow(t2, 1.55) * idleFade);

        const alpha = 0.9 * t1 * idleFade;

        ctx.beginPath();
        ctx.moveTo(p1.x + nx1 * w1, p1.y + ny1 * w1);
        ctx.lineTo(p2.x + nx2 * w2, p2.y + ny2 * w2);
        ctx.lineTo(p2.x - nx2 * w2, p2.y - ny2 * w2);
        ctx.lineTo(p1.x - nx1 * w1, p1.y - ny1 * w1);
        ctx.closePath();
        ctx.fillStyle = `rgba(170,255,140,${alpha})`;
        ctx.fill();
      }

      const head = { x: mouse.x, y: mouse.y };
      const tipRadius = Math.max(8, headWidth * 0.42);

      const outerGlow = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        tipRadius * 4
      );
      outerGlow.addColorStop(0, `rgba(230,255,220,${0.22 * idleFade})`);
      outerGlow.addColorStop(0.35, `rgba(170,255,140,${0.12 * idleFade})`);
      outerGlow.addColorStop(1, "rgba(170,255,140,0)");

      ctx.beginPath();
      ctx.arc(head.x, head.y, tipRadius * 4, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      const innerGlow = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        tipRadius * 1.8
      );
      innerGlow.addColorStop(0, `rgba(255,255,255,${0.95 * idleFade})`);
      innerGlow.addColorStop(0.45, `rgba(220,255,200,${0.75 * idleFade})`);
      innerGlow.addColorStop(1, `rgba(170,255,140,0)`);

      ctx.beginPath();
      ctx.arc(head.x, head.y, tipRadius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(head.x, head.y, tipRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,255,240,${0.98 * idleFade})`;
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      const speed = updateTrail();
      drawRibbon(speed);
      raf = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}