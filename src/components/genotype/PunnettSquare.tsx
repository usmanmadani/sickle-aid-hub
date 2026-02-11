import { motion } from "framer-motion";

interface PunnettSquareProps {
    g1: string; // e.g., "AS"
    g2: string; // e.g., "AS"
}

const PunnettSquare = ({ g1, g2 }: PunnettSquareProps) => {
    const p1 = g1.split(""); // ["A", "S"]
    const p2 = g2.split(""); // ["A", "S"]

    const combinations = [
        p1[0] + p2[0], // AA
        p1[0] + p2[1], // AS
        p1[1] + p2[0], // SA -> AS
        p1[1] + p2[1], // SS
    ].map(c => c.split('').sort().join('')); // Normalize SA to AS

    const getCombinationColor = (combo: string) => {
        if (combo === "AA") return "bg-green-100 border-green-300 text-green-700";
        if (combo === "AS" || combo === "AC") return "bg-yellow-100 border-yellow-300 text-yellow-700";
        if (combo === "SS" || combo === "SC") return "bg-red-100 border-red-300 text-red-700";
        return "bg-gray-100";
    };

    return (
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-8 font-mono text-lg">
            <div className="flex items-center justify-center font-bold text-muted-foreground p-4"></div>
            <div className="flex items-center justify-center font-bold text-muted-foreground bg-primary/10 rounded-lg p-4">{p2[0]}</div>
            <div className="flex items-center justify-center font-bold text-muted-foreground bg-primary/10 rounded-lg p-4">{p2[1]}</div>

            <div className="flex items-center justify-center font-bold text-muted-foreground bg-secondary/30 rounded-lg p-4 h-24">{p1[0]}</div>
            {combinations.slice(0, 2).map((combo, i) => (
                <motion.div
                    key={`row1-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center justify-center border-2 rounded-lg font-bold ${getCombinationColor(combo)}`}
                >
                    {combo}
                </motion.div>
            ))}

            <div className="flex items-center justify-center font-bold text-muted-foreground bg-secondary/30 rounded-lg p-4 h-24">{p1[1]}</div>
            {combinations.slice(2, 4).map((combo, i) => (
                <motion.div
                    key={`row2-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i + 2) * 0.1 }}
                    className={`flex items-center justify-center border-2 rounded-lg font-bold ${getCombinationColor(combo)}`}
                >
                    {combo}
                </motion.div>
            ))}
        </div>
    );
};

export default PunnettSquare;
