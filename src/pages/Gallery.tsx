import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Loader2, ImageOff } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { data: images, isLoading } = useQuery({
        queryKey: ["gallery"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("gallery_images")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });

    const uniqueCategories = [
        "all",
        ...Array.from(new Set(images?.map((img) => img.category).filter(Boolean))),
    ];

    const filteredImages =
        selectedCategory === "all"
            ? images
            : images?.filter((img) => img.category === selectedCategory);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        Our Gallery
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A visual journey through our outreach programs, testing events, and
                        community gatherings.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-8">
                            <Tabs
                                defaultValue="all"
                                onValueChange={(val) => setSelectedCategory(val)}
                                className="w-full max-w-2xl"
                            >
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto">
                                    {uniqueCategories.map((cat) => (
                                        <TabsTrigger key={cat} value={cat as string} className="capitalize">
                                            {cat}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredImages?.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                                        <div className="relative aspect-video overflow-hidden bg-muted">
                                            <img
                                                src={image.url}
                                                alt={image.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement?.querySelector('.placeholder')?.classList.remove('hidden');
                                                }}
                                            />
                                            <div className="placeholder hidden absolute inset-0 flex items-center justify-center text-muted-foreground">
                                                <ImageOff className="h-12 w-12 opacity-50" />
                                            </div>
                                            {image.category && (
                                                <Badge className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 capitalize backdrop-blur-sm">
                                                    {image.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{image.title}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {filteredImages?.length === 0 && (
                            <div className="text-center py-20 text-muted-foreground">
                                <p>No images found in this category.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Gallery;
