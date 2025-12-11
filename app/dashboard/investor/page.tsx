'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InvestorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'investor') {
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

  if (!session || session.user.role !== 'investor') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      <nav className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Investor Portal</h1>
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
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Investor</h2>
          <p className="text-gray-300">Discover and invest in promising startups</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-green-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Portfolio</h3>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">View and manage your investment portfolio</p>
          </div>

          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-emerald-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Explore Startups</h3>
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Browse and discover new investment opportunities
            </p>
          </div>

          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-teal-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Analytics</h3>
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
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
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Track performance and ROI of your investments</p>
          </div>
        </div>

        <div className="mt-8 bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-green-500 border-opacity-30">
          <h3 className="text-xl font-semibold text-white mb-4">Investment Opportunities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-white border-opacity-10">
              <p className="text-gray-300">Available startups will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
