import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";
import fayzaImg from "@/assets/fayza.jpg";
import hauwaImg from "@/assets/hauwa.jpg";
import israelImg from "@/assets/israel.png";
import leoImg from "@/assets/leo.jpg";
import aishaImg from "@/assets/aisha.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Fayza Madani Zanna",
      role: "Team Lead / President",
      bio: "Passionate in sickle cell research and care",
      image: fayzaImg,
    },
    {
      name: "Hauwa Musa Bello",
      role: "Media and Publicity Manager",
      bio: "Health influencer",
      image: hauwaImg,
    },
    {
      name: "Ogusola Israel",
      role: "Outreach and Partnership Coordinator",
      bio: "Expert in public health education and awareness campaigns",
      image: israelImg,
    },
    {
      name: "Leonard Manther",
      role: "Program and Logistics Officer",
      bio: "Health influencer",
      image: leoImg,
    },
    {
      name: "Nanat Aisha Ajibade",
      role: "Health and Research Lead",
      bio: "Expert in research",
      image: aishaImg,
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
              Red Hope Initiative is a student-led initiative founded in 2025 to reduce the burden of sickle cell disease in Nigeria by raising awareness about genotype compatibility, providing accessible testing resources, and empowering communities through education. We believe that prevention starts with knowledge, and every individual deserves the information needed to make informed decisions about their health and future.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-[var(--shadow-soft)] transition-all">
                <CardContent className="pt-8 pb-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
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
