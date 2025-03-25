"use client"
import { motion } from "framer-motion"
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from "react-router-dom"

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Current year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white pt-16 pb-8 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-fuchsia-500 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-8 w-8 text-fuchsia-400" />
              <span className="text-2xl font-bold">ExamGenius</span>
            </div>
            <p className="text-gray-300 mb-6 opacity-90">
              Revolutionizing the examination experience with cutting-edge technology and a user-centric approach.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-fuchsia-400" />
                </div>
                <span className="text-gray-300">info@examgenius.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-fuchsia-400" />
                </div>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-fuchsia-400" />
                </div>
                <span className="text-gray-300">123 Education Ave, Learning City</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Exams", "Pricing", "Contact", "Blog"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-fuchsia-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-fuchsia-500 transform group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Online Examinations",
                "Proctoring Services",
                "Result Analytics",
                "Custom Exam Creation",
                "Institution Dashboard",
                "Student Portal",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/services/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-fuchsia-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-fuchsia-500 transform group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 -mb-2"></span>
            </h3>
            <p className="text-gray-300 mb-4 opacity-90">
              Subscribe to our newsletter for the latest updates and exam tips.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-l-lg w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 transition-colors px-4 rounded-r-lg"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </form>
            <div>
              <h4 className="text-lg font-medium mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-fuchsia-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-fuchsia-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-fuchsia-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-fuchsia-400" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mb-4 md:mb-0"
          >
            &copy; {currentYear} ExamGenius. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-fuchsia-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-fuchsia-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies-policy" className="text-gray-400 text-sm hover:text-fuchsia-400 transition-colors">
              Cookies Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
