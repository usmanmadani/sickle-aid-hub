import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const adminSections = [
    {
      title: 'Blog Posts',
      description: 'Create and manage blog posts',
      icon: FileText,
      link: '/admin/blog-posts',
      color: 'text-blue-500',
    },
    {
      title: 'Programs',
      description: 'Manage outreach programs',
      icon: Calendar,
      link: '/admin/programs',
      color: 'text-green-500',
    },
    {
      title: 'Donations',
      description: 'View donation records',
      icon: DollarSign,
      link: '/admin/donations',
      color: 'text-yellow-500',
    },
    {
      title: 'Contact Messages',
      description: 'View and respond to messages',
      icon: Mail,
      link: '/admin/contacts',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your Red Hope Initiative content and data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={section.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-muted ${section.color}`}>
                          <section.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle>{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
