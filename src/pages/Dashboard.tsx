import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Activity, MapPin, Loader2, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Programs',
    description: 'Explore outreach programs and events you can join.',
    icon: Calendar,
    to: '/programs',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Genotype Checker',
    description: 'Check inheritance risk and compatibility.',
    icon: Activity,
    to: '/genotype-checker',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    title: 'Testing Centers',
    description: 'Find nearby centers to get tested.',
    icon: MapPin,
    to: '/testing-centers',
    color: 'bg-emerald-100 text-emerald-600',
  },
];

const UserDashboard = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const name = user.user_metadata?.full_name || user.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, {name}</h1>
          <p className="text-muted-foreground mt-2">
            Your personal hub for sickle cell awareness, testing, and programs.
          </p>
        </motion.div>

        {isAdmin && (
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">You have admin access</p>
                  <p className="text-sm text-muted-foreground">Manage content, programs, and users.</p>
                </div>
              </div>
              <Button asChild>
                <Link to="/admin">Go to Admin</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={f.to} className="flex items-center justify-center gap-2">
                      Open <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
