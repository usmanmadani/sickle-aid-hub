import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2, Save, MapPin, Pencil, X } from "lucide-react";
import { NIGERIAN_STATES } from "@/lib/nigeria";

interface Center {
  id: string;
  name: string;
  address: string;
  state: string;
  lga: string | null;
  phone: string | null;
  hours: string | null;
  services: string[];
  map_url: string | null;
  active: boolean;
  order: number;
}

const emptyForm = {
  name: "",
  address: "",
  state: "Lagos",
  lga: "",
  phone: "",
  hours: "",
  services: "",
  map_url: "",
  active: true,
  order: 0,
};

const AdminTestingCenters = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    if (isAdmin) fetchCenters();
  }, [isAdmin]);

  const fetchCenters = async () => {
    const { data, error } = await supabase
      .from("testing_centers")
      .select("*")
      .order("order", { ascending: true });
    if (error) {
      toast({ title: "Could not load centers", description: error.message, variant: "destructive" });
    } else {
      setCenters((data ?? []) as Center[]);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
  };

  const startEdit = (c: Center) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      address: c.address,
      state: c.state,
      lga: c.lga ?? "",
      phone: c.phone ?? "",
      hours: c.hours ?? "",
      services: (c.services ?? []).join(", "),
      map_url: c.map_url ?? "",
      active: c.active,
      order: c.order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.address.trim() || !form.state.trim()) {
      toast({ title: "Missing details", description: "Name, address and state are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      state: form.state.trim(),
      lga: form.lga.trim() || null,
      phone: form.phone.trim() || null,
      hours: form.hours.trim() || null,
      services: form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      map_url: form.map_url.trim() || null,
      active: form.active,
      order: Number(form.order) || 0,
    };

    const { error } = editingId
      ? await supabase.from("testing_centers").update(payload).eq("id", editingId)
      : await supabase.from("testing_centers").insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editingId ? "Center updated" : "Center added" });
    resetForm();
    fetchCenters();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testing_centers").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Center removed" });
    setCenters((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleActive = async (c: Center) => {
    const { error } = await supabase.from("testing_centers").update({ active: !c.active }).eq("id", c.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setCenters((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)));
  };

  if (authLoading || loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <p className="p-6 text-muted-foreground">You need admin access to manage testing centers.</p>;
  }

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold">Testing Centers</h1>
        <p className="text-sm text-muted-foreground">
          Centers you add here appear instantly on the public “Find a Testing Center” page.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Edit center" : "Add a new center"}
          </CardTitle>
          <CardDescription>Separate services with commas, e.g. Genotype Testing, Genetic Counseling.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tc-name">Center name</Label>
            <Input id="tc-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-address">Address</Label>
            <Input id="tc-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-state">State</Label>
            <select
              id="tc-state"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-lga">LGA</Label>
            <Input id="tc-lga" value={form.lga} onChange={(e) => setForm({ ...form, lga: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-phone">Phone</Label>
            <Input id="tc-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-hours">Opening hours</Label>
            <Input id="tc-hours" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tc-services">Services (comma separated)</Label>
            <Textarea
              id="tc-services"
              rows={2}
              value={form.services}
              onChange={(e) => setForm({ ...form, services: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-map">Directions link (optional)</Label>
            <Input id="tc-map" value={form.map_url} onChange={(e) => setForm({ ...form, map_url: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-order">Display order</Label>
            <Input
              id="tc-order"
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-center gap-3 md:col-span-2">
            <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
            <span className="text-sm">Visible on the website</span>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {editingId ? "Save changes" : "Add center"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {centers.length === 0 && <p className="text-sm text-muted-foreground">No centers yet.</p>}
        {centers.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="font-semibold">{c.name}</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {c.address} — {c.lga ? `${c.lga}, ` : ""}
                  {c.state}
                </p>
                <p className="text-xs text-muted-foreground">
                  {c.phone} · {c.hours}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {(c.services ?? []).map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pr-2">
                  <Switch checked={c.active} onCheckedChange={() => toggleActive(c)} />
                  <span className="text-xs text-muted-foreground">{c.active ? "Live" : "Hidden"}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => startEdit(c)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestingCenters;
