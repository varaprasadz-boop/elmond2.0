import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, ShoppingCart, Tag, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeFromCart, total, itemCount, appliedCoupon, applyCoupon, removeCoupon, couponDiscount, finalTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Guest checkout form state
  // Note: Password is stored in React component state (ephemeral, memory-only) for validation
  // This is standard practice and secure - the password is NEVER persisted to sessionStorage/localStorage
  // React state is cleared when component unmounts or page refreshes
  const [guestFormData, setGuestFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    setIsApplyingCoupon(true);
    const result = applyCoupon(couponCode);
    
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      setCouponCode("");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Coupon Removed",
      description: "Coupon code has been removed from your cart",
    });
  };

  const handleGuestCheckout = () => {
    // Validate guest form
    if (!guestFormData.firstName || !guestFormData.lastName || !guestFormData.email || 
        !guestFormData.phone || !guestFormData.address || !guestFormData.country || 
        !guestFormData.state || !guestFormData.city || !guestFormData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (guestFormData.password !== guestFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Store guest data in sessionStorage WITHOUT password for security
    // In production, this would be sent to the server for registration
    const { password, confirmPassword, ...safeGuestData } = guestFormData;
    sessionStorage.setItem("guestCheckoutData", JSON.stringify(safeGuestData));
    // In production, password would be securely sent to backend API here
    navigate("/checkout");
  };

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
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl md:text-4xl">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            Home / <span className="text-foreground">Shopping Cart</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items and Guest Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Billing Form (only for non-authenticated users) */}
            {!isAuthenticated && (
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="font-display font-bold text-xl mb-2">Billing details</h2>
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/login" className="text-primary hover:underline" data-testid="link-login">
                        Click here to login
                      </Link>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={guestFormData.firstName}
                        onChange={(e) => setGuestFormData({ ...guestFormData, firstName: e.target.value })}
                        placeholder="First Name"
                        data-testid="input-guest-firstname"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={guestFormData.lastName}
                        onChange={(e) => setGuestFormData({ ...guestFormData, lastName: e.target.value })}
                        placeholder="Last Name"
                        data-testid="input-guest-lastname"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={guestFormData.address}
                      onChange={(e) => setGuestFormData({ ...guestFormData, address: e.target.value })}
                      placeholder="Address"
                      data-testid="input-guest-address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="country">Select Country *</Label>
                      <Select
                        value={guestFormData.country}
                        onValueChange={(value) => setGuestFormData({ ...guestFormData, country: value })}
                      >
                        <SelectTrigger id="country" data-testid="select-guest-country">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={guestFormData.state}
                        onChange={(e) => setGuestFormData({ ...guestFormData, state: e.target.value })}
                        placeholder="State"
                        data-testid="input-guest-state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City / Town *</Label>
                      <Input
                        id="city"
                        value={guestFormData.city}
                        onChange={(e) => setGuestFormData({ ...guestFormData, city: e.target.value })}
                        placeholder="City / Town"
                        data-testid="input-guest-city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestFormData.phone}
                        onChange={(e) => setGuestFormData({ ...guestFormData, phone: e.target.value })}
                        placeholder="Phone"
                        data-testid="input-guest-phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={guestFormData.password}
                        onChange={(e) => setGuestFormData({ ...guestFormData, password: e.target.value })}
                        placeholder="Password"
                        data-testid="input-guest-password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={guestFormData.confirmPassword}
                        onChange={(e) => setGuestFormData({ ...guestFormData, confirmPassword: e.target.value })}
                        placeholder="Confirm Password"
                        data-testid="input-guest-confirm-password"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="email">Email address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestFormData.email}
                      onChange={(e) => setGuestFormData({ ...guestFormData, email: e.target.value })}
                      placeholder="Email address"
                      data-testid="input-guest-email"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cart Items */}
            <div className="space-y-4">
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
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-xl mb-6">Your Order</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item Subtotal</span>
                    <span data-testid="text-cart-subtotal">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">18% IGST</span>
                    <span data-testid="text-cart-tax">₹{(total * 0.18).toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        Coupon ({appliedCoupon.code})
                      </span>
                      <div className="flex items-center gap-2">
                        <span data-testid="text-coupon-discount">-₹{couponDiscount.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={handleRemoveCoupon}
                          data-testid="button-remove-coupon"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-lg">Grand Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-cart-total">
                        ₹{(finalTotal + total * 0.18).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Input (only for logged-in users) */}
                {isAuthenticated && !appliedCoupon && (
                  <div className="mb-6">
                    <Label htmlFor="coupon" className="mb-2 block">Enter Coupon Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter Coupon Code..."
                        data-testid="input-coupon"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleApplyCoupon();
                          }
                        }}
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        data-testid="button-apply-coupon"
                      >
                        Apply Coupon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: SAVE10, WELCOME20, FLAT500
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                {isAuthenticated ? (
                  <Link href="/checkout" data-testid="link-checkout">
                    <Button className="w-full" size="lg">
                      Buy Now
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleGuestCheckout}
                    data-testid="button-guest-checkout"
                  >
                    Buy Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
