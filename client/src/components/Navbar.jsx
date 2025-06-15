// system imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

// images, icons, svgs, media imports
import {
  User,
  LogOut,
  Calendar,
  Home,
  Menu,
  X,
  CalendarHeart,
  CalendarCog,
} from 'lucide-react';

// component imports
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const Navbar = () => {
  // uses
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, logout } = useAuth();

  // states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // closes the hamburger menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // logs the user out
  const handleLogout = () => {
    addToast('Logged out', 'info', 3000, 'top-left');
    logout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <>
      {/* login modal */}
      <LoginModal isOpen={isLoginOpen} close={() => setIsLoginOpen(false)} />

      {/* sign up modal */}
      <SignUpModal isOpen={isSignUpOpen} close={() => setIsSignUpOpen(false)} />

      <nav className='bg-white border-b border-gray-200 sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <Link
              to='/'
              className='flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-teal-700 transition-all duration-200'
            >
              <div className='w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center'>
                <Calendar className='w-5 h-5 text-white' />
              </div>
              <span>Event Organizer</span>
            </Link>

            {/* center links */}
            <div className='hidden md:flex items-center space-x-2'>
              {/* links for anyone */}
              <Link
                className='flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gradient-to-r'
                to='/'
              >
                <Home size={18} />
                <span>Home</span>
                <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-[95%] transition-all duration-300 rounded-full'></div>
              </Link>

              <Link
                className='flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gradient-to-r'
                to='/events'
              >
                <Calendar size={18} />
                <span>Events</span>
                <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-[95%] transition-all duration-300 rounded-full'></div>
              </Link>

              {/* links for users */}
              {user && user.role === 'user' && (
                <>
                  <Link
                    className='flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gradient-to-r '
                    to='/my-events'
                  >
                    <CalendarHeart size={18} />
                    <span>My Events</span>
                    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-[95%] transition-all duration-300 rounded-full'></div>
                  </Link>
                </>
              )}

              {/* links for organizers */}
              {user && user.role === 'organizer' && (
                <>
                  <Link
                    className='flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gradient-to-r '
                    to='/event-manager'
                  >
                    <CalendarCog size={18} />
                    <span>Event manager</span>
                    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-[95%] transition-all duration-300 rounded-full'></div>
                  </Link>
                </>
              )}

              {/* links for admins */}
            </div>

            {/* right side auth links */}
            <div className='hidden md:flex items-center space-x-2'>
              {/* logged out state */}
              {!user && (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className='text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-emerald-50'
                    type='button'
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className='px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200'
                    type='button'
                  >
                    Sign Up
                  </button>
                </>
              )}

              {/* logged in state */}
              {user && (
                <>
                  <Link
                    to='/profile'
                    className='flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-50'
                  >
                    <User size={18} />
                    <span>
                      {user.username} ({user.role})
                    </span>
                  </Link>
                  <button
                    type='button'
                    onClick={handleLogout}
                    className='flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50'
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* mobile */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-gray-700 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200'
              >
                {isMobileMenuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className='md:hidden border-t border-gray-200 bg-white'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {/* Navigation links */}
                <Link
                  to='/'
                  onClick={closeMobileMenu}
                  className='flex items-center space-x-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200'
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>

                <Link
                  to='/events'
                  onClick={closeMobileMenu}
                  className='flex items-center space-x-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200'
                >
                  <Calendar size={18} />
                  <span>Events</span>
                </Link>

                {/* Auth section */}
                <div className='pt-4 border-t border-gray-200 mt-4'>
                  {!user && (
                    <div className='space-y-2'>
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          closeMobileMenu();
                        }}
                        className='w-full text-left text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 block px-3 py-2 rounded-lg font-medium transition-colors duration-200'
                        type='button'
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setIsSignUpOpen(true);
                          closeMobileMenu();
                        }}
                        className='w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200'
                        type='button'
                      >
                        Sign Up
                      </button>
                    </div>
                  )}

                  {user && (
                    <div className='space-y-2'>
                      <Link
                        to='/profile'
                        onClick={closeMobileMenu}
                        className='flex items-center space-x-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200'
                      >
                        <User size={18} />
                        <span>
                          {user.username} ({user.role})
                        </span>
                      </Link>
                      <button
                        type='button'
                        onClick={handleLogout}
                        className='flex items-center space-x-2 w-full text-left text-gray-700 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200'
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
