import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { mockProducts } from '../data/mockProducts';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  Clock, 
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Home,
  Minus,
  Plus
} from 'lucide-react';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/products">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b mt-16">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600"><Home size={16} /></Link>
            <ChevronRight size={16} />
            <Link to="/products" className="hover:text-emerald-600">Products</Link>
            <ChevronRight size={16} />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4 aspect-square"
            >
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-emerald-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-emerald-600">{product.category}</span>
                {product.badge && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.badge === 'SALE' ? 'bg-red-500 text-white' :
                    product.badge === 'NEW' ? 'bg-emerald-500 text-white' :
                    product.badge === 'PRE-ORDER' ? 'bg-amber-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                {product.oldPrice && (
                  <span className="text-2xl text-gray-400 line-through mr-3">${product.oldPrice}</span>
                )}
                <span className="text-4xl font-bold text-emerald-600">${product.price}</span>
                {product.oldPrice && (
                  <span className="ml-3 text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    Save ${product.oldPrice - product.price}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</p>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Material:</span>
                  <span className="text-gray-800 font-semibold">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Dimensions:</span>
                  <span className="text-gray-800 font-semibold">{product.dimensions}</span>
                </div>
                {product.color && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Color:</span>
                    <span className="text-gray-800 font-semibold">{product.color}</span>
                  </div>
                )}
                {product.status === 'available' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Stock:</span>
                    <span className={`font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.stock} units available
                    </span>
                  </div>
                )}
                {product.status === 'preorder' && product.expectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Expected Arrival:</span>
                    <span className="text-amber-600 font-semibold">
                      {new Date(product.expectedDate).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {product.status === 'available' && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-emerald-600 transition-colors flex items-center justify-center"
                    >
                      <Minus size={20} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-emerald-600 transition-colors flex items-center justify-center"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product, quantity)}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                    product.status === 'preorder'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {product.status === 'preorder' ? (
                    <>
                      <Clock size={22} />
                      <span>Pre-Order Now</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart size={24} className="text-gray-700" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="text-emerald-600" size={24} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Warranty</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RotateCcw className="text-purple-600" size={24} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">30 Day Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex space-x-8 border-b mb-8">
            {['description', 'features', 'specifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">{product.longDescription}</p>
            </div>
          )}

          {activeTab === 'features' && product.features && (
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="text-emerald-600 flex-0 mt-1" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b">
                  <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-gray-600">{value.toString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link key={relProduct.id} to={`/product/${relProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{relProduct.name}</h3>
                      <p className="text-emerald-600 font-bold">${relProduct.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;