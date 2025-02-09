import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('fleetUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('fleetUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('fleetUser');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('https://fleetmanagement-12-default-rtdb.firebaseio.com/Auth.json');
      const users = await response.json();
      
      const foundUser = Object.values(users).find((u: any) => 
        u.username === username && u.password === password
      );

      if (foundUser) {
        const user: User = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role || 'user',
          name: foundUser.name || foundUser.username,
        };
        setUser(user);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      // Check if username already exists
      const response = await fetch('https://fleetmanagement-12-default-rtdb.firebaseio.com/Auth.json');
      const users = await response.json();
      
      if (users && Object.values(users).some((u: any) => u.username === username)) {
        throw new Error('Username already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        role: 'user',
        name: username,
      };

      const createResponse = await fetch('https://fleetmanagement-12-default-rtdb.firebaseio.com/Auth.json', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create user');
      }

      // Auto login after signup
      await login(username, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}