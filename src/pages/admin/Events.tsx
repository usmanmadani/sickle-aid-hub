import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type EventRow = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  image_url: string | null;
  category: string | null;
  published: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  location: "",
  starts_at: "",
  ends_at: "",
  image_url: "",
  category: "Outreach",
  published: true,
};

const toInput = (iso: string | null) => (iso ? new Date(iso).toISOString().slice(0, 16) : "");

export default function AdminEvents() {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true });
    if (error) {
      toast({ title: "Failed to load events", description: error.message, variant: "destructive" });
    } else {
      setEvents((data as EventRow[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (ev: EventRow) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description ?? "",
      location: ev.location ?? "",
      starts_at: toInput(ev.starts_at),
      ends_at: toInput(ev.ends_at),
      image_url: ev.image_url ?? "",
      category: ev.category ?? "Outreach",
      published: ev.published,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim() || !form.starts_at) {
      toast({ title: "Title and start date are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim() || null,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      image_url: form.image_url.trim() || null,
      category: form.category,
      published: form.published,
    };

    const { error } = editingId
      ? await supabase.from("events").update(payload).eq("id", editingId)
      : await supabase.from("events").insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editingId ? "Event updated" : "Event posted" });
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Event deleted" });
    load();
  };

  const togglePublished = async (ev: EventRow) => {
    const { error } = await supabase.from("events").update({ published: !ev.published }).eq("id", ev.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    load();
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Post upcoming events shown on the Programs page and volunteer dashboards.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl" onClick={startCreate}>
              <Plus className="w-4 h-4 mr-1" /> New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Event" : "Post New Event"}</DialogTitle>
              <DialogDescription>Details appear publicly once published.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold">Title *</Label>
                <Input
                  className="rounded-xl mt-1"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Community Health Fair - Lagos"
                  maxLength={150}
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Description</Label>
                <Textarea
                  className="rounded-xl mt-1"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Free genotype testing and health screening"
                  maxLength={1000}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Starts *</Label>
                  <Input
                    type="datetime-local"
                    className="rounded-xl mt-1"
                    value={form.starts_at}
                    onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Ends</Label>
                  <Input
                    type="datetime-local"
                    className="rounded-xl mt-1"
                    value={form.ends_at}
                    onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Location</Label>
                  <Input
                    className="rounded-xl mt-1"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Keffi, Nasarawa State"
                    maxLength={150}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Category</Label>
                  <select
                    className="w-full h-10 mt-1 rounded-xl border border-input bg-background px-3 text-sm"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Outreach">Outreach</option>
                    <option value="Screening">Free Screening</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Awareness Walk">Awareness Walk</option>
                    <option value="Fundraiser">Fundraiser</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold">Image URL</Label>
                <Input
                  className="rounded-xl mt-1"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-semibold">Published</p>
                  <p className="text-xs text-muted-foreground">Visible on the public website</p>
                </div>
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm({ ...form, published: v })}
                />
              </div>
              <Button className="w-full rounded-xl" onClick={save} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? "Save Changes" : "Post Event"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>{events.length} total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : events.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No events yet. Post your first event.
            </p>
          ) : (
            events.map((ev) => (
              <div
                key={ev.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{ev.title}</h3>
                    <Badge variant="outline" className="rounded-full text-xs">
                      {ev.category}
                    </Badge>
                    {!ev.published && (
                      <Badge className="rounded-full bg-muted text-muted-foreground text-xs">Hidden</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(ev.starts_at).toLocaleString()}
                    </span>
                    {ev.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {ev.location}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{ev.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={ev.published} onCheckedChange={() => togglePublished(ev)} />
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => startEdit(ev)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-xl text-destructive"
                    onClick={() => remove(ev.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
