import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification link');
        setIsLoading(false);
        return;
      }

      try {
        await authAPI.verifyEmail(token);
        setIsSuccess(true);
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.error ||
          'Verification failed. Please try again.';
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white font-playfair text-2xl">
            Verifying your email...
          </p>
          <p className="text-slate-400 font-dmsan mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return <Navigate to="/verify-email-success" replace />;
  }

  if (error) {
    return <Navigate to="/verify-email-error" replace />;
  }

  return null;
};

export default VerifyEmail;
