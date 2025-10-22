import { useRoute, Link } from "wouter";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { getBlogBySlug } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const blogSlug = params?.slug;
  const foundBlog = getBlogBySlug(blogSlug || "");
  
  if (!foundBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Browse All Posts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const blog = {
    id: foundBlog.id,
    slug: foundBlog.slug,
    title: foundBlog.title,
    date: foundBlog.date,
    content: `
      <p>This is a comprehensive guide on how to create paths from images in Photoshop. 
      Paths are one of the most powerful features in Photoshop, allowing you to create 
      precise selections and vector shapes from raster images.</p>
      
      <h3>Getting Started</h3>
      <p>To begin creating paths from an image, you'll need to use the Pen Tool or one 
      of the automated path creation tools available in Photoshop.</p>
      
      <h3>Step-by-Step Guide</h3>
      <ol>
        <li>Open your image in Photoshop</li>
        <li>Select the Pen Tool from the toolbar</li>
        <li>Click around the edges of your subject to create anchor points</li>
        <li>Adjust the curves by dragging the handles</li>
        <li>Close the path by clicking on the first anchor point</li>
      </ol>
      
      <h3>Tips and Best Practices</h3>
      <p>Use as few anchor points as possible for smoother paths. You can always add 
      more points later if needed. Practice makes perfect when it comes to using the 
      Pen Tool effectively.</p>
    `
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Blog", href: "/blog" },
          { label: blog.title }
        ]} />

        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-8 flex items-center justify-center">
          <span className="text-9xl font-display font-bold text-primary/20">B</span>
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl mb-4" data-testid="text-blog-title">
          {blog.title}
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Calendar className="h-4 w-4" />
          <span data-testid="text-blog-date">{blog.date}</span>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
