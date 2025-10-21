import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const { items, removeFromCart, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display font-bold text-3xl mb-4" data-testid="text-empty-cart">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse our courses and add them to your cart
            </p>
            <Link href="/course" data-testid="link-browse-courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl font-display font-bold text-primary/20">
                            {item.category.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2" data-testid={`text-cart-item-title-${item.id}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.category}</p>
                      
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary" data-testid={`text-cart-item-price-${item.id}`}>
                            ₹{item.price.toFixed(2)}
                          </span>
                          {item.discount > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({itemCount})</span>
                    <span data-testid="text-cart-subtotal">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600">
                      -₹{(items.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-cart-total">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" data-testid="link-checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/course" data-testid="link-continue-shopping">
                  <Button className="w-full mt-2" size="lg" variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
