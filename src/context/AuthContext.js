'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { USER_ROLES } from '@/lib/constants';

const AuthContext = createContext(null);

// API helper
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('compass_token');
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }
  return data;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('compass_user');
    const storedToken = localStorage.getItem('compass_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const saveSession = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('compass_user', JSON.stringify(userData));
    localStorage.setItem('compass_token', authToken);
  }, []);

  // Email/Password Login
  const login = async (email, password, role = USER_ROLES.USER) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    const userData = {
      ...response.data.user,
      role: response.data.user.role || role,
      points: response.data.user.role === USER_ROLES.USER ? 2500 : 0,
      isVerified: true,
    };
    
    saveSession(userData, response.data.token);
    return userData;
  };

  // Phone Login (request OTP)
  const loginWithPhone = async (phone) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    return response.data;
  };

  // Google Sign-In
  const loginWithGoogle = async (credential) => {
    const response = await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });
    
    const userData = {
      ...response.data.user,
      isVerified: true,
      provider: 'google',
    };
    
    saveSession(userData, response.data.token);
    return { user: userData, isNewUser: response.data.isNewUser };
  };

  // Email/Password Signup
  const signup = async (data, role = USER_ROLES.USER) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ ...data, type: role }),
    });
    
    return {
      ...response.data.user,
      role,
      points: role === USER_ROLES.USER ? 100 : 0,
      isVerified: false,
    };
  };

  // Phone Signup (send OTP)
  const signupWithPhone = async (phone) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    return response.data;
  };

  // Merchant Signup
  const signupMerchant = async (data) => {
    const response = await apiRequest('/auth/merchant/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  };

  // Verify OTP
  const verifyOTP = async (phone, otp) => {
    const response = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, action: 'verify' }),
    });
    
    if (response.success) {
      const userData = {
        ...response.data.user,
        isVerified: true,
      };
      saveSession(userData, response.data.token);
      return { success: true, user: userData, isNewUser: response.data.isNewUser };
    }
    throw new Error('OTP verification failed');
  };

  // Send OTP
  const sendOTP = async (phone) => {
    const response = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, action: 'send' }),
    });
    return response.data;
  };

  // Resend OTP
  const resendOTP = async (phone) => {
    const response = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, action: 'resend' }),
    });
    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('compass_user');
    localStorage.removeItem('compass_token');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('compass_user', JSON.stringify(updatedUser));
  };

  // API request helper with auth
  const authenticatedRequest = async (endpoint, options = {}) => {
    return apiRequest(endpoint, options);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      loginWithPhone,
      loginWithGoogle,
      signup,
      signupWithPhone,
      signupMerchant,
      verifyOTP,
      sendOTP,
      resendOTP,
      logout,
      updateUser,
      authenticatedRequest,
      isAuthenticated: !!user,
      isUser: user?.role === USER_ROLES.USER,
      isMerchant: user?.role === USER_ROLES.MERCHANT,
      isAdmin: user?.role === USER_ROLES.ADMIN,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
