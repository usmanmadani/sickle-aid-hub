import { motion } from "framer-motion";
import { Dna, Heart, Droplets, ShieldCheck, Sparkles, Activity, Compass, Flame } from "lucide-react";

export function AnimatedDnaIcon({ className = "w-6 h-6 text-primary" }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotateY: [0, 180, 360] }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      className="inline-block"
    >
      <Dna className={className} />
    </motion.div>
  );
}

export function AnimatedHeartIcon({ className = "w-6 h-6 text-primary" }: { className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1, 1.25, 1] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      className="inline-block"
    >
      <Heart className={className} fill="currentColor" />
    </motion.div>
  );
}

export function AnimatedDropletIcon({ className = "w-6 h-6 text-blue-500" }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      className="inline-block"
    >
      <Droplets className={className} />
    </motion.div>
  );
}

export function AnimatedShieldIcon({ className = "w-6 h-6 text-emerald-500" }: { className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="inline-block"
    >
      <ShieldCheck className={className} />
    </motion.div>
  );
}

export function AnimatedSparklesIcon({ className = "w-6 h-6 text-amber-500" }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      className="inline-block"
    >
      <Sparkles className={className} />
    </motion.div>
  );
}

export function AnimatedPulseBadge({ text }: { text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/90 border border-primary/30 shadow-md backdrop-blur-md text-xs font-semibold text-foreground"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
      </span>
      <span>{text}</span>
    </motion.div>
  );
}
