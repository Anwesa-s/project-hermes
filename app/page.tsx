'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to appropriate dashboard based on role
  useEffect(() => {
    if (session?.user?.role) {
      const roleRoutes = {
        admin: '/dashboard/admin',
        investor: '/dashboard/investor',
        startup: '/dashboard/startup',
        user: '/dashboard/user',
      };

      const dashboardRoute = roleRoutes[session.user.role];
      if (dashboardRoute) {
        router.push(dashboardRoute);
      }
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="bg-black h-screen w-screen flex justify-center items-center text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // If user is logged in, show loading while redirecting
  if (session) {
    return (
      <div className="bg-black h-screen w-screen flex justify-center items-center text-white">
        <p className="text-xl">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-8">Project Hermes</h1>
      <p className="text-xl mb-12 text-gray-400">Role-Based Authentication System</p>

      <div className="flex gap-4">
        <Link
          href="/auth/signup"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signin"
          className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};
export default Home;
