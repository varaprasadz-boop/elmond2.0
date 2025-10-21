import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const handleClick = () => {
    const phoneNumber = "918519847774";
    const message = "Hello! How can we help you?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg"
      data-testid="button-whatsapp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}
