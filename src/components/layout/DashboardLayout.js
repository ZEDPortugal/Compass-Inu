'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children, role, title, subtitle }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('compass_user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    if (userData.role !== role) {
      router.push(`/${userData.role}/dashboard`);
      return;
    }
    
    setUser(userData);
    setLoading(false);
  }, [role, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a1a]">
      <Sidebar role={role} userName={user?.name} />
      <div className="ml-64">
        <Header title={title} subtitle={subtitle} userName={user?.name} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
