import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Signup:", formData);
    // todo: remove mock functionality - connect to backend API
    alert("Signup functionality will be connected to backend");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-2xl">E</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                User Name
              </label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                data-testid="input-signup-username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="input-signup-email"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">
                Country
              </label>
              <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                <SelectTrigger data-testid="select-country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
                data-testid="input-signup-mobile"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                data-testid="input-signup-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                data-testid="input-signup-confirm-password"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreed"
                checked={formData.agreed}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreed: checked as boolean })
                }
                required
                data-testid="checkbox-agree-terms"
              />
              <label htmlFor="agreed" className="text-sm leading-tight">
                I agree with{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline" data-testid="link-privacy">
                  Privacy Policy
                </Link>
                ,{" "}
                <Link href="/terms-of-service" className="text-primary hover:underline" data-testid="link-terms">
                  Terms of Service
                </Link>
                ,{" "}
                <Link href="/become-instructor" className="text-primary hover:underline" data-testid="link-instructor-policy">
                  Become an Instructor
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" data-testid="button-signup">
              Sign Up
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline" data-testid="link-login">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
