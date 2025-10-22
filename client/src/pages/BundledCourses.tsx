import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { mockBundles } from "@/data/mockData";
import { ShoppingCart, Check, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function BundledCourses() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddBundle = (bundleId: number) => {
    const bundle = mockBundles.find(b => b.id === bundleId);
    if (!bundle) return;

    // Add bundle as a single item to cart
    addToCart({
      id: bundle.id * 1000, // Use high ID to avoid conflicts with course IDs
      title: bundle.title,
      price: bundle.bundlePrice,
      originalPrice: bundle.originalTotalPrice,
      discount: Math.round((bundle.savings / bundle.originalTotalPrice) * 100),
      category: bundle.category,
      isBundle: true,
      bundleSlug: bundle.slug,
      includedCourses: bundle.courses.map(c => c.title),
    });

    toast({
      title: "Bundle Added to Cart!",
      description: `${bundle.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Bundled Courses" }]} />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="font-display font-bold text-3xl md:text-4xl" data-testid="text-bundled-courses-heading">
              Bundled Courses
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Save big by enrolling in multiple courses together! Our carefully curated bundles offer exceptional value 
            and help you master complete skill sets.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockBundles.map((bundle) => (
            <Card key={bundle.id} className="overflow-hidden" data-testid={`card-bundle-${bundle.id}`}>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-display font-bold text-2xl mb-2" data-testid={`text-bundle-title-${bundle.id}`}>
                      {bundle.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {bundle.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {bundle.courses.length} Courses
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Course List */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                    INCLUDED COURSES:
                  </h3>
                  {bundle.courses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                      data-testid={`bundle-course-${bundle.id}-${course.id}`}
                    >
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.category} • {course.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">₹{course.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground line-through">
                          ₹{course.originalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Individual Price Total:</span>
                    <span className="line-through" data-testid={`text-bundle-original-${bundle.id}`}>
                      ₹{bundle.originalTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-lg">Bundle Price:</span>
                    <span className="text-2xl font-bold text-primary" data-testid={`text-bundle-price-${bundle.id}`}>
                      ₹{bundle.bundlePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="default" className="bg-green-600">
                      Save ₹{bundle.savings.toFixed(2)}
                    </Badge>
                    <span className="text-sm text-green-600 font-semibold">
                      {Math.round((bundle.savings / bundle.originalTotalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={() => handleAddBundle(bundle.id)}
                    data-testid={`button-add-bundle-${bundle.id}`}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add Bundle to Cart
                  </Button>
                  <Link href="/course">
                    <Button variant="outline" size="lg" data-testid={`button-view-courses-${bundle.id}`}>
                      View Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Why Choose Bundled Courses?</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <h4 className="font-semibold mb-1">💰 Maximum Savings</h4>
              <p className="text-sm text-muted-foreground">
                Save up to 30% compared to purchasing courses individually
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">📚 Complete Learning Path</h4>
              <p className="text-sm text-muted-foreground">
                Carefully curated courses that complement each other for comprehensive learning
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🎓 Instant Access</h4>
              <p className="text-sm text-muted-foreground">
                Get immediate access to all courses in the bundle upon enrollment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
