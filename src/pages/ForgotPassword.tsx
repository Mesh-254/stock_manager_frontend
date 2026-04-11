import React, { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../api/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { isAuthenticated } = useAuth();

  // Redirect authenticated users away from forgot password page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await authAPI.requestPasswordReset(email);
      // Show success message
      setIsSuccess(true);
    } catch (err: any) {
      // Always show same message to prevent email enumeration
      // But in development, you can see the actual error
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to send reset link. Please try again.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>

        <div className="relative z-10 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg
                className="w-10 h-10 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
              Check Your Email
            </h1>
            <p className="text-slate-400 font-dmsan text-base">
              We sent a password reset link
            </p>
          </div>

          {/* Glass Card */}
          <div className="glass-card p-8 md:p-10">
            <div className="space-y-6">
              {/* Success message */}
              <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg">
                <p className="text-amber-200 font-dmsan text-sm">
                  ✓ If an account exists with email <strong>{email}</strong>, a password reset link has been sent.
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700">
                <h3 className="text-white font-playfair font-bold mb-3">
                  What to do next:
                </h3>
                <ul className="space-y-2 text-slate-400 font-dmsan text-sm">
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 font-bold mt-0.5">1</span>
                    <span>Check your email inbox for a message from ShopManager</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 font-bold mt-0.5">2</span>
                    <span>Click the password reset link in the email</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 font-bold mt-0.5">3</span>
                    <span>Enter your new password and save changes</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 font-bold mt-0.5">4</span>
                    <span>Sign in with your new password</span>
                  </li>
                </ul>
              </div>

              {/* Check spam message */}
              <p className="text-xs text-slate-500 font-dmsan text-center">
                Don't see the email? Check your spam or junk folder.
              </p>

              {/* Back to login button */}
              <Link
                to="/login"
                className="w-full block text-center btn-amber py-3 rounded-lg font-dmsan font-semibold hover:shadow-lg transition-all"
              >
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-xs md:text-sm font-dmsan mt-6">
            Link expires in 1 hour for security
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-slate-400 font-dmsan text-sm md:text-base">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-playfair font-bold text-white mb-6">
            Forgot Your Password?
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-dmsan">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 text-white placeholder-slate-400 rounded-lg font-dmsan focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <p className="text-slate-400 text-xs font-dmsan mt-2">
                Enter the email address associated with your account.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-amber py-3 rounded-lg font-dmsan font-semibold text-sm md:text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-900 border-t-amber-500 rounded-full animate-spin"></div>
                  Sending reset link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-slate-400 font-dmsan">
                Remember your password?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/login"
            className="w-full block text-center py-3 border border-navy-700 text-amber-400 rounded-lg font-dmsan font-semibold hover:bg-navy-700/50 hover:border-amber-500 transition-all"
          >
            Back to Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs md:text-sm font-dmsan mt-6">
          We'll send you a link to reset your password securely
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
