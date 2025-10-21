import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface Slide {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  gradient: string;
}

const slides: Slide[] = [
  {
    title: "Meet your new AI conversation coach",
    subtitle: "Role Play is the interactive way to practice your business and communication skills.",
    primaryCta: { text: "Explore More", href: "/course" },
    secondaryCta: { text: "About Us", href: "/contact" },
    gradient: "from-primary/20 via-accent/20 to-primary/10",
  },
  {
    title: "Welcome to Our Platform",
    subtitle: "Learn from the Best, Anytime, Anywhere",
    primaryCta: { text: "Explore Now", href: "/course" },
    secondaryCta: { text: "All Courses", href: "/course" },
    gradient: "from-accent/20 via-primary/20 to-accent/10",
  },
  {
    title: "Online LMS",
    subtitle: "Transform your career with expert-led courses in Digital Marketing, Medical Coding, and more",
    primaryCta: { text: "Get Started", href: "/signup" },
    secondaryCta: { text: "View Categories", href: "/categories" },
    gradient: "from-chart-3/20 via-primary/20 to-chart-2/10",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          data-testid={`slide-${index}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={slide.primaryCta.href} data-testid={`button-hero-primary-${index}`}>
                  <Button size="lg" className="min-w-40">
                    {slide.primaryCta.text}
                  </Button>
                </Link>
                <Link href={slide.secondaryCta.href} data-testid={`button-hero-secondary-${index}`}>
                  <Button size="lg" variant="outline" className="min-w-40">
                    {slide.secondaryCta.text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover-elevate active-elevate-2 border"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover-elevate active-elevate-2 border"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/50"
            }`}
            data-testid={`button-carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
