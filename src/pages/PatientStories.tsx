import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MessageSquare, Heart, Send, Sparkles, UserCheck, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  author: string;
  isAnonymous: boolean;
  age?: number;
  location: string;
  category: "Living with SCD" | "School" | "Career" | "Pain Crisis" | "Family" | "Mental Health" | "Hope" | "Success Stories";
  title: string;
  snippet: string;
  fullStory: string;
  likes: number;
  date: string;
}

const initialStories: Story[] = [
  {
    id: 1,
    author: "Fayza A.",
    isAnonymous: false,
    age: 24,
    location: "Kano State",
    category: "Career",
    title: "Rising Above Pain: Becoming a Software Engineer with SS Genotype",
    snippet: "There were days in university when pain crisis kept me in the hospital for weeks. But resilience and proper hydration helped me graduate and build my career.",
    fullStory: "Growing up with sickle cell disease (SS) in Nigeria meant facing constant hospital visits, missing school terms, and enduring misconceptions. Many thought warriors couldn't handle demanding careers. During my final year, I had a severe vaso-occlusive crisis right before final exams. Thanks to supportive doctors and my family, I recovered, sat for my exams, and graduated with first-class honors. Today, I work full-time in tech. To every warrior: your genotype does not define your destiny.",
    likes: 142,
    date: "Aug 10, 2026"
  },
  {
    id: 2,
    author: "Anonymous Warrior",
    isAnonymous: true,
    location: "Abuja, FCT",
    category: "Pain Crisis",
    title: "What I Wish People Understood About Bone Pain",
    snippet: "A sickle cell crisis is not just 'a headache' or 'minor tiredness'. It feels like crushed glass in your bones. Support and empathy mean everything.",
    fullStory: "When crisis hits, the pain is intense and unrelenting. It strikes joint by joint. What hurts almost as much as the physical pain is when people at work or school doubt your symptoms because you look fine on the outside. Joining Red Hope Initiative's support group gave me a safe space where people truly understand without judgment.",
    likes: 98,
    date: "Jul 28, 2026"
  },
  {
    id: 3,
    author: "Israel M.",
    isAnonymous: false,
    age: 29,
    location: "Lagos State",
    category: "Hope",
    title: "Fatherhood, Hydroxyurea, and Living Beyond the Diagnosis",
    snippet: "Starting Hydroxyurea five years ago changed everything for me. My crisis frequency dropped from 6 times a year to zero. Now I'm a proud father.",
    fullStory: "For years I lived in fear of starting a family. My wife (AA) and I consulted hematologists and used Red Hope's compatibility tool. Understanding the genetics gave us absolute confidence. Today, I am healthy, my daughter is vibrant, and I advocate for daily medication adherence everywhere I go.",
    likes: 215,
    date: "Jul 15, 2026"
  }
];

const categories = [
  "All Stories",
  "Living with SCD",
  "School",
  "Career",
  "Pain Crisis",
  "Family",
  "Mental Health",
  "Hope",
  "Success Stories"
];

