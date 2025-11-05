import React from 'react';
import HeroSlider from '../components/HeroSlider';
import VideoGallery from '../components/VideoGallery';
import SectionWrapper from '../components/SectionWrapper';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { mockProducts } from '../data/mockProducts';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuickViewModal from '../components/QuickViewModal';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredProducts = mockProducts.filter(p => p.status === 'available').slice(0, 6);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Akib Market transformed my living space with their exceptional furniture collection. The quality and design are unmatched!',
    },
    {
      name: 'Michael Chen',
      role: 'Homeowner',
      image: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'Outstanding service and premium quality furniture. Every piece feels like a work of art. Highly recommended!',
    },
    {
      name: 'Emma Williams',
      role: 'Architect',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'The attention to detail and craftsmanship is remarkable. Akib Market is my go-to for all luxury furniture needs.',
    },
  ];

  const handleAddToCart = () => {
    // Mock function
  };

  return (
    <div className="font-sans">
      <HeroSlider />
      
      {/* Featured Products */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
            >
              FEATURED COLLECTION
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Trending This Week
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Products</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <VideoGallery />

      {/* Testimonials */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Store Section */}
      <SectionWrapper className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1920&h=800&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-400 text-sm font-semibold tracking-wider mb-2">
              VISIT US
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Experience Our Showroom
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Visit our premium showroom in Dhaka and explore our complete furniture collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <MapPin className="text-emerald-400" />
                <span>Gulshan, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-emerald-400" />
                <span>+880 1700-000000</span>
              </div>
            </div>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-lg"
              >
                Get Directions
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Home;