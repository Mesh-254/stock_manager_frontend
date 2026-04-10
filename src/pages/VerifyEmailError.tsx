import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authAPI } from '../api/auth';

const VerifyEmailError: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);

  const handleResendEmail = async () => {
    if (!email.trim()) {
      setResendError('Please enter your email address');
      return;
    }

    setIsResending(true);
    setResendMessage('');
    setResendError('');

    try {
      await authAPI.resendVerification(email);
      setResendMessage('Verification email sent! Check your inbox.');
      setShowEmailInput(false);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        'Failed to resend email. Please try again.';
      setResendError(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
            Verification Failed
          </h1>
          <p className="text-slate-400 font-dmsan text-base">
            The verification link is invalid or expired
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="space-y-6">
            {/* Error message */}
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 font-dmsan text-sm">
                The email verification link you used is either invalid or has
                expired. This can happen if the link is too old or was already
                used.
              </p>
            </div>

            {/* Resend form */}
            {showEmailInput ? (
              <div className="space-y-4">
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (resendError) setResendError('');
                    }}
                    className={`w-full px-4 py-3 bg-navy-800/50 border text-white placeholder-slate-400 rounded-lg font-dmsan focus:ring-2 focus:ring-amber-500/20 transition-all ${
                      resendError
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-navy-700 focus:border-amber-500'
                    }`}
                  />
                  {resendError && (
                    <p className="text-red-400 text-xs font-dmsan mt-1">
                      {resendError}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full btn-amber py-3 rounded-lg font-dmsan font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isResending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-navy-900 border-t-amber-500 rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    'Request New Verification Link'
                  )}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-200 text-sm font-dmsan">
                  {resendMessage}
                </p>
              </div>
            )}

            {/* Help message */}
            <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700">
              <h3 className="text-white font-playfair font-bold mb-2">
                What to do:
              </h3>
              <ol className="space-y-1 text-slate-400 font-dmsan text-sm">
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">1.</span>
                  <span>Enter your email address above</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">2.</span>
                  <span>Click &quot;Request New Verification Link&quot;</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">3.</span>
                  <span>Check your email for a fresh verification link</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-slate-400 hover:text-amber-400 font-dmsan text-sm transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailError;
