import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Heart, GraduationCap, School, CheckCircle2, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Volunteer() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    role: "General Volunteer",
    institution: "",
    reason: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required contact fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Volunteer Application Received!",
      description: `Thank you ${formData.fullName}! The Red Hope Initiative team will reach out via email shortly.`,
    });

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      state: "",
      role: "General Volunteer",
      institution: "",
      reason: ""
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-background text-foreground">
      
      {/* Header Banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/30 border-b">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Users className="w-4 h-4" />
            <span>Join Red Hope Initiative</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Become a Volunteer & Ambassador
          </h1>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Lend your voice, skills, and time to save lives across Nigeria. Join our outreach teams, 
            lead campus advocacy, or support field medical drives.
          </p>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">General Field Volunteer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Support community outreach events, assist with registration, crowd coordination, kit distribution, and logistics.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Campus Ambassador</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Represent Sickle Aid Hub in tertiary institutions. Lead student peer education drives, seminars, and genotype drives.
            </p>
          </Card>

          <Card className="rounded-3xl border-border p-6 space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Secondary School Facilitator</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Guide high school students through interactive genetics lessons, debunking myths, and promoting premarital testing.
            </p>
          </Card>

        </div>

        {/* Application Form */}
        <Card className="max-w-3xl mx-auto rounded-3xl border-primary/20 p-8 shadow-lg bg-card">
          <CardHeader className="p-0 pb-6 text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Volunteer Application Form</CardTitle>
            <CardDescription>Fill out your details below to get registered into the Red Hope Volunteer Network.</CardDescription>
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
                Label className="text-xs font-semibold" Why do you want to join Red Hope Initiative?
                <Textarea 
                  placeholder="Share a brief statement about your motivation or past advocacy experience..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="rounded-xl mt-1 min-h-[100px]"
                />
              </div>

              <Button type="submit" variant="hero" className="w-full rounded-2xl bg-primary text-white font-semibold py-6">
                Submit Application
              </Button>

            </form>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
