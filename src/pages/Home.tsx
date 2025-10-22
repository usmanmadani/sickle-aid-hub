import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatCounter from "@/components/StatCounter";
import { Users, Heart, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Bringing <span className="text-gradient">Hope</span> to Those Affected by Sickle Cell
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join us in creating awareness, providing support, and transforming lives across communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/donate">
                  Donate Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/programs">Learn About Our Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a difference in the lives of those affected by sickle cell disease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <StatCounter end={15000} suffix="+" />
                </div>
                <p className="text-lg text-muted-foreground">Communities Reached</p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl font-bold text-accent mb-2">
                  <StatCounter end={8500} suffix="+" />
                </div>
                <p className="text-lg text-muted-foreground">Tests Conducted</p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <StatCounter end={50} suffix="+" />
                </div>
                <p className="text-lg text-muted-foreground">Awareness Programs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Red Hope is dedicated to raising awareness about sickle cell disease and providing 
                support to affected individuals and their families across Nigeria and beyond.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Through community outreach, education programs, and medical support initiatives, 
                we're working to create a future where sickle cell disease is understood, 
                manageable, and no longer a barrier to living a full life.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-[var(--shadow-soft)] transition-all">
                <h3 className="font-semibold text-lg mb-2 text-primary">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Spreading awareness through workshops and community programs.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-[var(--shadow-soft)] transition-all">
                <h3 className="font-semibold text-lg mb-2 text-accent">Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Free genotype testing in communities nationwide.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-[var(--shadow-soft)] transition-all">
                <h3 className="font-semibold text-lg mb-2 text-primary">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Counseling and resources for affected families.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-[var(--shadow-soft)] transition-all">
                <h3 className="font-semibold text-lg mb-2 text-accent">Advocacy</h3>
                <p className="text-sm text-muted-foreground">
                  Fighting for better healthcare policies and access.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join the Movement
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Your support can save lives. Whether through donations, volunteering, or spreading awareness, 
            every action counts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-background text-foreground border-background hover:bg-background/90"
              asChild
            >
              <Link to="/donate">Make a Donation</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
