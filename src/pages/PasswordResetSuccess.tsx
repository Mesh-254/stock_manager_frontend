import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PasswordResetSuccess: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users away from this success page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg
              className="w-10 h-10 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
            Password Reset Complete!
          </h1>
          <p className="text-slate-400 font-dmsan text-base">
            Your password has been successfully changed
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="space-y-6">
            {/* Success message */}
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-200 font-dmsan text-sm">
                ✓ Your password has been successfully updated!
              </p>
            </div>

            {/* What's next */}
            <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700">
              <h3 className="text-white font-playfair font-bold mb-3">
                You can now:
              </h3>
              <ul className="space-y-2 text-slate-400 font-dmsan text-sm">
                <li className="flex gap-3 items-start">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Sign in with your new password</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Access all your ShopManager features</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Manage your inventory and sales</span>
                </li>
              </ul>
            </div>

            {/* Security reminder */}
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-xs font-dmsan">
                <span className="font-semibold">Security Tip:</span> Never share your password with anyone. ShopManager staff will never ask for your password.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/login"
              className="w-full block text-center btn-amber py-3 rounded-lg font-dmsan font-semibold hover:shadow-lg transition-all"
            >
              Continue to Sign In
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs md:text-sm font-dmsan mt-6">
          Welcome back! We&apos;re excited to see you again.
        </p>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
