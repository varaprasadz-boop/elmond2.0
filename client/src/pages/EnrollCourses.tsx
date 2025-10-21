import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

const enrollmentRequests = [
  {
    id: 1,
    courseTitle: "Complete Digital Marketing Masterclass",
    requestDate: "2024-01-15",
    status: "pending",
    price: 49.99,
    instructor: "Sarah Johnson",
  },
  {
    id: 2,
    courseTitle: "Medical Coding Certification Prep",
    requestDate: "2024-01-10",
    status: "approved",
    price: 89.99,
    instructor: "Dr. Michael Chen",
    approvalDate: "2024-01-12",
  },
  {
    id: 3,
    courseTitle: "Advanced Google Ads & PPC Strategy",
    requestDate: "2024-01-08",
    status: "rejected",
    price: 59.99,
    instructor: "David Martinez",
    rejectionReason: "Prerequisites not met",
  },
];

const availableForEnrollment = [
  {
    id: 4,
    title: "ICD-10 Coding Fundamentals",
    description: "Master ICD-10-CM coding for diagnoses",
    price: 69.99,
    duration: "25 hours",
    prerequisite: "None",
  },
  {
    id: 5,
    title: "Social Media Marketing Pro",
    description: "Instagram, TikTok, LinkedIn marketing strategies",
    price: 54.99,
    duration: "32 hours",
    prerequisite: "Basic Marketing Knowledge",
  },
];

export default function EnrollCourses() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Enroll in Courses</h1>
        <p className="text-muted-foreground">Manage your course enrollment requests</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Enrollment Requests</h2>
          <div className="grid gap-4">
            {enrollmentRequests.map((request) => (
              <Card key={request.id} data-testid={`card-enrollment-${request.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{request.courseTitle}</CardTitle>
                      <CardDescription>Instructor: {request.instructor}</CardDescription>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Price: ${request.price}</span>
                    </div>
                    {request.status === "approved" && request.approvalDate && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Approved: {new Date(request.approvalDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {request.status === "rejected" && request.rejectionReason && (
                      <div className="flex items-center gap-2 text-destructive">
                        <XCircle className="h-4 w-4" />
                        <span>Reason: {request.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                  {request.status === "pending" && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" data-testid={`button-cancel-enrollment-${request.id}`}>
                        Cancel Request
                      </Button>
                    </div>
                  )}
                  {request.status === "approved" && (
                    <div className="mt-4">
                      <Button data-testid={`button-start-course-${request.id}`}>
                        Start Course
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Available for Enrollment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableForEnrollment.map((course) => (
              <Card key={course.id} data-testid={`card-available-${course.id}`}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Prerequisite: </span>
                      <span>{course.prerequisite}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${course.price}
                    </div>
                  </div>
                  <Button className="w-full" data-testid={`button-enroll-${course.id}`}>
                    Request Enrollment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
