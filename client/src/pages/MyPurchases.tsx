import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, CreditCard } from "lucide-react";

export default function MyPurchases() {
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-2025-0123",
      date: "Jan 25, 2025",
      items: [
        { courseTitle: "Advanced Digital Marketing", price: 4749.05 },
      ],
      total: 4749.05,
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      orderNumber: "ORD-2025-0098",
      date: "Jan 22, 2025",
      items: [
        { courseTitle: "ICD 10 CM Module Training", price: 4749.05 },
      ],
      total: 4749.05,
      paymentMethod: "UPI",
      status: "Completed",
    },
    {
      id: 3,
      orderNumber: "ORD-2025-0067",
      date: "Jan 20, 2025",
      items: [
        { courseTitle: "Google Ads Mastery", price: 1899.05 },
        { courseTitle: "Meta Ads Mastery", price: 1899.05 },
      ],
      total: 3798.10,
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: 4,
      orderNumber: "ORD-2025-0034",
      date: "Jan 15, 2025",
      items: [
        { courseTitle: "Basics of Digital Marketing", price: 899.10 },
        { courseTitle: "SEO Mastery", price: 949.05 },
      ],
      total: 1848.15,
      paymentMethod: "UPI",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Purchases" }
        ]} />
        
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">My Purchases</h1>
          <p className="text-muted-foreground">View your order history and download receipts</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} data-testid={`card-order-${order.id}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg" data-testid={`text-order-number-${order.id}`}>
                      Order #{order.orderNumber}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {order.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{item.courseTitle}</span>
                      <span className="text-muted-foreground">₹{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Total Amount</span>
                    <p className="text-2xl font-bold text-primary" data-testid={`text-order-total-${order.id}`}>
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="outline" data-testid={`button-download-invoice-${order.id}`}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
