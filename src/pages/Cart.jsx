import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield } from 'lucide-react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 mt-16">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-lg font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-emerald-600 transition-colors flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-emerald-600 transition-colors flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span className="text-emerald-600">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center space-x-2 mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <Link to="/products">
                <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Tag className="text-emerald-600" size={18} />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="text-emerald-600" size={18} />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;