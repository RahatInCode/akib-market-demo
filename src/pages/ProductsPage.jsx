import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Grid, List, ArrowUpDown, Package, Check, Clock } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const ProductsPage = ({ addToCart }) => {
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

  const categories = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office'];

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesStatus = filters.status === 'all' || product.status === filters.status;
      const matchesPrice = product.price >= filters.priceMin && product.price <= filters.priceMax;
      const matchesRating = product.rating >= filters.minRating;
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.id - a.id;
        default: return 0;
      }
    });

  const availableProducts = filteredProducts.filter((p) => p.status === 'available');
  const preorderProducts = filteredProducts.filter((p) => p.status === 'preorder');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-linear-to-r from-emerald-600 to-emerald-800 text-white py-20 mt-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Premium Collection</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Discover luxury furniture imported from the world's finest manufacturers
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Package size={18} />
              <span>Free Shipping $500+</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Check size={18} />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed lg:sticky top-24 left-0 h-screen lg:h-auto w-80 bg-white shadow-xl lg:shadow-none z-50 overflow-y-auto p-6"
              >
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h3 className="font-bold text-xl">Filters</h3>
                  <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Availability</h4>
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'available', label: 'Available Now' },
                    { value: 'preorder', label: 'Pre-Order' },
                  ].map((status) => (
                    <label key={status.value} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={filters.status === status.value}
                        onChange={() => setFilters({ ...filters, status: status.value })}
                        className="mr-2"
                      />
                      <span>{status.label}</span>
                    </label>
                  ))}
                </div>

                {/* Category */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={filters.category === cat}
                        onChange={() => setFilters({ ...filters, category: cat })}
                        className="mr-2"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => setFilters({
                    search: '', category: 'All', status: 'all',
                    priceMin: 0, priceMax: Infinity, minRating: 0, sortBy: 'featured'
                  })}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="border rounded-lg px-4 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="hidden sm:flex gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Available Products */}
            {(filters.status === 'all' || filters.status === 'available') && availableProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Check className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Available Now</h2>
                    <p className="text-gray-600 text-sm">Ready to ship</p>
                  </div>
                </div>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {availableProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pre-Order Products */}
            {(filters.status === 'all' || filters.status === 'preorder') && preorderProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Pre-Order Collection</h2>
                    <p className="text-gray-600 text-sm">Exclusive imports</p>
                  </div>
                </div>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {preorderProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Search size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductsPage;