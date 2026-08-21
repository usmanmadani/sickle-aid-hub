import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Shield, TrendingUp, CreditCard, Building2, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Paystack Public Key supplied by user
const PAYSTACK_PUBLIC_KEY = "pk_live_55fcbfc6b3436ce3186774f655db2f487f3bfc1a";

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const Donate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");

  // Dynamically load Paystack Pop script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handlePaystackPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      toast({
        title: "Missing Details",
        description: "Please enter your name, email, and a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Save pending donation to Supabase
    try {
      await supabase.from("donations").insert([
        {
          donor_name: donorName,
          donor_email: donorEmail,
          amount,
          message,
          payment_status: "pending",
        },
      ]);
    } catch (err) {
      console.warn("Supabase record error:", err);
    }

    // Trigger Paystack Inline Popup if available
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: donorEmail,
        amount: Math.round(amount * 100), // Paystack accepts amount in Kobo (amount * 100)
        currency: "NGN",
        ref: "RH-" + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: donorName,
            },
            {
              display_name: "Message",
              variable_name: "message",
              value: message || "Sickle Aid Hub Support",
            },
          ],
        },
        callback: function (response: any) {
          setLoading(false);
          toast({
            title: "Donation Successful! ❤️",
            description: `Reference: ${response.reference}. Thank you ${donorName} for supporting Red Hope Initiative!`,
          });
          setDonorName("");
          setDonorEmail("");
          setMessage("");
          setSelectedAmount(5000);
          setCustomAmount("");
        },
        onClose: function () {
          setLoading(false);
          toast({
            title: "Payment Window Closed",
            description: "You can retry your donation at any time.",
          });
        },
      });
      handler.openIframe();
    } else {
      setLoading(false);
      toast({
        title: "Paystack Redirecting...",
        description: `Thank you ${donorName}! Opening secure payment gateway for ₦${amount.toLocaleString()}...`,
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Heart className="w-4 h-4 fill-primary" />
            <span>Red Hope Initiative Donation Portal</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Fund Life-Saving Outreaches & Patient Care
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Your generous contribution funds free genotype testing in secondary schools, emergency pain crisis support, 
            and essential Hydroxyurea medication packages across Nigeria.
          </p>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Donation Form Card */}
          <Card className="lg:col-span-7 rounded-3xl border-primary/20 p-8 shadow-xl bg-card">
            <CardHeader className="p-0 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" /> Secure Paystack Payment
                </CardTitle>
                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full font-semibold">
                  <Lock className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>
              <CardDescription>
                Select or enter an amount in Naira (NGN). All payments are securely processed by Paystack.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              <form onSubmit={handlePaystackPayment} className="space-y-6">
                
                {/* Preset Amounts */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Select Donation Tier
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[2000, 5000, 15000, 50000, 100000].map((amt) => (
                      <Button
                        key={amt}
                        type="button"
                        variant={selectedAmount === amt ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amt)}
                        className="h-12 rounded-xl text-sm font-bold"
                      >
                        ₦{amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label htmlFor="customAmount" className="text-xs font-semibold">
                    Or Enter Custom Amount (₦)
                  </Label>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="e.g. 25000"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="h-12 rounded-xl text-lg font-semibold"
                    min="100"
                  />
                </div>

                {/* Donor Information */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="donorName" className="text-xs font-semibold">Full Name *</Label>
                      <Input
                        id="donorName"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Dr. Usman Madani"
                        className="rounded-xl mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="donorEmail" className="text-xs font-semibold">Email Address *</Label>
                      <Input
                        id="donorEmail"
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="e.g. donor@example.com"
                        className="rounded-xl mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs font-semibold">Support Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a message of encouragement for warriors and the outreach team..."
                      className="rounded-xl mt-1 min-h-[90px]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full rounded-2xl bg-primary text-white font-bold text-base py-6 shadow-md"
                  disabled={loading}
                >
                  <Heart className="w-5 h-5 fill-current" />
                  {loading ? "Opening Secure Payment..." : `Donate ₦${((customAmount ? parseFloat(customAmount) : selectedAmount) || 0).toLocaleString()} Now`}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* Right Info Column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Impact Metrics */}
            <Card className="rounded-3xl border-border p-6 space-y-6 bg-card">
              <h3 className="text-xl font-bold tracking-tight">How Your Money Saves Lives</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ₦2k
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">1 Genotype Screen</h4>
                    <p className="text-xs text-muted-foreground">Provides a student or young adult with accurate laboratory genotype testing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ₦15k
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Crisis Relief Pack</h4>
                    <p className="text-xs text-muted-foreground">Supplies 1 month of Hydroxyurea, folic acid, and emergency pain relief kits for a patient.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ₦50k
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">School Outreach Sponsorship</h4>
                    <p className="text-xs text-muted-foreground">Fully funds a secondary school awareness seminar & mass genotype screening drive.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Direct Bank Transfer Option */}
            <Card className="rounded-3xl border-border p-6 space-y-4 bg-secondary/40">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base">Direct Bank Transfer (Nigeria)</h3>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground bg-card p-4 rounded-2xl border border-border">
                <p><strong>Bank:</strong> Guaranty Trust Bank (GTBank)</p>
                <p><strong>Account Name:</strong> Red Hope Initiative</p>
                <p><strong>Account Number:</strong> 0123456789</p>
                <p><strong>Swift Code:</strong> GTBIGLA</p>
              </div>
              <p className="text-[11px] text-muted-foreground">
                After transfer, please send proof of payment to <strong className="text-foreground">Redhopeinitiatives@gmail.com</strong>
              </p>
            </Card>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Donate;
