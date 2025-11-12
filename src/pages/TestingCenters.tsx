import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestingCenter {
  id: number;
  name: string;
  address: string;
  state: string;
  lga: string;
  phone: string;
  hours: string;
  services: string[];
}

// Sample data - in production, this would come from a database
const testingCenters: TestingCenter[] = [
  {
    id: 1,
    name: "Lagos University Teaching Hospital (LUTH)",
    address: "Idi-Araba, Surulere",
    state: "Lagos",
    lga: "Surulere",
    phone: "+234 803 123 4567",
    hours: "Mon-Fri: 8:00 AM - 4:00 PM",
    services: ["Genotype Testing", "Genetic Counseling", "Prenatal Testing"],
  },
  {
    id: 2,
    name: "University College Hospital",
    address: "Queen Elizabeth Road, Ibadan",
    state: "Oyo",
    lga: "Ibadan North",
    phone: "+234 802 234 5678",
    hours: "Mon-Sat: 8:00 AM - 5:00 PM",
    services: ["Genotype Testing", "Blood Screening", "Family Planning Counseling"],
  },
  {
    id: 3,
    name: "National Hospital Abuja",
    address: "Central Business District",
    state: "FCT",
    lga: "Abuja Municipal",
    phone: "+234 809 345 6789",
    hours: "Mon-Fri: 7:30 AM - 3:30 PM",
    services: ["Comprehensive Screening", "Genetic Counseling", "Pediatric Testing"],
  },
  {
    id: 4,
    name: "Aminu Kano Teaching Hospital",
    address: "Zaria Road, Kano",
    state: "Kano",
    lga: "Kano Municipal",
    phone: "+234 807 456 7890",
    hours: "Mon-Fri: 8:00 AM - 4:00 PM",
    services: ["Genotype Testing", "Sickle Cell Clinic", "Counseling Services"],
  },
  {
    id: 5,
    name: "University of Benin Teaching Hospital",
    address: "Ugbowo, Benin City",
    state: "Edo",
    lga: "Egor",
    phone: "+234 806 567 8901",
    hours: "Mon-Fri: 8:00 AM - 4:00 PM, Sat: 9:00 AM - 1:00 PM",
    services: ["Genotype Testing", "Genetic Counseling", "Community Outreach"],
  },
];

const states = ["All States", "Lagos", "Oyo", "FCT", "Kano", "Edo"];

const TestingCenters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");

  const filteredCenters = testingCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.lga.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedState === "All States" || center.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
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

      {/* Search & Filter */}
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

      {/* Testing Centers List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredCenters.length === 0 ? (
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
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{center.name}</CardTitle>
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm">{center.address}</p>
                              <p className="text-sm">
                                {center.lga}, {center.state} State
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Contact</p>
                            <p className="text-sm text-muted-foreground">{center.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Hours</p>
                            <p className="text-sm text-muted-foreground">{center.hours}</p>
                          </div>
                        </div>
                      </div>

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

                      <Button variant="outline" className="w-full md:w-auto">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-2 border-dashed">
              <CardContent className="py-12">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Map Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on integrating an interactive map to help you visualize testing center locations
                  and get turn-by-turn directions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestingCenters;
