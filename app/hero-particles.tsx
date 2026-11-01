"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  phase: number;
  radius: number;
  brightness: number;
  tier: 0 | 1 | 2;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let tiers: Particle[][] = [[], [], []];
    let portraitLayer: HTMLCanvasElement | null = null;
    let portraitScale = 0;
    let pointer = { x: -1000, y: -1000 };
    let isVisible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const portrait = new Image();
    portrait.src = "/more-priyo.jpeg";

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (!portrait.complete || portrait.naturalWidth === 0) return;

      const shape = document.createElement("canvas");
      shape.width = 600;
      shape.height = 770;
      const shapeContext = shape.getContext("2d", { willReadFrequently: true });
      if (!shapeContext) return;

      const imageScale = Math.min(shape.width / portrait.naturalWidth, shape.height / portrait.naturalHeight);
      const imageWidth = portrait.naturalWidth * imageScale;
      const imageHeight = portrait.naturalHeight * imageScale;
      shapeContext.drawImage(portrait, (shape.width - imageWidth) / 2, (shape.height - imageHeight) / 2, imageWidth, imageHeight);

      const imageData = shapeContext.getImageData(0, 0, shape.width, shape.height);
      const pixels = imageData.data;
      const background = [pixels[0], pixels[1], pixels[2]];
      for (let pixel = 0; pixel < pixels.length; pixel += 4) {
        const red = pixels[pixel];
        const green = pixels[pixel + 1];
        const blue = pixels[pixel + 2];
        const contrast = Math.hypot(red - background[0], green - background[1], blue - background[2]);
        const lightBlueBackdrop = blue > 165 && blue > red * 1.06 && blue > green * 1.025 && red > 125 && green > 145;
        if (lightBlueBackdrop || contrast < 18) pixels[pixel + 3] = 0;
        else if (contrast < 52) pixels[pixel + 3] = Math.round(pixels[pixel + 3] * ((contrast - 18) / 34));
      }

      // Bake filter once into the offscreen portraitLayer so per-frame draw has zero filter cost
      const rawLayer = document.createElement("canvas");
      rawLayer.width = shape.width;
      rawLayer.height = shape.height;
      rawLayer.getContext("2d")?.putImageData(imageData, 0, 0);

      portraitLayer = document.createElement("canvas");
      portraitLayer.width = shape.width;
      portraitLayer.height = shape.height;
      const pCtx = portraitLayer.getContext("2d");
      if (pCtx) {
        pCtx.filter = "grayscale(0.45) brightness(0.9) contrast(1.08)";
        pCtx.drawImage(rawLayer, 0, 0);
      }

      const stride = width < 600 ? 7 : 6;
      const scale = Math.min((width * 0.95) / shape.width, (height * 1.22) / shape.height, 1.12);
      portraitScale = scale;
      tiers = [[], [], []];

      for (let y = 0; y < shape.height; y += stride) {
        for (let x = 0; x < shape.width; x += stride) {
          const pixel = (y * shape.width + x) * 4;
          const red = pixels[pixel];
          const green = pixels[pixel + 1];
          const blue = pixels[pixel + 2];
          const alpha = pixels[pixel + 3];
          const contrast = Math.hypot(red - background[0], green - background[1], blue - background[2]);
          const lightBlueBackdrop = blue > 165 && blue > red * 1.06 && blue > green * 1.025 && red > 125 && green > 145;
          if (alpha < 30 || contrast < 28 || lightBlueBackdrop) continue;

          const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
          const tier: 0 | 1 | 2 = brightness > 210 ? 0 : brightness > 115 ? 1 : 2;
          tiers[tier].push({
            x: (x - shape.width / 2) * scale + width / 2,
            y: (y - shape.height / 2) * scale + height / 2 - height * 0.1,
            phase: Math.random() * Math.PI * 2,
            radius: 0.65 + (brightness / 255) * 1.2,
            brightness,
            tier,
          });
        }
      }
      draw(0);
    };

    const draw = (time: number) => {
      if (!isVisible) return;
      context.clearRect(0, 0, width, height);
      if (portraitLayer) {
        context.save();
        context.globalAlpha = 0.48;
        context.drawImage(
          portraitLayer,
          (width - portraitLayer.width * portraitScale) / 2,
          (height - portraitLayer.height * portraitScale) / 2 - height * 0.1,
          portraitLayer.width * portraitScale,
          portraitLayer.height * portraitScale,
        );
        context.restore();
      }

      const hasPointer = pointer.x > -500;
      for (let t = 0; t < 3; t++) {
        const bucket = tiers[t];
        if (!bucket.length) continue;
        context.beginPath();
        for (let i = 0; i < bucket.length; i++) {
          const particle = bucket[i];
          const driftX = reduceMotion ? 0 : Math.sin(time * 0.00055 + particle.phase) * 2.1;
          const driftY = reduceMotion ? 0 : Math.cos(time * 0.0004 + particle.phase) * 2.5;
          let repelX = 0;
          let repelY = 0;
          if (hasPointer) {
            const dx = particle.x + driftX - pointer.x;
            const dy = particle.y + driftY - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 8464 && distSq > 0) {
              const distance = Math.sqrt(distSq);
              const force = ((92 - distance) / 92) * 13;
              repelX = (dx / distance) * force;
              repelY = (dy / distance) * force;
            }
          }
          const px = particle.x + driftX + repelX;
          const py = particle.y + driftY + repelY;
          context.moveTo(px + particle.radius, py);
          context.arc(px, py, particle.radius, 0, Math.PI * 2);
        }
        const shimmer = reduceMotion ? 0.7 : 0.6 + Math.sin(time * 0.0012 + t * 1.5) * 0.15;
        context.fillStyle =
          t === 0
            ? `rgba(237, 241, 255, ${0.85 * shimmer})`
            : t === 1
            ? `rgba(185, 198, 238, ${0.72 * shimmer})`
            : `rgba(116, 137, 205, ${0.55 * shimmer})`;
        context.fill();
      }

      if (!reduceMotion && isVisible) {
        frame = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (reduceMotion && isVisible) draw(0);
    };
    const onPointerLeave = () => {
      pointer = { x: -1000, y: -1000 };
      if (reduceMotion && isVisible) draw(0);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !reduceMotion) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.02 }
    );
    visibilityObserver.observe(canvas);

    portrait.onload = resize;
    resize();
    if (!reduceMotion) frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerup", onPointerLeave);
    canvas.addEventListener("pointercancel", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerup", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerLeave);
      portrait.onload = null;
    };
  }, []);

  return <canvas className="hero-particles" ref={canvasRef} role="img" aria-label="Animated particle portrait of More Priyo" />;
}
