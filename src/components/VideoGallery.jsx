import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Award, Users } from 'lucide-react';

// Import your videos here
import video01 from '../assets/furnitureVideo-01.mp4';
import video02 from '../assets/furnitureVideo-02.mp4';

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

const VideoGallery = () => {
  const [ref, controls] = useScrollAnimation();

  const videos = [
    {
      id: '01',
      title: 'Master Craftsmanship',
      subtitle: 'Handcrafted Excellence',
      src: video01,
    },
    {
      id: '02',
      title: 'Quality Materials',
      subtitle: 'Premium Selection',
      src: video02,
    },
  ];

  const stats = [
    { icon: Award, number: '15+', label: 'Years of Excellence' },
    { icon: Users, number: '5000+', label: 'Happy Customers' },
    { icon: Sparkles, number: '10000+', label: 'Products Delivered' },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className="py-24  from-slate-50 to-gray-100 overflow-hidden relative"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4"
          >
            ✨ Experience Our Craftsmanship
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Where Art Meets
            <span className="text-emerald-600"> Functionality</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Witness the journey from raw materials to finished masterpieces. Every piece tells a story of dedication, precision, and timeless elegance.
          </motion.p>
        </div>

        {/* Video Grid - Modern E-commerce Style */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Video Container */}
              <div className="relative aspect-video overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0  from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-xs font-bold text-gray-900">Premium Collection</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium mb-4">
                  {video.subtitle}
                </p>
                
                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Auto-play enabled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>

              {/* Hover Action Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Modern Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <Icon className="text-emerald-600" size={28} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-10 py-4 rounded-full transition-colors shadow-xl"
          >
            Explore Full Collection
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoGallery;