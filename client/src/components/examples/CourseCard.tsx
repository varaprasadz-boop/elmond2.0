import CourseCard from "../CourseCard";

export default function CourseCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CourseCard
        id={1}
        title="Basics of Digital Marketing"
        category="Digital Marketing"
        duration="1 month"
        students={4}
        rating={4.5}
        price={899.10}
        originalPrice={999.00}
        discount={10}
      />
    </div>
  );
}
