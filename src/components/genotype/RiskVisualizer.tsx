import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, AlertCircle } from "lucide-react";

interface RiskVisualizerProps {
    risk: "low" | "moderate" | "high";
}

const RiskVisualizer = ({ risk }: RiskVisualizerProps) => {
    const getRiskColor = () => {
        switch (risk) {
            case "low": return "text-green-500";
            case "moderate": return "text-yellow-500";
            case "high": return "text-red-500";
            default: return "text-gray-400";
        }
    };

    const getIcon = () => {
        switch (risk) {
            case "low": return ShieldCheck;
            case "moderate": return AlertCircle;
            case "high": return ShieldAlert;
        }
    };

    const Icon = getIcon();

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute inset-0 rounded-full blur-xl ${risk === "low" ? "bg-green-500" :
                            risk === "moderate" ? "bg-yellow-500" :
                                "bg-red-500"
                        }`}
                />
                <Icon className={`w-32 h-32 ${getRiskColor()} relative z-10`} />
            </motion.div>
            <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`mt-6 text-2xl font-bold uppercase ${getRiskColor()}`}
            >
                {risk} Risk
            </motion.h3>
        </div>
    );
};

export default RiskVisualizer;
