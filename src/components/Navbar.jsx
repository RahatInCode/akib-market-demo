import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut,
  Package,
  Heart,
  Settings,
  TrendingUp
} from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

const Navbar = ({ cartCount, isLoggedIn, user, onLogout, wishlistCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogoutClick = () => {
    onLogout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gray-800 cursor-pointer"
              >
                <span className="text-emerald-600">Luxe</span> Furniture
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link key={item.name} to={item.path}>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-emerald-600 transition-colors font-medium cursor-pointer"
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:block text-gray-700 hover:text-emerald-600"
                aria-label="Search"
              >
                <Search size={20} />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 hover:text-emerald-600 relative"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 hover:text-emerald-600 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative hidden md:block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    <User size={16} />
                    <span className="text-sm">{user?.name || 'User'}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                      >
                        <Link to="/add-product">
                          <button 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-emerald-50 flex items-center space-x-2"
                          >
                            <Package size={16} />
                            <span>Add Product</span>
                          </button>
                        </Link>
                        <Link to="/wishlist">
                          <button 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-emerald-50 flex items-center space-x-2"
                          >
                            <Heart size={16} />
                            <span>Wishlist</span>
                          </button>
                        </Link>
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-emerald-50 flex items-center space-x-2">
                          <Settings size={16} />
                          <span>Settings</span>
                        </button>
                        <hr className="my-2" />
                        <button 
                          onClick={handleLogoutClick}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    <User size={16} />
                    <span className="text-sm">Login</span>
                  </motion.button>
                </Link>
              )}

              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
              >
                {/* Mobile Search */}
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-emerald-600 mb-2"
                >
                  <Search size={18} />
                  <span>Search Products</span>
                </button>

                {navLinks.map((item) => (
                  <Link key={item.name} to={item.path}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-emerald-600 cursor-pointer"
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link to="/add-product">
                      <span
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-gray-700 hover:text-emerald-600 cursor-pointer"
                      >
                        Add Product
                      </span>
                    </Link>
                    <Link to="/wishlist">
                      <span
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-gray-700 hover:text-emerald-600 cursor-pointer"
                      >
                        Wishlist
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogoutClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-emerald-600 font-semibold cursor-pointer"
                    >
                      Login / Sign Up
                    </span>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {/* Search Header */}
              <div className="p-6 border-b border-gray-200">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for furniture..."
                    autoFocus
                    className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </form>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
                      <Search className="text-emerald-600" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Searching</h3>
                    <p className="text-gray-600">Type to search for products, categories, or brands</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-3 px-2">
                      Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </p>
                    {searchResults.map((product) => (
                      <motion.button
                        key={product.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center space-x-4 p-3 rounded-lg transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-gray-800">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">${product.price}</p>
                          {product.badge && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                      <Search className="text-gray-400" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Results Found</h3>
                    <p className="text-gray-600">Try searching with different keywords</p>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              {searchQuery.trim() === '' && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Sofa', 'Dining Table', 'Office Chair', 'Bed', 'Bookshelf'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;