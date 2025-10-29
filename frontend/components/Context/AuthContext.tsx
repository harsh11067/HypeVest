import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  type: 'creator' | 'buyer';
  name: string;
  email: string;
  walletAddress: string;
  youtubeChannelId?: string;
  youtubeApiKey?: string;
  analytics?: {
    channelId: string;
    channelName: string;
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (userType: 'creator' | 'buyer', data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount (client-side only)
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('hypevest_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = (userType: 'creator' | 'buyer', data: any) => {
    const newUser: User = {
      type: userType,
      name: data.name,
      email: data.email,
      walletAddress: data.walletAddress,
      youtubeChannelId: data.youtubeChannelId,
      youtubeApiKey: data.youtubeApiKey,
      analytics: data.analytics,
    };
    
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hypevest_user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hypevest_user');
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


