import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Award,
  TrendingUp,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/slugify";

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      slug: slugify("Basics of Digital Marketing"),
      title: "Basics of Digital Marketing",
      category: "Digital Marketing",
      progress: 75,
      status: "in_progress",
      lastAccessed: "2 hours ago",
      totalLessons: 20,
      completedLessons: 15,
      totalDuration: "10h",
      timeSpent: "8h",
      enrolledDate: "Jan 15, 2025",
      nextLesson: "Lesson 16: Email Marketing Basics",
    },
    {
      id: 2,
      slug: slugify("Google Ads Mastery"),
      title: "Google Ads Mastery",
      category: "Digital Marketing",
      progress: 45,
      status: "in_progress",
      lastAccessed: "1 day ago",
      totalLessons: 16,
      completedLessons: 7,
      totalDuration: "12h",
      timeSpent: "6h",
      enrolledDate: "Jan 20, 2025",
      nextLesson: "Lesson 8: Keyword Research Advanced",
    },
    {
      id: 3,
      slug: slugify("Meta Ads Mastery"),
      title: "Meta Ads Mastery",
      category: "Digital Marketing",
      progress: 100,
      status: "completed",
      lastAccessed: "3 days ago",
      totalLessons: 18,
      completedLessons: 18,
      totalDuration: "14h",
      timeSpent: "12h",
      enrolledDate: "Dec 10, 2024",
      completedDate: "Jan 18, 2025",
      certificateId: "CERT-2025-001",
    },
    {
      id: 4,
      slug: slugify("SEO Mastery"),
      title: "SEO Mastery",
      category: "Digital Marketing",
      progress: 60,
      status: "in_progress",
      lastAccessed: "5 hours ago",
      totalLessons: 22,
      completedLessons: 13,
      totalDuration: "15h",
      timeSpent: "9h",
      enrolledDate: "Jan 10, 2025",
      nextLesson: "Lesson 14: Link Building Strategies",
    },
    {
      id: 5,
      slug: slugify("ICD 10 CM Module Training"),
      title: "ICD 10 CM Module Training",
      category: "Medical Coding",
      progress: 30,
      status: "in_progress",
      lastAccessed: "2 days ago",
      totalLessons: 25,
      completedLessons: 8,
      totalDuration: "20h",
      timeSpent: "6h",
      enrolledDate: "Jan 22, 2025",
      nextLesson: "Lesson 9: Introduction to ICD Codes",
    },
    {
      id: 6,
      slug: slugify("Ad Copy Mastery"),
      title: "Ad Copy Mastery",
      category: "Digital Marketing",
      progress: 100,
      status: "completed",
      lastAccessed: "1 week ago",
      totalLessons: 12,
      completedLessons: 12,
      totalDuration: "8h",
      timeSpent: "8h",
      enrolledDate: "Dec 1, 2024",
      completedDate: "Dec 20, 2024",
      certificateId: "CERT-2024-042",
    },
    {
      id: 7,
      slug: slugify("Advanced Digital Marketing"),
      title: "Advanced Digital Marketing",
      category: "Digital Marketing",
      progress: 15,
      status: "in_progress",
      lastAccessed: "3 days ago",
      totalLessons: 30,
      completedLessons: 5,
      totalDuration: "25h",
      timeSpent: "4h",
      enrolledDate: "Jan 25, 2025",
      nextLesson: "Lesson 6: Marketing Analytics Dashboard",
    },
    {
      id: 8,
      slug: slugify("Digital Marketing Mastery"),
      title: "Digital Marketing Mastery",
      category: "Digital Marketing",
      progress: 100,
      status: "completed",
      lastAccessed: "2 weeks ago",
      totalLessons: 24,
      completedLessons: 24,
      totalDuration: "18h",
      timeSpent: "16h",
      enrolledDate: "Nov 15, 2024",
      completedDate: "Dec 28, 2024",
      certificateId: "CERT-2024-038",
    },
  ];

  const inProgressCourses = courses.filter(c => c.status === "in_progress");
  const completedCourses = courses.filter(c => c.status === "completed");

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-my-course-${course.id}`}>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <span className="text-5xl font-display font-bold text-primary/20">
              {course.category.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                <h3 className="font-display font-bold text-xl mb-1" data-testid={`text-my-course-title-${course.id}`}>
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enrolled: {course.enrolledDate}
                </p>
              </div>
              
              {course.status === "completed" && (
                <Badge className="bg-green-600 flex-shrink-0">
                  <Award className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </span>
                  <span className="font-bold" data-testid={`text-my-course-progress-${course.id}`}>
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2.5" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {course.timeSpent} of {course.totalDuration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">
                    Last: {course.lastAccessed}
                  </span>
                </div>
              </div>

              {course.status === "in_progress" && course.nextLesson && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
                  <p className="text-sm font-medium">{course.nextLesson}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Link href={`/learn/${course.slug}`} data-testid={`button-continue-learning-${course.id}`} className="flex-1">
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {course.status === "completed" ? "Review Course" : "Continue Learning"}
                  </Button>
                </Link>
                
                {course.status === "completed" && course.certificateId && (
                  <Link href="/certificates" data-testid={`button-view-certificate-${course.id}`}>
                    <Button variant="outline">
                      <Award className="h-4 w-4 mr-2" />
                      Certificate
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" data-testid="text-total-enrolled">{courses.length}</p>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
                </div>
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" data-testid="text-in-progress">{inProgressCourses.length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" data-testid="text-completed">{completedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="all" data-testid="tab-all-courses">
                  All Courses ({courses.length})
                </TabsTrigger>
                <TabsTrigger value="in-progress" data-testid="tab-in-progress">
                  In Progress ({inProgressCourses.length})
                </TabsTrigger>
                <TabsTrigger value="completed" data-testid="tab-completed">
                  Completed ({completedCourses.length})
                </TabsTrigger>
              </TabsList>

              <Select defaultValue="recent">
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Accessed</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="enrolled">Enrollment Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all" className="space-y-4">
              {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              {inProgressCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
