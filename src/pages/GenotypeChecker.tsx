import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Heart, ShieldCheck, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Genotype = "AA" | "AS" | "SS" | "AC" | "SC" | "";

interface RiskResult {
  risk: "low" | "moderate" | "high";
  title: string;
  description: string;
  outcomes: string[];
}

const calculateRisk = (genotype1: Genotype, genotype2: Genotype): RiskResult | null => {
  if (!genotype1 || !genotype2) return null;

  const combinations: Record<string, RiskResult> = {
    "AA-AA": {
      risk: "low",
      title: "No Risk",
      description: "All children will have normal hemoglobin (AA genotype).",
      outcomes: ["100% AA - Normal hemoglobin"],
    },
    "AA-AS": {
      risk: "low",
      title: "Low Risk",
      description: "Children will either be carriers or have normal hemoglobin.",
      outcomes: ["50% AA - Normal", "50% AS - Carrier (healthy)"],
    },
    "AA-SS": {
      risk: "moderate",
      title: "Carrier Only",
      description: "All children will be carriers but won't have the disease.",
      outcomes: ["100% AS - Carrier (healthy)"],
    },
    "AS-AS": {
      risk: "high",
      title: "High Risk",
      description: "There's a 25% chance each child will have sickle cell disease.",
      outcomes: ["25% AA - Normal", "50% AS - Carrier", "25% SS - Sickle Cell Disease"],
    },
    "AS-SS": {
      risk: "high",
      title: "Very High Risk",
      description: "50% chance of children having sickle cell disease.",
      outcomes: ["50% AS - Carrier", "50% SS - Sickle Cell Disease"],
    },
    "SS-SS": {
      risk: "high",
      title: "Certain Risk",
      description: "All children will have sickle cell disease.",
      outcomes: ["100% SS - Sickle Cell Disease"],
    },
    "AA-AC": {
      risk: "low",
      title: "Low Risk",
      description: "Children will have normal or AC trait.",
      outcomes: ["50% AA - Normal", "50% AC - Carrier (healthy)"],
    },
    "AS-AC": {
      risk: "moderate",
      title: "Moderate Risk",
      description: "Small risk of SC disease.",
      outcomes: ["25% AA", "25% AS", "25% AC", "25% SC - Disease possible"],
    },
    "AA-SC": {
      risk: "low",
      title: "Carrier Only",
      description: "Children will be carriers.",
      outcomes: ["50% AS - Carrier", "50% AC - Carrier"],
    },
    "AS-SC": {
      risk: "high",
      title: "High Risk",
      description: "Significant risk of disease variants.",
      outcomes: ["25% AS", "25% SS", "25% AC", "25% SC"],
    },
  };

  const key1 = `${genotype1}-${genotype2}`;
  const key2 = `${genotype2}-${genotype1}`;

  return combinations[key1] || combinations[key2] || {
    risk: "moderate",
    title: "Consult a Doctor",
    description: "Please consult with a genetic counselor for this specific combination.",
    outcomes: ["Professional counseling recommended"],
  };
};

const GenotypeChecker = () => {
  const [genotype1, setGenotype1] = useState<Genotype>("");
  const [genotype2, setGenotype2] = useState<Genotype>("");
  const [result, setResult] = useState<RiskResult | null>(null);

  const genotypes: Genotype[] = ["AA", "AS", "SS", "AC", "SC"];

  const handleCheck = () => {
    const riskResult = calculateRisk(genotype1, genotype2);
    setResult(riskResult);
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <ShieldCheck className="w-12 h-12 text-primary" />;
      case "moderate":
        return <AlertCircle className="w-12 h-12 text-accent" />;
      case "high":
        return <ShieldAlert className="w-12 h-12 text-destructive" />;
      default:
        return <Heart className="w-12 h-12 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Genotype Compatibility Checker</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Check the compatibility of two genotypes and understand the potential risks for your children.
              Knowledge is the first step towards prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Checker Tool */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-[var(--shadow-glow)]">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Select Your Genotypes</CardTitle>
              <CardDescription className="text-center">
                Choose your genotype and your partner's genotype to see the compatibility results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Genotype</label>
                  <Select value={genotype1} onValueChange={(value) => setGenotype1(value as Genotype)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your genotype" />
                    </SelectTrigger>
                    <SelectContent>
                      {genotypes.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Partner's Genotype</label>
                  <Select value={genotype2} onValueChange={(value) => setGenotype2(value as Genotype)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner's genotype" />
                    </SelectTrigger>
                    <SelectContent>
                      {genotypes.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleCheck}
                disabled={!genotype1 || !genotype2}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Check Compatibility
              </Button>

              {/* Results */}
              {result && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <Alert className={`border-2 ${
                    result.risk === "low" ? "border-primary/50 bg-primary/5" :
                    result.risk === "moderate" ? "border-accent/50 bg-accent/5" :
                    "border-destructive/50 bg-destructive/5"
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getRiskIcon(result.risk)}</div>
                      <div className="flex-1">
                        <AlertTitle className="text-xl mb-2">{result.title}</AlertTitle>
                        <AlertDescription className="text-base">
                          <p className="mb-4">{result.description}</p>
                          <div className="space-y-2">
                            <p className="font-semibold">Possible Outcomes:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {result.outcomes.map((outcome, idx) => (
                                <li key={idx}>{outcome}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Important:</strong> This tool provides general information only. 
                        Please consult with a genetic counselor or healthcare professional for 
                        personalized advice and testing.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Understanding Genotypes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AA - Normal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Normal hemoglobin. No sickle cell trait or disease.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AS - Carrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sickle cell trait carrier. Usually healthy but can pass the trait to children.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SS - Disease</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sickle cell disease. Requires ongoing medical care and management.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AC/SC - Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hemoglobin C trait or SC disease. Different variants with varying effects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenotypeChecker;
