import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login
    setTimeout(() => {
      onLogin({
        name: formData.email.split('@')[0],
        email: formData.email,
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br  from-emerald-50 to-gray-100 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="bg-linear-to-br from-emerald-600 to-emerald-800 rounded-3xl p-12 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to<br />
              <span className="text-emerald-200">Akib Market</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Sign in to access exclusive furniture collections, track your orders, and enjoy personalized shopping.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-500 rounded-full p-2 mt-1">
                  <ArrowRight size={16} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Premium Collections</h3>
                  <p className="text-emerald-100 text-sm">Access to exclusive imported furniture</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-500 rounded-full p-2 mt-1">
                  <ArrowRight size={16} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Order Tracking</h3>
                  <p className="text-emerald-100 text-sm">Real-time updates on your purchases</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-500 rounded-full p-2 mt-1">
                  <ArrowRight size={16} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Wishlist & Favorites</h3>
                  <p className="text-emerald-100 text-sm">Save your favorite items for later</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
                alt="Furniture"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-600">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="font-medium text-gray-700">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                <span className="font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Sign up for free
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;