'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StartupDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'startup') {
      router.push('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!session || session.user.role !== 'startup') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
      <nav className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Startup Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{session.user.name || session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Startup Founder</h2>
          <p className="text-gray-300">Manage your startup and connect with investors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-orange-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Company Profile</h3>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Edit your company information and pitch deck</p>
          </div>

          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-red-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Funding</h3>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">View funding status and investor interest</p>
          </div>

          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-pink-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Connections</h3>
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Connect with investors and mentors</p>
          </div>
        </div>

        <div className="mt-8 bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-orange-500 border-opacity-30">
          <h3 className="text-xl font-semibold text-white mb-4">Investor Inquiries</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-white border-opacity-10">
              <p className="text-gray-300">Investor messages will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
