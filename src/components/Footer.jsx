import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    useful: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Products', path: '/products' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/' },
      { name: 'Terms & Conditions', path: '/' },
    ],
    categories: [
      { name: 'Living Room', path: '/products' },
      { name: 'Bedroom', path: '/products' },
      { name: 'Dining Room', path: '/products' },
      { name: 'Office', path: '/products' },
      { name: 'Pre-Orders', path: '/products' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/' },
      { name: 'Shipping & Returns', path: '/' },
      { name: 'Size Guide', path: '/' },
      { name: 'Care Instructions', path: '/' },
    ],
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
                <MapPin size={18} className="text-emerald-400 shrink-0" />
                <span className="text-sm">Gulshan, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <span className="text-sm">+880 1700-000000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-emerald-400 shrink-0" />
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
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
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
                  aria-label={`Social media link ${index + 1}`}
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

export default Footer;