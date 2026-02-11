import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Quote } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    image_url: string | null;
}

const Testimonials = () => {
    const { data: testimonials, isLoading, isError } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            if (error) throw error;
            return data as Testimonial[];
        }
    });

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>;
    if (isError || !testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Voices of Hope</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Hear from the families, patients, and partners who make our community strong.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-none shadow-[var(--shadow-card)] card-hover bg-card/50 backdrop-blur-sm relative">
                                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 rotate-180" />
                                <CardContent className="pt-8">
                                    <p className="text-muted-foreground italic mb-6 leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                </CardContent>
                                <CardFooter className="flex items-center gap-4 border-t border-border/50 pt-4">
                                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                                        <AvatarImage src={testimonial.image_url || undefined} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {testimonial.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
