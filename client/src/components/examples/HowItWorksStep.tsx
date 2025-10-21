import HowItWorksStep from "../HowItWorksStep";
import { Search } from "lucide-react";

export default function HowItWorksStepExample() {
  return (
    <div className="p-8 max-w-sm">
      <HowItWorksStep
        number={1}
        icon={Search}
        title="Search for your course"
        description="Browse through our extensive catalog of expert-led courses"
      />
    </div>
  );
}
