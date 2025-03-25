"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Lock, Mail, UserPlus, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import a1 from "../../assets/images/a1.jpg"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setSuccess(true)

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex py-28 items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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

      <motion.div
        className="absolute top-20 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="flex items-center gap-2 text-white hover:text-fuchsia-400 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      <div className="container mx-auto max-w-5xl px-4 z-10 relative">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <motion.div
            className="md:w-1/2 bg-gradient-to-br from-purple-900 to-gray-900 p-8 md:p-12 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Join ExamGenius!</h1>
                <div className="w-20 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 mb-6"></div>
                <p className="text-gray-300 mb-8 text-lg">
                  Create an account and start your journey to success with our comprehensive exam platform.
                </p>
              </motion.div>

              <motion.div
                className="relative z-10 mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-fuchsia-500/20 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full"></div>
                <img
                  src={a1}
                  alt="Signup"
                  className="relative z-10 mx-auto max-w-full rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="md:w-1/2 p-8 md:p-12 bg-gray-900 rounded-r-2xl">
            <motion.div
              key={success ? "success" : "form"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {success ? (
                <motion.div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-fuchsia-900/50 text-fuchsia-300 rounded-full p-4 mb-6">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Account Created Successfully!</h2>
                  <p className="text-gray-400 mb-8">Redirecting you to login...</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600"></div>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-bold mb-2 text-white">Sign Up</h2>
                    <p className="text-gray-400 mb-8">Create your ExamGenius account</p>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6"
                    >
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <User className="absolute left-4 top-3.5 text-gray-500" size={20} />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Mail className="absolute left-4 top-3.5 text-gray-500" size={20} />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="role">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-colors text-white appearance-none"
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                        >
                          <option value="student">Student</option>
                          <option value="examiner">Examiner</option>
                        </select>
                      </div>
                    </motion.div>

                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium shadow-lg ${
                        isLoading
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-fuchsia-500/30"
                      }`}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <>
                          <UserPlus className="mr-2" size={20} />
                          Create Account
                        </>
                      )}
                    </motion.button>
                  </form>

                  <motion.div variants={itemVariants} className="mt-8 text-center">
                    <p className="text-gray-400">
                      Already have an account?{" "}
                      <Link to="/login" className="font-medium text-fuchsia-400 hover:text-fuchsia-300">
                        Sign in
                      </Link>
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-900 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        type="button"
                      >
                        <div className="flex items-center justify-center">
                          <span>Google</span>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        type="button"
                      >
                        <div className="flex items-center justify-center">
                          <span>Microsoft</span>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
