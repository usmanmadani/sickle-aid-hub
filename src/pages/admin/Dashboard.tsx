import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Calendar, DollarSign, Mail, Loader2, ArrowUpRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [posts, programs, donations, contacts, users] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('programs').select('id', { count: 'exact' }),
        supabase.from('donations').select('amount, created_at'),
        supabase.from('contacts').select('id', { count: 'exact' }).eq('read', false),
        supabase.from('test_accounts').select('id', { count: 'exact', head: true }),
      ]);

      const totalDonations = donations.data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

      const donationsByMonth = donations.data?.reduce((acc: any, donation) => {
        const date = new Date(donation.created_at);
        const month = date.toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + Number(donation.amount);
        return acc;
      }, {});

      const chartData = Object.entries(donationsByMonth || {}).map(([name, value]) => ({
        name,
        total: value,
      }));

      return {
        postsCount: posts.count || 0,
        programsCount: programs.count || 0,
        donationsCount: donations.count || 0,
        totalDonations,
        unreadContacts: contacts.count || 0,
        usersCount: users.count || 0,
        chartData
      };
    },
    enabled: isAdmin,
  });


  if (authLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const statCards = [
    {
      title: 'Total Donations',
      value: `₦${stats?.totalDonations.toLocaleString()}`,
      description: 'Lifetime donations received',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Active Programs',
      value: stats?.programsCount,
      description: 'Outreach programs conducted',
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      title: 'Blog Posts',
      value: stats?.postsCount,
      description: 'Published articles',
      icon: FileText,
      color: 'text-purple-500',
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadContacts,
      description: 'Messages waiting for reply',
      icon: Mail,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your platform's performance</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Donation Overview</CardTitle>
            <CardDescription>
              Monthly donation trends for the current year
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.chartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value}`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: any) => [`₦${value.toLocaleString()}`, 'Total']}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <a href="/admin/blog-posts" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Write Blog Post</p>
                    <p className="text-sm text-muted-foreground">Share updates with the community</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>

              <a href="/admin/programs" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Create Program</p>
                    <p className="text-sm text-muted-foreground">Schedule a new outreach event</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>

              <a href="/admin/contacts" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Check Messages</p>
                    <p className="text-sm text-muted-foreground">View and reply to inquiries</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
