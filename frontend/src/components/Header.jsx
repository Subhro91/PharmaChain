import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const navLinks = [
    { text: 'Verify Medicine', href: '/verify-medicine', requiresAuth: true },
    { text: 'Register Medicine', href: '/register-medicine', requiresAuth: true },
    { text: 'View Logs', href: '/view-logs', requiresAuth: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const visibleNavLinks = navLinks.filter(link => !link.requiresAuth || (link.requiresAuth && token));

  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ShieldCheckIcon className="h-8 w-8 text-[#27A292]" />
          <span className="text-2xl font-bold text-gray-800">PharmaChain</span>
        </Link>
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
          {visibleNavLinks.map(link => (
            <Link 
              key={link.href} 
              to={link.href} 
              className={`hover:text-[#27A292] transition-colors ${location.pathname === link.href ? 'text-[#27A292]' : ''}`}
            >
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex space-x-4 items-center">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" state={{ isRegister: false }} className="text-gray-600 font-medium hover:text-[#27A292] transition-colors">Login</Link>
              <Link to="/login" state={{ isRegister: true }} className="bg-[#27A292] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#208375] transition-colors">Register</Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md">
          <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
            {visibleNavLinks.map(link => (
              <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:bg-gray-100 p-2 rounded-md">{link.text}</Link>
            ))}
          </nav>
          <div className="px-6 py-4 border-t border-gray-200">
            {token ? (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" state={{ isRegister: false }} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:bg-gray-100 p-2 rounded-md">Login</Link>
                <Link to="/login" state={{ isRegister: true }} onClick={() => setIsMenuOpen(false)} className="bg-[#27A292] text-white text-center px-5 py-2 rounded-lg font-medium hover:bg-[#208375] transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
