import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface CourseCardProps {
  id: number;
  title: string;
  category: string;
  image?: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
}

export default function CourseCard({
  id,
  title,
  category,
  image,
  duration,
  students,
  rating,
  price,
  originalPrice,
  discount,
}: CourseCardProps) {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  
  const isInCart = items.some(item => item.id === id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Already in cart",
        description: "This course is already in your cart",
      });
      return;
    }
    
    addToCart({ id, title, category, price, originalPrice, discount, image });
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart`,
    });
  };
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200 group h-full flex flex-col" data-testid={`card-course-${id}`}>
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        {image ? (
          <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-display font-bold text-primary/20">{category.charAt(0)}</span>
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-background/90" data-testid={`badge-category-${id}`}>
          {category}
        </Badge>
        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2" data-testid={`badge-discount-${id}`}>
            -{discount}%
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col gap-3">
        <Link href={`/course/${id}`} data-testid={`link-course-${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span data-testid={`text-students-${id}`}>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-chart-4" />
            <span data-testid={`text-rating-${id}`}>{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
              ₹{price.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={handleAddToCart}
          disabled={isInCart}
          data-testid={`button-add-cart-${id}`}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
