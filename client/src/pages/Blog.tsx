import BlogCard from "@/components/BlogCard";

//todo: remove mock functionality - mock blog data
const mockBlogs = [
  { id: 99, title: "Photoshop Create Path From Image", date: "Tue, Feb 27, 2024" },
  { id: 98, title: "Photoshop Create Path From Image", date: "Tue, Feb 27, 2024" },
  { id: 97, title: "Photoshop Create Path From Image", date: "Tue, Feb 27, 2024" },
  { id: 96, title: "Photoshop Create Path From Image", date: "Tue, Feb 27, 2024" },
  { id: 95, title: "Photoshop Create Path From Image", date: "Tue, Feb 27, 2024" },
  { id: 94, title: "Lorem ipsum dolor sit amet consectetur adipisicing", date: "Tue, Feb 27, 2024" },
];

export default function Blog() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">All Blogs</h1>
          <p className="text-muted-foreground">Read our latest articles and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
