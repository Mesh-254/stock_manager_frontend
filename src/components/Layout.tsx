import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900">
      {/* Navigation */}
      <nav className="glass-card fixed top-0 left-0 right-0 z-50 mx-0 rounded-none border-b border-t-0 border-l-0 border-r-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-playfair font-bold text-amber-500 hover:text-amber-300 transition-colors"
            >
              ShopManager
            </Link>

            {/* Right side */}
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <p className="text-white text-sm font-dmsan font-semibold">
                    {user.full_name}
                  </p>
                  <p className="text-slate-400 text-xs font-dmsan">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-amber px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
