import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, Check } from 'lucide-react';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    // Mock signup
    setTimeout(() => {
      onSignup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const features = [
    'Access to exclusive furniture collections',
    'Priority customer support',
    'Order tracking and history',
    'Personalized recommendations',
    'Early access to sales',
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-gray-100 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 order-2 lg:order-1"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join Akib Market and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="+880 1700-000000"
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
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 text-emerald-600 rounded mt-1" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-liinear-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>

            {/* Sign In Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Right Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="order-1 lg:order-2"
        >
          <div className="bg-linear-to-br from-emerald-600 to-emerald-800 rounded-3xl p-12 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Join Our<br />
              <span className="text-emerald-200">Community</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Become a member and unlock exclusive benefits
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="bg-emerald-500 rounded-full p-1 mt-1">
                    <Check size={16} />
                  </div>
                  <p className="text-emerald-50">{feature}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop"
                alt="Furniture 1"
                className="rounded-xl shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
                alt="Furniture 2"
                className="rounded-xl shadow-xl mt-6"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;