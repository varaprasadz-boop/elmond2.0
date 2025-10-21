import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Target,
  Calendar,
  Play,
  CheckCircle2,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { slugify } from "@/lib/slugify";

export default function Dashboard() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
  };

  const stats = {
    enrolledCourses: 8,
    completedCourses: 3,
    inProgressCourses: 5,
    totalHoursLearned: 47,
    certificatesEarned: 3,
    currentStreak: 12,
  };

  const enrolledCourses = [
    {
      id: 1,
      slug: slugify("Basics of Digital Marketing"),
      title: "Basics of Digital Marketing",
      category: "Digital Marketing",
      progress: 75,
      lastAccessed: "2 hours ago",
      totalLessons: 20,
      completedLessons: 15,
      timeSpent: 8,
      status: "in_progress",
    },
    {
      id: 2,
      slug: slugify("Google Ads Mastery"),
      title: "Google Ads Mastery",
      category: "Digital Marketing",
      progress: 45,
      lastAccessed: "1 day ago",
      totalLessons: 16,
      completedLessons: 7,
      timeSpent: 6,
      status: "in_progress",
    },
    {
      id: 3,
      slug: slugify("Meta Ads Mastery"),
      title: "Meta Ads Mastery",
      category: "Digital Marketing",
      progress: 100,
      lastAccessed: "3 days ago",
      totalLessons: 18,
      completedLessons: 18,
      timeSpent: 12,
      status: "completed",
    },
    {
      id: 4,
      slug: slugify("SEO Mastery"),
      title: "SEO Mastery",
      category: "Digital Marketing",
      progress: 60,
      lastAccessed: "5 hours ago",
      totalLessons: 22,
      completedLessons: 13,
      timeSpent: 9,
      status: "in_progress",
    },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 3 },
  ];

  const categoryProgress = [
    { name: "Digital Marketing", value: 65, color: "hsl(var(--primary))" },
    { name: "Medical Coding", value: 25, color: "hsl(var(--accent))" },
    { name: "Programming", value: 10, color: "hsl(var(--muted))" },
  ];

  const recentActivity = [
    { action: "Completed lesson", course: "Basics of Digital Marketing", time: "2 hours ago" },
    { action: "Started course", course: "Google Ads Mastery", time: "1 day ago" },
    { action: "Earned certificate", course: "Meta Ads Mastery", time: "3 days ago" },
    { action: "Completed quiz", course: "SEO Mastery", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display font-bold text-3xl" data-testid="text-dashboard-title">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <Badge variant="secondary">{stats.inProgressCourses} Active</Badge>
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-enrolled-courses">{stats.enrolledCourses}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-completed-courses">{stats.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Completed Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-primary" />
                <Badge>This Month</Badge>
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-hours-learned">{stats.totalHoursLearned}h</p>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-yellow-600" />
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="text-certificates">{stats.certificatesEarned}</p>
                <p className="text-sm text-muted-foreground">Certificates Earned</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Category Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryProgress}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryProgress.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="font-semibold">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Continue Learning</CardTitle>
              <Link href="/my-courses" data-testid="link-view-all-courses">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <Card key={course.id} className="overflow-hidden" data-testid={`card-course-${course.id}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <span className="text-4xl font-display font-bold text-primary/20">
                            {course.category.charAt(0)}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <Badge variant="secondary" className="mb-1">{course.category}</Badge>
                              <h3 className="font-semibold truncate" data-testid={`text-course-title-${course.id}`}>
                                {course.title}
                              </h3>
                            </div>
                            {course.status === "completed" && (
                              <Badge className="bg-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">
                                  {course.completedLessons}/{course.totalLessons} lessons
                                </span>
                                <span className="font-semibold" data-testid={`text-progress-${course.id}`}>
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {course.timeSpent}h spent
                                </span>
                                <span>Last: {course.lastAccessed}</span>
                              </div>
                              
                              <Link href={`/learn/${course.slug}`} data-testid={`button-continue-${course.id}`}>
                                <Button size="sm">
                                  <Play className="h-4 w-4 mr-1" />
                                  {course.status === "completed" ? "Review" : "Continue"}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
