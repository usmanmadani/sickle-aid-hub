import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, Shield, Droplets, Activity, Pill, Calendar, FileText, 
  Users, Bot, AlertTriangle, Phone, Download, CheckCircle2, Plus, Sparkles, 
  TrendingUp, Award, Heart, Loader2, ArrowRight, Printer, Share2, MessageSquare 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

// Mock weekly data for Recharts
const mockHydrationData = [
  { day: "Mon", ml: 2500, goal: 3000 },
  { day: "Tue", ml: 3000, goal: 3000 },
  { day: "Wed", ml: 2800, goal: 3000 },
  { day: "Thu", ml: 3200, goal: 3000 },
  { day: "Fri", ml: 2600, goal: 3000 },
  { day: "Sat", ml: 3100, goal: 3000 },
  { day: "Sun", ml: 3000, goal: 3000 },
];

const mockPainHistory = [
  { date: "Aug 01", level: 3, trigger: "Cold Weather" },
  { date: "Aug 05", level: 7, trigger: "Dehydration" },
  { date: "Aug 10", level: 2, trigger: "Stress" },
  { date: "Aug 15", level: 5, trigger: "Exercise" },
  { date: "Aug 19", level: 1, trigger: "None" },
];

export default function UserDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");

  // Hydration state
  const [waterMl, setWaterMl] = useState(2200);
  const waterGoal = 3000;

  // Medication schedule state
  const [meds, setMeds] = useState([
    { id: 1, name: "Hydroxyurea", dose: "500mg", time: "08:00 AM", taken: true },
    { id: 2, name: "Folic Acid", dose: "5mg", time: "08:00 AM", taken: true },
    { id: 3, name: "Paludrine (Proguanil)", dose: "100mg", time: "08:00 PM", taken: false },
    { id: 4, name: "Ibuprofen / Paracetamol", dose: "400mg", time: "As Needed", taken: false },
  ]);

  // Pain log form state
  const [painLevel, setPainLevel] = useState(3);
  const [painLocation, setPainLocation] = useState("Joints");
  const [painTrigger, setPainTrigger] = useState("Cold weather");
  const [painMedTaken, setPainMedTaken] = useState("Paracetamol");
  const [hospitalVisited, setHospitalVisited] = useState("No");
  const [painNotes, setPainNotes] = useState("");

  // AI Chat state
  const [aiMessages, setAiMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am SickleAid AI, your personal digital health companion. How are you feeling today? Ask me about your medications, hydration goals, or self-care tips!"
    }
  ]);
  const [aiInput, setAiInput] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading your Patient Hub...</p>
      </div>
    );
  }

  const patientName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Warrior";

  const handleAddWater = (amount: number) => {
    const next = waterMl + amount;
    setWaterMl(next);
    toast({
      title: `+${amount}ml Water Added! 💧`,
      description: `Daily intake: ${next}ml / ${waterGoal}ml`,
    });
  };

  const toggleMed = (id: number) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
    toast({
      title: "Medication Updated",
      description: "Dose status logged for today.",
    });
  };

  const handleLogPain = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pain Log Saved",
      description: `Pain level ${painLevel}/10 recorded. Keep hydrated and rest!`,
    });
    setPainNotes("");
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userQuery = aiInput;
    setAiMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setAiInput("");

    // Simulate AI response
    setTimeout(() => {
      let botReply = "Staying well hydrated is essential for preventing sickling in blood vessels. Make sure to drink at least 3 liters of clean water daily.";
      
      const q = userQuery.toLowerCase();
      if (q.includes("pain") || q.includes("crisis")) {
        botReply = "For mild to moderate pain, rest in a warm room, drink warm fluids, and take prescribed analgesics like Paracetamol. If pain is severe or accompanied by fever, seek immediate hospital attention!";
      } else if (q.includes("hydroxyurea")) {
        botReply = "Hydroxyurea increases fetal hemoglobin (HbF), making red blood cells bigger and less prone to sickling. Take it consistently as prescribed by your hematologist.";
      } else if (q.includes("water") || q.includes("hydration")) {
        botReply = `You have logged ${waterMl}ml today! Your daily target is ${waterGoal}ml. Keep a reusable water bottle near your desk or bed at all times.`;
      }

      setAiMessages((prev) => [...prev, { sender: "ai", text: botReply }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Header Banner */}
      <section className="py-10 bg-gradient-to-r from-primary/10 via-background to-secondary/40 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="rounded-full bg-primary text-xs">
                  Logged In Patient Portal
                </Badge>
                {isAdmin && (
                  <Badge variant="outline" className="rounded-full border-primary/40 text-primary text-xs">
                    Admin Access
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {patientName}! 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Your personal health dashboard for medication tracking, hydration, pain logs, and AI support.
              </p>
            </div>

            {/* Emergency Button */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button 
                variant="destructive" 
                size="lg" 
                onClick={() => {
                  toast({
                    title: "EMERGENCY SOS INITIATED 🚨",
                    description: "Connecting to emergency contacts and nearest medical center...",
                    variant: "destructive"
                  });
                }}
                className="rounded-2xl font-bold gap-2 animate-pulse w-full md:w-auto shadow-lg"
              >
                <AlertTriangle className="w-5 h-5 fill-current" /> EMERGENCY SOS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Layout */}
      <section className="py-8 container mx-auto px-4 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          <TabsList className="flex overflow-x-auto justify-start max-w-full mb-8 h-12 rounded-2xl bg-secondary/70 p-1 scrollbar-none">
            <TabsTrigger value="overview" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Activity className="w-3.5 h-3.5 text-primary" /> Overview
            </TabsTrigger>
            <TabsTrigger value="medication" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Pill className="w-3.5 h-3.5 text-primary" /> Medication
            </TabsTrigger>
            <TabsTrigger value="hydration" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Droplets className="w-3.5 h-3.5 text-blue-500" /> Hydration
            </TabsTrigger>
            <TabsTrigger value="pain" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Pain Tracker
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Activity className="w-3.5 h-3.5 text-amber-500" /> Symptoms
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5 text-purple-500" /> Appointments
            </TabsTrigger>
            <TabsTrigger value="emergency" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5 text-red-600" /> Emergency Card
            </TabsTrigger>
            <TabsTrigger value="reports" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <FileText className="w-3.5 h-3.5 text-emerald-500" /> Health Reports
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <Users className="w-3.5 h-3.5 text-indigo-500" /> Community
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap bg-primary/10 text-primary">
              <Sparkles className="w-3.5 h-3.5" /> SickleAid AI
            </TabsTrigger>
          </TabsList>

          {/* 1. OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Card className="rounded-3xl border-border p-6 space-y-2 bg-card">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>Hydration Today</span>
                  <Droplets className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-extrabold">{waterMl} / {waterGoal} ml</div>
                <Progress value={(waterMl / waterGoal) * 100} className="h-2" />
              </Card>

              <Card className="rounded-3xl border-border p-6 space-y-2 bg-card">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>Medication Adherence</span>
                  <Pill className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
                <p className="text-[11px] text-muted-foreground">All morning doses completed</p>
              </Card>

              <Card className="rounded-3xl border-border p-6 space-y-2 bg-card">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>Recent Pain Level</span>
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-extrabold text-amber-500">3 / 10</div>
                <p className="text-[11px] text-muted-foreground">Mild discomfort (Joints)</p>
              </Card>

              <Card className="rounded-3xl border-border p-6 space-y-2 bg-card">
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>Next Routine Clinic</span>
                  <Calendar className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-xl font-bold">Sept 05, 2026</div>
                <p className="text-[11px] text-muted-foreground">National Hospital Abuja</p>
              </Card>

            </div>

            {/* Quick Action Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Log Hydration</h3>
                    <p className="text-xs text-muted-foreground">Add 250ml or 500ml water</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAddWater(250)} className="w-full rounded-xl text-xs">
                    +250ml Glass
                  </Button>
                  <Button size="sm" onClick={() => handleAddWater(500)} variant="outline" className="w-full rounded-xl text-xs">
                    +500ml Bottle
                  </Button>
                </div>
              </Card>

              <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Record Pain Log</h3>
                    <p className="text-xs text-muted-foreground">Track crisis frequency & triggers</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => setActiveTab("pain")} className="w-full rounded-xl text-xs bg-rose-600 text-white">
                  Open Pain Log Form
                </Button>
              </Card>

              <Card className="rounded-3xl border-primary/30 bg-primary/5 p-6 space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Ask SickleAid AI</h3>
                    <p className="text-xs text-muted-foreground">Medication advice & self-care</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => setActiveTab("ai")} className="w-full rounded-xl text-xs bg-primary text-white">
                  Start AI Chat
                </Button>
              </Card>

            </div>
          </TabsContent>

          {/* 2. MEDICATION TRACKER TAB */}
          <TabsContent value="medication" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Medication Schedule & History</h2>
                <p className="text-xs text-muted-foreground">Never miss a dose of Hydroxyurea or prophylactic medication.</p>
              </div>
              <Button size="sm" className="rounded-xl gap-1 text-xs">
                <Plus className="w-4 h-4" /> Add Medication
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meds.map((m) => (
                <Card key={m.id} className="rounded-3xl border-border p-6 flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-lg">{m.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Dose: {m.dose} • Time: {m.time}</p>
                  </div>

                  <Button 
                    variant={m.taken ? "default" : "outline"} 
                    size="sm"
                    onClick={() => toggleMed(m.id)}
                    className={`rounded-full text-xs font-semibold ${m.taken ? "bg-emerald-600 text-white" : ""}`}
                  >
                    {m.taken ? <><CheckCircle2 className="w-4 h-4 mr-1" /> Taken Today</> : "Mark Taken"}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 3. HYDRATION TRACKER TAB */}
          <TabsContent value="hydration" className="space-y-8">
            <Card className="rounded-3xl border-border p-8 bg-card space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-extrabold flex items-center gap-2">
                    <Droplets className="w-8 h-8 text-blue-500" /> Daily Water Tracker
                  </h2>
                  <p className="text-sm text-muted-foreground">Goal: 3,000ml (12 glasses) daily to keep blood flowing smoothly.</p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => handleAddWater(250)} className="rounded-2xl bg-blue-600 text-white font-semibold">
                    + 250ml Glass
                  </Button>
                  <Button onClick={() => handleAddWater(500)} variant="outline" className="rounded-2xl font-semibold">
                    + 500ml Bottle
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Current Intake: {waterMl} ml</span>
                  <span>{Math.round((waterMl / waterGoal) * 100)}% Completed</span>
                </div>
                <Progress value={(waterMl / waterGoal) * 100} className="h-4 rounded-full bg-secondary" />
              </div>

              {/* Weekly Trend Recharts Chart */}
              <div className="pt-6 border-t border-border space-y-4">
                <h3 className="font-bold text-base">Weekly Hydration Trend</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockHydrationData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ml" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* 4. PAIN CRISIS TRACKER TAB */}
          <TabsContent value="pain" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <Card className="lg:col-span-6 rounded-3xl border-border p-6 space-y-4">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-500" /> Log Pain Crisis Episode
                  </CardTitle>
                </CardHeader>

                <form onSubmit={handleLogPain} className="space-y-4 text-xs">
                  <div>
                    <Label className="font-semibold">Pain Intensity (1 - 10 Scale): <strong className="text-rose-500 text-sm">{painLevel}</strong></Label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={painLevel} 
                      onChange={(e) => setPainLevel(parseInt(e.target.value))}
                      className="w-full mt-2 accent-rose-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Pain Location</Label>
                      <select 
                        value={painLocation} 
                        onChange={(e) => setPainLocation(e.target.value)}
                        className="w-full h-10 mt-1 rounded-xl border bg-background px-3"
                      >
                        <option value="Joints">Joints / Knees</option>
                        <option value="Chest">Chest Area</option>
                        <option value="Back">Lower Back</option>
                        <option value="Abdomen">Abdomen</option>
                        <option value="Arms/Legs">Arms / Legs</option>
                      </select>
                    </div>

                    <div>
                      <Label className="font-semibold">Identified Trigger</Label>
                      <select 
                        value={painTrigger} 
                        onChange={(e) => setPainTrigger(e.target.value)}
                        className="w-full h-10 mt-1 rounded-xl border bg-background px-3"
                      >
                        <option value="Cold weather">Cold Weather</option>
                        <option value="Dehydration">Dehydration</option>
                        <option value="Stress">Physical Stress</option>
                        <option value="Exercise">Strenuous Exercise</option>
                        <option value="Infection">Infection / Malaria</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold">Medication Taken</Label>
                    <Input 
                      value={painMedTaken} 
                      onChange={(e) => setPainMedTaken(e.target.value)}
                      placeholder="e.g. Paracetamol 1000mg + Tramadol"
                      className="rounded-xl mt-1"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold">Notes / Symptoms</Label>
                    <Textarea 
                      value={painNotes} 
                      onChange={(e) => setPainNotes(e.target.value)}
                      placeholder="Details on duration, rest taken..."
                      className="rounded-xl mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-2xl bg-rose-600 text-white font-semibold py-5">
                    Save Pain Log
                  </Button>
                </form>
              </Card>

              {/* History Chart */}
              <Card className="lg:col-span-6 rounded-3xl border-border p-6 space-y-4">
                <h3 className="font-bold text-lg">Pain History Chart</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockPainHistory}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="level" stroke="#E11D48" fill="#F43F5E" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

            </div>
          </TabsContent>

          {/* 5. SYMPTOM JOURNAL TAB */}
          <TabsContent value="symptoms" className="space-y-6">
            <Card className="rounded-3xl border-border p-6 space-y-6">
              <h2 className="text-2xl font-bold">Daily Symptom Journal</h2>
              <p className="text-xs text-muted-foreground">Record fatigue, fever, mood, and sleep quality for medical reviews.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="p-4 text-center rounded-2xl bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Fatigue Level</span>
                  <div className="text-xl font-bold text-amber-500">Moderate</div>
                </Card>
                <Card className="p-4 text-center rounded-2xl bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Temperature</span>
                  <div className="text-xl font-bold text-emerald-500">36.6 °C</div>
                </Card>
                <Card className="p-4 text-center rounded-2xl bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Sleep Quality</span>
                  <div className="text-xl font-bold text-blue-500">7.5 Hours</div>
                </Card>
                <Card className="p-4 text-center rounded-2xl bg-secondary/50">
                  <span className="text-xs text-muted-foreground">Appetite</span>
                  <div className="text-xl font-bold text-emerald-500">Good</div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* 6. APPOINTMENTS TAB */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="rounded-3xl border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Upcoming Medical Appointments</h2>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-bold text-sm">Hematology Routine Clinic</h4>
                      <p className="text-xs text-muted-foreground">Sept 05, 2026 at 09:00 AM • National Hospital Abuja</p>
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>

                <div className="p-4 rounded-2xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <div>
                      <h4 className="font-bold text-sm">Full Blood Count (FBC) Lab Test</h4>
                      <p className="text-xs text-muted-foreground">Sept 12, 2026 at 08:30 AM • Synlab Abuja</p>
                    </div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* 7. EMERGENCY CARD TAB */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="max-w-xl mx-auto space-y-6">
              
              {/* Digital Emergency Card */}
              <Card className="rounded-3xl border-2 border-primary/30 p-8 shadow-xl bg-gradient-to-br from-card via-card to-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                  Digital Health ID
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary font-bold text-2xl flex items-center justify-center border-2 border-primary">
                    {patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold">{patientName}</h3>
                    <p className="text-xs text-muted-foreground">Sickle Aid Hub Certified Card</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-secondary/60 p-4 rounded-2xl border border-border">
                  <div>
                    <span className="text-muted-foreground block">Genotype</span>
                    <strong className="text-base text-primary">SS (Sickle Cell)</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Blood Group</span>
                    <strong className="text-base text-foreground">O+ Positive</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Known Allergies</span>
                    <strong className="text-foreground">Penicillin (Severe)</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">ICE Contact</span>
                    <strong className="text-foreground">+234 813 085 2118</strong>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span>Primary Hospital: <strong>National Hospital Abuja</strong></span>
                  <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-xl gap-1">
                    <Printer className="w-3.5 h-3.5" /> Print Card
                  </Button>
                </div>
              </Card>

            </div>
          </TabsContent>

          {/* 8. PERSONAL HEALTH REPORTS TAB */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="rounded-3xl border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Personal Health Reports</h2>
              <p className="text-xs text-muted-foreground">Generate comprehensive summary reports of your hydration, pain history, and medication adherence to share with your hematologist.</p>

              <div className="pt-4 flex gap-4">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Health Report Generated! 📄",
                      description: "Downloading your 30-day summary PDF...",
                    });
                  }}
                  className="rounded-2xl bg-primary text-white font-semibold gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF Report
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* 9. COMMUNITY TAB */}
          <TabsContent value="community" className="space-y-6">
            <Card className="rounded-3xl border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Private Warrior Community Forum</h2>
              <p className="text-xs text-muted-foreground">Connect with fellow warriors, join monthly hydration challenges, and share daily encouragement.</p>

              <div className="p-4 rounded-2xl bg-secondary/50 border space-y-2">
                <span className="text-xs text-primary font-bold uppercase">Monthly Challenge</span>
                <h3 className="font-bold text-base">3L Daily Water Hydration Challenge</h3>
                <p className="text-xs text-muted-foreground">Log 3,000ml daily for 30 consecutive days to unlock your Warrior Hydration Badge.</p>
              </div>
            </Card>
          </TabsContent>

          {/* 10. SICKLEAID AI ASSISTANT TAB */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="rounded-3xl border-primary/20 p-6 space-y-4 bg-card shadow-lg">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary text-white">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-xl">SickleAid AI Assistant</h2>
                    <p className="text-xs text-muted-foreground">Exclusive patient self-management assistant</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-600 text-xs">
                  Online
                </Badge>
              </div>

              {/* Disclaimer */}
              <div className="text-xs text-amber-800 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 p-3 rounded-2xl border border-amber-200">
                ⚠️ <strong>Non-Diagnostic Disclaimer:</strong> SickleAid AI provides educational information and habit reminders. It does NOT diagnose illnesses or prescribe medication. Consult a qualified doctor for medical emergencies.
              </div>

              {/* Chat Thread */}
              <div className="h-80 overflow-y-auto space-y-3 p-4 rounded-2xl bg-secondary/40 border border-border">
                {aiMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-primary text-primary-foreground font-medium rounded-br-none" 
                        : "bg-card text-foreground border border-border shadow-sm rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendAiMessage} className="flex gap-2">
                <Input 
                  placeholder="Ask SickleAid AI about medications, pain crisis tips, hydration..." 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="rounded-2xl h-12 text-xs"
                />
                <Button type="submit" className="rounded-2xl h-12 px-6 bg-primary text-white font-semibold">
                  Send
                </Button>
              </form>

            </Card>
          </TabsContent>

        </Tabs>
      </section>

    </div>
  );
}
