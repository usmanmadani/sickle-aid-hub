import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Calendar, MapPin, CheckCircle2, ArrowRight, Camera, 
  Sparkles, School, Stethoscope, Heart, UserPlus 
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCounter from "@/components/StatCounter";

interface OutreachEvent {
  id: number;
  title: string;
  type: "Secondary School" | "Medical Outreach" | "Community Sensitization";
  date: string;
  location: string;
  state: string;
  status: "Upcoming" | "Completed";
  description: string;
  attendees?: string;
}

const events: OutreachEvent[] = [
  {
    id: 1,
    title: "Keffi Secondary Schools Genotype Awareness Campaign",
    type: "Secondary School",
    date: "September 15, 2026",
    location: "Government Secondary School, Keffi",
    state: "Nasarawa State",
    status: "Upcoming",
    description: "Free genotype counseling, interactive genetics workshop, and screening for senior students before tertiary admission.",
    attendees: "Target: 500+ Students"
  },
  {
    id: 2,
    title: "Abuja Central Market Medical Screening & Consultation",
    type: "Medical Outreach",
    date: "October 04, 2026",
    location: "Utako Market Pavilion, Abuja",
    state: "FCT",
    status: "Upcoming",
    description: "Free HPLC genotype testing, basic health checks, free folic acid distribution, and doctor consultations.",
    attendees: "Target: 1,000+ Traders & Families"
  },
  {
    id: 3,
    title: "World Sickle Cell Day Youth Summit 2026",
    type: "Community Sensitization",
    date: "June 19, 2026",
    location: "National Women Centre, Abuja",
    state: "FCT",
    status: "Completed",
    description: "Brought together 800+ youth leaders, hematologists, and advocates to campaign against stigma and promote genotype compatibility.",
    attendees: "Attended: 850 Individuals"
  },
  {
    id: 4,
    title: "Lafia Community Health & Pain Care Outreach",
    type: "Medical Outreach",
    date: "April 12, 2026",
    location: "General Hospital Hall, Lafia",
    state: "Nasarawa State",
    status: "Completed",
    description: "Distributed 300+ emergency pain care packages, Hydroxyurea kits, and conducted educational seminars for parents.",
    attendees: "Attended: 420 Warriors & Caregivers"
  }
];

const photoGallery = [
  {
    id: 1,
    title: "School Screening Session",
    location: "Keffi",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Free Counseling & Genotype Testing",
    location: "Abuja",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Pain Management Package Distribution",
    location: "Lafia",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Youth Ambassadors Orientation",
    location: "Nasarawa",
    imageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&auto=format&fit=crop&q=60"
  }
];

export default function Outreach() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Users className="w-4 h-4" />
            <span>Red Hope Community Outreach</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Grassroots Outreach & Field Programs
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            From secondary school sensitization to free genotype testing camps in underserved communities across Nigeria, 
            Red Hope Initiative takes active steps to prevent sickle cell disease and support warriors.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild className="rounded-2xl bg-primary text-primary-foreground font-semibold px-8 gap-2">
              <Link to="/volunteer">
                <UserPlus className="w-4 h-4" /> Register as a Volunteer
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="rounded-2xl border-primary/30 font-semibold px-8">
              <Link to="/donate">
                <Heart className="w-4 h-4 text-primary fill-primary" /> Sponsor an Event
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <StatCounter end={15000} suffix="+" title="Free Genotype Tests" />
            </div>
            <div className="p-4">
              <StatCounter end={50} suffix="+" title="Secondary Schools" />
            </div>
            <div className="p-4">
              <StatCounter end={120} suffix="+" title="Community Programs" />
            </div>
            <div className="p-4">
              <StatCounter end={5000} suffix="+" title="Care Packages Distributed" />
            </div>
          </div>
        </div>
      </section>

      {/* Program Streams */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-bold">Our Core Outreach Initiatives</h2>
          <p className="text-sm text-muted-foreground">Targeted interventions tailored for youth, schools, and rural communities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Secondary School Programs</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Educating students on genetic inheritance before they enter relationships. We conduct free testing and distribute educational workbooks.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Medical Outreach Camps</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deploying medical teams to rural and peri-urban areas with mobile genotype labs, hematologist consultations, and emergency pain kits.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Campus Ambassadors</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Training tertiary institution students across Nigeria to lead peer education, genotype drives, and crisis support networks on campus.
            </p>
          </Card>

        </div>
      </section>

      {/* Upcoming & Past Events Tabs */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold">Events & Campaigns Schedule</h2>
                <p className="text-xs text-muted-foreground">Find outreach programs happening near you.</p>
              </div>

              <TabsList className="rounded-2xl bg-background border p-1">
                <TabsTrigger value="upcoming" className="rounded-xl text-xs font-semibold">
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="past" className="rounded-xl text-xs font-semibold">
                  Past Events
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.filter((e) => e.status === "Upcoming").map((event) => (
                  <Card key={event.id} className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all bg-card">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="rounded-full bg-primary text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        {event.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight">{event.title}</h3>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}, {event.state}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-border/60">
                      <span className="text-xs font-semibold text-primary">{event.attendees}</span>
                      <Button variant="hero" size="sm" asChild className="rounded-xl bg-primary text-xs">
                        <Link to="/volunteer">Register to Attend</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.filter((e) => e.status === "Completed").map((event) => (
                  <Card key={event.id} className="rounded-3xl border-border p-6 space-y-4 bg-card opacity-90">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight">{event.title}</h3>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{event.location}, {event.state}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-border/60">
                      <span className="text-xs text-muted-foreground">{event.attendees}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 container mx-auto px-4 max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Outreach Photo Gallery</h2>
            <p className="text-xs text-muted-foreground">Snapshots from field deployments and educational drives.</p>
          </div>
          <Camera className="w-6 h-6 text-primary" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoGallery.map((photo) => (
            <div key={photo.id} className="group relative rounded-3xl overflow-hidden aspect-square border border-border shadow-sm">
              <img 
                src={photo.imageUrl} 
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">{photo.location}</span>
                <h4 className="font-bold text-sm leading-tight">{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
