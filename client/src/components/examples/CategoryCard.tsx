import CategoryCard from "../CategoryCard";

export default function CategoryCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <CategoryCard
        id={1}
        name="Digital Marketing"
        courseCount={7}
      />
    </div>
  );
}
