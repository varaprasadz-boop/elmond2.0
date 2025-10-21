import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Users, Star, BookOpen, FileText, Award, Calendar, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function CourseDetail() {
  const [, params] = useRoute("/course/:id");
  const courseId = params?.id;
  const { addToCart, items } = useCart();
  const { toast } = useToast();

  //todo: remove mock functionality - mock course detail data
  const course = {
    id: parseInt(courseId || "4"),
    title: "Basics of Digital Marketing",
    category: "Digital Marketing",
    rating: 4.5,
    students: 4,
    duration: "1 month",
    lessons: 4,
    price: 899.10,
    originalPrice: 999.00,
    discount: 10,
    description: "This beginner-friendly course introduces you to the core concepts of digital marketing. You'll explore how businesses use SEO, social media, and other channels to connect with their audience. Perfect for students and professionals looking to start a career in marketing.",
    highlights: [
      "SEO basics and keyword research",
      "Social media marketing strategies",
      "Email and content marketing fundamentals"
    ],
    includes: [
      "Learn the fundamentals of digital marketing including SEO, social media, and paid ads.",
      "Understand how businesses attract and retain customers online.",
      "Build a strong foundation to kickstart your marketing career."
    ],
    stats: {
      duration: "1 Hours 30 mins",
      modules: "4 Modules",
      tests: "1 Practice Tests",
      assignments: "2 Assignments",
      learners: "4 Learners",
      access: "6 Months Access"
    },
    modules: [
      {
        title: "Module 1: Introduction to SEO",
        lessons: [
          { title: "Lesson 1: What is SEO?", description: "Introduction to search engines and why SEO matters.", isFree: true },
          { title: "Lesson 2: Keyword Research Basics", description: "How to find and target the right keywords.", isFree: false }
        ]
      },
      {
        title: "Module 2: Social Media Marketing Basics",
        lessons: [
          { title: "Lesson 1: Social Media Platforms Overview", description: "Learn about Facebook, Instagram, LinkedIn marketing.", isFree: true },
          { title: "Lesson 2: Content Planning", description: "Strategies for creating engaging social media posts.", isFree: false }
        ]
      }
    ]
  };

  const isInCart = items.some(item => item.id === course.id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Already in cart",
        description: "This course is already in your cart",
      });
      return;
    }
    
    addToCart({
      id: course.id,
      title: course.title,
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      discount: course.discount,
    });
    toast({
      title: "Added to cart",
      description: `${course.title} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary" data-testid="link-breadcrumb-home">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/course" className="hover:text-primary" data-testid="link-breadcrumb-courses">Courses</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{course.title}</span>
          </nav>

          <Badge className="mb-4">{course.category}</Badge>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4" data-testid="text-course-title">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-current text-chart-4" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-muted-foreground">({course.students} ratings)</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5" />
              <span data-testid="text-course-students">{course.students} Students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-5 w-5" />
              <span>{course.lessons} Lessons</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-9xl font-display font-bold text-primary/20">{course.category.charAt(0)}</span>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-2xl mb-4">This Course Includes</h2>
                <ul className="space-y-2">
                  {course.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" data-testid="tab-curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor" data-testid="tab-instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-4">What you'll learn</h3>
                    <h4 className="font-semibold mb-4">Course Highlights</h4>
                    <ul className="space-y-2">
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="font-display font-bold text-xl mb-4 mt-8">About the Course</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.modules}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.tests}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.assignments}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.learners}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{course.stats.access}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-xl mb-4">Description</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-4">Curriculum</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {course.modules.map((module, index) => (
                        <AccordionItem key={index} value={`module-${index}`}>
                          <AccordionTrigger data-testid={`button-module-${index}`}>
                            {module.title}
                            <Badge variant="secondary" className="ml-2">{module.lessons.length} Lessons</Badge>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="flex items-start justify-between p-3 rounded-md hover-elevate">
                                  <div className="flex-1">
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-sm text-muted-foreground">{lesson.description}</p>
                                  </div>
                                  {lesson.isFree ? (
                                    <Badge variant="outline" className="ml-2">Free</Badge>
                                  ) : (
                                    <Lock className="h-4 w-4 text-muted-foreground ml-2 mt-1" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-6">Instructor</h3>
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-display font-bold">
                          EI
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">Expert Instructor</h4>
                        <p className="text-muted-foreground">Industry Expert</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Our experienced instructor brings years of industry expertise to guide you through this comprehensive course. With a proven track record of success, they are committed to helping you achieve your learning goals.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Industry Expert with 10+ years experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Certified Professional in the field</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Passionate about teaching and mentoring</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-display font-bold text-xl mb-4">Student Reviews</h3>
                    <p className="text-muted-foreground">Reviews will appear here once students complete the course.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-xl mb-4">Earn a Certificate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Demonstrate Your Commitment</h4>
                    <p className="text-muted-foreground mb-4">
                      Be a growth-driven professional and advance your career by learning new skills
                    </p>
                    <h4 className="font-semibold mb-2">Share your Accomplishment</h4>
                    <p className="text-muted-foreground">
                      Showcase your verified certificate on your social media platforms and CV
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 flex items-center justify-center">
                    <Award className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary" data-testid="text-course-price">
                    ₹{course.price.toFixed(2)}
                  </span>
                  {course.discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{course.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <Link href={`/enroll/${courseId}`} data-testid="button-buy-now">
                    <Button className="w-full" size="lg">
                      Buy Now
                    </Button>
                  </Link>
                  <Button 
                    className="w-full" 
                    size="lg" 
                    variant="outline"
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    data-testid="button-add-cart-sidebar"
                  >
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
