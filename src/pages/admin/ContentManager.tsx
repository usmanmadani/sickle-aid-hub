import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface SiteContent {
    id: string;
    key: string;
    value: any;
}

interface ImpactStat {
    id: string;
    label: string;
    count: number;
    suffix: string | null;
    icon: string | null;
    color: string | null;
    order: number;
}

const ContentManager = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);

    // Home Content State
    const [heroContent, setHeroContent] = useState<any>({});
    const [missionContent, setMissionContent] = useState<any>({});

    // Stats State
    const [stats, setStats] = useState<ImpactStat[]>([]);
    const [newStat, setNewStat] = useState<Partial<ImpactStat>>({
        label: '',
        count: 0,
        suffix: '+',
        icon: 'Heart',
        order: 0,
    });

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Site Content
            const { data: contentData, error: contentError } = await supabase
                .from('site_content')
                .select('*');

            if (contentError) throw contentError;

            const hero = contentData?.find(c => c.key === 'home_hero')?.value || {};
            const mission = contentData?.find(c => c.key === 'home_mission')?.value || {};

            setHeroContent(hero);
            setMissionContent(mission);

            // Fetch Stats
            const { data: statsData, error: statsError } = await supabase
                .from('impact_stats')
                .select('*')
                .order('order', { ascending: true });

            if (statsError) throw statsError;
            setStats(statsData || []);

        } catch (error: any) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Error',
                description: 'Failed to load content. ' + error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const updateSiteContent = async (key: string, value: any) => {
        try {
            // Upsert based on key
            const { error } = await supabase
                .from('site_content')
                .upsert({ key, value }, { onConflict: 'key' });

            if (error) throw error;

            toast({ title: 'Success', description: 'Content updated successfully!' });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const handleStatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('impact_stats')
                .insert([{ label: newStat.label!, count: newStat.count!, suffix: newStat.suffix, icon: newStat.icon, order: newStat.order }]);

            if (error) throw error;

            // Reset form and refetch
            setNewStat({ label: '', count: 0, suffix: '+', icon: 'Heart', order: stats.length + 1 });
            fetchData();
            toast({ title: 'Success', description: 'Stat added!' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    const deleteStat = async (id: string) => {
        if (!confirm('Delete this stat?')) return;
        try {
            const { error } = await supabase.from('impact_stats').delete().eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Content Manager</h1>
            </div>

            <Tabs defaultValue="home" className="w-full">
                <TabsList>
                    <TabsTrigger value="home">Home Page</TabsTrigger>
                    <TabsTrigger value="stats">Impact Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="home" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>Customize the main landing banner</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={heroContent.title || ''}
                                    onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle</Label>
                                <Textarea
                                    value={heroContent.subtitle || ''}
                                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                                />
                            </div>
                            <Button onClick={() => updateSiteContent('home_hero', heroContent)}>
                                <Save className="mr-2 h-4 w-4" /> Save Hero
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Mission Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Mission Statement</Label>
                                <Textarea
                                    rows={4}
                                    value={missionContent.description || ''}
                                    onChange={(e) => setMissionContent({ ...missionContent, description: e.target.value })}
                                />
                            </div>
                            <Button onClick={() => updateSiteContent('home_mission', missionContent)}>
                                <Save className="mr-2 h-4 w-4" /> Save Mission
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Statistic</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleStatSubmit} className="flex gap-4 items-end">
                                <div className="space-y-2 flex-1">
                                    <Label>Label</Label>
                                    <Input
                                        value={newStat.label}
                                        onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 w-32">
                                    <Label>Count</Label>
                                    <Input
                                        type="number"
                                        value={newStat.count}
                                        onChange={(e) => setNewStat({ ...newStat, count: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2 w-24">
                                    <Label>Suffix</Label>
                                    <Input
                                        value={newStat.suffix || ''}
                                        onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })}
                                    />
                                </div>
                                <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Label</TableHead>
                                        <TableHead>Count</TableHead>
                                        <TableHead>Suffix</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.map((stat) => (
                                        <TableRow key={stat.id}>
                                            <TableCell>{stat.label}</TableCell>
                                            <TableCell>{stat.count}</TableCell>
                                            <TableCell>{stat.suffix}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => deleteStat(stat.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContentManager;
