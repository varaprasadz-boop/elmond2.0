import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">E</span>
              </div>
              <span className="font-display font-bold text-xl">Elmond</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Learn from the best, anytime, anywhere. Your journey to success starts here.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" data-testid="button-social-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-linkedin">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-categories">Categories</Link></li>
              <li><Link href="/course" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-courses">Courses</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-blog">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-terms">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-cookie">Cookie Policy</Link></li>
              <li><Link href="/become-instructor" className="text-muted-foreground hover:text-primary text-sm" data-testid="link-footer-instructor">Become an Instructor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get updates on new courses and offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Elmond. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
