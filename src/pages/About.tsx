import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, ShieldCheck, Download, FileText, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import fayzaImg from "@/assets/fayza.jpg";
import hauwaImg from "@/assets/hauwa.jpg";
import israelImg from "@/assets/israel.png";
import leoImg from "@/assets/leo.jpg";
import aishaImg from "@/assets/aisha.jpg";
import zannatechLogo from "@/assets/zannatech-logo.png";

const About = () => {
  const teamMembers = [
    {
      name: "Fayza Madani Zanna",
      role: "Team Lead / President",
      bio: "Passionate researcher and advocate for sickle cell awareness, genotype compatibility, and patient empowerment across Nigeria.",
      image: fayzaImg,
    },
    {
      name: "Hauwa Musa Bello",
      role: "Media and Publicity Manager",
      bio: "Health advocate driving digital campaigns, podcast production, and community sensitization programs.",
      image: hauwaImg,
    },
    {
      name: "Ogusola Israel",
      role: "Outreach & Partnership Coordinator",
      bio: "Public health education coordinator leading secondary school drives and hospital partner networks.",
      image: israelImg,
    },
    {
      name: "Leonard Manther",
      role: "Program and Logistics Officer",
      bio: "Logistics specialist managing mobile screening kits, field medical equipment, and volunteer deployment.",
      image: leoImg,
    },
    {
      name: "Nanat Aisha Ajibade",
      role: "Health and Research Lead",
      bio: "Clinical researcher focusing on pediatric sickle cell interventions, hydration science, and pain crisis management.",
      image: aishaImg,
    },
  ];

  const annualReports = [
    { year: "2025 - 2026", title: "Sickle Aid Hub Impact & Outreaches Report", size: "2.4 MB PDF" },
    { year: "2024 - 2025", title: "Secondary Schools Genotype Screening Audit", size: "1.8 MB PDF" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/20 shadow-sm text-xs font-semibold text-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Red Hope Initiative • Technology Partner: ZannaTech Innovations Ltd</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              About Red Hope Initiative & Sickle Aid Hub
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Sickle Aid Hub is a digital health ecosystem created by <strong>Red Hope Initiative</strong> to reduce 
              the burden of sickle cell disease across Nigeria through genotype education, free field testing, patient management tools, and community engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <Card className="text-center rounded-3xl border-border p-8 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To eliminate preventable sickle cell births through high school & community genotype awareness, while equipping warriors with digital self-care tools.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center rounded-3xl border-border p-8 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Nigeria where every citizen knows their genotype before marriage, and where every sickle cell patient receives dignified, world-class digital health support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center rounded-3xl border-border p-8 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold">Our Core Values</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empathy, scientific integrity, transparency, youth leadership, and relentless commitment to pain crisis alleviation.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Tech Partnership Banner */}
      <section className="py-16 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card rounded-3xl p-8 border border-primary/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={zannatechLogo} alt="ZannaTech Innovations Ltd Logo" className="w-16 h-16 object-contain rounded-2xl bg-white p-1 border shadow-sm shrink-0" />
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider text-primary border-primary/40">
                  Technology & Innovation Partner
                </Badge>
                <h3 className="text-2xl font-bold">ZannaTech Innovations Ltd</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  ZannaTech Innovations Ltd partners with Red Hope Initiative to architect, develop, and maintain the 
                  Sickle Aid Hub web and mobile infrastructure, securing patient health data and powering SickleAid AI.
                </p>
              </div>
            </div>

            <Button variant="outline" size="lg" asChild className="rounded-2xl shrink-0 font-semibold border-primary/30">
              <Link to="/contact">Contact Technical Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container mx-auto px-4 max-w-7xl space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Meet Our Leadership Team</h2>
          <p className="text-sm text-muted-foreground">
            Dedicated health advocates, researchers, and logistics officers driving change across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="rounded-3xl border-border overflow-hidden hover:shadow-md transition-all text-center">
              <div className="aspect-square bg-muted overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-base leading-tight">{member.name}</h3>
                <p className="text-xs font-semibold text-primary">{member.role}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Annual Reports & Transparency */}
      <section className="py-16 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Annual Reports & Financial Transparency</h2>
              <p className="text-xs text-muted-foreground">Download public impact reports and financial audits of Red Hope Initiative campaigns.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {annualReports.map((report, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-card border border-border flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">{report.title}</h4>
                      <span className="text-xs text-muted-foreground">{report.year} • {report.size}</span>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => alert(`Downloading ${report.title}...`)}
                    className="rounded-full"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-6 text-center">
              <Button variant="hero" size="lg" asChild className="rounded-2xl bg-primary text-white font-semibold px-8">
                <Link to="/volunteer" className="flex items-center gap-2">
                  Get Involved as a Partner <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
