import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="glass-card p-8 md:p-12 mb-8">
          <h1 className="text-5xl font-playfair font-bold text-white mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-slate-400 font-dmsan text-lg">
            Here's your ShopManager dashboard
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="glass-card p-6">
            <h3 className="text-slate-400 font-dmsan text-sm font-semibold mb-2">
              Email
            </h3>
            <p className="text-white font-dmsan font-medium break-all">
              {user?.email}
            </p>
          </div>

          {/* Role Card */}
          <div className="glass-card p-6">
            <h3 className="text-slate-400 font-dmsan text-sm font-semibold mb-2">
              Role
            </h3>
            <p className="text-amber-400 font-dmsan font-medium">
              {user?.role}
            </p>
          </div>

          {/* Shop ID Card */}
          <div className="glass-card p-6">
            <h3 className="text-slate-400 font-dmsan text-sm font-semibold mb-2">
              Shop ID
            </h3>
            <p className="text-white font-dmsan font-medium font-mono text-sm break-all">
              {user?.shop_id || 'N/A'}
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-playfair font-bold text-white mb-6">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inventory Management */}
            <div className="glass-card p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-playfair text-lg font-bold mb-1">
                    Inventory Management
                  </h3>
                  <p className="text-slate-400 font-dmsan text-sm">
                    Track and manage your products and stock levels
                  </p>
                </div>
              </div>
            </div>

            {/* Sales Tracking */}
            <div className="glass-card p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-playfair text-lg font-bold mb-1">
                    Sales Tracking
                  </h3>
                  <p className="text-slate-400 font-dmsan text-sm">
                    Monitor sales, revenue, and key business metrics
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Management */}
            <div className="glass-card p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-playfair text-lg font-bold mb-1">
                    Customer Management
                  </h3>
                  <p className="text-slate-400 font-dmsan text-sm">
                    Manage customer profiles and purchase history
                  </p>
                </div>
              </div>
            </div>

            {/* Reports & Analytics */}
            <div className="glass-card p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-playfair text-lg font-bold mb-1">
                    Reports & Analytics
                  </h3>
                  <p className="text-slate-400 font-dmsan text-sm">
                    Get insights with detailed business reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-playfair font-bold text-white mb-6">
            Quick Stats
          </h2>
          <div className="glass-card p-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-playfair font-bold text-amber-400">
                  0
                </p>
                <p className="text-slate-400 font-dmsan text-sm mt-2">
                  Products
                </p>
              </div>
              <div>
                <p className="text-4xl font-playfair font-bold text-amber-400">
                  0
                </p>
                <p className="text-slate-400 font-dmsan text-sm mt-2">
                  Orders
                </p>
              </div>
              <div>
                <p className="text-4xl font-playfair font-bold text-amber-400">
                  0
                </p>
                <p className="text-slate-400 font-dmsan text-sm mt-2">
                  Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
