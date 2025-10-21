import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  comment: string;
  avatar?: string;
}

export default function TestimonialCard({ name, role, comment, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6 flex flex-col gap-4">
        <Quote className="h-8 w-8 text-primary/30" />
        <p className="text-muted-foreground italic">{comment}</p>
        <div className="flex items-center gap-3 mt-auto">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold" data-testid={`text-testimonial-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
