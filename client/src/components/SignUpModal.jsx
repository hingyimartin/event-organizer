// system imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { AnimatePresence, motion } from 'framer-motion';

// images, icons, svgs, media imports
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

// component imports

const SignUpModal = ({ isOpen, close }) => {
  // uses
  const navigate = useNavigate();
  const { addToast } = useToast();

  // states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);

  // resets the form data to default
  const resetFormData = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'user',
    });
  };

  // handles the corresponding input fields change
  const formDataChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // sends the form to the server
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if ((!formData.username || !formData.email) && !formData.password) {
      resetFormData();
      return addToast('All fields are required!', 'error', 3000, 'top-left');
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/sign-up`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return addToast(`${data.message}`, 'error', 3000, 'top-left');
    }
    addToast(`${data.message}`, 'success', 3000, 'top-left');
    resetFormData();
    close();
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            resetFormData();
            close();
          }}
        >
          <motion.div
            className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 text-white'>
              <button
                onClick={() => {
                  resetFormData();
                  close();
                }}
                className='absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors'
              >
                <X size={20} />
              </button>
              <div className='text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <User size={24} />
                </div>
                <h2 className='text-2xl font-bold'>Create Account</h2>
                <p className='text-emerald-100 mt-1'>Join us today</p>
              </div>
            </div>

            <div className='p-6'>
              <form onSubmit={submitFormHandler} className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <div className='relative'>
                    <User
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                      size={18}
                    />
                    <input
                      type='text'
                      placeholder='Choose a username'
                      name='username'
                      onChange={formDataChangeHandler}
                      value={formData.username}
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <div className='relative'>
                    <Mail
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                      size={18}
                    />
                    <input
                      type='email'
                      placeholder='Enter your email'
                      name='email'
                      onChange={formDataChangeHandler}
                      value={formData.email}
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <div className='relative'>
                    <Lock
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                      size={18}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Create a password'
                      name='password'
                      onChange={formDataChangeHandler}
                      value={formData.password}
                      className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-center gap-4 py-2'>
                    <span className='text-sm font-medium text-gray-600'>
                      User
                    </span>
                    <button
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          role:
                            prev.role === 'organizer' ? 'user' : 'organizer',
                        }))
                      }
                      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        formData.role === 'organizer'
                          ? 'bg-emerald-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                          formData.role === 'organizer'
                            ? 'translate-x-6'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className='text-sm font-medium text-gray-600'>
                      Organizer
                    </span>
                  </div>
                </div>

                <div className='text-sm text-gray-600'>
                  <p>
                    By creating an account, you agree to our{' '}
                    <button className='text-emerald-600 hover:text-emerald-700 font-medium transition-colors'>
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button className='text-emerald-600 hover:text-emerald-700 font-medium transition-colors'>
                      Privacy Policy
                    </button>
                  </p>
                </div>

                <motion.button
                  type='submit'
                  className='w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                </motion.button>

                <div className='relative my-6'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-white text-gray-500'>or</span>
                  </div>
                </div>

                <motion.button
                  type='button'
                  onClick={close}
                  className='w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </form>

              <div className='text-center mt-6 pt-4 border-t border-gray-200'>
                <p className='text-gray-600'>
                  Already have an account?{' '}
                  <button className='text-emerald-600 hover:text-emerald-700 font-semibold transition-colors'>
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
