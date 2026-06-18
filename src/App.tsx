import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import UserDashboard from "./pages/Dashboard";
import BlogPosts from "./pages/admin/BlogPosts";
import AdminPrograms from "./pages/admin/Programs";
import AdminDonations from "./pages/admin/Donations";
import AdminContacts from "./pages/admin/Contacts";
import ContentManager from "./pages/admin/ContentManager";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/genotype-checker" element={<GenotypeChecker />} />
            <Route path="/testing-centers" element={<TestingCenters />} />
            <Route path="/resources" element={<EducationalHub />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="blog-posts" element={<BlogPosts />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
