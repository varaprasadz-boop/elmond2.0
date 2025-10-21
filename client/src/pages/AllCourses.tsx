import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Star, Search, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { mockCourses } from "@/data/mockData";

export default function AllCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(new Set(mockCourses.map(course => course.category)));

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">All Courses</h1>
          <p className="text-muted-foreground">Explore our complete course catalog</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-all-courses"
            />
          </div>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all-courses">All Courses</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="flex flex-col hover-elevate" data-testid={`card-course-${course.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-chart-4" />
                    <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                {course.description && (
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Lessons</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2 w-full">
                  <span className="text-2xl font-bold text-primary">
                    ₹{course.price.toFixed(2)}
                  </span>
                  {course.discount > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{course.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Link href={`/course/${course.slug}`} className="w-full">
                  <Button className="w-full" data-testid={`button-view-course-${course.id}`}>
                    View Course
                  </Button>
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
    </div>
  );
}
