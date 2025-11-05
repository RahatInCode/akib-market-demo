import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, Clock, Check } from 'lucide-react';

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
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
              className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className="text-gray-700 hover:text-red-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
              aria-label="Quick view"
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
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-emerald-600 font-semibold">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 h-12 hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>

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

export default ProductCard;