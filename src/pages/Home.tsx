import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatCounter from "@/components/StatCounter";
import { Users, Heart, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-20 h-20 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-full h-full text-primary" fill="currentColor" />
        </motion.div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Bringing <span className="text-gradient">Hope</span> to Those Affected by Sickle Cell
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              We believe prevention starts with awareness. We believe patients deserve hope. ❤️
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Button variant="pulse" size="lg" asChild>
                <Link to="/donate">
                  Donate Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/programs">Learn About Our Programs</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a difference in the lives of those affected by sickle cell disease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, count: 15000, label: "Communities Reached", color: "primary" },
              { icon: Heart, count: 8500, label: "Tests Conducted", color: "accent" },
              { icon: Award, count: 50, label: "Awareness Programs", color: "primary" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center border-none rounded-2xl shadow-[var(--shadow-card)] card-hover">
                  <CardContent className="pt-8 pb-8">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${stat.color}/10 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                    </motion.div>
                    <div className={`text-4xl font-bold text-${stat.color} mb-2`}>
                      <StatCounter end={stat.count} suffix="+" />
                    </div>
                    <p className="text-lg text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Education", desc: "Spreading awareness through workshops and community programs.", color: "primary" },
                { title: "Testing", desc: "Free genotype testing in communities nationwide.", color: "primary" },
                { title: "Support", desc: "Counseling and resources for affected families.", color: "primary" },
                { title: "Advocacy", desc: "Fighting for better healthcare policies and access.", color: "primary" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 rounded-2xl shadow-[var(--shadow-card)] card-hover border-l-4 border-l-primary">
                    <h3 className={`font-semibold text-lg mb-2 text-${item.color}`}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join the Movement
          </motion.h2>
          <motion.p 
            className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your support can save lives. Whether through donations, volunteering, or spreading awareness, 
            every action counts.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-background text-foreground border-2 border-background hover:bg-background/90 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/donate">Make a Donation</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/contact">Get Involved</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
