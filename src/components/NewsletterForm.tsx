import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

const NewsletterForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email: values.email }]);

            if (error) {
                if (error.code === "23505") { // Unique violation
                    toast({
                        title: "Already Subscribed",
                        description: "You are already on our mailing list!",
                    });
                } else {
                    throw error;
                }
            } else {
                toast({
                    title: "Subscribed!",
                    description: "Thank you for joining our community.",
                });
                form.reset();
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again.",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <div className="flex-1">
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        {...form.register("email")}
                        className="bg-background"
                    />
                    {form.formState.errors.email && (
                        <p className="text-destructive text-sm mt-1 ml-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                    Subscribe
                </Button>
            </form>
        </div>
    );
};

export default NewsletterForm;
