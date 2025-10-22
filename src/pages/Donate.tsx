import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, TrendingUp } from "lucide-react";

const Donate = () => {
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
              <p className="text-muted-foreground">
                In the meantime, if you'd like to make a donation, please contact us directly 
                and we'll provide you with alternative donation methods.
              </p>
              <Button variant="hero" size="lg" className="mt-4">
                Contact Us About Donating
              </Button>
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
