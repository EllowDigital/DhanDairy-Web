import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // Larger: 4-12px instead of 2-6px
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/40" // Brighter: 40% instead of 20%
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary) / 0.5)`, // Glow effect
          }}
          animate={{
            y: [0, -50, 0], // More movement
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.4, 0.9, 0.4], // Brighter opacity range
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: 16 + i * 4, // Larger: 16-44px
            height: 16 + i * 4,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.2) 40%, transparent 70%)`,
            boxShadow: `0 0 ${20 + i * 5}px hsl(var(--primary) / 0.4)`,
          }}
          animate={{
            y: [0, -70, 0],
            x: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 1.5,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Extra sparkle particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + (i % 5) * 18}%`,
            width: 3,
            height: 3,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
