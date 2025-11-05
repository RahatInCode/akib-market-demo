import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import VideoGallery from '../components/VideoGallery';
import SectionWrapper from '../components/SectionWrapper';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { mockProducts } from '../data/mockProducts';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredProducts = mockProducts.filter(p => p.status === 'available').slice(0, 6);

  const handleAddToCart = () => {
    // Mock function
  };

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

  return (
    <div className="font-sans">
      <HeroSlider />

      {/* Kitchen Accessories Section */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=800&fit=crop"
                alt="Kitchen"
                className="rounded-lg shadow-lg h-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=800&fit=crop"
                alt="Kitchen"
                className="rounded-lg shadow-lg h-full object-cover mt-8"
              />
            </div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
              >
                SAGITTIS ULLAMCOR
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-800 mb-6"
              >
                KITCHEN<br />ACCESSORIES
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-8"
              >
                Elevate your culinary experience with our premium kitchen accessories. 
                Designed for functionality and style, each piece brings elegance to your cooking space.
              </motion.p>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProducts.filter(p => p.category === 'Living Room' && p.status === 'available').slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Loft Decoration Section */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
              >
                SAGITTIS ULLAMCOR
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-800 mb-6"
              >
                LOFT DECORATION
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-8"
              >
                Create stunning loft spaces with our carefully curated decoration pieces. 
                Contemporary designs that blend seamlessly with modern architecture.
              </motion.p>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProducts.filter(p => p.category === 'Bedroom' && p.status === 'available').slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop"
                alt="Loft"
                className="rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Trending Furniture Section */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=1000&fit=crop"
                alt="Trending"
                className="rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
              >
                SAGITTIS ULLAMCOR
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-800 mb-6"
              >
                TRENDING FURNITURE
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-8"
              >
                Stay ahead with the latest furniture trends. Bold colors, unique shapes, 
                and innovative designs that make a statement in any room.
              </motion.p>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProducts.filter(p => p.category === 'Dining Room' && p.status === 'available').slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Wooden Decor Section */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
              >
                SAGIT ULLAMCOR
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-800 mb-6"
              >
                WOODEN DECOR
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-8"
              >
                Experience the warmth and natural beauty of handcrafted wooden accessories. 
                Timeless pieces that bring nature into your home.
              </motion.p>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProducts.filter(p => p.category === 'Office' && p.status === 'available').slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://vermontwoodsstudios.com/cdn/shop/files/loft-bedroom-category-thumb-5.jpg?v=1683503734"
                alt="Wooden Decor"
                className="rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Featured Products Section (NEW) */}
      <SectionWrapper className="py-20 bg-gray-50">
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Discover our handpicked selection of premium furniture pieces
            </motion.p>
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

      {/* Video Gallery */}
      <VideoGallery />

      {/* Testimonials */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-600 text-sm font-semibold tracking-wider mb-2"
            >
              TESTIMONIALS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of satisfied customers who have transformed their spaces
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
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

      {/* Map Section */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49992857615!2d90.25487537538857!3d23.78106725655015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1635789012345!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="grayscale hover:grayscale-0 transition-all duration-500"
          title="Akib Market Location"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg">
          <p className="text-gray-800 font-semibold flex items-center">
            <MapPin size={20} className="text-emerald-600 mr-2" />
            Akib Market - Gulshan, Dhaka
          </p>
        </div>
      </section>

      {/* Quick View Modal */}
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