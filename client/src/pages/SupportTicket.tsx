import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

const tickets = [
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
  const [showCreateTicket, setShowCreateTicket] = useState(false);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
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
                data-testid="input-ticket-subject"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
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
                <Select>
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
              <Select>
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
                data-testid="textarea-ticket-description"
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button data-testid="button-submit-ticket">Submit Ticket</Button>
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
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      [Ticket#{ticket.ticketNumber}] {ticket.subject}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-muted-foreground">{ticket.lastReply}</TableCell>
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
