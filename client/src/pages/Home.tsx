import HeroCarousel from "@/components/HeroCarousel";
import CourseCard from "@/components/CourseCard";
import CategoryCard from "@/components/CategoryCard";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import TestimonialCard from "@/components/TestimonialCard";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Users, Download, GraduationCap, Search, BookOpen, Award } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { mockCourses } from "@/data/mockData";

//todo: remove mock functionality - mock category data
const mockCategories = [
  { id: 4, name: "Digital Marketing", courseCount: 7 },
  { id: 5, name: "Programming", courseCount: 0 },
  { id: 6, name: "Data and Analytics", courseCount: 0 },
  { id: 7, name: "Design", courseCount: 0 },
  { id: 8, name: "MEDICAL", courseCount: 0 },
  { id: 9, name: "FINANCE", courseCount: 0 },
  { id: 10, name: "SALES MASTERY", courseCount: 0 },
  { id: 11, name: "Medical Coding", courseCount: 1 },
];

//todo: remove mock functionality - mock testimonial data
const mockTestimonials = [
  { name: "Sarah Johnson", role: "Digital Marketing Specialist", comment: "What a Great explanation with very detail information for me as the newbie Cloud Learner. This Course is my second source after AWS APN Learning Portal." },
  { name: "Michael Chen", role: "Software Developer", comment: "Amazing learning experience! The practical examples and hands-on approach made complex concepts easy to understand. Worth every penny!" },
  { name: "Emily Rodriguez", role: "Marketing Manager", comment: "The instructor expertise and teaching style are outstanding. I was able to apply what I learned immediately in my work projects." },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Medical Coding", "Digital Marketing", "Programming", "Design"];
  
  const filteredCourses = selectedCategory === "All" 
    ? mockCourses.slice(0, 8) 
    : mockCourses.filter(c => c.category === selectedCategory).slice(0, 8);

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* Premium Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Premium Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from the Best, Anytime, Anywhere
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8 h-auto gap-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  data-testid={`tab-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                  {category !== "All" && ` (${mockCourses.filter(c => c.category === category).length})`}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              How It Works?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with your learning journey in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HowItWorksStep
              number={1}
              icon={Search}
              title="Search for your course"
              description="Browse through our extensive catalog of expert-led courses"
            />
            <HowItWorksStep
              number={2}
              icon={BookOpen}
              title="Enroll in the course"
              description="Choose your preferred course and complete the enrollment"
            />
            <HowItWorksStep
              number={3}
              icon={GraduationCap}
              title="Learn at your pace"
              description="Access course materials and learn whenever you want"
            />
            <HowItWorksStep
              number={4}
              icon={Award}
              title="Get certified"
              description="Complete the course and earn your certificate"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Globe}
              title="100% Flexible and Online"
              description="Learn at your own pace, anywhere in the world"
            />
            <FeatureCard
              icon={Users}
              title="Trusted By Millions"
              description="Join thousands of successful students worldwide"
            />
            <FeatureCard
              icon={Download}
              title="Offline Access"
              description="Download course materials for offline learning"
            />
            <FeatureCard
              icon={GraduationCap}
              title="Self-Paced Learning"
              description="Progress through courses at your own speed"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Explore Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover courses across various categories and find the perfect fit for your learning goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/categories" data-testid="link-all-categories">
              <Button size="lg" variant="outline">
                All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Upcoming Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get ready for our exciting upcoming courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockCourses.slice(0, 4).map((course) => (
              <div key={course.id} className="relative">
                <CourseCard {...course} />
                <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm whitespace-nowrap shadow-lg">
                    Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/course?launch_type=upcoming" data-testid="link-upcoming-courses">
              <Button size="lg" variant="outline">
                View All Upcoming Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied students about their learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
