"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { setCookie, deleteCookie } from "cookies-next";

// Define the context type
interface AuthContextType {
  user: string | null | unknown;
  setUser: (user: string | null) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: string | null;
}) => {
  const [user, setUserState] = useState<string | null>(initialUser);

  // Function to update user state and cookies
  const setUser = (newUser: string | null) => {
    if (newUser) {
      setCookie("user", newUser, { maxAge: 60 * 60 * 24 * 7 }); // Store for 7 days
    } else {
      deleteCookie("user");
    }
    setUserState(newUser);
  };

  // Function to clear user state and cookies
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
