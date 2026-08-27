import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  Users,
  FileText,
  UserCog,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signedUrl } from "@/lib/volunteerAvatar";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state: string | null;
  role: string;
  institution: string | null;
  reason: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

type EventRow = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  starts_at: string;
  category: string | null;
};

type VolunteerProfileRow = {
  bio: string;
  state: string | null;
  city: string | null;
  availability_days: string[];
  availability_hours: string;
  skills: string;
  avatar_url: string | null;
  updated_at: string;
};

const HOURS_LABELS: Record<string, string> = {
  flexible: "Flexible / anytime",
  mornings: "Mornings (8am - 12pm)",
  afternoons: "Afternoons (12pm - 5pm)",
  evenings: "Evenings (5pm - 9pm)",
  weekends: "Weekends only",
};

const statusMeta: Record<string, { label: string; icon: any; className: string; message: string }> = {
  pending: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-accent/50 text-foreground",
    message:
      "Your application is being reviewed by the Red Hope team. We usually respond within a few days.",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-primary/10 text-primary",
    message: "Congratulations! You are now an active Red Hope volunteer. Check upcoming events below.",
  },
  rejected: {
    label: "Not Approved",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive",
    message:
      "Unfortunately your application was not approved at this time. You may contact us for more details.",
  },
};

export default function VolunteerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [profile, setProfile] = useState<VolunteerProfileRow | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const [appRes, profRes, evRes] = await Promise.all([
        supabase
          .from("volunteer_applications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("volunteer_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("events")
          .select("id,title,description,location,starts_at,category")
          .eq("published", true)
          .order("starts_at", { ascending: true })
          .limit(8),
      ]);
      setApplication((appRes.data as Application) ?? null);
      const prof = (profRes.data as VolunteerProfileRow) ?? null;
      setProfile(prof);
      setAvatarUrl(await signedUrl(prof?.avatar_url ?? null));
      setEvents((evRes.data as EventRow[]) ?? []);
      setFetching(false);
    };
    load();

    // Keep the summary fresh: reload whenever the profile row changes or the
    // user comes back to this tab after saving their profile.
    const channel = supabase
      .channel("volunteer-profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "volunteer_profiles",
          filter: `user_id=eq.${user.id}`,
        },
        () => load()
      )
      .subscribe();

    const onFocus = () => load();
    window.addEventListener("focus", onFocus);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

  if (loading || !user || fetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading your volunteer hub...</p>
      </div>
    );
  }

  const meta = statusMeta[application?.status ?? "pending"];
  const StatusIcon = meta.icon;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Users className="w-4 h-4" /> Volunteer Hub
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
              Welcome, {application?.full_name || user.user_metadata?.full_name || "Volunteer"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your application and stay on top of upcoming Red Hope activities.
            </p>
          </div>
          {application?.status === "approved" && (
            <Button asChild variant="outline" className="rounded-2xl shrink-0">
              <Link to="/volunteer/profile">
                <UserCog className="w-4 h-4 mr-2" /> Edit my profile
              </Link>
            </Button>
          )}
        </motion.div>

        {application?.status === "approved" && (
          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">My Profile</CardTitle>
                <CardDescription>
                  {profile?.updated_at
                    ? `Last updated ${new Date(profile.updated_at).toLocaleString()}`
                    : "Add your bio, skills, and availability so coordinators know you"}
                </CardDescription>
              </div>
              <Avatar className="h-14 w-14 border border-border shrink-0">
                <AvatarImage src={avatarUrl ?? undefined} alt="Your profile photo" />
                <AvatarFallback className="font-semibold">
                  {(application.full_name || "V").slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bio</p>
                <p className="text-sm">
                  {profile?.bio?.trim() || (
                    <span className="text-muted-foreground italic">No bio added yet.</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Skills</p>
                  <p className="text-sm font-medium">
                    {profile?.skills?.trim() || <span className="text-muted-foreground">—</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Based in</p>
                  <p className="text-sm font-medium">
                    {[profile?.city, profile?.state].filter(Boolean).join(", ") || "—"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Availability</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-primary/10 text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    {HOURS_LABELS[profile?.availability_hours ?? "flexible"] ?? "Flexible"}
                  </Badge>
                  {(profile?.availability_days?.length ?? 0) > 0 ? (
                    profile!.availability_days.map((d) => (
                      <Badge key={d} variant="secondary" className="rounded-full">
                        {d.slice(0, 3)}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No days selected yet</span>
                  )}
                </div>
              </div>

              <Button asChild variant="outline" size="sm" className="rounded-2xl">
                <Link to="/volunteer/profile">
                  <UserCog className="w-4 h-4 mr-2" /> Update profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {application ? (
          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Application Status</CardTitle>
                <CardDescription>
                  Submitted {new Date(application.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={`rounded-full px-3 py-1 ${meta.className}`}>
                <StatusIcon className="w-3.5 h-3.5 mr-1" />
                {meta.label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">{meta.message}</p>

              {application.admin_notes && (
                <div className="rounded-2xl bg-secondary/40 p-4 text-sm">
                  <span className="font-semibold">Message from the team: </span>
                  {application.admin_notes}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Preferred Role</p>
                  <p className="font-semibold">{application.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold">{application.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="font-semibold">{application.state || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Institution</p>
                  <p className="font-semibold">{application.institution || "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-3xl border-dashed">
            <CardContent className="py-10 text-center space-y-4">
              <FileText className="w-10 h-10 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">You have not submitted a volunteer application yet.</p>
              <Button asChild className="rounded-2xl">
                <Link to="/volunteer">Apply as a volunteer</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Upcoming Events</h2>
          </div>

          {events.length === 0 ? (
            <Card className="rounded-3xl border-dashed">
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                No events posted yet. Check back soon.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <Card key={ev.id} className="rounded-3xl border-l-4 border-l-primary">
                  <CardContent className="py-5 space-y-2">
                    <div className="text-xs font-semibold text-primary">
                      {new Date(ev.starts_at).toLocaleString()}
                    </div>
                    <h3 className="font-bold">{ev.title}</h3>
                    {ev.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {ev.location}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-3">{ev.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
