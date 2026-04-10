import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const VerifyEmailPending: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');

  const handleResendEmail = async () => {
    if (!email) return;

    setIsResending(true);
    setResendMessage('');
    setResendError('');

    try {
      await authAPI.resendVerification(email);
      setResendMessage(
        'Verification email sent! Check your inbox.'
      );
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to resend email. Please try again.';
      setResendError(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
        <div className="glass-card p-8 md:p-10 max-w-md w-full text-center">
          <h2 className="text-2xl font-playfair font-bold text-white mb-4">
            Redirecting...
          </h2>
          <button
            onClick={() => navigate('/register')}
            className="btn-amber px-6 py-2 rounded-lg font-dmsan font-semibold"
          >
            Return to Registration
          </button>
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
          <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-500"
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
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-slate-400 font-dmsan text-sm md:text-base">
            We&apos;ve sent a confirmation link to
          </p>
          <p className="text-amber-400 font-dmsan font-semibold mt-1 break-all">
            {email}
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="space-y-6">
            {/* Success Message */}
            {resendMessage && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-200 text-sm font-dmsan">
                  {resendMessage}
                </p>
              </div>
            )}

            {/* Error Message */}
            {resendError && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm font-dmsan">{resendError}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-navy-800/50 p-4 rounded-lg border border-navy-700">
              <h3 className="text-white font-playfair font-bold mb-3">
                What to do next:
              </h3>
              <ol className="space-y-2 text-slate-400 font-dmsan text-sm">
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">1.</span>
                  <span>Check your email inbox for our verification link</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">2.</span>
                  <span>Click the link to verify your email address</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 font-bold">3.</span>
                  <span>
                    You&apos;ll be redirected to log in with your credentials
                  </span>
                </li>
              </ol>
            </div>

            {/* Didn't receive email */}
            <div className="text-center">
              <p className="text-slate-400 font-dmsan text-sm mb-3">
                Didn&apos;t receive the email?
              </p>
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="btn-amber px-6 py-3 rounded-lg font-dmsan font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>

            {/* Check spam note */}
            <p className="text-center text-slate-500 font-dmsan text-xs">
              Check your spam folder if you don&apos;t see the email
            </p>
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

export default VerifyEmailPending;
