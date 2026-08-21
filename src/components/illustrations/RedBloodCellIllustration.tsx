import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Activity } from "lucide-react";

export default function RedBloodCellIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto p-6 bg-gradient-to-br from-card to-secondary/40 border border-border/80 rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hemoglobin & Cell Physiology
          </span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Interactive View
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {/* Healthy Red Blood Cell Visual */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-2xl bg-card/80 border border-emerald-500/20 shadow-sm flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-2 right-2">
            <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Normal (HbA)
            </span>
          </div>

          <div className="relative my-4 w-32 h-32 flex items-center justify-center">
            {/* Soft Ripple */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute w-28 h-28 rounded-full bg-emerald-500/10"
            />
            {/* Healthy Cell SVG */}
            <motion.svg
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              viewBox="0 0 100 100"
              className="w-24 h-24 drop-shadow-md"
            >
              <defs>
                <radialGradient id="healthyCellGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#C1121F" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </radialGradient>
                <radialGradient id="healthyCenterGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.2" />
                </radialGradient>
              </defs>

              {/* Biconcave Outer Disk */}
              <ellipse cx="50" cy="50" rx="42" ry="42" fill="url(#healthyCellGrad)" />
              {/* Biconcave Center Dimple */}
              <ellipse cx="48" cy="48" rx="20" ry="20" fill="url(#healthyCenterGrad)" />
              
              {/* Oxygen Molecules */}
              <circle cx="35" cy="38" r="3" fill="#FFFFFF" opacity="0.9" />
              <circle cx="62" cy="42" r="3" fill="#FFFFFF" opacity="0.9" />
              <circle cx="48" cy="62" r="3" fill="#FFFFFF" opacity="0.9" />
            </motion.svg>
          </div>

          <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Biconcave Disc
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Flexible & smooth. Easily glides through microcapillaries delivering oxygen.
          </p>
        </motion.div>

        {/* Sickled Red Blood Cell Visual */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-2xl bg-card/80 border border-primary/20 shadow-sm flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-2 right-2">
            <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Sickled (HbS)
            </span>
          </div>

          <div className="relative my-4 w-32 h-32 flex items-center justify-center">
            {/* Warning Pulsing Background */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute w-28 h-28 rounded-full bg-primary/10"
            />
            {/* Crescent Sickle Cell SVG */}
            <motion.svg
              animate={{ y: [0, -5, 0], rotate: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              viewBox="0 0 100 100"
              className="w-24 h-24 drop-shadow-md"
            >
              <defs>
                <linearGradient id="sickleCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#991B1B" />
                  <stop offset="60%" stopColor="#C1121F" />
                  <stop offset="100%" stopColor="#450A0A" />
                </linearGradient>
              </defs>

              {/* Crescent Shape Path */}
              <path
                d="M 25 15 C 65 10, 85 45, 75 80 C 65 55, 45 40, 20 50 C 15 35, 18 22, 25 15 Z"
                fill="url(#sickleCellGrad)"
              />
              
              {/* Polymerized Hemoglobin Rod Lines */}
              <path d="M 32 25 L 68 55" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
              <path d="M 28 35 L 62 65" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
            </motion.svg>
          </div>

          <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Sickled Crescent
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Stiff & sticky. Polymerized hemoglobin distorts cell shape, causing blood flow blockages.
          </p>
        </motion.div>
      </div>

      {/* Bottom Footer Info */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Genotype Carriers (AS) have both normal & sickled traits</span>
        <span className="font-medium text-primary">Red Hope Initiative</span>
      </div>
    </div>
  );
}
