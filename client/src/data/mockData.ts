import { slugify } from "@/lib/slugify";

export interface Course {
  id: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
  image?: string;
  description?: string;
  instructor?: string;
  level?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
}

export interface CourseBundle {
  id: number;
  slug: string;
  title: string;
  description: string;
  courses: Course[];
  originalTotalPrice: number;
  bundlePrice: number;
  savings: number;
  category: string;
}

export const mockCourses: Course[] = [
  { 
    id: 4, 
    slug: "basics-of-digital-marketing", 
    title: "Basics of Digital Marketing", 
    category: "Digital Marketing", 
    duration: "1 month", 
    students: 4, 
    rating: 4.5, 
    price: 899.10, 
    originalPrice: 999.00, 
    discount: 10,
    description: "Learn the fundamentals of digital marketing",
    instructor: "John Doe",
    level: "Beginner"
  },
  { 
    id: 5, 
    slug: "search-engine-optimization-mastery", 
    title: "Search Engine Optimization Mastery", 
    category: "Digital Marketing", 
    duration: "1 month", 
    students: 1, 
    rating: 4.0, 
    price: 949.05, 
    originalPrice: 999.00, 
    discount: 5,
    description: "Master SEO techniques and strategies",
    instructor: "Jane Smith",
    level: "Intermediate"
  },
  { 
    id: 6, 
    slug: "meta-ads-mastery", 
    title: "Meta Ads Mastery", 
    category: "Digital Marketing", 
    duration: "1 month", 
    students: 1, 
    rating: 4.2, 
    price: 1899.05, 
    originalPrice: 1999.00, 
    discount: 5,
    description: "Become an expert in Facebook and Instagram advertising",
    instructor: "Mike Johnson",
    level: "Advanced"
  },
  { 
    id: 7, 
    slug: "google-ads-mastery", 
    title: "Google Ads Mastery", 
    category: "Digital Marketing", 
    duration: "1 month", 
    students: 1, 
    rating: 4.3, 
    price: 1899.05, 
    originalPrice: 1999.00, 
    discount: 5,
    description: "Master Google Ads and PPC campaigns",
    instructor: "Sarah Williams",
    level: "Advanced"
  },
  { 
    id: 8, 
    slug: "ad-copy-mastery", 
    title: "Ad Copy Mastery", 
    category: "Digital Marketing", 
    duration: "1 month", 
    students: 0, 
    rating: 4.0, 
    price: 1424.05, 
    originalPrice: 1499.00, 
    discount: 5,
    description: "Write compelling ad copy that converts",
    instructor: "David Brown",
    level: "Intermediate"
  },
  { 
    id: 9, 
    slug: "icd-10-cm-module-training", 
    title: "ICD 10 CM Module Training", 
    category: "Medical Coding", 
    duration: "1 month", 
    students: 1, 
    rating: 4.5, 
    price: 4749.05, 
    originalPrice: 4999.00, 
    discount: 5,
    description: "Comprehensive ICD-10-CM medical coding training",
    instructor: "Dr. Emily Davis",
    level: "Professional"
  },
  { 
    id: 10, 
    slug: "digital-marketing-mastery", 
    title: "Digital Marketing Mastery", 
    category: "Digital Marketing", 
    duration: "6 days", 
    students: 0, 
    rating: 4.0, 
    price: 4749.05, 
    originalPrice: 4999.00, 
    discount: 5,
    description: "Complete digital marketing certification program",
    instructor: "Robert Wilson",
    level: "All Levels"
  },
  { 
    id: 11, 
    slug: "advanced-digital-marketing", 
    title: "Advanced Digital Marketing", 
    category: "Digital Marketing", 
    duration: "6 days", 
    students: 0, 
    rating: 4.5, 
    price: 4749.05, 
    originalPrice: 4999.00, 
    discount: 5,
    description: "Advanced strategies for experienced marketers",
    instructor: "Lisa Anderson",
    level: "Advanced"
  },
];

