import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  Eye,
  Filter,
  X,
  Grid,
  List,
  Star,
  ArrowUpDown,
  Clock,
  Check,
  Package,
} from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Products Hero Section
const ProductsHero = () => {
  return (
    <div className="relative text-white py-32 mt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=600&fit=crop)',
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Premium Collection
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover luxury furniture imported from the world's finest manufacturers. 
            From ready stock to exclusive pre-orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Package className="text-emerald-300" size={18} />
              <span>Free Shipping on Orders $500+</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Check className="text-emerald-300" size={18} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="text-emerald-300" size={18} />
              <span>Pre-Order Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Filter Sidebar
const FilterSidebar = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const categories = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office'];
  const statuses = [
    { value: 'all', label: 'All Products', icon: Package },
    { value: 'available', label: 'Available Now', icon: Check },
    { value: 'preorder', label: 'Pre-Order', icon: Clock },
  ];
  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2000', min: 1000, max: 2000 },
    { label: '$2000 - $5000', min: 2000, max: 5000 },
    { label: 'Over $5000', min: 5000, max: Infinity },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white shadow-xl lg:shadow-none z-50 lg:z-0 overflow-y-auto"
      >
        <div className="p-6">
          {/* Close Button (Mobile) */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Availability Status */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Availability</h4>
            <div className="space-y-2">
              {statuses.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={filters.status === status.value}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <status.icon className="text-gray-400 group-hover:text-emerald-600" size={16} />
                  <span className="text-sm text-gray-700 group-hover:text-emerald-600">
                    {status.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-emerald-600">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={
                      filters.priceMin === range.min && filters.priceMax === range.max
                    }
                    onChange={() =>
                      setFilters({
                        ...filters,
                        priceMin: range.min,
                        priceMax: range.max,
                      })
                    }
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-emerald-600">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={() => setFilters({ ...filters, minRating: rating })}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() =>
              setFilters({
                search: '',
                category: 'All',
                status: 'all',
                priceMin: 0,
                priceMax: Infinity,
                minRating: 0,
                sortBy: 'featured',
              })
            }
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </motion.div>
    </>
  );
};

// Product Card
const ProductCard = ({ product, onQuickView, onAddToWishlist, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                product.badge === 'SALE'
                  ? 'bg-red-500 text-white'
                  : product.badge === 'NEW'
                  ? 'bg-emerald-500 text-white'
                  : product.badge === 'PRE-ORDER'
                  ? 'bg-amber-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-800 text-white">
              Coming Soon
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute top-4 right-4 flex flex-col gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToWishlist(product)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
          >
            <Heart size={18} className="text-gray-700 hover:text-red-500" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
          >
            <Eye size={18} className="text-gray-700" />
          </motion.button>
        </motion.div>

        {/* Expected Date for Pre-orders */}
        {product.status === 'preorder' && product.expectedDate && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center space-x-2 text-xs">
              <Clock size={14} className="text-amber-600" />
              <span className="text-gray-700 font-medium">
                Expected: {new Date(product.expectedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-emerald-600 font-semibold">
            {product.category}
          </span>
        </div>
        <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < product.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                ${product.oldPrice}
              </span>
            )}
            <span className="text-emerald-600 font-bold text-xl">
              ${product.price}
            </span>
          </div>
          {product.status === 'available' && product.stock <= 10 && (
            <span className="text-xs text-orange-600 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
            product.status === 'preorder'
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {product.status === 'preorder' ? (
            <>
              <Clock size={18} />
              <span>Pre-Order Now</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Quick View Modal
const QuickViewModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
            <h3 className="text-xl font-bold text-gray-800">Quick View</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div>
              <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-emerald-600'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-emerald-600">
                  {product.category}
                </span>
                {product.badge && (
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      product.badge === 'SALE'
                        ? 'bg-red-500 text-white'
                        : product.badge === 'NEW'
                        ? 'bg-emerald-500 text-white'
                        : product.badge === 'PRE-ORDER'
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < product.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-lg mr-3">
                    ${product.oldPrice}
                  </span>
                )}
                <span className="text-emerald-600 font-bold text-3xl">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Material:</span>
                  <span className="text-gray-800">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Dimensions:</span>
                  <span className="text-gray-800">{product.dimensions}</span>
                </div>
                {product.status === 'available' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Stock:</span>
                    <span
                      className={`font-semibold ${
                        product.stock > 10 ? 'text-green-600' : 'text-orange-600'
                      }`}
                    >
                      {product.stock} units available
                    </span>
                  </div>
                )}
                {product.status === 'preorder' && product.expectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Expected:</span>
                    <span className="text-amber-600 font-semibold">
                      {new Date(product.expectedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check size={16} className="text-emerald-600 mt-1" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    product.status === 'preorder'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {product.status === 'preorder' ? (
                    <>
                      <Clock size={20} />
                      <span>Pre-Order Now</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart size={20} className="text-gray-700 hover:text-red-500" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Products Page Component
const ProductsPage = ({ addToCart, addToWishlist }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    status: 'all',
    priceMin: 0,
    priceMax: Infinity,
    minRating: 0,
    sortBy: 'featured',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter and Sort Products
  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category;
      const matchesStatus =
        filters.status === 'all' || product.status === filters.status;
      const matchesPrice =
        product.price >= filters.priceMin && product.price <= filters.priceMax;
      const matchesRating = product.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPrice &&
        matchesRating
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  // Separate products by status
  const availableProducts = filteredProducts.filter((p) => p.status === 'available');
  const preorderProducts = filteredProducts.filter((p) => p.status === 'preorder');

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsHero />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 ">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
              />
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <div className="lg:hidden">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={isSidebarOpen}
                  setIsOpen={setIsSidebarOpen}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      {filteredProducts.length}
                    </span>{' '}
                    products found
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters({ ...filters, sortBy: e.target.value })
                      }
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ArrowUpDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid'
                          ? 'bg-white shadow-sm'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      <Grid size={18} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list'
                          ? 'bg-white shadow-sm'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      <List size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Products Section */}
            {(filters.status === 'all' || filters.status === 'available') &&
              availableProducts.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Check className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Available Now
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Ready to ship • In stock items
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {availableProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={setSelectedProduct}
                        onAddToWishlist={addToWishlist}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

            {/* Pre-Order Products Section */}
            {(filters.status === 'all' || filters.status === 'preorder') &&
              preorderProducts.length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Clock className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Pre-Order Collection
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Exclusive imports • Reserve yours today
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {preorderProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={setSelectedProduct}
                        onAddToWishlist={addToWishlist}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <Search size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      search: '',
                      category: 'All',
                      status: 'all',
                      priceMin: 0,
                      priceMax: Infinity,
                      minRating: 0,
                      sortBy: 'featured',
                    })
                  }
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;