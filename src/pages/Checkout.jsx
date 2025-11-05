import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Home
} from 'lucide-react';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="text-green-600" size={48} />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-6">Order confirmation sent to your email.</p>
          <div className="bg-emerald-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order Total</p>
            <p className="text-3xl font-bold text-emerald-600">${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                      step >= num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {num}
                  </div>
                  <span
                    className={`ml-2 font-semibold hidden sm:block ${
                      step >= num ? 'text-emerald-600' : 'text-gray-500'
                    }`}
                  >
                    {num === 1 ? 'Shipping' : num === 2 ? 'Payment' : 'Review'}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > num ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl p-8 shadow-lg">
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="inline mr-2" size={16} />
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="inline mr-2" size={16} />
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="inline mr-2" size={16} />
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="+880 1700-000000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Home className="inline mr-2" size={16} />
                          Address
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <MapPin className="inline mr-2" size={16} />
                            City
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="Dhaka"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="1212"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <CreditCard className="inline mr-2" size={16} />
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardName}
                          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="inline mr-2" size={16} />
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Lock className="inline mr-2" size={16} />
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            placeholder="123"
                            maxLength="3"
                          />
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <Lock className="text-blue-600 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-blue-800">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Order</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-3">Shipping Address</h3>
                        <p className="text-gray-600">{formData.fullName}</p>
                        <p className="text-gray-600">{formData.address}</p>
                        <p className="text-gray-600">{formData.city}, {formData.zipCode}</p>
                        <p className="text-gray-600">{formData.phone}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-3">Payment Method</h3>
                        <p className="text-gray-600">Card ending in {formData.cardNumber.slice(-4)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-bold text-gray-800 mb-3">Order Items</h3>
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between py-2">
                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="ml-auto px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="ml-auto px-8 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
                  >
                    Place Order
                  </motion.button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-emerald-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;