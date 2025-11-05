import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Best Inspiration List',
      subtitle: 'FURNITURE BRANDS',
      description: 'Discover premium furniture pieces that transform your space into a masterpiece',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop',
      cta1: { text: 'Shop Now', link: '/products' },
      cta2: { text: 'Read More', link: '/about' },
    },
    {
      title: 'Modern Living Spaces',
      subtitle: 'CONTEMPORARY DESIGNS',
      description: 'Experience elegance and comfort with our curated collection',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop',
      cta1: { text: 'Explore', link: '/products' },
      cta2: { text: 'Learn More', link: '/about' },
    },
    {
      title: 'Timeless Elegance',
      subtitle: 'CLASSIC FURNITURE',
      description: 'Premium quality furniture imported from renowned manufacturers',
      image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&h=1080&fit=crop',
      cta1: { text: 'Shop Collection', link: '/products' },
      cta2: { text: 'View Gallery', link: '/products' },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-screen mt-16 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30 z-10" />
      
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
            backgroundImage: `url(${slide.image})`,
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
            <Link to={slides[currentSlide].cta1.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                {slides[currentSlide].cta1.text}
              </motion.button>
            </Link>
            <Link to={slides[currentSlide].cta2.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/40"
              >
                {slides[currentSlide].cta2.text}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-emerald-600 w-8' : 'bg-white/50 w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;