"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AccessTokenUser } from "@/lib/api/types";
import { parseToken } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: AccessTokenUser | null;
  setUser: (user: AccessTokenUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccessTokenUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const parsedUser = parseToken(token);
      if (parsedUser) {
        setUser(parsedUser);
      } else {
        // Invalid token, redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
      }
    }
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}