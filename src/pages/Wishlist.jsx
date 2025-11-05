import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';

const Wishlist = ({ wishlist, removeFromWishlist, addToCart }) => {
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-50 rounded-full mb-6">
            <Heart size={64} className="text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items for later.</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <Link to={`/product/${item.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                      item.badge === 'SALE' ? 'bg-red-500 text-white' :
                      item.badge === 'NEW' ? 'bg-emerald-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(item.id);
                    }}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={18} className="text-red-500 fill-red-500" />
                  </motion.button>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <span className="text-xs text-emerald-600 font-semibold">{item.category}</span>
                </div>
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="mb-4">
                  {item.oldPrice && (
                    <span className="text-gray-400 line-through text-sm mr-2">
                      ${item.oldPrice}
                    </span>
                  )}
                  <span className="text-emerald-600 font-bold text-2xl">
                    ${item.price}
                  </span>
                </div>

                {/* Stock Status */}
                {item.status === 'available' ? (
                  <p className="text-sm text-green-600 font-medium mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    In Stock
                  </p>
                ) : (
                  <p className="text-sm text-amber-600 font-medium mb-4 flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Pre-Order
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-3 border-2 border-red-300 rounded-lg hover:bg-red-50 hover:border-red-500 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-flex items-center space-x-2"
            >
              <span>Browse More Products</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;