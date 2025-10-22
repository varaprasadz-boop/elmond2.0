import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: number;
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  lastReply: string;
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    ticketNumber: "605129",
    subject: "test test",
    status: "answered",
    priority: "high",
    lastReply: "3 weeks ago",
  },
  {
    id: 2,
    ticketNumber: "605098",
    subject: "Unable to access course videos",
    status: "open",
    priority: "high",
    lastReply: "2 days ago",
  },
  {
    id: 3,
    ticketNumber: "604876",
    subject: "Certificate not generated after course completion",
    status: "in-progress",
    priority: "medium",
    lastReply: "1 week ago",
  },
  {
    id: 4,
    ticketNumber: "604523",
    subject: "Refund request for cancelled course",
    status: "closed",
    priority: "low",
    lastReply: "2 weeks ago",
  },
  {
    id: 5,
    ticketNumber: "604301",
    subject: "Payment not processed correctly",
    status: "answered",
    priority: "high",
    lastReply: "4 days ago",
  },
];

export default function SupportTicket() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    course: "",
    description: "",
  });
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Open</Badge>;
      case "answered":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Answered</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>;
      case "closed":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">Medium</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleSubmitTicket = () => {
    if (!formData.subject || !formData.category || !formData.priority || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newTicketNumber = (605130 + tickets.length).toString();
    const newTicket: Ticket = {
      id: tickets.length + 1,
      ticketNumber: newTicketNumber,
      subject: formData.subject,
      status: "open",
      priority: formData.priority,
      lastReply: "Just now",
    };

    setTickets([newTicket, ...tickets]);
    setFormData({
      subject: "",
      category: "",
      priority: "",
      course: "",
      description: "",
    });
    setShowCreateTicket(false);

    toast({
      title: "Success",
      description: `Ticket #${newTicketNumber} has been created successfully`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Breadcrumb items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Support Tickets" }
      ]} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
        </div>
        <Button onClick={() => setShowCreateTicket(!showCreateTicket)} data-testid="button-create-ticket">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {showCreateTicket && (
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                data-testid="input-ticket-subject"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="course">Course Content</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger id="priority" data-testid="select-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Related Course (Optional)</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                <SelectTrigger id="course" data-testid="select-course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Complete Digital Marketing Masterclass</SelectItem>
                  <SelectItem value="course2">Medical Coding Certification Prep</SelectItem>
                  <SelectItem value="course3">Advanced Google Ads & PPC Strategy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue..."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="textarea-ticket-description"
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button onClick={handleSubmitTicket} data-testid="button-submit-ticket">Submit Ticket</Button>
            <Button variant="outline" onClick={() => setShowCreateTicket(false)} data-testid="button-cancel-ticket">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">SL</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-32">Priority</TableHead>
                <TableHead className="w-40">Last Reply</TableHead>
                <TableHead className="w-32 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow key={ticket.id} data-testid={`row-ticket-${ticket.id}`}>
                  <TableCell className="font-medium" data-testid={`cell-sl-${ticket.id}`}>{index + 1}</TableCell>
                  <TableCell data-testid={`cell-subject-${ticket.id}`}>
                    <div className="font-medium">
                      [Ticket#{ticket.ticketNumber}] {ticket.subject}
                    </div>
                  </TableCell>
                  <TableCell data-testid={`cell-status-${ticket.id}`}>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell data-testid={`cell-priority-${ticket.id}`}>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-muted-foreground" data-testid={`cell-last-reply-${ticket.id}`}>{ticket.lastReply}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                      data-testid={`button-view-ticket-${ticket.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No support tickets found.</p>
        </div>
      )}
    </div>
  );
}
