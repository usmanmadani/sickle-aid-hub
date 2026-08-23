import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Heart, ArrowRight, Shield, Activity, MapPin, Calculator, BookOpen, 
  Tv, MessageSquare, Users, Sparkles, Bot, CheckCircle2, UserCheck, Flame, Award 
} from "lucide-react";
import RedBloodCellIllustration from "@/components/illustrations/RedBloodCellIllustration";
import FloatingParticles from "@/components/illustrations/FloatingParticles";
import { 
  AnimatedHeartIcon, AnimatedDnaIcon, AnimatedDropletIcon, 
  AnimatedShieldIcon, AnimatedSparklesIcon, AnimatedPulseBadge 
} from "@/components/illustrations/AnimatedMedicalIcons";
import StatCounter from "@/components/StatCounter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20 overflow-x-hidden relative">
      
      {/* Ambient Motion Background Particles */}
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background z-10 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Animated Partnership Header Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <AnimatedPulseBadge text="Red Hope Initiative • Technology Partner: ZannaTech Innovations Ltd" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content with Stagger Animations */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Empowering Lives Through <span className="text-primary underline decoration-primary/30 relative inline-block">
                  Awareness
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-3 -right-6 text-primary text-xl"
                  >
                    ✦
                  </motion.span>
                </span>, Prevention & Support
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Sickle Aid Hub is a digital health platform developed by Red Hope Initiative to provide 
                sickle cell education, genotype awareness, patient support, and community engagement across Nigeria.
              </p>

              {/* 4 Hero Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="lg" asChild className="rounded-2xl bg-primary text-primary-foreground font-semibold px-6 shadow-md hover:shadow-lg">
                    <Link to="/resources" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Learn About Sickle Cell
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" asChild className="rounded-2xl border-primary/30 font-semibold px-6 backdrop-blur-sm">
                    <Link to="/auth" className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      Patient Login
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" size="lg" asChild className="rounded-2xl font-semibold px-6 shadow-sm">
                    <Link to="/donate" className="flex items-center gap-2">
                      <AnimatedHeartIcon className="w-4 h-4 text-primary" />
                      Donate
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="lg" asChild className="rounded-2xl font-semibold px-6 border border-border">
                    <Link to="/volunteer" className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Become a Volunteer
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Key Highlights Pills */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Educational Hub
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Genotype Compatibility Tool
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Testing Centers
                </span>
              </div>
            </motion.div>

            {/* Hero Right Medical Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <RedBloodCellIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* High-Impact Statistics Section with Motion Graphics & Icon Illustrations */}
      <section className="py-16 bg-gradient-to-b from-secondary/40 via-background to-secondary/30 border-y border-border relative overflow-hidden z-10">
        {/* Ambient Motion Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10 space-y-12">
          
          {/* Top 3 Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-stretch">
            
            {/* Stat 1: 100,000+ Annual SCD Deaths Of Children Under 5 Years */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between space-y-5 group"
            >
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/70 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  <Heart className="w-8 h-8 stroke-[2.2]" />
                </motion.div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-25" />
              </div>

              <div className="space-y-2">
                <StatCounter end={100000} suffix="+" />
                <p className="text-sm sm:text-base font-semibold text-muted-foreground max-w-[220px] mx-auto leading-snug">
                  Annual SCD Deaths Of Children Under 5 Years
                </p>
              </div>
            </motion.div>

            {/* Stat 2: 50,000,000+ SCD Carriers */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between space-y-5 group"
            >
              <div className="relative">
                <motion.div 
                  animate={{ y: [0, -4, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/70 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  <Users className="w-8 h-8 stroke-[2.2]" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <StatCounter end={50000000} suffix="+" />
                <p className="text-sm sm:text-base font-semibold text-muted-foreground max-w-[220px] mx-auto leading-snug">
                  SCD Carriers
                </p>
              </div>
            </motion.div>

            {/* Stat 3: 150,000+ Annual SCD Births */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between space-y-5 group"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: [0, 6, -6, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/70 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  <Award className="w-8 h-8 stroke-[2.2]" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <StatCounter end={150000} suffix="+" />
                <p className="text-sm sm:text-base font-semibold text-muted-foreground max-w-[220px] mx-auto leading-snug">
                  Annual SCD Births
                </p>
              </div>
            </motion.div>

          </div>

          {/* Red Outlined Highlight Card: 25% of Nigerians are AS */}
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.93 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="max-w-xl mx-auto rounded-[2.5rem] border-2 border-primary bg-card/90 backdrop-blur-md p-8 sm:p-10 text-center shadow-xl relative overflow-hidden group"
          >
            {/* Ambient background glow accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />

            <div className="relative z-10 space-y-2">
              <div className="text-5xl sm:text-6xl font-black text-primary tracking-tight">
                <StatCounter end={25} suffix="%" />
              </div>
              <p className="text-lg sm:text-xl font-bold tracking-wide text-foreground">
                of Nigerians are AS
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Ecosystem Pillars Grid */}
      <section className="py-20 bg-background relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 inline-flex items-center gap-1.5">
              <AnimatedDnaIcon className="w-4 h-4 text-primary" /> Digital Health Ecosystem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Designed for Education, Prevention & Comprehensive Care
            </h2>
            <p className="text-muted-foreground text-base">
              Sickle Aid Hub integrates interactive tools, verified medical guidance, multimedia learning, and a dedicated patient portal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Compatibility Checker Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }} 
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full rounded-3xl border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Genotype Compatibility</CardTitle>
                  <CardDescription>
                    Compare genotypes (AA, AS, AC, SS, SC) with Punnett squares and inheritance probability.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Get instant visual risk breakdowns and expert medical advice before family planning.
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full rounded-xl group">
                    <Link to="/genotype-checker" className="flex items-center justify-between">
                      <span>Check Compatibility</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Find Testing Center Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }} 
            >
              <Card className="h-full rounded-3xl border-border hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <CardTitle className="text-xl">Find Testing Centres</CardTitle>
                  <CardDescription>
                    Search verified hospitals, diagnostic labs, and partner testing centers across Nigeria.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Filter by State and City to get addresses, operating hours, contacts, and directions.
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full rounded-xl group">
                    <Link to="/testing-centers" className="flex items-center justify-between">
                      <span>Locate Nearest Centre</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Educational Hub Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.01 }} 
            >
              <Card className="h-full rounded-3xl border-border hover:border-blue-500/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Educational Resources</CardTitle>
                  <CardDescription>
                    Curated articles, infographics, FAQs, and guides on genetics, nutrition, and pain management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Available in multiple languages including English, Hausa, Yoruba, and Igbo.
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full rounded-xl group">
                    <Link to="/resources" className="flex items-center justify-between">
                      <span>Explore Knowledge Base</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-600" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Media & Podcast Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.01 }} 
            >
              <Card className="h-full rounded-3xl border-border hover:border-purple-500/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                    <Tv className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Media & Learning</CardTitle>
                  <CardDescription>
                    "Sickle Cell Talk" podcast, medical expert interviews, and educational video library.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Watch interviews with hematologists, researchers, pharmacists, and advocates.
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full rounded-xl group">
                    <Link to="/media" className="flex items-center justify-between">
                      <span>Listen & Watch</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-purple-600" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pain Has A Voice Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }} 
            >
              <Card className="h-full rounded-3xl border-border hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Pain Has A Voice</CardTitle>
                  <CardDescription>
                    Real warrior stories on living with SCD, school, career, family, and hope.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Read inspiring experiences or share your own journey (with anonymous submission option).
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full rounded-xl group">
                    <Link to="/stories" className="flex items-center justify-between">
                      <span>Read Patient Stories</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-600" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Hub Feature Card */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }} 
            >
              <Card className="h-full rounded-3xl border-primary/30 bg-primary/5 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-3 shadow-md">
                    <AnimatedShieldIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Patient Hub <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Auth Required</span>
                  </CardTitle>
                  <CardDescription>
                    Track hydration, pain logs, medications, emergency cards, health reports & AI Assistant.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Exclusive personal dashboard for registered warriors to manage daily health.
                  </p>
                  <Button variant="hero" size="sm" asChild className="w-full rounded-xl group bg-primary">
                    <Link to="/dashboard" className="flex items-center justify-between">
                      <span>Enter Patient Hub</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SickleAid AI Feature Showcase Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-semibold">
                <AnimatedSparklesIcon className="w-4 h-4 text-amber-400" />
                <span>Patient Exclusive Feature</span>
              </div>

              <h3 className="text-3xl font-bold tracking-tight text-white">
                Meet SickleAid AI — Your Digital Health Companion
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Integrated into the Patient Hub, SickleAid AI helps logged-in patients understand 
                medications, analyze hydration trends, track pain triggers, suggest healthy lifestyle habits, 
                and navigate platform features with ease.
              </p>

              <div className="text-xs text-slate-400 bg-slate-800/80 p-3 rounded-xl border border-slate-700 max-w-2xl">
                ⚠️ <strong>Medical Disclaimer:</strong> SickleAid AI provides educational & self-management support. 
                It does not diagnose conditions or prescribe treatment. Always consult qualified doctors for medical care.
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="lg" asChild className="rounded-2xl bg-primary text-primary-foreground text-base px-8 py-6 shadow-xl">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Try SickleAid AI
                  </Link>
                </Button>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/30 relative z-10">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 max-w-4xl text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Together, We Can End the Sickle Cell Pain Cycle
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Whether you want to test your genotype, support an outreach program, donate to assist patients in pain crisis, 
            or volunteer as a Campus Ambassador — every action creates real impact.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="lg" asChild className="rounded-2xl bg-primary px-8">
                <Link to="/donate" className="flex items-center gap-2">
                  <AnimatedHeartIcon className="w-5 h-5 text-white" />
                  Support Our Mission
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" asChild className="rounded-2xl px-8">
                <Link to="/volunteer">
                  Become a Volunteer
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
