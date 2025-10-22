import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Trash2, Plus, Check } from "lucide-react";
import { useState } from "react";

const savedPaymentMethods = [
  {
    id: 1,
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    brand: "Mastercard",
    last4: "5555",
    expiryMonth: "06",
    expiryYear: "2026",
    isDefault: false,
  },
];

const billingHistory = [
  {
    id: 1,
    date: "2024-01-15",
    amount: 49.99,
    method: "Visa •••• 4242",
    status: "paid",
    course: "Complete Digital Marketing Masterclass",
  },
  {
    id: 2,
    date: "2024-01-10",
    amount: 89.99,
    method: "Mastercard •••• 5555",
    status: "paid",
    course: "Medical Coding Certification Prep",
  },
  {
    id: 3,
    date: "2024-01-05",
    amount: 59.99,
    method: "Visa •••• 4242",
    status: "paid",
    course: "Advanced Google Ads & PPC Strategy",
  },
];

export default function Payments() {
  const [showAddCard, setShowAddCard] = useState(false);

  const getCardIcon = (brand: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Payment Methods" }
      ]} />
      
      <div>
        <h1 className="text-3xl font-bold">Payment Methods</h1>
        <p className="text-muted-foreground">Manage your payment methods and billing history</p>
      </div>

      <Tabs defaultValue="methods">
        <TabsList>
          <TabsTrigger value="methods" data-testid="tab-payment-methods">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-billing-history">
            Billing History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6 mt-6">
          <div className="grid gap-4">
            {savedPaymentMethods.map((method) => (
              <Card key={method.id} data-testid={`card-payment-${method.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCardIcon(method.brand)}
                      <div>
                        <CardTitle className="text-lg">{method.brand} ending in {method.last4}</CardTitle>
                        <CardDescription>
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </CardDescription>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge variant="default">
                        <Check className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardFooter className="gap-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" data-testid={`button-set-default-${method.id}`}>
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm" data-testid={`button-delete-${method.id}`}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {!showAddCard ? (
            <Button onClick={() => setShowAddCard(true)} data-testid="button-add-payment-method">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Add New Card</CardTitle>
                <CardDescription>Enter your card details below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    data-testid="input-card-number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      data-testid="input-expiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      data-testid="input-cvc"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    data-testid="input-cardholder-name"
                  />
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button data-testid="button-save-card">Add Card</Button>
                <Button variant="outline" onClick={() => setShowAddCard(false)} data-testid="button-cancel-add-card">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {billingHistory.map((transaction) => (
              <Card key={transaction.id} data-testid={`card-billing-${transaction.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{transaction.course}</CardTitle>
                      <CardDescription>
                        {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${transaction.amount}</div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" data-testid={`button-download-receipt-${transaction.id}`}>
                    Download Receipt
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {billingHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No billing history available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
