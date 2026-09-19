import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme?: 'romantic' | 'nightSky';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme = 'romantic' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = theme === 'nightSky' ? 110 : 60;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      type: 'star' | 'heart' | 'petal' | 'glow';
      rotation: number;
      rotSpeed: number;
    }> = [];

    const types = theme === 'nightSky' 
      ? ['star', 'star', 'glow', 'heart'] 
      : ['heart', 'petal', 'star', 'glow', 'heart'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (theme === 'nightSky' ? 4 : 8) + 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: theme === 'nightSky' ? (Math.random() - 0.5) * 0.15 : -Math.random() * 0.5 - 0.15,
        opacity: Math.random() * 0.5 + 0.2,
        maxOpacity: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        type: types[Math.floor(Math.random() * types.length)] as 'star' | 'heart' | 'petal' | 'glow',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.9, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        ctx.lineTo(cx + Math.cos(angle + Math.PI / 4) * (r * 0.35), cy + Math.sin(angle + Math.PI / 4) * (r * 0.35));
      }
      ctx.closePath();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.35, size * 0.75, 0, 0, Math.PI * 2);
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (theme === 'romantic') {
        // Base fill: #FBEFEF (Soft Blush / Warm Pink)
        ctx.fillStyle = '#FBEFEF';
        ctx.fillRect(0, 0, width, height);

        // Subtle gradient light spots (#FFE2E2 & #C5B3D3)
        const grad1 = ctx.createRadialGradient(width * 0.25, height * 0.25, 0, width * 0.25, height * 0.25, width * 0.45);
        grad1.addColorStop(0, 'rgba(255, 226, 226, 0.6)');
        grad1.addColorStop(1, 'rgba(251, 239, 239, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const grad2 = ctx.createRadialGradient(width * 0.75, height * 0.75, 0, width * 0.75, height * 0.75, width * 0.5);
        grad2.addColorStop(0, 'rgba(197, 179, 211, 0.35)');
        grad2.addColorStop(1, 'rgba(251, 239, 239, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Night sky theme using deep dusty lavender & soft twilight
        const nightGrad = ctx.createLinearGradient(0, 0, 0, height);
        nightGrad.addColorStop(0, '#2D2130');
        nightGrad.addColorStop(0.5, '#3B2A3E');
        nightGrad.addColorStop(1, '#4A353B');
        ctx.fillStyle = nightGrad;
        ctx.fillRect(0, 0, width, height);

        // Soft Lavender (#C5B3D3) Moon glow
        const moonGlow = ctx.createRadialGradient(width * 0.82, height * 0.2, 0, width * 0.82, height * 0.2, 280);
        moonGlow.addColorStop(0, 'rgba(197, 179, 211, 0.4)');
        moonGlow.addColorStop(0.5, 'rgba(255, 226, 226, 0.15)');
        moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = moonGlow;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.opacity += p.pulseSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'heart') {
          // #FFE2E2 & #F5CBCB
          ctx.fillStyle = `rgba(245, 203, 203, ${p.opacity})`;
          ctx.shadowColor = 'rgba(255, 226, 226, 0.6)';
          ctx.shadowBlur = 6;
          drawHeart(ctx, 0, -p.size / 2, p.size);
          ctx.fill();
        } else if (p.type === 'star') {
          // #C5B3D3 (Soft Lavender)
          ctx.fillStyle = `rgba(197, 179, 211, ${p.opacity * 0.8})`;
          ctx.shadowColor = 'rgba(197, 179, 211, 0.7)';
          ctx.shadowBlur = 5;
          drawStar(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === 'petal') {
          // #F5CBCB (Dusty Rose)
          ctx.fillStyle = `rgba(245, 203, 203, ${p.opacity * 0.7})`;
          drawPetal(ctx, 0, 0, p.size);
          ctx.fill();
        } else {
          // Soft Glow Orb (#FFE2E2)
          const orbGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          orbGrad.addColorStop(0, `rgba(255, 226, 226, ${p.opacity * 0.6})`);
          orbGrad.addColorStop(1, 'rgba(255, 226, 226, 0)');
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
