import { useEffect, useRef, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import AvatarCropDialog from "@/components/AvatarCropDialog";
import {
  Loader2,
  UserCog,
  ArrowLeft,
  Save,
  ShieldAlert,
  Camera,
  Trash2,
  CheckCircle2,
  CircleDashed,
  History,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { NIGERIAN_STATES } from "@/lib/nigeria";
import { signedUrl } from "@/lib/volunteerAvatar";
import {
  profileCompleteness,
  logProfileChanges,
  SECTION_LABELS,
  type HistoryRow,
  type SectionKey,
} from "@/lib/volunteerProfile";

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
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [form, setForm] = useState({
    bio: "",
    state: "",
    city: "",
    availability_days: [] as string[],
    availability_hours: "flexible",
    skills: "",
  });
  const savedRef = useRef(form);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const loadHistory = async (userId: string) => {
    const { data } = await supabase
      .from("volunteer_profile_history")
      .select("id,section,detail,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(12);
    setHistory((data as HistoryRow[]) ?? []);
  };

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
        loadHistory(user.id),
      ]);

      setStatus((appRes.data as any)?.status ?? null);
      setFullName((appRes.data as any)?.full_name ?? "");

      const storedPath = (profRes.data as any)?.avatar_url ?? null;
      setAvatarPath(storedPath);
      setAvatarPreview(storedPath ? await signedUrl(storedPath) : null);

      const prof = profRes.data as any;
      const loaded = {
        bio: prof?.bio ?? "",
        state: prof?.state ?? (appRes.data as any)?.state ?? "",
        city: prof?.city ?? "",
        availability_days: (prof?.availability_days ?? []) as string[],
        availability_hours: prof?.availability_hours ?? "flexible",
        skills: prof?.skills ?? "",
      };
      setForm(loaded);
      savedRef.current = loaded;
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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please choose an image under 5MB.",
        variant: "destructive",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropped = async (blob: Blob) => {
    if (!user) return;
    setUploading(true);
    const path = `${user.id}/avatar-${Date.now()}.jpg`;

    const { error: upErr } = await supabase.storage
      .from("volunteer-avatars")
      .upload(path, blob, { contentType: "image/jpeg", upsert: true });

    if (upErr) {
      setUploading(false);
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      return;
    }

    const { error: dbErr } = await supabase
      .from("volunteer_profiles")
      .upsert({ user_id: user.id, avatar_url: path }, { onConflict: "user_id" });

    if (dbErr) {
      setUploading(false);
      toast({ title: "Could not save photo", description: dbErr.message, variant: "destructive" });
      return;
    }

    if (avatarPath && avatarPath !== path) {
      await supabase.storage.from("volunteer-avatars").remove([avatarPath]);
    }
    setAvatarPath(path);
    setAvatarPreview(await signedUrl(path));
    setUploading(false);
    setCropOpen(false);
    setRawImage(null);
    toast({ title: "Photo updated", description: "Your profile photo has been saved." });
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    setUploading(true);
    const { error } = await supabase
      .from("volunteer_profiles")
      .upsert({ user_id: user.id, avatar_url: null }, { onConflict: "user_id" });
    if (error) {
      setUploading(false);
      toast({ title: "Could not remove photo", description: error.message, variant: "destructive" });
      return;
    }
    if (avatarPath) await supabase.storage.from("volunteer-avatars").remove([avatarPath]);
    setAvatarPath(null);
    setAvatarPreview(null);
    setUploading(false);
    toast({ title: "Photo removed" });
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
            <CardTitle className="text-xl">Profile photo</CardTitle>
            <CardDescription>
              Upload a clear headshot — you can crop and zoom before saving.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border border-border">
              <AvatarImage src={avatarPreview ?? undefined} alt="Your profile photo" />
              <AvatarFallback className="text-lg font-semibold">
                {(fullName || "V").slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 mr-2" />
                  )}
                  {avatarPreview ? "Change photo" : "Upload photo"}
                </Button>
                {avatarPreview && (
                  <Button
                    variant="ghost"
                    className="rounded-2xl text-destructive"
                    onClick={handleRemoveAvatar}
                    disabled={uploading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">JPG or PNG, up to 5MB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileSelected}
              />
            </div>
          </CardContent>
        </Card>

        <AvatarCropDialog
          open={cropOpen}
          imageSrc={rawImage}
          saving={uploading}
          onClose={() => {
            setCropOpen(false);
            setRawImage(null);
          }}
          onCropped={handleCropped}
        />

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
