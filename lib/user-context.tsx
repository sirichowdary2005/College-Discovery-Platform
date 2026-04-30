'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  savedColleges: string[];
  savedComparisons: string[][];
  questions: string[];
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  saveCollege: (collegeId: string) => void;
  unsaveCollege: (collegeId: string) => void;
  isSaved: (collegeId: string) => boolean;
  saveComparison: (collegeIds: string[]) => void;
  deleteComparison: (comparison: string[]) => void;
  getSavedComparisons: () => string[][];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.log('[v0] Failed to parse stored user');
      }
    }
    setIsLoading(false);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, call an API
    const mockUsers: Record<string, { name: string; email: string; password: string }> = {
      'student@example.com': {
        name: 'Student User',
        email: 'student@example.com',
        password: 'password123',
      },
      'admin@example.com': {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
      },
    };

    const mockUser = mockUsers[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }

    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      name: mockUser.name,
      email: mockUser.email,
      savedColleges: [],
      savedComparisons: [],
      questions: [],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in production, call an API
    if (email.includes('@') && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).slice(2),
        name,
        email,
        savedColleges: [],
        savedComparisons: [],
        questions: [],
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
    } else {
      throw new Error('Invalid email or password (min 6 characters)');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const saveCollege = (collegeId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev };
      if (!updated.savedColleges.includes(collegeId)) {
        updated.savedColleges.push(collegeId);
      }
      return updated;
    });
  };

  const unsaveCollege = (collegeId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedColleges: prev.savedColleges.filter(id => id !== collegeId),
      };
    });
  };

  const isSaved = (collegeId: string) => {
    return user?.savedColleges.includes(collegeId) ?? false;
  };

  const saveComparison = (collegeIds: string[]) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedComparisons: [...prev.savedComparisons, collegeIds],
      };
    });
  };

  const deleteComparison = (comparison: string[]) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedComparisons: prev.savedComparisons.filter(
          comp => JSON.stringify(comp) !== JSON.stringify(comparison)
        ),
      };
    });
  };

  const getSavedComparisons = () => {
    return user?.savedComparisons ?? [];
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        saveCollege,
        unsaveCollege,
        isSaved,
        saveComparison,
        deleteComparison,
        getSavedComparisons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
