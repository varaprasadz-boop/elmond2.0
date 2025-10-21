import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [userType, setUserType] = useState<"user" | "instructor">("user");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    remember: false
  });
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.username === "varaprasadz@gmail.com" && credentials.password === "asdfghjkl") {
      await login(credentials.username, credentials.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Use varaprasadz@gmail.com / asdfghjkl",
        variant: "destructive",
      });
    }
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
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(v) => setUserType(v as "user" | "instructor")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user" data-testid="tab-user-login">User Login</TabsTrigger>
              <TabsTrigger value="instructor" data-testid="tab-instructor-login">Instructor Login</TabsTrigger>
            </TabsList>

            <TabsContent value={userType}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-2">
                    User name
                  </label>
                  <Input
                    id="username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                    data-testid="input-username"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    data-testid="input-password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={credentials.remember}
                      onCheckedChange={(checked) => 
                        setCredentials({ ...credentials, remember: checked as boolean })
                      }
                      data-testid="checkbox-remember"
                    />
                    <label htmlFor="remember" className="text-sm">
                      Remember Me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline" data-testid="link-forgot-password">
                    Forgot Your Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" data-testid="button-login">
                  Login
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline" data-testid="link-register">
                    Register
                  </Link>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
