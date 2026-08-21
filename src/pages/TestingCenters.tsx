import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Clock, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface TestingCenter {
  id: string;
  name: string;
  address: string;
  state: string;
  lga: string | null;
  phone: string | null;
  hours: string | null;
  services: string[];
  map_url: string | null;
}

const TestingCenters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [centers, setCenters] = useState<TestingCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("testing_centers")
        .select("id, name, address, state, lga, phone, hours, services, map_url")
        .eq("active", true)
        .order("order", { ascending: true });
      setCenters((data ?? []) as TestingCenter[]);
      setLoading(false);
    };
    load();
  }, []);

  const states = useMemo(
    () => ["All States", ...Array.from(new Set(centers.map((c) => c.state))).sort()],
    [centers]
  );

  const filteredCenters = centers.filter((center) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      center.name.toLowerCase().includes(q) ||
      center.address.toLowerCase().includes(q) ||
      (center.lga ?? "").toLowerCase().includes(q);
    const matchesState = selectedState === "All States" || center.state === selectedState;
    return matchesSearch && matchesState;
  });

  const directionsUrl = (center: TestingCenter) =>
    center.map_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${center.name} ${center.address} ${center.state} Nigeria`
    )}`;

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find a Testing Center</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Locate verified genotype and sickle cell testing centers near you across Nigeria.
              Take the first step towards informed health decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name, location, or LGA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filteredCenters.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground">
                    No testing centers found matching your criteria. Try adjusting your search.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredCenters.map((center) => (
                  <Card key={center.id} className="hover:shadow-[var(--shadow-soft)] transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl mb-2">{center.name}</CardTitle>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm">{center.address}</p>
                          <p className="text-sm">
                            {center.lga ? `${center.lga}, ` : ""}
                            {center.state} State
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {center.phone && (
                          <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Contact</p>
                              <a
                                href={`tel:${center.phone.replace(/\s/g, "")}`}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {center.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        {center.hours && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Hours</p>
                              <p className="text-sm text-muted-foreground">{center.hours}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {center.services?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Services Offered:</p>
                          <div className="flex flex-wrap gap-2">
                            {center.services.map((service, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button variant="outline" className="w-full md:w-auto" asChild>
                        <a href={directionsUrl(center)} target="_blank" rel="noopener noreferrer">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestingCenters;
