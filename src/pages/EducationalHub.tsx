import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, HelpCircle, Search, Share2, Globe, Clock, User, Calendar, ExternalLink, Quote, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string | number;
  title: string;
  category: string;
  description: string;
  content: string;
  readTime: string;
  author: string;
  publishDate: string;
  tags: string[];
}

const defaultArticles: Article[] = [
  {
    id: "def-1",
    title: "Understanding Sickle Cell Disease: The Biological Foundations",
    category: "Understanding Sickle Cell Disease",
    description: "A comprehensive guide to understanding hemoglobin gene mutations, red blood cell sickling, and blood flow impact.",
    content: "Sickle Cell Disease (SCD) is a group of inherited red blood cell disorders. In healthy individuals, red blood cells are round, flexible biconcave discs that move easily through blood vessels to deliver oxygen to tissues. In people with SCD, abnormal hemoglobin (HbS) forms hard, rigid rods when oxygen levels drop, distorting cells into a crescent or 'sickle' shape. These stiff cells can stick together and clog small blood vessels, leading to vaso-occlusive pain crises, organ damage, and chronic anemia.",
    readTime: "6 min read",
    author: "Dr. Fatima Abubakar",
    publishDate: "Aug 12, 2026",
    tags: ["Basics", "Biology", "Hemoglobin"]
  },
  {
    id: "def-2",
    title: "How Sickle Cell Disease is Inherited: Punnett Squares Made Simple",
    category: "How Sickle Cell Disease is Inherited",
    description: "Learn how parent genotype combinations pass down traits to offspring with exact percentages.",
    content: "Sickle cell is an autosomal recessive genetic condition. This means a child must inherit two sickle cell genes (one from each parent) to have Sickle Cell Anemia (SS). If a child inherits one normal gene (A) and one sickle gene (S), they become a carrier (AS). AS carriers live normal lives and do not experience disease symptoms, but they can pass the S gene to their children.",
    readTime: "7 min read",
    author: "Dr. Ibrahim Keffi",
    publishDate: "Aug 05, 2026",
    tags: ["Genetics", "Inheritance", "Family Planning"]
  },
  {
    id: "def-3",
    title: "Understanding Genotypes: AA, AS, AC, SC & SS Explained",
    category: "Understanding Genotypes",
    description: "A complete breakdown of all major hemoglobin genotypes found across West Africa.",
    content: "Hemoglobin genotypes vary across human populations. AA represents normal adult hemoglobin. AS is sickle cell trait (carrier). AC is Hemoglobin C trait (carrier). SS is sickle cell anemia (severe). SC is Sickle Hemoglobin C disease (moderate to severe). SC disease occurs when a person inherits one S gene and one C gene.",
    readTime: "5 min read",
    author: "Pharm. Chidimma Okeke",
    publishDate: "Jul 29, 2026",
    tags: ["Genotypes", "Testing"]
  },
  {
    id: "def-4",
    title: "Pain Crisis Prevention & Emergency Management Protocols",
    category: "Pain Crisis",
    description: "First-line home protocols, hydration benchmarks, and recognizing severe warning signals.",
    content: "A vaso-occlusive crisis occurs when sickled red blood cells block capillary blood flow, starving tissues of oxygen. Immediate triggers include cold exposure, dehydration, physical exertion, stress, and infections. First-line management involves aggressive oral hydration with warm water, rest in a warm environment, and prescribed pain relievers.",
    readTime: "8 min read",
    author: "Dr. Fatima Abubakar",
    publishDate: "Jul 18, 2026",
    tags: ["Pain Management", "Emergency", "Crisis"]
  },
  {
    id: "def-5",
    title: "Optimal Nutrition & Dietary Guidelines for SCD Warriors",
    category: "Nutrition",
    description: "Nutrient-dense Nigerian foods, folic acid supplementation, and immune-supporting diets.",
    content: "Good nutrition plays a crucial role in maintaining high energy and supporting red blood cell turnover in warriors. Because sickled blood cells break down faster than normal cells (10-20 days vs 120 days), the bone marrow works constantly. Daily folic acid, zinc, magnesium, and antioxidant-rich foods like leafy greens, legumes, and citrus fruits are vital.",
    readTime: "5 min read",
    author: "Dr. Ibrahim Keffi",
    publishDate: "Jul 10, 2026",
    tags: ["Nutrition", "Folic Acid", "Diet"]
  },
  {
    id: "def-6",
    title: "Busting Common Sickle Cell Myths vs Scientific Facts",
    category: "Myths vs Facts",
    description: "Debunking widespread cultural myths surrounding genotype compatibility and treatment.",
    content: "Myth: 'AS carriers can get sickle cell crises.' Fact: False. AS carriers have enough normal hemoglobin to prevent sickling under normal conditions. Myth: 'Sickle cell is a spiritual curse.' Fact: False. SCD is a purely inherited genetic trait passed from parents to children.",
    readTime: "4 min read",
    author: "Red Hope Editorial Team",
    publishDate: "Jun 02, 2026",
    tags: ["Myths", "Facts", "Education"]
  }
];

