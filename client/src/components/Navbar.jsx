import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {};
  return (
    <div className='flex items-center justify-between p-4 border-b'>
      <Link to='/'>hm | Event Organizer</Link>

      {/* center links */}
      <div className='flex items-center gap-4'>
        {/* links for everybody */}
        <Link className='navbar-link' to='/'>
          Home
        </Link>
        <Link className='navbar-link' to='/events'>
          Events
        </Link>

        {/* links for users */}

        {/* links for the organizers */}

        {/* links for the admins */}
      </div>

      {/* right auth links */}
      <div className='flex items-center gap-4'>
        {/* logged out state */}
        {!user && (
          <>
            <button className='navbar-link' type='button'>
              Login
            </button>
            <button
              className='px-4 py-1.5 bg-emerald-400 rounded text-white hover:bg-emerald-500 font-semibold'
              type='button'
            >
              Sign Up
            </button>
          </>
        )}

        {/* logged in state */}
        {user && (
          <>
            <Link to='/profile'>
              {user.username} ({user.role})
            </Link>
            <button type='button' onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
