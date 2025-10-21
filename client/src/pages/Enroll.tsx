import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CreditCard, Smartphone, Clock, BookOpen, Award } from "lucide-react";

export default function Enroll() {
  const [, params] = useRoute("/enroll/:id");
  const [, navigate] = useLocation();
  const courseId = params?.id;
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const course = {
    id: courseId,
    title: "Basics of Digital Marketing",
    category: "Digital Marketing",
    price: 899.10,
    originalPrice: 999.00,
    discount: 10,
    duration: "1 month",
    lessons: 4,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing enrollment:", { formData, paymentMethod, course });
    alert("Enrollment successful! You will receive a confirmation email shortly.");
    navigate("/");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">Enroll Now</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-xl mb-6">Student Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-enroll-name"
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
                      data-testid="input-enroll-email"
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
                      data-testid="input-enroll-phone"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-md hover-elevate">
                        <RadioGroupItem value="card" id="card" data-testid="radio-enroll-card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit / Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-md hover-elevate mt-2">
                        <RadioGroupItem value="upi" id="upi" data-testid="radio-enroll-upi" />
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
                          data-testid="input-enroll-card-number"
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
                            data-testid="input-enroll-expiry"
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
                            data-testid="input-enroll-cvv"
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
                        required
                        data-testid="input-enroll-upi-id"
                      />
                    </div>
                  )}

                  <div className="pt-6">
                    <Button type="submit" className="w-full" size="lg" data-testid="button-enroll-submit">
                      Complete Enrollment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl font-display font-bold text-primary/20">
                    {course.category.charAt(0)}
                  </span>
                </div>

                <Badge className="mb-2">{course.category}</Badge>
                <h2 className="font-display font-bold text-xl mb-4" data-testid="text-enroll-course-title">
                  {course.title}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Certificate of Completion</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="line-through text-muted-foreground">₹{course.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount ({course.discount}%)</span>
                    <span className="text-green-600">-₹{(course.originalPrice - course.price).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-enroll-total">
                        ₹{course.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="text-muted-foreground">
                    Your payment is secure and encrypted. You will receive instant access to the course after enrollment.
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
