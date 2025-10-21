import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface GuestRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: GuestRegistrationData) => Promise<void>;
  logout: (callback?: () => void) => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: 1,
      email: email,
      name: email.split("@")[0],
      avatar: undefined,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const register = async (data: GuestRegistrationData) => {
    // Mock registration - in production, this would call an API to create a new user
    const newUser: User = {
      id: Date.now(), // Generate a unique ID
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      avatar: undefined,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = (callback?: () => void) => {
    setUser(null);
    localStorage.removeItem("user");
    if (callback) {
      setTimeout(callback, 0);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user, 
        isInitialized 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
