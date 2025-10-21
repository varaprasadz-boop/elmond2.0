import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  id: number;
  name: string;
  courseCount: number;
  image?: string;
}

export default function CategoryCard({ id, name, courseCount, image }: CategoryCardProps) {
  return (
    <Link href={`/course?category=${id}`} data-testid={`link-category-${id}`}>
      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer h-full" data-testid={`card-category-${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          {image ? (
            <img src={image} alt={name} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-7xl font-display font-bold text-primary/20">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-lg mb-1" data-testid={`text-category-name-${id}`}>{name}</h3>
          <p className="text-sm text-muted-foreground" data-testid={`text-category-count-${id}`}>
            {courseCount} {courseCount === 1 ? "Course" : "Courses"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
