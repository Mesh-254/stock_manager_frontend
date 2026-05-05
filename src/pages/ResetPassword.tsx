import React, { FormEvent, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../api/auth';

interface FormErrors {
  [key: string]: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { isAuthenticated } = useAuth();

  // Redirect authenticated users away from password reset page
  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await authAPI.confirmPasswordReset(token, formData.password);
      // Success - redirect to success page
      navigate('/password-reset-success');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to reset password. The link may have expired.';
      setGlobalError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength === 0) return 'bg-slate-400';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
            Set New Password
          </h1>
          <p className="text-slate-400 font-dmsan text-sm md:text-base">
            Create a strong password to secure your account
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-playfair font-bold text-white mb-6">
            Reset Your Password
          </h2>

          {/* Global Error */}
          {globalError && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-dmsan">{globalError}</p>
              <p className="text-red-300 text-xs font-dmsan mt-2">
                If the link has expired,{' '}
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  request a new one
                </button>
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-navy-800/50 border text-white placeholder-slate-400 rounded-lg font-dmsan focus:ring-2 focus:ring-amber-500/20 transition-all ${
                  formErrors.password
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-navy-700 focus:border-amber-500'
                }`}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor(
                          passwordStrength
                        )} transition-all`}
                        style={{
                          width: `${(passwordStrength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400 font-dmsan">
                      {getPasswordStrengthText(passwordStrength)}
                    </span>
                  </div>
                </div>
              )}
              {formErrors.password && (
                <p className="text-red-400 text-xs font-dmsan mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-navy-800/50 border text-white placeholder-slate-400 rounded-lg font-dmsan focus:ring-2 focus:ring-amber-500/20 transition-all ${
                  formErrors.confirmPassword
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-navy-700 focus:border-amber-500'
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-400 text-xs font-dmsan mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password requirements */}
            <div className="mt-4 p-3 bg-navy-800/50 border border-navy-700 rounded-lg">
              <p className="text-slate-400 text-xs font-dmsan font-semibold mb-2">
                Password requirements:
              </p>
              <ul className="space-y-1 text-slate-500 text-xs font-dmsan">
                <li className="flex gap-2 items-start">
                  <span>•</span>
                  <span>At least 8 characters long</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span>•</span>
                  <span>Mix of uppercase and lowercase letters</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span>•</span>
                  <span>Include numbers and special characters</span>
                </li>
              </ul>
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
                  Resetting password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Help text */}
          <p className="text-center text-slate-400 text-xs font-dmsan mt-6">
            This password reset link is valid for 1 hour
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs md:text-sm font-dmsan mt-6">
          Back to{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
