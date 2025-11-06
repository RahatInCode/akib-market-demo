import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { Award, Users, Globe, Heart, Target, Zap, Shield, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, number: '15+', label: 'Years in Business' },
    { icon: Users, number: '5000+', label: 'Happy Customers' },
    { icon: Globe, number: '25+', label: 'Countries Imported From' },
    { icon: Heart, number: '10000+', label: 'Products Delivered' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We source only the finest furniture from renowned international manufacturers.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Efficient logistics ensuring your furniture arrives on time, every time.',
    },
    {
      icon: Shield,
      title: 'Customer Protection',
      description: 'Comprehensive warranty and 30-day return policy on all products.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Constantly updating our collection with the latest design trends.',
    },
  ];

  const team = [
    {
      name: 'Akib Rahman',
      role: 'Founder & CEO',
      image: 'https://i.pravatar.cc/300?img=12',
    },
    {
      name: 'Sarah Ahmed',
      role: 'Head of Design',
      image: 'https://i.pravatar.cc/300?img=5',
    },
    {
      name: 'James Wilson',
      role: 'Import Director',
      image: 'https://i.pravatar.cc/300?img=13',
    },
    {
      name: 'Maya Chen',
      role: 'Customer Relations',
      image: 'https://i.pravatar.cc/300?img=9',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with Furniture Background */}
      <div className="relative text-white py-32 mt-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=600&fit=crop)',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About Akib Market
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Bringing world-class furniture to Bangladesh since 2009. Your trusted partner for premium imported furniture.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
                  <stat.icon className="text-emerald-600" size={36} />
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Story */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Founded in 2009 by Akib Rahman, Akib Market began with a simple vision: to make world-class furniture accessible to Bangladesh. What started as a small showroom in Dhaka has grown into one of the country's most trusted furniture importers.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                We work directly with manufacturers from Italy, Denmark, Japan, Germany, and beyond, ensuring authentic quality and competitive prices. Every piece in our collection is carefully selected for its craftsmanship, design, and durability.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we're proud to have served over 5,000 happy customers, helping them create beautiful, functional spaces they love.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600&h=400&fit=crop"
                alt="Showroom"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=400&fit=crop"
                alt="Craftsmanship"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-xl transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <value.icon className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Akib Market
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Visit our showroom or browse our online collection today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;