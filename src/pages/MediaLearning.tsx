import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, Play, Pause, Video, Search, UserCheck, Stethoscope, 
  Share2, Clock, Sparkles, ExternalLink, Loader2 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PodcastEpisode {
  id: string | number;
  title: string;
  host: string;
  guest: string;
  guestRole: string;
  duration: string;
  date: string;
  summary: string;
  audioUrl?: string;
  youtubeId?: string;
  tags: string[];
}

interface Interview {
  id: string | number;
  expertName: string;
  role: "Doctor" | "Pharmacist" | "Researcher" | "Healthcare Professional";
  institution: string;
  topic: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  summary: string;
}

interface EducationalVideo {
  id: string | number;
  title: string;
  category: "Genetics" | "Pain Management" | "Nutrition" | "Pregnancy" | "Pediatric Care";
  duration: string;
  youtubeId: string;
  summary: string;
}

const defaultEpisodes: PodcastEpisode[] = [
  {
    id: "def-1",
    title: "Episode 1: Understanding Genotype Compatibility & Premarital Screening",
    host: "Sickle Cell Talk",
    guest: "Dr. Fatima Abubakar",
    guestRole: "Consultant Hematologist, ABUTH Zaria",
    duration: "24 mins",
    date: "Aug 15, 2026",
    summary: "In this episode, Dr. Fatima breaks down how hemoglobin genotypes (AA, AS, AC, SS, SC) interact during conception and why premarital genotype screening saves future generations.",
    tags: ["Genotypes", "Screening", "Family Planning"],
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: "def-2",
    title: "Episode 2: Navigating Pain Crises & Emergency Response at Home",
    host: "Sickle Cell Talk",
    guest: "Pharm. Chidimma Okeke",
    guestRole: "Clinical Pharmacist & Pain Specialist",
    duration: "32 mins",
    date: "Aug 02, 2026",
    summary: "Pharm. Chidimma explains practical first-line pain management strategies, hydration protocols, hydroxyurea adherence, and knowing exactly when to head to the emergency room.",
    tags: ["Pain Management", "Hydroxurea", "Emergency Care"],
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: "def-3",
    title: "Episode 3: Nutrition, Hydration & Immune Boosters for SCD Warriors",
    host: "Sickle Cell Talk",
    guest: "Dr. Ibrahim Keffi",
    guestRole: "Nutritional Hematologist",
    duration: "19 mins",
    date: "Jul 20, 2026",
    summary: "Learn about nutrient-dense local Nigerian foods, optimal folic acid intake, hydration goals, and immune fortification to reduce crisis frequency.",
    tags: ["Nutrition", "Hydration", "Wellness"],
    youtubeId: "dQw4w9WgXcQ"
  }
];

const defaultInterviews: Interview[] = [
  {
    id: "def-1",
    expertName: "Prof. Oladipo Bello",
    role: "Doctor",
    institution: "University College Hospital, Ibadan",
    topic: "Advances in Gene Therapy & Hydroxyurea Therapy in West Africa",
    duration: "18 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=60",
    summary: "An in-depth look into current clinical breakthroughs, accessibility of Hydroxyurea across Nigerian states, and emerging curative gene editing research."
  },
  {
    id: "def-2",
    expertName: "Pharm. Zainab Yusuf",
    role: "Pharmacist",
    institution: "National Hospital Abuja",
    topic: "Medication Adherence, Side Effect Management & Folic Acid Protocols",
    duration: "14 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=60",
    summary: "Pharm. Zainab discusses proper dosage schedules, managing minor side effects, and avoiding counterfeit medications in local pharmacies."
  },
  {
    id: "def-3",
    expertName: "Dr. Amina Garba",
    role: "Researcher",
    institution: "Nigerian Institute of Medical Research (NIMR)",
    topic: "Newborn Screening Programs & Early Pediatric Intervention",
    duration: "21 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1594824813571-24a69c100d37?w=600&auto=format&fit=crop&q=60",
    summary: "Insights into early diagnosis in infants under 6 months, prophylactic penicillin protocols, and improving child survival rates."
  }
];

const defaultVideos: EducationalVideo[] = [
  {
    id: 1,
    title: "How Sickle Cell Gene Mutation Alters Red Blood Cell Shape",
    category: "Genetics",
    duration: "6 mins",
    youtubeId: "dQw4w9WgXcQ",
    summary: "A 3D animated visualization of hemoglobin polymerization under low oxygen conditions."
  },
  {
    id: 2,
    title: "Hydration Science: Why Water Prevents Vaso-Occlusive Pain Crises",
    category: "Pain Management",
    duration: "8 mins",
    youtubeId: "dQw4w9WgXcQ",
    summary: "Detailed medical explanation of plasma volume expansion and blood viscosity reduction."
  }
];