const categories = [
  "All Categories",
  "Understanding Sickle Cell Disease",
  "How Sickle Cell Disease is Inherited",
  "Understanding Genotypes",
  "Pain Crisis",
  "Nutrition",
  "Mental Health",
  "Pregnancy",
  "Myths vs Facts",
  "Frequently Asked Questions"
];

export default function EducationalHub() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [loading, setLoading] = useState(true);

  // Dynamic fetch from Supabase blog_posts posted by Admin
  useEffect(() => {
    async function fetchDynamicPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const dynamicMapped: Article[] = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: "Understanding Sickle Cell Disease",
            description: p.excerpt || p.content.slice(0, 140) + "...",
            content: p.content,
            readTime: `${Math.ceil(p.content.split(" ").length / 200)} min read`,
            author: "Red Hope Admin",
            publishDate: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            tags: ["Admin Post", "Education"]
          }));

          setArticles([...dynamicMapped, ...defaultArticles]);
        }
      } catch (err) {
        console.warn("Dynamic articles fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicPosts();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All Categories" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (article: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: `Article link for "${article.title}" copied to clipboard.`,
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Dynamic Knowledge Centre</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Educational Resources & Medical Articles
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Evidence-based medical articles, genetics guides, pain prevention protocols, and live updates published by Red Hope Initiative healthcare experts.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search by topic, keyword, or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-2xl border-border shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 container mx-auto px-4 max-w-7xl border-b">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full text-xs font-medium whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 container mx-auto px-4 max-w-7xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="rounded-3xl border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                
                <CardHeader className="p-6 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full text-[11px] font-semibold">
                      {article.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <CardTitle className="text-xl leading-snug line-clamp-2">
                    {article.title}
                  </CardTitle>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{article.author}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.publishDate}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {article.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-border/60">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedArticle(article)}
                      className="rounded-full text-xs"
                    >
                      Read Article
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleShare(article)}
                      className="rounded-full"
                      title="Share article link"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Article Detail View Modal */}
      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="sm:max-w-3xl rounded-3xl p-8 max-h-[85vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full text-xs">
                  {selectedArticle.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                </span>
              </div>

              <DialogTitle className="text-2xl md:text-3xl font-extrabold leading-tight">
                {selectedArticle.title}
              </DialogTitle>

              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-3">
                <span>Written by <strong>{selectedArticle.author}</strong></span>
                <span>•</span>
                <span>Published {selectedArticle.publishDate}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-4 text-sm leading-relaxed text-foreground border-y border-border/60">
              <p className="font-semibold text-base text-primary leading-snug">
                {selectedArticle.description}
              </p>
              <p className="whitespace-pre-line">{selectedArticle.content}</p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleShare(selectedArticle)}
                className="rounded-full gap-2 text-xs"
              >
                <Share2 className="w-4 h-4" /> Share Article
              </Button>

              <Button variant="default" size="sm" onClick={() => setSelectedArticle(null)} className="rounded-xl">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
