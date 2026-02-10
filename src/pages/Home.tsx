import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatCounter from "@/components/StatCounter";
import { Users, Heart, Award, ArrowRight, Activity, Globe } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const iconMap: any = {
  Heart,
  Users,
  Award,
  Activity,
  Globe
};

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const Home = () => {
  const [hero, setHero] = useState<any>(null);
  const [mission, setMission] = useState<any>(null);
  const [cta, setCta] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: contentData } = await supabase.from('site_content').select('*');
        const { data: statsData } = await supabase.from('impact_stats').select('*').order('order');

        if (contentData) {
          const heroContent = contentData.find(c => c.key === 'home_hero')?.value;
          const missionContent = contentData.find(c => c.key === 'home_mission')?.value;
          const ctaContent = contentData.find(c => c.key === 'home_cta')?.value;

          setHero(heroContent);
          setMission(missionContent);
          setCta(ctaContent);
        }

        if (statsData) {
          setStats(statsData);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Defaults if loading or no data
  const heroTitle = hero?.title || "Bringing Hope to Those Affected by Sickle Cell";
  const heroSubtitle = hero?.subtitle || "We believe prevention starts with awareness. We believe patients deserve hope. ❤️";
  const missionDesc = mission?.description || "Red Hope is dedicated to raising awareness about sickle cell disease and providing support to affected individuals and their families across Nigeria and beyond.";
  const ctaTitle = cta?.title || "Join the Movement";
  const ctaDesc = cta?.description || "Your support can save lives. WHETHER through donations, volunteering, or spreading awareness, every action counts.";

  const defaultStats = [
    { label: "Annual SCD Deaths Of Children Under 5 Years", count: 100000, suffix: "+", icon: "Heart", color: "primary" },
    { label: "SCD Carriers", count: 50000000, suffix: "+", icon: "Users", color: "primary" },
    { label: "Annual SCD Births", count: 150000, suffix: "+", icon: "Award", color: "primary" }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-background">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {heroTitle}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {heroSubtitle}
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
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">NATIONAL EMERGENCY!</h2>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Nigeria is the Sickle Cell Disorder Capital of the World!
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon || "Heart"] || Heart;
              return (
                <motion.div
                  key={stat.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center border-none rounded-2xl shadow-[var(--shadow-card)] card-hover">
                    <CardContent className="pt-8 pb-8">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className={`w-8 h-8 text-primary`} />
                      </motion.div>
                      <div className={`text-4xl font-bold text-primary mb-2`}>
                        <StatCounter end={stat.count} suffix={stat.suffix} />
                      </div>
                      <p className="text-lg text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="max-w-md mx-auto border-2 border-primary">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-3xl font-bold text-primary mb-2">25%</h3>
                <p className="text-lg text-foreground">of Nigerians are AS</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted">
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
                {missionDesc}
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
      <section className="py-20 bg-primary relative overflow-hidden">
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
            {ctaTitle}
          </motion.h2>
          <motion.p
            className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {ctaDesc}
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
    </motion.div>
  );
};

export default Home;
