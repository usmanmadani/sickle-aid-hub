import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Amina Bello",
      role: "Founder & Executive Director",
      bio: "Hematologist with 15+ years experience in sickle cell care.",
    },
    {
      name: "Ibrahim Yusuf",
      role: "Community Outreach Coordinator",
      bio: "Passionate advocate for healthcare accessibility in rural areas.",
    },
    {
      name: "Blessing Okafor",
      role: "Programs Director",
      bio: "Expert in public health education and awareness campaigns.",
    },
    {
      name: "Dr. Chidi Okonkwo",
      role: "Medical Advisor",
      bio: "Pediatric specialist focusing on sickle cell management.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Red Hope</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a non-profit organization committed to eradicating the stigma around sickle 
              cell disease and ensuring that every affected individual has access to proper care, 
              support, and hope for a better future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-[var(--shadow-soft)]">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To raise awareness, provide support, and advocate for individuals and families 
                  affected by sickle cell disease through education and community engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-soft)]">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where sickle cell disease is fully understood, effectively managed, and 
                  no longer a barrier to living a healthy, fulfilling life.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-soft)]">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Compassion, integrity, community, education, and empowerment guide everything 
                  we do in our fight against sickle cell disease.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Red Hope was founded in 2018 by a group of healthcare professionals and community 
                leaders who witnessed firsthand the devastating impact of sickle cell disease on 
                Nigerian families. What started as a small awareness campaign in Lagos has grown 
                into a nationwide movement.
              </p>
              <p>
                Over the years, we've conducted thousands of free genotype tests, organized hundreds 
                of educational workshops, and supported countless families navigating the challenges 
                of sickle cell disease. Our work has reached communities across Nigeria, from bustling 
                urban centers to remote rural villages.
              </p>
              <p>
                Today, Red Hope continues to expand its reach and impact, working tirelessly to ensure 
                that no one faces sickle cell disease alone. Through partnerships with hospitals, 
                schools, and community organizations, we're building a network of support that spans 
                the entire country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals working together to make a difference in the lives of those 
              affected by sickle cell disease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-[var(--shadow-soft)] transition-all">
                <CardContent className="pt-8 pb-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
