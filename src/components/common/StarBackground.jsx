import React, { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const StarBackground = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let stars = [];
    let shootingStars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = window.innerWidth < 768 ? 100 : 200;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.05 + 0.01,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Star Color based on theme
      const starColor = isDarkMode ? "255, 255, 255" : "50, 50, 100"; // White vs Dark Blue

      stars.forEach((star) => {
        // Update twinkling
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Drifting effect (slowly moving up)
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${Math.abs(star.alpha)})`;
        ctx.fill();
      });

      // --- Shooting Stars Logic ---
      // Spawn new shooting star rarely (e.g., 0.5% chance per frame)
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5, // Start in upper half
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 10,
          angle: Math.PI / 4, // 45 degrees
          life: 1,
          opacity: 1,
        });
      }

      // Update and draw shooting stars
      ctx.strokeStyle = isDarkMode
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(50, 50, 100, 0.8)";
      ctx.lineWidth = 2;

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        // Move
        s.x -= s.speed * Math.cos(s.angle); // moving left
        s.y += s.speed * Math.sin(s.angle); // moving down

        // Fade out
        s.life -= 0.02;
        s.opacity = s.life;

        if (s.life <= 0 || s.x < 0 || s.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw trail
        const endX = s.x + s.length * Math.cos(s.angle);
        const endY = s.y - s.length * Math.sin(s.angle);

        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
        gradient.addColorStop(0, `rgba(${starColor}, ${s.opacity})`);
        gradient.addColorStop(1, `rgba(${starColor}, 0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

export default StarBackground;
