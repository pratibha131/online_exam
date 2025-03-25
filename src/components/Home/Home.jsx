


"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { BookOpen, Award, Users, Clock, CheckCircle, ChevronDown, Send, ArrowRight, Star, Lightbulb, Shield, Zap, BarChart, Calendar, Laptop, MessageCircle } from 'lucide-react'
import a1 from "../../assets/images/a1.jpg"
import a2 from "../../assets/images/a2.jpg"

const Home = () => {
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const faqRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const aboutInView = useInView(aboutRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })
  const faqInView = useInView(faqRef, { once: false, amount: 0.3 })

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -50])
  const y3 = useTransform(scrollY, [0, 500], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const faqData = [
    {
      question: "How do I register for an exam?",
      answer:
        "Registration is simple! Just create an account, browse available exams, and click 'Register' on your chosen exam. Follow the payment instructions, and you're all set!",
    },
    {
      question: "What technology do I need for online exams?",
      answer:
        "You'll need a computer with a stable internet connection, webcam, and microphone. We recommend using Chrome or Firefox browsers for the best experience.",
    },
    {
      question: "How is exam security maintained?",
      answer:
        "We use advanced proctoring technology including AI-based monitoring, browser lockdown, and identity verification to ensure exam integrity.",
    },
    {
      question: "Can I reschedule my exam?",
      answer:
        "Yes, you can reschedule up to 48 hours before your exam time through your dashboard without any penalty.",
    },
    {
      question: "How quickly will I receive my results?",
      answer:
        "Results for most exams are available within 24-48 hours. For certain specialized exams, it may take up to 5 business days.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      image: "/placeholder.svg",
      content:
        "ExamGenius transformed my study routine. The practice tests were incredibly similar to my actual exams, helping me score in the top percentile!",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "/placeholder.svg",
      content:
        "The certification exams on this platform are comprehensive and challenging. The detailed analytics helped me identify my weak areas and improve.",
    },
    {
      name: "Priya Patel",
      role: "Law Student",
      image: "/placeholder.svg",
      content:
        "The timed practice exams and detailed explanations were crucial for my bar exam preparation. I couldn't have passed without ExamGenius!",
    },
  ]

  return (
    <div className="overflow-hidden">
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-fuchsia-500/10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div style={{ y: springY1, opacity }} className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-sm font-medium mb-4"
              >
                Revolutionizing Online Examinations
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
              >
                <span className="block">Master Your</span>
                <span className="bg-gradient-to-r from-fuchsia-400 to-purple-300 text-transparent bg-clip-text">
                  Exam Journey
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
              >
                Secure, reliable, and innovative examination platform designed to transform your testing experience with
                cutting-edge technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-fuchsia-500/30 flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-fuchsia-500/30 font-medium rounded-lg"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: springY2 }} className="hidden md:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative z-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
                  <img
                    src={a1 || "/placeholder.svg"}
                    alt="o"
                    className="rounded-2xl shadow-2xl w-[90%] h-[100%] relative z-10 transform -rotate-3"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-10 right-0 bg-white/10 backdrop-blur-md p-4 z-20 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Clock className="text-fuchsia-400 h-6 w-6 "  />
                  <div className="text-white">
                    <div className="text-sm font-medium">Time-saving</div>
                    <div className="text-xs opacity-80">Efficient testing</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-md z-20  p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center  gap-3">
                  <Shield className="text-fuchsia-400 z-20 h-6 w-6" />
                  <div className="text-white">
                    <div className="text-sm font-medium">Secure Testing</div>
                    <div className="text-xs opacity-80">Advanced proctoring</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </section>

      <section ref={aboutRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              About <span className="text-fuchsia-400">ExamGenius</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing the examination experience with cutting-edge technology and a user-centric approach.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-fuchsia-500/10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full"></div>
                <img
                  src={a2}
                  alt="About ExamGenius"
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                At ExamGenius, we're dedicated to creating a seamless, secure, and stress-free examination environment
                for students and institutions alike. Our platform combines advanced technology with intuitive design to
                make testing more accessible and efficient.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-500/10 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Secure Testing Environment</h4>
                    <p className="text-gray-400 text-sm">
                      Advanced proctoring and anti-cheating measures ensure exam integrity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-500/10 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">User-Friendly Interface</h4>
                    <p className="text-gray-400 text-sm">
                      Intuitive design makes navigation and test-taking simple for all users.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-500/10 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Comprehensive Analytics</h4>
                    <p className="text-gray-400 text-sm">
                      Detailed performance insights help students improve and institutions assess outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 bg-gradient-to-r from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <div className="w-20 h-1 bg-fuchsia-400 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              ExamGenius has transformed the examination experience for students and institutions worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <div className="bg-fuchsia-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-fuchsia-400" />
              </div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-300">Active Users</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <div className="bg-fuchsia-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-fuchsia-400" />
              </div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-300">Exams Conducted</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <div className="bg-fuchsia-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-fuchsia-400" />
              </div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <div className="bg-fuchsia-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-8 w-8 text-fuchsia-400" />
              </div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Partner Institutions</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl transform rotate-1"></div>
            {/* <img
              src={a1}
              alt="ExamGenius Platform"
              className="rounded-xl shadow-2xl relative w-[100px] h-[300px] z-10 w-full  transform -rotate-1"
            /> */}
          </motion.div>
        </div>
      </section>

      <section ref={featuresRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Features</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover the tools and technologies that make ExamGenius the leading examination platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Advanced Security</h3>
              <p className="text-gray-400 mb-4">
                Multi-layered security with AI proctoring, browser lockdown, and identity verification ensures exam
                integrity.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Detailed Analytics</h3>
              <p className="text-gray-400 mb-4">
                Comprehensive performance insights with visual reports help identify strengths and areas for
                improvement.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Real-time Results</h3>
              <p className="text-gray-400 mb-4">
                Instant scoring and feedback for objective assessments, with expedited grading for subjective questions.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Flexible Scheduling</h3>
              <p className="text-gray-400 mb-4">
                Set custom exam windows or allow on-demand testing with automated time tracking and management.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Smart Question Bank</h3>
              <p className="text-gray-400 mb-4">
                Create and manage diverse question types with automatic difficulty assessment and randomization.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">24/7 Support</h3>
              <p className="text-gray-400 mb-4">
                Round-the-clock technical assistance and exam support through multiple channels for seamless testing.
              </p>
              <a href="#" className="text-fuchsia-400 font-medium flex items-center hover:text-fuchsia-300 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={testimonialsRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from students and institutions who have transformed their examination experience with ExamGenius.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative border border-gray-700"
              >
                <div className="absolute -top-4 -right-4">
                  <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full p-2 shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={faqRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">FAQ & Contact</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions or reach out to our team for personalized assistance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={faqInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h3>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-between items-center w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-fuchsia-400 transition-transform ${
                          activeAccordion === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-gray-800 border-t border-gray-700">
                            <p className="text-gray-300">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={faqInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-fuchsia-500/30 flex items-center justify-center"
                >
                  Send Message <Send className="ml-2 h-5 w-5" />
                </motion.button>
              </form>

              <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-300 text-sm">Need immediate assistance? Contact us directly at:</p>
                <p className="text-fuchsia-400 font-medium mt-2">support@examgenius.com</p>
                <p className="text-fuchsia-400 font-medium">+1 (555) 123-4567</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
