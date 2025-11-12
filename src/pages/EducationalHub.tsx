import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, HelpCircle, Search, Share2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: number;
  title: string;
  description: string;
  category: "article" | "video" | "faq";
  readTime?: string;
  duration?: string;
  tags: string[];
  language: string[];
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Sickle Cell Disease: The Basics",
    description: "A comprehensive guide to understanding what sickle cell disease is, its causes, and how it affects the body.",
    category: "article",
    readTime: "5 min read",
    tags: ["Basics", "Education"],
    language: ["English", "Hausa"],
  },
  {
    id: 2,
    title: "Genotype Testing: What You Need to Know",
    description: "Learn about the importance of genotype testing, when to get tested, and how to interpret results.",
    category: "article",
    readTime: "7 min read",
    tags: ["Testing", "Prevention"],
    language: ["English", "Yoruba"],
  },
  {
    id: 3,
    title: "Living with Sickle Cell: A Day in the Life",
    description: "Watch how individuals with sickle cell disease manage their daily lives and maintain their health.",
    category: "video",
    duration: "8:30",
    tags: ["Stories", "Daily Life"],
    language: ["English"],
  },
  {
    id: 4,
    title: "Nutrition Tips for Sickle Cell Warriors",
    description: "Essential dietary guidelines and nutrition tips for managing sickle cell disease effectively.",
    category: "article",
    readTime: "6 min read",
    tags: ["Health", "Nutrition"],
    language: ["English", "Igbo"],
  },
  {
    id: 5,
    title: "Understanding Genotype Compatibility",
    description: "An animated explanation of how different genotypes interact and the risks involved in various combinations.",
    category: "video",
    duration: "5:15",
    tags: ["Education", "Prevention"],
    language: ["English", "Hausa"],
  },
];

const faqs = [
  {
    id: 1,
    question: "What is the difference between AS and SS genotype?",
    answer: "AS means you're a carrier (sickle cell trait) - you have one normal hemoglobin gene and one sickle hemoglobin gene. You're usually healthy. SS means you have sickle cell disease - both genes are sickle hemoglobin genes, which causes the disease symptoms.",
  },
  {
    id: 2,
    question: "Can two AS genotypes get married?",
    answer: "While it's legally possible, it's not medically recommended without genetic counseling. There's a 25% chance with each pregnancy that the child will have sickle cell disease (SS), 50% chance of being a carrier (AS), and 25% chance of being normal (AA).",
  },
  {
    id: 3,
    question: "How much does genotype testing cost in Nigeria?",
    answer: "Genotype testing typically costs between ₦2,000 to ₦5,000 in most hospitals and diagnostic centers across Nigeria. Some government health centers offer it at subsidized rates or free during outreach programs.",
  },
  {
    id: 4,
    question: "At what age should children be tested?",
    answer: "Children can be tested for their genotype at any age. However, it's recommended to test before starting school (around 3-5 years old) and definitely before marriage. Some hospitals offer newborn screening.",
  },
  {
    id: 5,
    question: "Is sickle cell disease curable?",
    answer: "Currently, the only potential cure is a bone marrow transplant, which is expensive and not widely available in Nigeria. However, with proper medical care, pain management, and lifestyle adjustments, people with sickle cell disease can live full, productive lives.",
  },
  {
    id: 6,
    question: "What triggers a sickle cell crisis?",
    answer: "Common triggers include dehydration, extreme temperatures (cold or hot), stress, high altitude, infections, and overexertion. Each person may have different triggers, so it's important to know your own and avoid them.",
  },
];

const EducationalHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const articles = filteredResources.filter((r) => r.category === "article");
  const videos = filteredResources.filter((r) => r.category === "video");

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Educational Hub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Access comprehensive resources, articles, and videos about sickle cell disease, genotype awareness, and prevention strategies.
            </p>
            
            {/* Language Selector */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Available in:</span>
              {["English", "Hausa", "Yoruba", "Igbo"].map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, videos, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            {/* All Resources */}
            <TabsContent value="all" className="space-y-6">
              {filteredResources.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground">No resources found matching your search.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-[var(--shadow-soft)] transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {resource.category === "article" ? (
                              <BookOpen className="w-5 h-5 text-primary" />
                            ) : (
                              <Video className="w-5 h-5 text-accent" />
                            )}
                            <span className="text-xs text-muted-foreground uppercase">
                              {resource.category}
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          {resource.readTime && (
                            <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                          )}
                          {resource.duration && (
                            <span className="text-sm text-muted-foreground">⏱️ {resource.duration}</span>
                          )}
                          <div className="flex gap-2">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Articles */}
            <TabsContent value="articles" className="space-y-6">
              {articles.map((resource) => (
                <Card key={resource.id} className="hover:shadow-[var(--shadow-soft)] transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground uppercase">Article</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                        <div className="flex gap-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Read Article
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos" className="space-y-6">
              {videos.map((resource) => (
                <Card key={resource.id} className="hover:shadow-[var(--shadow-soft)] transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-5 h-5 text-accent" />
                      <span className="text-xs text-muted-foreground uppercase">Video</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">⏱️ {resource.duration}</span>
                        <div className="flex gap-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Watch Video
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* FAQs */}
            <TabsContent value="faqs" className="space-y-6">
              <div className="text-center mb-8">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Find answers to common questions about sickle cell disease and genotype testing
                </p>
              </div>

              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center border-2 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is here to help answer your questions and provide additional resources.
              </p>
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EducationalHub;
