import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RiskVisualizer from "@/components/genotype/RiskVisualizer";
import PunnettSquare from "@/components/genotype/PunnettSquare";
import GenotypeInput from "@/components/genotype/GenotypeInput"; // Assuming this handles the multi-step input
import InheritanceSimulation from "@/components/genotype/InheritanceSimulation";

type Genotype = "AA" | "AS" | "SS" | "AC" | "SC" | "";

interface RiskResult {
  risk: "low" | "moderate" | "high";
  title: string;
  description: string;
  outcomes: string[];
  combinations: string[]; // For simulation
}

const calculateRisk = (genotype1: Genotype, genotype2: Genotype): RiskResult | null => {
  if (!genotype1 || !genotype2) return null;

  const combinations: Record<string, RiskResult> = {
    "AA-AA": {
      risk: "low",
      title: "No Risk",
      description: "Excellent compatibility! All children will have normal hemoglobin (AA genotype).",
      outcomes: ["100% AA - Normal hemoglobin"],
      combinations: ["AA", "AA", "AA", "AA"]
    },
    "AA-AS": {
      risk: "low",
      title: "Low Risk",
      description: "Safe compatibility. Children will either be carriers or have normal hemoglobin, but none will have the disease.",
      outcomes: ["50% AA - Normal", "50% AS - Carrier (healthy)"],
      combinations: ["AA", "AS", "AA", "AS"]
    },
    "AA-SS": {
      risk: "moderate",
      title: "Carrier Only",
      description: "All children will be carriers (AS) but won't have the disease itself. They will live healthy lives.",
      outcomes: ["100% AS - Carrier (healthy)"],
      combinations: ["AS", "AS", "AS", "AS"]
    },
    "AS-AS": {
      risk: "high",
      title: "High Risk",
      description: "Warning: There is a 25% chance in EVERY pregnancy that the child will have sickle cell disease (SS).",
      outcomes: ["25% AA - Normal", "50% AS - Carrier", "25% SS - Sickle Cell Disease"],
      combinations: ["AA", "AS", "AS", "SS"]
    },
    "AS-SS": {
      risk: "high",
      title: "Very High Risk",
      description: "Critical Warning: There is a 50% chance in EVERY pregnancy that the child will have sickle cell disease.",
      outcomes: ["50% AS - Carrier", "50% SS - Sickle Cell Disease"],
      combinations: ["AS", "SS", "AS", "SS"]
    },
    "SS-SS": {
      risk: "high",
      title: "Certain Risk",
      description: "Incompatible. All children will have sickle cell disease (SS). Professional counseling is strongly advised.",
      outcomes: ["100% SS - Sickle Cell Disease"],
      combinations: ["SS", "SS", "SS", "SS"]
    },
    "AA-AC": {
      risk: "low",
      title: "Low Risk",
      description: "Safe. Children will have normal hemoglobin or be carriers of Hemoglobin C trait.",
      outcomes: ["50% AA - Normal", "50% AC - Carrier (healthy)"],
      combinations: ["AA", "AC", "AA", "AC"]
    },
    "AS-AC": {
      risk: "moderate",
      title: "Moderate Risk",
      description: "Caution: There is a 25% chance of having a child with SC disease.",
      outcomes: ["25% AA", "25% AS", "25% AC", "25% SC - Disease possible"],
      combinations: ["AA", "AS", "AC", "SC"]
    },
    "AA-SC": {
      risk: "low",
      title: "Carrier Only",
      description: "Children will be carriers of either Sickle Cell trait or Hemoglobin C trait, but usually healthy.",
      outcomes: ["50% AS - Carrier", "50% AC - Carrier"],
      combinations: ["AS", "AC", "AS", "AC"]
    },
    "AS-SC": {
      risk: "high",
      title: "High Risk",
      description: "High Warning: 25% chance of SS disease and 25% chance of SC disease.",
      outcomes: ["25% AS", "25% SS", "25% AC", "25% SC"],
      combinations: ["AS", "SS", "AC", "SC"]
    },
  };

  const key1 = `${genotype1}-${genotype2}`;
  const key2 = `${genotype2}-${genotype1}`;

  return combinations[key1] || combinations[key2] || {
    risk: "moderate",
    title: "Consult a Doctor",
    description: "Please consult with a genetic counselor for detailed analysis of this specific combination.",
    outcomes: ["Professional counseling recommended"],
    combinations: []
  };
};

const GenotypeChecker = () => {
  const [genotype1, setGenotype1] = useState<Genotype>("");
  const [genotype2, setGenotype2] = useState<Genotype>("");
  const [result, setResult] = useState<RiskResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const genotypes: Genotype[] = ["AA", "AS", "SS", "AC", "SC"];

  const handleCheck = (g1: string, g2: string) => {
    setAnalyzing(true);
    setGenotype1(g1 as Genotype);
    setGenotype2(g2 as Genotype);

    // Simulate thinking time for effect
    setTimeout(() => {
      const riskResult = calculateRisk(g1 as Genotype, g2 as Genotype);
      setResult(riskResult);
      setAnalyzing(false);
    }, 1500);
  };

  const reset = () => {
    setResult(null);
    setGenotype1("");
    setGenotype2("");
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-x-hidden">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 text-center container mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Compatibility Checker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how your genetics interact. Interactive, visual, and easy to understand.
        </p>
      </motion.section>

      <section className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {!result && !analyzing && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Use the new GenotypeInput component here (which you'll create/import) */}
              <GenotypeInput onCheck={handleCheck} genotypes={genotypes} />
            </motion.div>
          )}

          {analyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full mb-8"
              />
              <h2 className="text-2xl font-bold animate-pulse">Analyzing Genetics...</h2>
            </motion.div>
          )}

          {result && !analyzing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Visual Risk Indicator */}
                <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                  <CardHeader className="bg-muted/30 pb-2">
                    <CardTitle className="text-center">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskVisualizer risk={result.risk} />
                    <div className="text-center mt-4">
                      <h3 className="text-xl font-bold mb-2">{result.title}</h3>
                      <p className="text-muted-foreground">{result.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Genetic Breakdown */}
                <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                  <CardHeader className="bg-muted/30 pb-2">
                    <CardTitle className="text-center">Genetic Combination</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <PunnettSquare g1={genotype1} g2={genotype2} />
                    <div className="mt-6 w-full">
                      <h4 className="font-semibold mb-2 text-center text-sm uppercase tracking-wider text-muted-foreground">Potential Outcomes</h4>
                      <ul className="space-y-2">
                        {result.outcomes.map((outcome, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/40"
                          >
                            <ArrowRight className="w-4 h-4 text-primary" />
                            {outcome}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Simulation Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-center mb-6">If you had 4 children...</h3>
                <p className="text-center text-muted-foreground mb-4">
                  This is a simulation of probability. In reality, every pregnancy carries the same independent risk.
                </p>
                <InheritanceSimulation combinations={result.combinations} />
              </motion.div>

              <div className="flex justify-center">
                <Button onClick={reset} size="lg" variant="outline" className="gap-2 text-lg">
                  <RefreshCcw className="w-5 h-5" /> Check Another Couple
                </Button>
              </div>

              <Alert className="mt-12 bg-blue-50 border-blue-200 text-blue-800">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <AlertTitle>Medical Disclaimer</AlertTitle>
                <AlertDescription>
                  This tool mimics genetic inheritance patterns but defaults to probability averages.
                  It is not a substitute for professional medical advice. Always consult a doctor
                  or genetic counselor before making family planning decisions.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
export default GenotypeChecker;
