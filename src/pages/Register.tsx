import React, { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FormErrors {
  [key: string]: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const { registerUser } = useAuth();

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      errors.terms = 'You must agree to the Terms of Service';
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
      await registerUser(
        formData.full_name,
        formData.email,
        formData.password,
        formData.phone_number || undefined
      );

      // Success - redirect to verification pending page
      navigate('/verify-email-pending', {
        state: { email: formData.email },
      });
    } catch (err: any) {
      setGlobalError(
        err.message || 'Registration failed. Please try again.'
      );
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
            Kanainvestments
          </h1>
          <p className="text-slate-400 font-dmsan text-sm md:text-base">
            Create your account and start managing
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-playfair font-bold text-white mb-6">
            Create Account
          </h2>

          {/* Global Error */}
          {globalError && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-dmsan">{globalError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                id="full_name"
                type="text"
                name="full_name"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-navy-800/50 border text-white placeholder-slate-400 rounded-lg font-dmsan focus:ring-2 focus:ring-amber-500/20 transition-all ${
                  formErrors.full_name
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-navy-700 focus:border-amber-500'
                }`}
              />
              {formErrors.full_name && (
                <p className="text-red-400 text-xs font-dmsan mt-1">
                  {formErrors.full_name}
                </p>
              )}
            </div>

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
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-navy-800/50 border text-white placeholder-slate-400 rounded-lg font-dmsan focus:ring-2 focus:ring-amber-500/20 transition-all ${
                  formErrors.email
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-navy-700 focus:border-amber-500'
                }`}
              />
              {formErrors.email && (
                <p className="text-red-400 text-xs font-dmsan mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                Phone Number (Optional)
              </label>
              <input
                id="phone_number"
                type="tel"
                name="phone_number"
                placeholder="+1 (555) 000-0000"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 text-white placeholder-slate-400 rounded-lg font-dmsan focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-dmsan font-semibold mb-2"
              >
                Password
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

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (formErrors.terms) {
                    setFormErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.terms;
                      return newErrors;
                    });
                  }
                }}
                className="w-4 h-4 rounded border-navy-700 bg-navy-800/50 text-amber-500 cursor-pointer mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-sm text-slate-400 font-dmsan cursor-pointer hover:text-white transition-colors"
              >
                I agree to the{' '}
                <span className="text-amber-400 hover:text-amber-300">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-amber-400 hover:text-amber-300">
                  Privacy Policy
                </span>
              </label>
            </div>
            {formErrors.terms && (
              <p className="text-red-400 text-xs font-dmsan -mt-2">
                {formErrors.terms}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-amber py-3 rounded-lg font-dmsan font-semibold text-sm md:text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-900 border-t-amber-500 rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : (
                'Create Account'
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/login"
            className="w-full block text-center py-3 border border-navy-700 text-amber-400 rounded-lg font-dmsan font-semibold hover:bg-navy-700/50 hover:border-amber-500 transition-all"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs md:text-sm font-dmsan mt-6">
          Your data is secure with us
        </p>
      </div>
    </div>
  );
};

export default Register;
