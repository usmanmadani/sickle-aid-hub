import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

type PlatformUser = {
  id: string;
  name: string;
  email: string;
  genotype: string | null;
  location: string | null;
  avatar_url: string | null;
  is_test: boolean;
  created_at: string;
};

const genotypeColor: Record<string, string> = {
  AA: 'bg-green-100 text-green-700',
  AS: 'bg-yellow-100 text-yellow-700',
  AC: 'bg-amber-100 text-amber-700',
  SS: 'bg-red-100 text-red-700',
  SC: 'bg-orange-100 text-orange-700',
};

const AdminUsers = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('platform_users')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { users: (data || []) as PlatformUser[], count: count || 0 };
    },
    enabled: isAdmin,
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const users = data?.users || [];
  const realCount = users.filter((u) => !u.is_test).length;
  const testCount = users.filter((u) => u.is_test).length;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.location || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.genotype || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['#', 'Name', 'Email', 'Genotype', 'Location', 'Type', 'Joined At'];
    const rows = filtered.map((u, i) => [
      i + 1,
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email.replace(/"/g, '""')}"`,
      `"${u.genotype || ''}"`,
      `"${(u.location || '').replace(/"/g, '""')}"`,
      u.is_test ? 'Test' : 'Real',
      `"${new Date(u.created_at).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const stamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `red-hope-users-${stamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: 'Exported', description: `Downloaded ${rows.length} users as CSV/Excel.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">All registered users on the platform</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All sign-ups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Real Sign-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{realCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Authenticated accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Test Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">{testCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Seeded for development</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Search by name, email, location, or genotype</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 max-w-sm"
          />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Genotype</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {u.avatar_url && <AvatarImage src={u.avatar_url} alt={u.name} />}
                          <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      {u.genotype && (
                        <Badge variant="outline" className={genotypeColor[u.genotype] || ''}>
                          {u.genotype}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.location || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={u.is_test ? 'secondary' : 'default'}>
                        {u.is_test ? 'Test' : 'Real'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
