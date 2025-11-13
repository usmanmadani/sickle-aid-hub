import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Shield, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Donate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!amount || !donorName || !donorEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('donations').insert([
        {
          donor_name: donorName,
          donor_email: donorEmail,
          amount,
          message,
          payment_status: 'pending',
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: `Your donation of ₦${amount.toLocaleString()} has been recorded. Payment processing coming soon!`,
      });

      setDonorName("");
      setDonorEmail("");
      setMessage("");
      setSelectedAmount(null);
      setCustomAmount("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Mission</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your generosity helps us provide essential services, education, and support to 
              communities affected by sickle cell disease.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-[var(--shadow-glow)]">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">Donation System Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                We're currently setting up a secure online donation platform to make it easier 
                for you to support our cause.
              </p>
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[5000, 15000, 50000].map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className="h-14"
                      >
                        ₦{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customAmount" className="text-base mb-2 block">
                    Or Enter Custom Amount
                  </Label>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount in Naira"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="h-14 text-lg"
                    min="0"
                  />
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Full Name *</Label>
                    <Input
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">Email *</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a message of support"
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  disabled={loading || (!selectedAmount && !customAmount)}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {loading ? "Processing..." : "Submit Donation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how your donation can make a real difference in the lives of those affected 
              by sickle cell disease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-[var(--shadow-soft)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">₦5,000</h3>
                <p className="text-sm text-muted-foreground">
                  Provides genotype testing for 10 individuals
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-[var(--shadow-soft)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-accent mb-3">₦15,000</h3>
                <p className="text-sm text-muted-foreground">
                  Funds a community workshop for 50 people
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-[var(--shadow-soft)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">₦50,000</h3>
                <p className="text-sm text-muted-foreground">
                  Sponsors a full outreach program in a community
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Your Donation Matters</h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="py-6">
                  <h3 className="text-xl font-bold mb-2">Direct Impact</h3>
                  <p className="text-muted-foreground">
                    Every donation goes directly to programs that educate, test, and support 
                    communities affected by sickle cell disease.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="py-6">
                  <h3 className="text-xl font-bold mb-2">Transparent Operations</h3>
                  <p className="text-muted-foreground">
                    We maintain full transparency in how donations are used, with regular reports 
                    on our programs and their impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="py-6">
                  <h3 className="text-xl font-bold mb-2">Sustainable Change</h3>
                  <p className="text-muted-foreground">
                    Your support helps us build long-term solutions that create lasting change 
                    in communities across Nigeria.
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

export default Donate;
