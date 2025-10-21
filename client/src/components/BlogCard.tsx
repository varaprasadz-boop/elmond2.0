import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface BlogCardProps {
  id: number;
  title: string;
  date: string;
  image?: string;
}

export default function BlogCard({ id, title, date, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`} data-testid={`link-blog-${id}`}>
      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer h-full" data-testid={`card-blog-${id}`}>
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-display font-bold text-primary/20">B</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2" data-testid={`text-blog-title-${id}`}>
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-blog-date-${id}`}>{date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
