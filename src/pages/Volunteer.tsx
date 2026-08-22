import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Heart, GraduationCap, School, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  state: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100),
  institution: z.string().trim().max(150).optional(),
  reason: z.string().trim().max(1000).optional(),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

export default function Volunteer() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    role: "General Volunteer",
    institution: "",
    reason: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      toast({
        title: "Check your details",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const v = parsed.data;

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: v.email,
        password: v.password,
        options: {
          data: { full_name: v.fullName, account_type: "volunteer" },
          emailRedirectTo: `${window.location.origin}/volunteer/dashboard`,
        },
      });

      if (signUpError && !signUpError.message.toLowerCase().includes("already registered")) {
        throw signUpError;
      }

      let userId = signUpData?.user?.id ?? null;

      // Existing account: sign them in so the application links to their profile
      if (signUpError) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: v.email,
          password: v.password,
        });
        if (signInError) {
          throw new Error(
            "An account already exists with this email. Please log in with your existing password first."
          );
        }
        userId = signInData.user?.id ?? null;
      }

      const { error: insertError } = await supabase.from("volunteer_applications").insert({
        user_id: userId,
        full_name: v.fullName,
        email: v.email,
        phone: v.phone,
        state: v.state || null,
        role: v.role,
        institution: v.institution || null,
        reason: v.reason || null,
      });

      if (insertError) throw insertError;

      toast({
        title: "Application submitted!",
        description: "Your volunteer account is ready. We will review your application shortly.",
      });

      navigate("/volunteer/dashboard");
    } catch (error: any) {
      toast({
        title: "Could not submit application",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      <section className="py-16 border-b bg-secondary/20">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Users className="w-4 h-4" />
            <span>Join Red Hope Initiative</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Become a Volunteer &amp; Ambassador
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Lend your voice, skills, and time to save lives across Nigeria. Apply below and get your own
            volunteer dashboard to track your application status.
          </p>
          <p className="text-sm text-muted-foreground">
            Already applied?{" "}
            <Link to="/auth" className="text-primary font-semibold underline">
              Log in to your dashboard
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">General Field Volunteer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Support community outreach events, assist with registration, crowd coordination, kit
              distribution, and logistics.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-accent/40 text-foreground flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Campus Ambassador</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Represent Red Hope Initiative in tertiary institutions. Lead student peer education drives,
              seminars, and genotype drives.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Secondary School Facilitator</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Guide high school students through interactive genetics lessons, debunking myths, and
              promoting premarital testing.
            </p>
          </Card>
        </div>

        <Card className="max-w-3xl mx-auto rounded-3xl border-primary/20 p-8 shadow-lg bg-card">
          <CardHeader className="p-0 pb-6 text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Volunteer Application Form</CardTitle>
            <CardDescription>
              Fill out your details and create a password &mdash; your volunteer account is created
              instantly so you can log in and follow your application.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Full Name *</Label>
                  <Input
                    placeholder="e.g. Usman Madani"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="rounded-xl mt-1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="e.g. usman@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Create Password *</Label>
                  <Input
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="rounded-xl mt-1"
                    minLength={6}
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">Confirm Password *</Label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="rounded-xl mt-1"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Phone Number / WhatsApp *</Label>
                  <Input
                    placeholder="e.g. +234 813 085 2118"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-xl mt-1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold">State of Residence</Label>
                  <Input
                    placeholder="e.g. Nasarawa / Abuja / Kano"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Preferred Role</Label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full h-10 mt-1 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="General Volunteer">General Field Volunteer</option>
                    <option value="Campus Ambassador">Campus Ambassador</option>
                    <option value="Secondary School Facilitator">Secondary School Facilitator</option>
                    <option value="Medical Specialist">Medical Professional (Doctor/Nurse/Pharmacist)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-semibold">School / Institution (If Student)</Label>
                  <Input
                    placeholder="e.g. Nasarawa State University"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold">
                  Why do you want to join Red Hope Initiative?
                </Label>
                <Textarea
                  placeholder="Share a brief statement about your motivation or past advocacy experience..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="rounded-xl mt-1 min-h-[100px]"
                  maxLength={1000}
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-primary text-primary-foreground font-semibold py-6"
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Submit Application &amp; Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
