import CategoryCard from "@/components/CategoryCard";
import Breadcrumb from "@/components/Breadcrumb";

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

export default function Categories() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Categories" }]} />
        
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Categories</h1>
          <p className="text-muted-foreground">Explore all available course categories</p>
        </div>

        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-center">
            Explore Categories
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Discover courses across various categories and find the perfect fit for your learning goals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}
