import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, User, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Menu, X, Star, Play } from 'lucide-react';
import VideoGallery from './components/VideoGallery';


// Animation hook for scroll-triggered animations
const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gray-800"
          >
            <span className="text-emerald-600">Akib</span> Market
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block text-gray-700 hover:text-emerald-600"
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-emerald-600 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              <User size={16} />
              <span className="text-sm">Login</span>
            </motion.button>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 pb-4"
          >
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-700 hover:text-emerald-600"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

// Hero Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Best Inspiration List',
      subtitle: 'FURNITURE BRANDS',
      description: 'Discover premium furniture pieces that transform your space into a masterpiece',
      cta1: 'Shop Now',
      cta2: 'Read More',
    },
    {
      title: 'Modern Living Spaces',
      subtitle: 'CONTEMPORARY DESIGNS',
      description: 'Experience elegance and comfort with our curated collection',
      cta1: 'Explore',
      cta2: 'Learn More',
    },
    {
      title: 'Timeless Elegance',
      subtitle: 'CLASSIC FURNITURE',
      description: 'Premium quality furniture imported from renowned manufacturers',
      cta1: 'Shop Collection',
      cta2: 'View Gallery',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen mt-16 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0  from-black/60 to-black/30 z-10" />
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop)',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-400 text-sm font-semibold tracking-wider mb-2"
          >
            {slides[currentSlide].title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {slides[currentSlide].subtitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            {slides[currentSlide].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              {slides[currentSlide].cta1}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/40"
            >
              {slides[currentSlide].cta2}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-emerald-600 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart size={20} className="text-emerald-600" />
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                ${product.oldPrice}
              </span>
            )}
            <span className="text-emerald-600 font-bold text-lg">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Section Component with Animation
const Section = ({ children, className = '' }) => {
  const [ref, controls] = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Kitchen Accessories Section
const KitchenSection = () => {
  const products = [
    {
      name: 'Modern Kitchen Organizer',
      price: 45.99,
      oldPrice: 59.99,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop',
      badge: 'NEW',
    },
    {
      name: 'Bamboo Utensil Set',
      price: 32.50,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&h=500&fit=crop',
    },
  ];

  return (
    <Section className="py-20 bg-gray-50">
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
            <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
              SAGITTIS ULLAMCOR
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              KITCHEN<br />ACCESSORIES
            </h2>
            <p className="text-gray-600 mb-8">
              Elevate your culinary experience with our premium kitchen accessories. 
              Designed for functionality and style, each piece brings elegance to your cooking space.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Loft Decoration Section
const LoftSection = () => {
  const products = [
    {
      name: 'Modern Wall Clock',
      price: 89.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=500&fit=crop',
    },
    {
      name: 'Ceramic Vase Collection',
      price: 125.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop',
    },
  ];

  return (
    <Section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
              SAGITTIS ULLAMCOR
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              LOFT DECORATION
            </h2>
            <p className="text-gray-600 mb-8">
              Create stunning loft spaces with our carefully curated decoration pieces. 
              Contemporary designs that blend seamlessly with modern architecture.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
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
    </Section>
  );
};

// Trending Furniture Section
const TrendingSection = () => {
  const products = [
    {
      name: 'Egg-shaped Accent Chair',
      price: 899.00,
      oldPrice: 1299.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop',
      badge: 'SALE',
    },
    {
      name: 'Colorful Storage Ottoman',
      price: 249.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    },
  ];

  return (
    <Section className="py-20 bg-gray-50">
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
            <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
              SAGITTIS ULLAMCOR
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              TRENDING FURNITURE
            </h2>
            <p className="text-gray-600 mb-8">
              Stay ahead with the latest furniture trends. Bold colors, unique shapes, 
              and innovative designs that make a statement in any room.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Wooden Decor Section
const WoodenDecorSection = () => {
  const products = [
    {
      name: 'Rustic Plant Stand',
      price: 78.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop',
      badge: 'NEW',
    },
    {
      name: 'Wooden Wine Rack',
      price: 145.00,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&h=500&fit=crop',
    },
  ];

  return (
    <Section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
              SAGIT ULLAMCOR
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              WOODEN DECOR
            </h2>
            <p className="text-gray-600 mb-8">
              Experience the warmth and natural beauty of handcrafted wooden accessories. 
              Timeless pieces that bring nature into your home.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
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
    </Section>
  );
};

// Video Gallery Section
<VideoGallery />

// Testimonials Section
const Testimonials = () => {
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
    <Section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-emerald-600 text-sm font-semibold tracking-wider mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their spaces
          </p>
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
    </Section>
  );
};

// Store Section
const StoreSection = () => {
  return (
    <Section className="relative py-32 overflow-hidden">
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
          transition={{ duration: 0.8 }}
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-lg"
          >
            View Directions
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
};

// Map Section
const MapSection = () => {
  return (
    <section className="h-96 relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49992857615!2d90.25487537538857!3d23.78106725655015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1635789012345!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg">
        <p className="text-gray-800 font-semibold flex items-center">
          <MapPin size={20} className="text-emerald-600 mr-2" />
          Akib Market - Gulshan, Dhaka
        </p>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = {
    useful: ['About Us', 'Our Products', 'Delivery Info', 'Privacy Policy', 'Terms & Conditions'],
    stores: ['Dhaka Showroom', 'Chittagong Branch', 'Sylhet Store', 'Khulna Location', 'Rajshahi Shop'],
    support: ['Contact Us', 'FAQs', 'Shipping & Returns', 'Size Guide', 'Care Instructions'],
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-emerald-400">Akib</span> Market
            </h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for premium imported furniture. Transforming spaces with elegance and quality since 2015.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="text-emerald-400" />
                <span className="text-sm">Gulshan, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-emerald-400" />
                <span className="text-sm">+880 1700-000000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-emerald-400" />
                <span className="text-sm">info@akibmarket.com</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              {footerLinks.useful.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Stores */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Stores</h4>
            <ul className="space-y-2">
              {footerLinks.stores.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, link: '#' },
                { icon: Instagram, link: '#' },
                { icon: Twitter, link: '#' },
                { icon: Youtube, link: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-6">
              Get exclusive offers, design tips, and new arrivals delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-emerald-400 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Akib Market. All rights reserved. | Designed with ❤️ for furniture lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSlider />
      <KitchenSection />
      <LoftSection />
      <TrendingSection />
      <WoodenDecorSection />
      <VideoGallery />
      <Testimonials />
      <StoreSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default App