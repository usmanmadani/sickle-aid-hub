import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Search, CheckCircle2, XCircle, Clock, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Application = {
  id: string;
  user_id: string | null;
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

const statusBadge = (status: string) => {
  if (status === "approved")
    return (
      <Badge className="bg-primary/10 text-primary rounded-full">
        <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge className="bg-destructive/10 text-destructive rounded-full">
        <XCircle className="w-3 h-3 mr-1" /> Rejected
      </Badge>
    );
  return (
    <Badge className="bg-accent/50 text-foreground rounded-full">
      <Clock className="w-3 h-3 mr-1" /> Pending
    </Badge>
  );
};

export default function AdminVolunteers() {
  const { toast } = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    const { data, error } = await supabase
      .from("volunteer_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load applications", description: error.message, variant: "destructive" });
    } else {
      setApps((data as Application[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (app: Application, status: string, adminNotes?: string) => {
    const { error } = await supabase
      .from("volunteer_applications")
      .update({ status, admin_notes: adminNotes ?? app.admin_notes })
      .eq("id", app.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Application ${status}` });
    setSelected(null);
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("volunteer_applications").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application deleted" });
    load();
  };

  const filtered = apps.filter((a) =>
    `${a.full_name} ${a.email} ${a.role} ${a.state ?? ""} ${a.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
  };

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="text-2xl font-bold">Volunteer Applications</h1>
        <p className="text-sm text-muted-foreground">
          Review, approve or reject volunteer applications submitted from the website.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: counts.total },
          { label: "Pending", value: counts.pending },
          { label: "Approved", value: counts.approved },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl">
            <CardContent className="py-5">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Applications</CardTitle>
            <CardDescription>{filtered.length} shown</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applicants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.full_name}</TableCell>
                      <TableCell className="text-xs">{a.email}</TableCell>
                      <TableCell className="text-xs">{a.role}</TableCell>
                      <TableCell className="text-xs">{a.state || "—"}</TableCell>
                      <TableCell>{statusBadge(a.status)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => {
                            setSelected(a);
                            setNotes(a.admin_notes ?? "");
                          }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        {a.status !== "approved" && (
                          <Button
                            size="sm"
                            className="rounded-xl"
                            onClick={() => updateStatus(a, "approved")}
                          >
                            Approve
                          </Button>
                        )}
                        {a.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => updateStatus(a, "rejected")}
                          >
                            Reject
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-xl text-destructive"
                          onClick={() => remove(a.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selected?.full_name}</DialogTitle>
            <DialogDescription>{selected?.email}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="font-medium">{selected.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="font-medium">{selected.state || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Institution</p>
                  <p className="font-medium">{selected.institution || "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Motivation</p>
                <p className="rounded-xl bg-secondary/40 p-3">{selected.reason || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Note to applicant</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-xl"
                  placeholder="Optional message shown on the volunteer's dashboard"
                  maxLength={500}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => updateStatus(selected, selected.status, notes)}
                >
                  Save note
                </Button>
                <Button className="rounded-xl" onClick={() => updateStatus(selected, "approved", notes)}>
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl text-destructive"
                  onClick={() => updateStatus(selected, "rejected", notes)}
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
