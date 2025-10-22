import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    id: "TXN-2024-001",
    type: "payment",
    description: "Course Purchase - Complete Digital Marketing Masterclass",
    amount: -49.99,
    date: "2024-01-15T10:30:00",
    status: "completed",
    method: "Visa •••• 4242",
    category: "Course",
  },
  {
    id: "TXN-2024-002",
    type: "refund",
    description: "Refund - Web Development Bootcamp",
    amount: 99.99,
    date: "2024-01-14T15:20:00",
    status: "completed",
    method: "Visa •••• 4242",
    category: "Refund",
  },
  {
    id: "TXN-2024-003",
    type: "payment",
    description: "Course Purchase - Medical Coding Certification Prep",
    amount: -89.99,
    date: "2024-01-10T09:15:00",
    status: "completed",
    method: "Mastercard •••• 5555",
    category: "Course",
  },
  {
    id: "TXN-2024-004",
    type: "payment",
    description: "Course Purchase - Advanced Google Ads & PPC Strategy",
    amount: -59.99,
    date: "2024-01-05T14:45:00",
    status: "completed",
    method: "Visa •••• 4242",
    category: "Course",
  },
  {
    id: "TXN-2024-005",
    type: "payment",
    description: "Course Purchase - ICD-10 Coding Fundamentals",
    amount: -69.99,
    date: "2024-01-02T11:00:00",
    status: "pending",
    method: "Visa •••• 4242",
    category: "Course",
  },
  {
    id: "TXN-2023-156",
    type: "payment",
    description: "Certificate Fee - Digital Marketing",
    amount: -15.00,
    date: "2023-12-28T16:30:00",
    status: "completed",
    method: "Mastercard •••• 5555",
    category: "Certificate",
  },
];

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || txn.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalSpent = transactions
    .filter(t => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalRefunded = transactions
    .filter(t => t.type === "refund" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === "payment" ? (
      <div className="p-2 rounded-full bg-destructive/10">
        <ArrowUpRight className="h-4 w-4 text-destructive" />
      </div>
    ) : (
      <div className="p-2 rounded-full bg-green-500/10">
        <ArrowDownRight className="h-4 w-4 text-green-500" />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Transactions" }
      ]} />
      
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View your complete transaction history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRefunded.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total count</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-transactions"
          />
        </div>
        <Button variant="outline" data-testid="button-export-transactions">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Tabs value={filterType} onValueChange={setFilterType}>
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
          <TabsTrigger value="payment" data-testid="tab-payments">Payments</TabsTrigger>
          <TabsTrigger value="refund" data-testid="tab-refunds">Refunds</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} data-testid={`card-transaction-${transaction.id}`}>
            <CardHeader>
              <div className="flex items-start gap-4">
                {getTransactionIcon(transaction.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{transaction.description}</CardTitle>
                      <CardDescription className="mt-1">
                        {transaction.id} • {transaction.method}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${transaction.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                        {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{new Date(transaction.date).toLocaleString()}</span>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
