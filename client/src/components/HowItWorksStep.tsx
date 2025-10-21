import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function HowItWorksStep({ number, icon: Icon, title, description }: HowItWorksStepProps) {
  return (
    <Card className="h-full" data-testid={`card-step-${number}`}>
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {number}
          </div>
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
