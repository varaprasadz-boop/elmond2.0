import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Breadcrumb from "@/components/Breadcrumb";
import { useLocation } from "wouter";
import { CreditCard, Smartphone, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, total, finalTotal, couponDiscount, appliedCoupon, clearCart } = useCart();
  const { user, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  // Check for empty cart and redirect
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  // Auto-register guest user if checkout data exists
  useEffect(() => {
    const guestData = sessionStorage.getItem("guestCheckoutData");
    if (guestData && !isAuthenticated && !isRegistering) {
      setIsRegistering(true);
      const data = JSON.parse(guestData);
      
      // Auto-register the guest user
      register(data)
        .then(() => {
          toast({
            title: "Account Created",
            description: "Your account has been created successfully. Please complete the payment.",
          });
          // Clear guest data from session storage
          sessionStorage.removeItem("guestCheckoutData");
          setIsRegistering(false);
        })
        .catch((error) => {
          console.error("Registration error:", error);
          toast({
            title: "Registration Error",
            description: "Failed to create account. Please try again.",
            variant: "destructive",
          });
          setIsRegistering(false);
          setTimeout(() => navigate("/cart"), 1000);
        });
    }
  }, [register, isAuthenticated, toast, navigate, isRegistering]);

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Processing payment:", {
        formData,
        paymentMethod,
        total: finalTotal,
        coupon: appliedCoupon?.code,
        user: user?.email,
      });

      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully. You will receive a confirmation email shortly.",
      });

      clearCart();
      navigate("/dashboard");
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const taxAmount = total * 0.18;
  const grandTotal = finalTotal + taxAmount;

  // Show loading state during guest registration
  if (isRegistering) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Creating your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout" }
        ]} />
        
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-xl mb-6">Billing Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-checkout-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-checkout-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      data-testid="input-checkout-phone"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-md hover-elevate">
                        <RadioGroupItem value="card" id="card" data-testid="radio-payment-card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit / Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-md hover-elevate mt-2">
                        <RadioGroupItem value="upi" id="upi" data-testid="radio-payment-upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5" />
                          <span>UPI</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          required
                          data-testid="input-card-number"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            required
                            data-testid="input-expiry-date"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            required
                            data-testid="input-cvv"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="pt-4">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="username@upi"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        required
                        data-testid="input-upi-id"
                      />
                    </div>
                  )}

                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                      data-testid="button-complete-payment"
                    >
                      {isProcessing ? "Processing..." : "Complete Payment"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2" data-testid={`checkout-item-${item.id}`}>
                      <span className="text-sm truncate">{item.title}</span>
                      <span className="text-sm font-semibold whitespace-nowrap">₹{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item Subtotal</span>
                    <span data-testid="text-checkout-subtotal">₹{total.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        Coupon ({appliedCoupon.code})
                      </span>
                      <span data-testid="text-checkout-coupon-discount">-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">18% IGST</span>
                    <span data-testid="text-checkout-tax">₹{taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-lg">Grand Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-checkout-total">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="text-muted-foreground">
                    Your payment is secure and encrypted. You will receive instant access to your courses after payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