export const mockBlogs: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-create-path-from-image-in-photoshop",
    title: "How to Create Path from Image in Photoshop",
    excerpt: "Learn the essential techniques for creating precise paths from images using Photoshop's powerful tools.",
    author: "John Smith",
    date: "Mar 15, 2024",
    category: "Design",
  },
  {
    id: 2,
    slug: "digital-marketing-trends-2024",
    title: "Digital Marketing Trends 2024",
    excerpt: "Discover the latest trends shaping the digital marketing landscape this year.",
    author: "Sarah Johnson",
    date: "Mar 10, 2024",
    category: "Marketing",
  },
  {
    id: 3,
    slug: "mastering-seo-in-2024",
    title: "Mastering SEO in 2024",
    excerpt: "A comprehensive guide to modern SEO techniques and best practices.",
    author: "Mike Wilson",
    date: "Mar 5, 2024",
    category: "SEO",
  },
];

export const mockBundles: CourseBundle[] = [
  {
    id: 1,
    slug: "digital-marketing-starter-bundle",
    title: "Digital Marketing Starter Bundle",
    description: "Perfect for beginners! Get started with digital marketing fundamentals and SEO mastery.",
    courses: [
      mockCourses.find(c => c.id === 4)!, // Basics of Digital Marketing (₹899.10)
      mockCourses.find(c => c.id === 5)!, // SEO Mastery (₹949.05)
    ],
    originalTotalPrice: 1848.15, // 899.10 + 949.05
    bundlePrice: 1399.00,
    savings: 449.15,
    category: "Digital Marketing",
  },
  {
    id: 2,
    slug: "paid-advertising-mastery-bundle",
    title: "Paid Advertising Mastery Bundle",
    description: "Master both Meta Ads and Google Ads with this comprehensive advertising bundle.",
    courses: [
      mockCourses.find(c => c.id === 6)!, // Meta Ads Mastery (₹1899.05)
      mockCourses.find(c => c.id === 7)!, // Google Ads Mastery (₹1899.05)
    ],
    originalTotalPrice: 3798.10, // 1899.05 + 1899.05
    bundlePrice: 2999.00,
    savings: 799.10,
    category: "Digital Marketing",
  },
  {
    id: 3,
    slug: "complete-digital-marketing-bundle",
    title: "Complete Digital Marketing Bundle",
    description: "Everything you need to become a digital marketing expert - from basics to advanced strategies.",
    courses: [
      mockCourses.find(c => c.id === 4)!, // Basics of Digital Marketing
      mockCourses.find(c => c.id === 5)!, // SEO Mastery
      mockCourses.find(c => c.id === 8)!, // Ad Copy Mastery
      mockCourses.find(c => c.id === 10)!, // Digital Marketing Mastery
    ],
    originalTotalPrice: 8021.25, // Sum of all 4 courses
    bundlePrice: 5499.00,
    savings: 2522.25,
    category: "Digital Marketing",
  },
  {
    id: 4,
    slug: "advertising-essentials-bundle",
    title: "Advertising Essentials Bundle",
    description: "Learn to create compelling ads and run successful campaigns on Meta and Google.",
    courses: [
      mockCourses.find(c => c.id === 6)!, // Meta Ads Mastery
      mockCourses.find(c => c.id === 8)!, // Ad Copy Mastery
    ],
    originalTotalPrice: 3323.10, // 1899.05 + 1424.05
    bundlePrice: 2499.00,
    savings: 824.10,
    category: "Digital Marketing",
  },
];

// Helper function to get course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find(course => course.slug === slug);
}

// Helper function to get blog by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return mockBlogs.find(blog => blog.slug === slug);
}

// Helper function to get course by ID (for backward compatibility)
export function getCourseById(id: number | string): Course | undefined {
  return mockCourses.find(course => course.id === Number(id));
}

// Helper function to get blog by ID (for backward compatibility)
export function getBlogById(id: number | string): BlogPost | undefined {
  return mockBlogs.find(blog => blog.id === Number(id));
}
