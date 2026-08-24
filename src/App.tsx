import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import GenotypeChecker from "./pages/GenotypeChecker";
import TestingCenters from "./pages/TestingCenters";
import EducationalHub from "./pages/EducationalHub";
import MediaLearning from "./pages/MediaLearning";
import PatientStories from "./pages/PatientStories";
import Outreach from "./pages/Outreach";
import Volunteer from "./pages/Volunteer";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import UserDashboard from "./pages/Dashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import BlogPosts from "./pages/admin/BlogPosts";
import AdminPrograms from "./pages/admin/Programs";
import AdminDonations from "./pages/admin/Donations";
import AdminContacts from "./pages/admin/Contacts";
import ContentManager from "./pages/admin/ContentManager";
import AdminTestingCenters from "./pages/admin/TestingCenters";
import AdminVolunteers from "./pages/admin/Volunteers";
import AdminEvents from "./pages/admin/Events";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/resources" element={<EducationalHub />} />
              <Route path="/media" element={<MediaLearning />} />
              <Route path="/stories" element={<PatientStories />} />
              <Route path="/outreach" element={<Outreach />} />
              <Route path="/genotype-checker" element={<GenotypeChecker />} />
              <Route path="/testing-centers" element={<TestingCenters />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/volunteer/profile" element={<VolunteerProfile />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="blog-posts" element={<BlogPosts />} />
              <Route path="programs" element={<AdminPrograms />} />
            <Route path="testing-centers" element={<AdminTestingCenters />} />
              <Route path="volunteers" element={<AdminVolunteers />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
