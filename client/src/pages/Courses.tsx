import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality - mock course data
const mockCourses = [
  { id: 4, title: "Basics of Digital Marketing", category: "Digital Marketing", duration: "1 month", students: 4, rating: 4.5, price: 899.10, originalPrice: 999.00, discount: 10 },
  { id: 5, title: "Search Engine Optimization Mastery", category: "Digital Marketing", duration: "1 month", students: 1, rating: 4.0, price: 949.05, originalPrice: 999.00, discount: 5 },
  { id: 6, title: "Meta Ads Mastery", category: "Digital Marketing", duration: "1 month", students: 1, rating: 4.2, price: 1899.05, originalPrice: 1999.00, discount: 5 },
  { id: 7, title: "Google Ads Mastery", category: "Digital Marketing", duration: "1 month", students: 1, rating: 4.3, price: 1899.05, originalPrice: 1999.00, discount: 5 },
  { id: 8, title: "Ad Copy Mastery", category: "Digital Marketing", duration: "1 month", students: 0, rating: 4.0, price: 1424.05, originalPrice: 1499.00, discount: 5 },
  { id: 9, title: "ICD 10 CM Module Training", category: "Medical Coding", duration: "1 month", students: 1, rating: 4.5, price: 4749.05, originalPrice: 4999.00, discount: 5 },
  { id: 10, title: "Digital Marketing Mastery", category: "Digital Marketing", duration: "6 days", students: 0, rating: 4.0, price: 4749.05, originalPrice: 4999.00, discount: 5 },
  { id: 11, title: "Advanced Digital Marketing", category: "Digital Marketing", duration: "6 days", students: 0, rating: 4.5, price: 4749.05, originalPrice: 4999.00, discount: 5 },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCourses = mockCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Course</h1>
          <p className="text-muted-foreground">Browse our comprehensive course catalog</p>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              What to learn next
            </h2>
            <p className="text-muted-foreground mb-4">
              Training 5 or more people? Get your team access to top 25,000+ courses
            </p>
            <Button data-testid="button-discover-more">Discover More</Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-courses"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-xl mb-4">Short and sweet courses for you</h2>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
