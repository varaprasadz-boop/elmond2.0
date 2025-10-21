import FeatureCard from "../FeatureCard";
import { Globe } from "lucide-react";

export default function FeatureCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <FeatureCard
        icon={Globe}
        title="100% Flexible and Online"
        description="Learn at your own pace, anywhere in the world"
      />
    </div>
  );
}
