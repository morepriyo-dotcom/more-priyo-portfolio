"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  phase: number;
  radius: number;
  brightness: number;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let portraitLayer: HTMLCanvasElement | null = null;
    let portraitScale = 0;
    let pointer = { x: -1000, y: -1000 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const portrait = new Image();
    portrait.src = "/more-priyo.jpeg";

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
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
      portraitLayer = document.createElement("canvas");
      portraitLayer.width = shape.width;
      portraitLayer.height = shape.height;
      portraitLayer.getContext("2d")?.putImageData(imageData, 0, 0);

      const stride = width < 600 ? 5 : 4;
      const scale = Math.min((width * 0.95) / shape.width, (height * 1.22) / shape.height, 1.12);
      portraitScale = scale;
      particles = [];

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
          particles.push({
            x: (x - shape.width / 2) * scale + width / 2,
            y: (y - shape.height / 2) * scale + height / 2 - height * 0.1,
            phase: Math.random() * Math.PI * 2,
            radius: 0.55 + (brightness / 255) * 1.25,
            brightness,
          });
        }
      }
      draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (portraitLayer) {
        context.save();
        context.globalAlpha = 0.48;
        context.filter = "grayscale(0.45) brightness(0.9) contrast(1.08)";
        context.drawImage(
          portraitLayer,
          (width - portraitLayer.width * portraitScale) / 2,
          (height - portraitLayer.height * portraitScale) / 2 - height * 0.1,
          portraitLayer.width * portraitScale,
          portraitLayer.height * portraitScale,
        );
        context.restore();
      }
      for (const particle of particles) {
        const driftX = reduceMotion ? 0 : Math.sin(time * 0.00055 + particle.phase) * 2.1;
        const driftY = reduceMotion ? 0 : Math.cos(time * 0.0004 + particle.phase) * 2.5;
        let repelX = 0;
        let repelY = 0;
        const dx = particle.x + driftX - pointer.x;
        const dy = particle.y + driftY - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 92 && distance > 0) {
          const force = ((92 - distance) / 92) * 13;
          repelX = (dx / distance) * force;
          repelY = (dy / distance) * force;
        }
        const shimmer = reduceMotion ? 0.52 : 0.4 + (Math.sin(time * 0.001 + particle.phase) + 1) * 0.23;
        const tint = particle.brightness > 210 ? "237, 241, 255" : particle.brightness > 115 ? "185, 198, 238" : "116, 137, 205";
        context.beginPath();
        context.arc(particle.x + driftX + repelX, particle.y + driftY + repelY, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${tint}, ${shimmer})`;
        context.fill();
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (reduceMotion) draw(0);
    };
    const onPointerLeave = () => {
      pointer = { x: -1000, y: -1000 };
      if (reduceMotion) draw(0);
    };

    portrait.onload = resize;
    resize();
    if (!reduceMotion) frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      portrait.onload = null;
    };
  }, []);

  return <canvas className="hero-particles" ref={canvasRef} role="img" aria-label="Animated particle portrait of More Priyo" />;
}