export default function MediaLearning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcastList, setPodcastList] = useState<PodcastEpisode[]>(defaultEpisodes);
  const [interviewList, setInterviewList] = useState<Interview[]>(defaultInterviews);
  const [activePodcast, setActivePodcast] = useState<PodcastEpisode | null>(defaultEpisodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic podcast and media updates from Supabase
  useEffect(() => {
    async function fetchDynamicMedia() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("key", "media_episodes");

        if (error) throw error;

        if (data && data.length > 0 && Array.isArray(data[0].value)) {
          setPodcastList([...data[0].value, ...defaultEpisodes]);
          setActivePodcast(data[0].value[0] || defaultEpisodes[0]);
        }
      } catch (err) {
        console.warn("Dynamic media fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicMedia();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Video className="w-4 h-4" />
            <span>Dynamic Multimedia Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Media & Interactive Learning
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Listen to the <strong>Sickle Cell Talk</strong> podcast, watch expert interviews with doctors and pharmacists, 
            and explore educational videos curated for patients, families, and healthcare advocates.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search podcast episodes, expert names, or topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-2xl border-border shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 max-w-7xl">
        <Tabs defaultValue="podcast" className="w-full">
          
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-12 h-12 rounded-2xl bg-secondary/80 p-1">
            <TabsTrigger value="podcast" className="rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
              <Mic className="w-4 h-4 text-primary" /> Sickle Cell Talk Podcast
            </TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" /> Expert Interviews
            </TabsTrigger>
            <TabsTrigger value="videos" className="rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" /> Educational Videos
            </TabsTrigger>
          </TabsList>

          {/* Podcast Tab */}
          <TabsContent value="podcast" className="space-y-8">
            
            {/* Active Episode Audio Player Card */}
            {activePodcast && (
              <Card className="rounded-3xl border-primary/20 bg-gradient-to-r from-card via-card to-primary/5 shadow-md overflow-hidden p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-primary/10 rounded-2xl text-center relative">
                    <Mic className="w-16 h-16 text-primary mb-3 animate-pulse" />
                    <span className="text-xs uppercase font-bold tracking-wider text-primary">Now Playing</span>
                    <h3 className="font-extrabold text-lg mt-1">{activePodcast.host}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{activePodcast.date}</p>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {activePodcast.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        <Clock className="w-3.5 h-3.5" /> {activePodcast.duration}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {activePodcast.title}
                    </h2>

                    <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                      <UserCheck className="w-4 h-4 text-primary" />
                      <span>Guest: <strong>{activePodcast.guest}</strong> ({activePodcast.guestRole})</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activePodcast.summary}
                    </p>

                    {/* Audio Controls */}
                    <div className="pt-3 flex flex-wrap items-center gap-4 border-t border-border/60">
                      <Button 
                        variant="hero" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-full bg-primary text-primary-foreground font-semibold px-6 gap-2"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        {isPlaying ? "Pause Episode" : "Play Episode"}
                      </Button>

                      <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs" asChild>
                        <a href={`https://youtube.com/results?search_query=${encodeURIComponent(activePodcast.title)}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5" /> Watch on YouTube
                        </a>
                      </Button>

                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                  </div>
                </div>
              </Card>
            )}

            {/* Episode List */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold tracking-tight">All Episodes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {podcastList.map((ep) => (
                  <Card 
                    key={ep.id} 
                    onClick={() => { setActivePodcast(ep); setIsPlaying(true); }}
                    className={`rounded-2xl cursor-pointer border transition-all hover:shadow-md ${
                      activePodcast?.id === ep.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span className="font-semibold text-primary">{ep.host}</span>
                        <span>{ep.duration}</span>
                      </div>
                      <CardTitle className="text-base line-clamp-2">{ep.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 space-y-3">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {ep.summary}
                      </p>
                      <div className="text-xs font-semibold text-primary flex items-center gap-1">
                        <Play className="w-3.5 h-3.5 fill-current" /> Select Episode
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </TabsContent>

          {/* Expert Interviews Tab */}
          <TabsContent value="interviews" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-2xl font-bold">Showcase of Healthcare Experts</h2>
              <p className="text-sm text-muted-foreground">
                In-depth interviews with leading Nigerian hematologists, pharmacists, researchers, and physicians.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {interviewList.map((item) => (
                <Card key={item.id} className="rounded-2xl border-border overflow-hidden hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-video bg-muted overflow-hidden group">
                    <img 
                      src={item.thumbnail} 
                      alt={item.expertName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-medium">
                      {item.duration}
                    </span>
                  </div>

                  <CardHeader className="p-5 pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wide border-primary/40 text-primary">
                        {item.role}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.expertName}</CardTitle>
                    <CardDescription className="text-xs">{item.institution}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground mb-1">{item.topic}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>
                    </div>

                    <Button variant="outline" size="sm" asChild className="w-full rounded-xl gap-1 text-xs">
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="w-3.5 h-3.5 text-primary" /> Watch Interview
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Educational Videos Tab */}
          <TabsContent value="videos" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {defaultVideos.map((video) => (
                <Card key={video.id} className="rounded-2xl border-border overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {video.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {video.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {video.summary}
                    </p>

                    <div className="aspect-video rounded-xl bg-slate-900 flex items-center justify-center text-white relative overflow-hidden group">
                      <div className="text-center p-4">
                        <Video className="w-10 h-10 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xs text-slate-300">Click to load responsive video player</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </section>

    </div>
  );
}
