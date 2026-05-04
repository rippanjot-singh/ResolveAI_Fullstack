import React from 'react';
import { Link } from 'react-router-dom';
import constants from '../../assets/constants';
import { useAuth } from '../../features/auth/hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={constants.logo} alt="Resolve Logo" className="w-5 h-5 object-contain" />
          <span className="font-display text-lg font-medium tracking-tight text-[#0A0A0A]">
            ResolveAI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard" className="px-5 py-2 bg-[#0A0A0A] text-white text-sm rounded hover:bg-black/80 transition-all font-medium shadow-sm">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm text-black/60 hover:text-black transition-colors font-medium">
                Log in
              </Link>
              <Link to="/signup" className="px-5 py-2 bg-primary text-white text-sm rounded hover:bg-primary/80 hover:scale-[1.02] transition-all shadow-sm font-medium">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;