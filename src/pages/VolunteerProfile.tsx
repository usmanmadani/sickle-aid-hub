import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserCog, ArrowLeft, Save, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { NIGERIAN_STATES } from "@/lib/nigeria";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HOURS = [
  { value: "flexible", label: "Flexible / anytime" },
  { value: "mornings", label: "Mornings (8am - 12pm)" },
  { value: "afternoons", label: "Afternoons (12pm - 5pm)" },
  { value: "evenings", label: "Evenings (5pm - 9pm)" },
  { value: "weekends", label: "Weekends only" },
];

const profileSchema = z.object({
  bio: z.string().trim().max(600, { message: "Bio must be less than 600 characters" }),
  state: z.string().trim().max(60).optional(),
  city: z.string().trim().max(80, { message: "City must be less than 80 characters" }).optional(),
  availability_days: z.array(z.string()).max(7),
  availability_hours: z.string().trim().min(1),
  skills: z.string().trim().max(300, { message: "Skills must be less than 300 characters" }),
});

export default function VolunteerProfile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [form, setForm] = useState({
    bio: "",
    state: "",
    city: "",
    availability_days: [] as string[],
    availability_hours: "flexible",
    skills: "",
  });

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [appRes, profRes] = await Promise.all([
        supabase
          .from("volunteer_applications")
          .select("full_name,status,state")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("volunteer_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      setStatus((appRes.data as any)?.status ?? null);
      setFullName((appRes.data as any)?.full_name ?? "");

      const prof = profRes.data as any;
      setForm({
        bio: prof?.bio ?? "",
        state: prof?.state ?? (appRes.data as any)?.state ?? "",
        city: prof?.city ?? "",
        availability_days: prof?.availability_days ?? [],
        availability_hours: prof?.availability_hours ?? "flexible",
        skills: prof?.skills ?? "",
      });
      setFetching(false);
    };
    load();
  }, [user]);

  const toggleDay = (day: string) => {
    setForm((f) => ({
      ...f,
      availability_days: f.availability_days.includes(day)
        ? f.availability_days.filter((d) => d !== day)
        : [...f.availability_days, day],
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please check your details",
        description: parsed.error.errors[0]?.message,
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("volunteer_profiles").upsert(
      {
        user_id: user.id,
        bio: parsed.data.bio,
        state: parsed.data.state || null,
        city: parsed.data.city || null,
        availability_days: parsed.data.availability_days,
        availability_hours: parsed.data.availability_hours,
        skills: parsed.data.skills,
      },
      { onConflict: "user_id" }
    );
    setSaving(false);

    if (error) {
      toast({ title: "Could not save profile", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Profile updated", description: "Your volunteer profile has been saved." });
  };

  if (loading || !user || fetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (status !== "approved") {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="rounded-3xl border-dashed">
            <CardContent className="py-12 text-center space-y-4">
              <ShieldAlert className="w-10 h-10 mx-auto text-muted-foreground" />
              <h1 className="text-xl font-bold">Profile not available yet</h1>
              <p className="text-muted-foreground text-sm">
                {status === "pending"
                  ? "Your volunteer application is still under review. Once approved you can set up your profile here."
                  : status === "rejected"
                  ? "Your application was not approved, so the volunteer profile is unavailable."
                  : "Submit a volunteer application first to unlock your profile."}
              </p>
              <Button asChild className="rounded-2xl">
                <Link to={status ? "/volunteer/dashboard" : "/volunteer"}>
                  {status ? "Back to dashboard" : "Apply as a volunteer"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Button asChild variant="ghost" size="sm" className="rounded-2xl -ml-2 mb-2">
            <Link to="/volunteer/dashboard">
              <ArrowLeft className="w-4 h-4 mr-1" /> Volunteer Hub
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <UserCog className="w-4 h-4" /> Volunteer Profile
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
            {fullName || "Your volunteer profile"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Tell the Red Hope team about yourself and when you are available for outreach.
          </p>
        </motion.div>

        <Card className="rounded-3xl border-border">
          <CardHeader>
            <CardTitle className="text-xl">About you</CardTitle>
            <CardDescription>
              A short bio helps coordinators match you with the right activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={5}
                maxLength={600}
                placeholder="Share your background, advocacy experience, or why you volunteer..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">{form.bio.length}/600 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (optional)</Label>
              <Input
                id="skills"
                maxLength={300}
                placeholder="e.g. Public speaking, first aid, graphic design"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border">
          <CardHeader>
            <CardTitle className="text-xl">Location</CardTitle>
            <CardDescription>Where you can support outreach on the ground.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={form.state || undefined}
                onValueChange={(v) => setForm({ ...form, state: v })}
              >
                <SelectTrigger id="state" className="rounded-2xl">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City / Town / LGA</Label>
              <Input
                id="city"
                maxLength={80}
                placeholder="e.g. Keffi"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border">
          <CardHeader>
            <CardTitle className="text-xl">Availability</CardTitle>
            <CardDescription>Pick the days and time window that work best for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label>Available days</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DAYS.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 rounded-2xl border border-border px-3 py-2 text-sm cursor-pointer hover:bg-secondary/40 transition-colors"
                  >
                    <Checkbox
                      checked={form.availability_days.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    {day.slice(0, 3)}
                  </label>
                ))}
              </div>
              {form.availability_days.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.availability_days.map((d) => (
                    <Badge key={d} variant="secondary" className="rounded-full">
                      {d}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Preferred hours</Label>
              <Select
                value={form.availability_hours}
                onValueChange={(v) => setForm({ ...form, availability_hours: v })}
              >
                <SelectTrigger id="hours" className="rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map((h) => (
                    <SelectItem key={h.value} value={h.value}>
                      {h.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="rounded-2xl w-full sm:w-auto">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save profile
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