export default function PatientStories() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const { toast } = useToast();

  // Submission Form State
  const [formData, setFormData] = useState({
    author: "",
    isAnonymous: false,
    location: "",
    category: "Living with SCD",
    title: "",
    fullStory: ""
  });

  const filteredStories = selectedCategory === "All Stories"
    ? stories
    : stories.filter((s) => s.category === selectedCategory);

  const handleLike = (id: number) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s))
    );
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.fullStory) {
      toast({
        title: "Incomplete Submission",
        description: "Please provide a title and your story content.",
        variant: "destructive"
      });
      return;
    }

    const newStory: Story = {
      id: Date.now(),
      author: formData.isAnonymous ? "Anonymous Warrior" : (formData.author || "Warrior"),
      isAnonymous: formData.isAnonymous,
      location: formData.location || "Nigeria",
      category: formData.category as Story["category"],
      title: formData.title,
      snippet: formData.fullStory.slice(0, 140) + "...",
      fullStory: formData.fullStory,
      likes: 1,
      date: "Just now"
    };

    setStories([newStory, ...stories]);
    setSubmitDialogOpen(false);
    setFormData({ author: "", isAnonymous: false, location: "", category: "Living with SCD", title: "", fullStory: "" });
    toast({
      title: "Story Submitted!",
      description: "Thank you for giving pain a voice. Your story inspires the community.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>Community Storytelling</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Pain Has A Voice
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Real lived experiences from sickle cell warriors, parents, and caregivers. 
            Read inspiring stories of courage, victory, and hope, or share your own journey with the world.
          </p>

          <div className="pt-4 flex justify-center">
            <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg" className="rounded-2xl bg-primary text-primary-foreground font-semibold px-8 gap-2">
                  <Send className="w-4 h-4" /> Share Your Story
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-2xl rounded-3xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Quote className="w-6 h-6 text-primary" /> Share Your Voice
                  </DialogTitle>
                  <DialogDescription>
                    Your story offers strength to someone in pain. You can choose to post under your name or completely anonymously.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmitStory} className="space-y-4 pt-2">
                  
                  {/* Anonymous Switch */}
                  <div className="flex items-center space-x-3 p-3 bg-secondary/60 rounded-xl border border-border">
                    <Checkbox 
                      id="anonymous" 
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: !!checked })}
                    />
                    <Label htmlFor="anonymous" className="text-sm font-semibold cursor-pointer flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Submit Anonymously (Hide my name and photo)
                    </Label>
                  </div>

                  {!formData.isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-medium">Your Name / Pseudonym</Label>
                        <Input 
                          placeholder="e.g. Fayza A."
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Location (State/City)</Label>
                        <Input 
                          placeholder="e.g. Abuja, FCT"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="rounded-xl mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs font-medium">Story Category</Label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-10 mt-1 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {categories.filter((c) => c !== "All Stories").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium">Story Title</Label>
                    <Input 
                      placeholder="e.g. My First Year In University With SCD"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="rounded-xl mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium">Your Story Content</Label>
                    <Textarea 
                      placeholder="Write your experience, challenges, victories, or words of encouragement for fellow warriors..."
                      value={formData.fullStory}
                      onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                      className="rounded-xl mt-1 min-h-[140px]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setSubmitDialogOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" variant="hero" className="rounded-xl bg-primary text-white">
                      Submit Story
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-8 container mx-auto px-4 max-w-7xl border-b">
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

      {/* Stories Grid */}
      <section className="py-12 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <motion.div key={story.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="rounded-3xl border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                
                <CardHeader className="p-6 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full text-[11px] font-semibold">
                      {story.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{story.date}</span>
                  </div>

                  <CardTitle className="text-xl leading-snug line-clamp-2">
                    {story.title}
                  </CardTitle>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <UserCheck className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {story.isAnonymous ? "Anonymous Warrior" : story.author} • {story.location}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    "{story.snippet}"
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-border/60">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(story.id)}
                      className="rounded-full text-xs gap-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>{story.likes}</span>
                    </Button>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedStory(story)}
                      className="rounded-full text-xs"
                    >
                      Read Full Story
                    </Button>
                  </div>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Reader Modal */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="sm:max-w-2xl rounded-3xl p-8 max-h-[85vh] overflow-y-auto">
            <DialogHeader className="space-y-2">
              <Badge variant="secondary" className="w-fit rounded-full text-xs">
                {selectedStory.category}
              </Badge>
              <DialogTitle className="text-2xl font-extrabold leading-tight">
                {selectedStory.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2">
                <span>By <strong>{selectedStory.author}</strong></span>
                <span>•</span>
                <span>{selectedStory.location}</span>
                <span>•</span>
                <span>{selectedStory.date}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4 text-sm leading-relaxed text-foreground border-y border-border/60">
              <Quote className="w-8 h-8 text-primary/30 float-left mr-2" />
              <p className="whitespace-pre-line">{selectedStory.fullStory}</p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleLike(selectedStory.id)}
                className="rounded-full gap-2 text-rose-600 border-rose-200"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{selectedStory.likes} Warriors Inspired</span>
              </Button>

              <Button variant="default" size="sm" onClick={() => setSelectedStory(null)} className="rounded-xl">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
