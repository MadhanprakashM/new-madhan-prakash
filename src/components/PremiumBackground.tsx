import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

export default function PremiumBackground() {
  // Mouse coordinates (defaulting offscreen initially)
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth springs for high performance cursor tracking
  const springConfig = { damping: 45, stiffness: 90, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Motion template string for mouse reactive ambient light spot
  const background = useMotionTemplate`radial-gradient(circle 480px at ${smoothX}px ${smoothY}px, rgba(214, 189, 152, 0.08), transparent 80%)`;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#F2F1ED] dark:bg-[#0F1D1D] transition-colors duration-1000">
      {/* 1. Subtle noise texture layer */}
      <div className="absolute inset-0 noise-bg opacity-[0.02] dark:opacity-[0.05]" />

      {/* 2. Slow floating gradient blob 1 - Top Left (Forest / Matcha tone) */}
      <div
        className="absolute top-[-20%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#1A3636]/10 to-[#677D6A]/0 dark:from-[#D6BD98]/5 dark:to-transparent blur-[100px] opacity-75 pointer-events-none transform-gpu"
        style={{ willChange: 'transform' }}
      />
      
      {/* 3. Slow floating gradient blob 2 - Bottom Right (Almond / Sand tone) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#D6BD98]/12 to-[#B38F6F]/0 dark:from-[#B38F6F]/5 dark:to-transparent blur-[90px] opacity-70 pointer-events-none transform-gpu"
        style={{ willChange: 'transform' }}
      />

      {/* 4. Elegant center highlight for Apple Keynote feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,241,237,0.8),transparent_85%)] dark:bg-[radial-gradient(circle_at_center,rgba(26,54,54,0.35),transparent_85%)]" />

      {/* 5. Smooth mouse reactive spotlight */}
      <motion.div 
        className="absolute inset-0" 
        style={{ background }} 
      />
    </div>
  );
}
