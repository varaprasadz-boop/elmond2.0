import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Star, Search, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const mockCourses = [
  {
    id: 1,
    title: "Complete Digital Marketing Masterclass",
    category: "Digital Marketing",
    description: "Learn SEO, Social Media Marketing, Email Marketing, and more",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12450,
    duration: "42 hours",
    price: 49.99,
    image: "📱",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Medical Coding Certification Prep",
    category: "Medical Coding",
    description: "Prepare for CPC and CCS certification exams",
    instructor: "Dr. Michael Chen",
    rating: 4.9,
    students: 8920,
    duration: "35 hours",
    price: 89.99,
    image: "🏥",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Advanced Google Ads & PPC Strategy",
    category: "Digital Marketing",
    description: "Master Google Ads, Facebook Ads, and PPC campaigns",
    instructor: "David Martinez",
    rating: 4.7,
    students: 15200,
    duration: "28 hours",
    price: 59.99,
    image: "💰",
    level: "Advanced"
  },
  {
    id: 4,
    title: "ICD-10 Coding Fundamentals",
    category: "Medical Coding",
    description: "Master ICD-10-CM coding for diagnoses",
    instructor: "Emily Roberts",
    rating: 4.8,
    students: 6780,
    duration: "25 hours",
    price: 69.99,
    image: "📋",
    level: "Beginner"
  },
  {
    id: 5,
    title: "Social Media Marketing Pro",
    category: "Digital Marketing",
    description: "Instagram, TikTok, LinkedIn, and Twitter marketing strategies",
    instructor: "Jessica Lee",
    rating: 4.6,
    students: 18500,
    duration: "32 hours",
    price: 54.99,
    image: "📱",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "CPT Coding for Procedures",
    category: "Medical Coding",
    description: "Learn CPT coding for medical procedures and services",
    instructor: "James Wilson",
    rating: 4.9,
    students: 5640,
    duration: "30 hours",
    price: 79.99,
    image: "⚕️",
    level: "Advanced"
  },
];

export default function AllCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["All", "Digital Marketing", "Medical Coding"];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground">Browse our complete course catalog</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-courses"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category === "All" ? "all" : category}
                data-testid={`tab-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col" data-testid={`card-course-${course.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="text-4xl mb-2">{course.image}</div>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-2xl font-bold">${course.price}</div>
              <Link href={`/course/${course.id}`}>
                <Button data-testid={`button-view-course-${course.id}`}>View Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
