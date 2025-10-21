import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { useState } from "react";

const tickets = [
  {
    id: "TICKET-001",
    subject: "Unable to access course videos",
    category: "Technical",
    status: "open",
    priority: "high",
    createdDate: "2024-01-15T10:30:00",
    lastUpdated: "2024-01-16T14:20:00",
    course: "Complete Digital Marketing Masterclass",
    responses: 3,
  },
  {
    id: "TICKET-002",
    subject: "Certificate not generated",
    category: "Certificate",
    status: "in-progress",
    priority: "medium",
    createdDate: "2024-01-10T09:15:00",
    lastUpdated: "2024-01-12T16:45:00",
    course: "Medical Coding Certification Prep",
    responses: 5,
  },
  {
    id: "TICKET-003",
    subject: "Refund request for cancelled course",
    category: "Billing",
    status: "resolved",
    priority: "low",
    createdDate: "2024-01-05T14:30:00",
    lastUpdated: "2024-01-08T11:20:00",
    course: "Web Development Bootcamp",
    responses: 8,
  },
];

export default function SupportTicket() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="default">Open</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "resolved":
        return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-secondary" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "closed":
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Get help with your courses and account</p>
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

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all-tickets">
            All Tickets ({tickets.length})
          </TabsTrigger>
          <TabsTrigger value="open" data-testid="tab-open-tickets">
            Open ({tickets.filter(t => t.status === "open").length})
          </TabsTrigger>
          <TabsTrigger value="resolved" data-testid="tab-resolved-tickets">
            Resolved ({tickets.filter(t => t.status === "resolved").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {tickets.map((ticket) => (
            <Card key={ticket.id} data-testid={`card-ticket-${ticket.id}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-muted">
                    {getStatusIcon(ticket.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <CardDescription className="mt-1">
                          {ticket.id} • {ticket.course}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{ticket.responses} responses</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" data-testid={`button-view-ticket-${ticket.id}`}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="open" className="space-y-4 mt-6">
          {tickets
            .filter((ticket) => ticket.status === "open" || ticket.status === "in-progress")
            .map((ticket) => (
              <Card key={ticket.id} data-testid={`card-open-ticket-${ticket.id}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      {getStatusIcon(ticket.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                          <CardDescription className="mt-1">
                            {ticket.id} • {ticket.course}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{ticket.responses} responses</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" data-testid={`button-view-open-ticket-${ticket.id}`}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-6">
          {tickets
            .filter((ticket) => ticket.status === "resolved" || ticket.status === "closed")
            .map((ticket) => (
              <Card key={ticket.id} data-testid={`card-resolved-ticket-${ticket.id}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      {getStatusIcon(ticket.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                          <CardDescription className="mt-1">
                            {ticket.id} • {ticket.course}
                          </CardDescription>
                        </div>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span>Resolved: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" data-testid={`button-view-resolved-ticket-${ticket.id}`}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
