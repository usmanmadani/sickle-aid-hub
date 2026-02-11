import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Dna, ArrowBigRight } from "lucide-react";

interface GenotypeInputProps {
    onCheck: (g1: string, g2: string) => void;
    genotypes: string[];
}

const GenotypeInput = ({ onCheck, genotypes }: GenotypeInputProps) => {
    const [step, setStep] = useState(1);
    const [g1, setG1] = useState("");
    const [g2, setG2] = useState("");

    const nextStep = () => {
        if (step === 1 && g1) setStep(2);
        else if (step === 2 && g2) handleCheck();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCheck = () => {
        onCheck(g1, g2);
    };

    return (
        <Card className="max-w-md mx-auto overflow-hidden">
            <CardContent className="p-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 text-primary">
                                <Dna className="w-12 h-12" />
                                <h3 className="text-2xl font-bold">What is Your Genotype?</h3>
                            </div>
                            <p className="text-muted-foreground">Select your own genotype to get started.</p>

                            <Select value={g1} onValueChange={setG1}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select one..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {genotypes.map(g => (
                                        <SelectItem key={g} value={g} className="text-lg py-3">{g}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={nextStep}
                                disabled={!g1}
                                className="w-full text-lg h-12"
                            >
                                Next Step <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 text-secondary">
                                <ArrowBigRight className="w-12 h-12 rotate-[-45deg]" />
                                <h3 className="text-2xl font-bold">Partner's Genotype?</h3>
                            </div>
                            <p className="text-muted-foreground">Select your partner's genotype for compatibility check.</p>

                            <Select value={g2} onValueChange={setG2}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select one..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {genotypes.map(g => (
                                        <SelectItem key={g} value={g} className="text-lg py-3">{g}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={prevStep} className="flex-1 h-12">
                                    <ChevronLeft className="mr-2 w-5 h-5" /> Back
                                </Button>
                                <Button onClick={nextStep} disabled={!g2} className="flex-1 h-12" variant="hero">
                                    Analyze Risk
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                </div>
            </CardContent>
        </Card>
    );
};
export default GenotypeInput;
