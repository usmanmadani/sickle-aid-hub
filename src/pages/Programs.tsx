import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, GraduationCap, HeartPulse, Stethoscope, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: "Community Education Workshops",
      description: "Interactive sessions teaching communities about sickle cell disease, prevention, and management. We conduct workshops in schools, churches, mosques, and community centers.",
      features: [
        "Free educational materials in English and Hausa",
        "Expert-led presentations",
        "Q&A sessions with healthcare professionals",
        "Take-home resources for families",
      ],
    },
    {
      icon: Stethoscope,
      title: "Free Genotype Testing",
      description: "Mobile testing units bringing free genotype screening to communities across Nigeria. Early detection and awareness save lives.",
      features: [
        "Professional medical staff",
        "Immediate results",
        "Genetic counseling included",
        "Confidential testing",
      ],
    },
    {
      icon: HeartPulse,
      title: "Patient Support Groups",
      description: "Monthly support meetings connecting individuals living with sickle cell disease and their families. Share experiences, gain strength, find community.",
      features: [
        "Peer support networks",
        "Mental health resources",
        "Family counseling",
        "Crisis intervention support",
      ],
    },
    {
      icon: BookOpen,
      title: "School Outreach Program",
      description: "Partnering with schools to educate students, teachers, and parents about sickle cell disease and the importance of knowing your genotype.",
      features: [
        "Age-appropriate curriculum",
        "Teacher training sessions",
        "Student awareness campaigns",
        "Parent education evenings",
      ],
    },
  ];

  const upcomingEvents = [
    {
      date: "March 15, 2025",
      title: "Community Health Fair - Lagos",
      description: "Free genotype testing and health screening",
    },
    {
      date: "April 2, 2025",
      title: "Awareness Walk - Abuja",
      description: "Join us for a 5km walk to raise awareness",
    },
    {
      date: "April 20, 2025",
      title: "Educational Workshop - Kano",
      description: "Workshop on sickle cell management in Hausa",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive initiatives designed to educate, support, and empower communities 
              in the fight against sickle cell disease.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <program.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us at our upcoming events and be part of the movement to raise awareness.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-[var(--shadow-soft)] transition-all">
                <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-primary mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent border-none shadow-[var(--shadow-glow)]">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Want to Get Involved?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Whether you want to volunteer, host an event in your community, or partner with us, 
                we'd love to hear from you.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="bg-background text-foreground border-background hover:bg-background/90"
                asChild
              >
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Programs;
