import { motion } from "framer-motion";
import { Users, Smile, Heart, FlaskRound } from "lucide-react";

interface InheritanceSimulationProps {
    combinations: string[]; // e.g., ["AA", "AS", "SS"]
}

const InheritanceSimulation = ({ combinations }: InheritanceSimulationProps) => {
    const getIcon = (type: string) => {
        switch (type) {
            case "AA": return <Smile className="w-8 h-8 text-green-500" />;
            case "AS": return <FlaskRound className="w-8 h-8 text-yellow-500" />;
            case "SS": return <Heart className="w-8 h-8 text-red-500" />;
            default: return <Users className="w-8 h-8 text-gray-500" />;
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {combinations.map((combo, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center p-4 bg-muted/50 rounded-xl"
                >
                    <div className="mb-2 p-3 bg-white rounded-full shadow-sm">
                        {getIcon(combo)}
                    </div>
                    <span className="font-bold text-lg">{combo}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                        {combo === "AA" ? "Normal" : combo === "SS" ? "Disease" : "Carrier"}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default InheritanceSimulation;
