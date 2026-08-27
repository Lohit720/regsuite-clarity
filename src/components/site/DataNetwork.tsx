import { useEffect, useRef } from "react";

/**
 * Subtle ambient "intelligent data environment" for the hero:
 * slow-drifting nodes, thin connecting lines, occasional pulses and a
 * faint grid — rendered on a canvas behind the typography.
 */
export function DataNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const TEAL = "20, 165, 140";
    const BLUE = "100, 206, 251";

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      blue: boolean;
      phase: number;
    };
    let nodes: Node[] = [];

    type Pulse = { a: number; b: number; t: number; speed: number };
    let pulses: Pulse[] = [];

    const LINK_DIST = 170;

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(64, Math.floor((width * height) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.6,
        blue: Math.random() < 0.22,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function spawnPulse(pairs: [number, number][]) {
      if (pulses.length > 5 || pairs.length === 0) return;
      const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      pulses.push({ a, b, t: 0, speed: 0.004 + Math.random() * 0.004 });
    }

    let last = 0;
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      // ~30fps is plenty for a slow ambient layer and keeps it cheap
      if (now - last < 33) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Faint grid
      ctx.strokeStyle = `rgba(${TEAL}, 0.035)`;
      ctx.lineWidth = 1;
      const step = 96;
      ctx.beginPath();
      for (let x = 0.5; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0.5; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += 0.008;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Links
      const pairs: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            pairs.push([i, j]);
            const alpha = (1 - d / LINK_DIST) * 0.14;
            ctx.strokeStyle = `rgba(${TEAL}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Pulses travelling along links
      if (Math.random() < 0.03) spawnPulse(pairs);
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(Math.PI * Math.min(p.t, 1));
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, `rgba(${BLUE}, ${0.5 * fade})`);
        grad.addColorStop(1, `rgba(${BLUE}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes (gentle breathing glow)
      for (const n of nodes) {
        const breathe = 0.5 + 0.5 * Math.sin(n.phase);
        const alpha = 0.18 + breathe * 0.3;
        const color = n.blue ? BLUE : TEAL;
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.blue) {
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-70"
    />
  );
}
