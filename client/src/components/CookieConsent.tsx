import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg p-4"
      data-testid="banner-cookie-consent"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.{" "}
          <Link href="/cookie-policy" className="text-primary hover:underline" data-testid="link-cookie-policy">
            learn more
          </Link>
        </p>
        <Button onClick={handleAccept} className="whitespace-nowrap" data-testid="button-cookie-accept">
          Accept
        </Button>
      </div>
    </div>
  );
}
