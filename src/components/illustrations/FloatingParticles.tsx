import { motion } from "framer-motion";

export default function FloatingParticles() {
  // Generate random particle properties for organic movement
  const particles = [
    { id: 1, size: 24, top: "15%", left: "8%", duration: 7, delay: 0, color: "bg-primary/20" },
    { id: 2, size: 16, top: "35%", left: "88%", duration: 9, delay: 1, color: "bg-rose-500/20" },
    { id: 3, size: 32, top: "65%", left: "5%", duration: 11, delay: 2, color: "bg-primary/15" },
    { id: 4, size: 20, top: "80%", left: "92%", duration: 8, delay: 0.5, color: "bg-blue-500/20" },
    { id: 5, size: 28, top: "25%", left: "75%", duration: 10, delay: 1.5, color: "bg-purple-500/15" },
    { id: 6, size: 18, top: "50%", left: "48%", duration: 12, delay: 3, color: "bg-emerald-500/15" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-sm ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
          animate={{
            y: [0, -35, 0, 35, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.25, 0.9, 1.15, 1],
            opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
