
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type UserRole = "doctor" | "patient" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialization?: string; // For doctors
  medicalId?: string; // For patients
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData, role: UserRole) => Promise<boolean>;
  logout: () => void;
  role: UserRole;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  specialization?: string;
  medicalId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: "d1",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    role: "doctor" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=32",
    specialization: "Cardiologist",
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    email: "michael@example.com",
    password: "password123",
    role: "doctor" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=11",
    specialization: "Neurologist",
  },
  {
    id: "p1",
    name: "James Wilson",
    email: "james@example.com",
    password: "password123",
    role: "patient" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=53",
    medicalId: "PAT-10032",
  },
  {
    id: "p2",
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    role: "patient" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=23",
    medicalId: "PAT-10045",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("healthcareUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      // For demo purposes, we'll use mock data
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("healthcareUser", JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData, role: UserRole): Promise<boolean> => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      // For demo, we'll just pretend to register
      const id = Math.random().toString(36).substr(2, 9);
      const newUser = {
        id,
        name: userData.name,
        email: userData.email,
        role,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        specialization: userData.specialization,
        medicalId: userData.medicalId || `PAT-${Math.floor(Math.random() * 100000)}`,
      };
      
      setUser(newUser);
      localStorage.setItem("healthcareUser", JSON.stringify(newUser));
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("healthcareUser");
    setUser(null);
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
