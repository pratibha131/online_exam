

// "use client"

// import { useState, useEffect } from "react"
// import { motion, useViewportScroll } from "framer-motion"
// import { Menu, X, BookOpen, Bell, Search } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext"

// const ProgressBar = () => {
//   const { scrollYProgress } = useViewportScroll()
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 z-50"
//       style={{
//         scaleX: scrollYProgress,
//         transformOrigin: "0%",
//         opacity: 0.9,
//       }}
//     />
//   )
// }

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const { user, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [scrolled])

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Exams", path: "/tests" },
//     { name: "Dashboard", path: "/dashboard", authRequired: true },
//     { name: "About", path: "/about" },
//   ]

//   return (
//     <>
//       <ProgressBar />
//       <motion.nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//       >
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link to="/">
//             <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <BookOpen className={`w-7 h-7 ${scrolled ? "text-teal-600" : "text-teal-400"}`} />
//               <span className={`text-2xl font-bold ${scrolled ? "text-gray-800" : "text-white"}`}>ExamGenius</span>
//             </motion.div>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map(
//               (item, index) =>
//                 (!item.authRequired || (item.authRequired && isAuthenticated)) && (
//                   <Link key={item.name} to={item.path}>
//                     <motion.div
//                       className={`font-medium transition-colors duration-300 cursor-pointer ${
//                         scrolled ? "text-gray-700 hover:text-teal-600" : "text-white hover:text-teal-300"
//                       }`}
//                       whileHover={{ y: -2 }}
//                       whileTap={{ y: 0 }}
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                     >
//                       {item.name}
//                     </motion.div>
//                   </Link>
//                 ),
//             )}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <motion.div
//               className={`p-2 rounded-full cursor-pointer ${
//                 scrolled ? "hover:bg-gray-100 text-gray-600" : "hover:bg-white/10 text-white"
//               }`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Search className="w-5 h-5" />
//             </motion.div>

//             {isAuthenticated ? (
//               <>
//                 <motion.div
//                   className={`p-2 rounded-full cursor-pointer ${
//                     scrolled ? "hover:bg-gray-100 text-gray-600" : "hover:bg-white/10 text-white"
//                   }`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Bell className="w-5 h-5" />
//                 </motion.div>

//                 <motion.div
//                   className={`flex items-center space-x-2 ${scrolled ? "text-gray-700" : "text-white"}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
//                     {user?.name?.charAt(0) || "U"}
//                   </div>
//                   <span className="font-medium">{user?.name || "User"}</span>
//                 </motion.div>

//                 <motion.button
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-white text-teal-600 rounded-lg font-medium shadow-sm hover:shadow-md border border-teal-100"
//                   whileHover={{ scale: 1.03, y: -1 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Logout
//                 </motion.button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <motion.button
//                     className="px-5 py-2 bg-white text-teal-600 rounded-lg font-medium shadow-sm hover:shadow-md border border-teal-100"
//                     whileHover={{ scale: 1.03, y: -1 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Sign In
//                   </motion.button>
//                 </Link>
//                 <Link to="/signup">
//                   <motion.button
//                     className="px-5 py-2 bg-teal-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md"
//                     whileHover={{ scale: 1.03, y: -1 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Sign Up
//                   </motion.button>
//                 </Link>
//               </>
//             )}
//           </div>

//           <motion.div className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? (
//                 <X size={24} className={scrolled ? "text-gray-800" : "text-white"} />
//               ) : (
//                 <Menu size={24} className={scrolled ? "text-gray-800" : "text-white"} />
//               )}
//             </button>
//           </motion.div>
//         </div>

//         {isMenuOpen && (
//           <motion.div
//             className="md:hidden bg-white shadow-lg"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex flex-col py-4">
//               {navLinks.map(
//                 (item) =>
//                   (!item.authRequired || (item.authRequired && isAuthenticated)) && (
//                     <Link key={item.name} to={item.path} className="w-full">
//                       <motion.div
//                         className="w-full px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition duration-300"
//                         whileHover={{ x: 5 }}
//                         whileTap={{ x: 0 }}
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.name}
//                       </motion.div>
//                     </Link>
//                   ),
//               )}

//               <div className="border-t border-gray-100 my-2"></div>

//               {isAuthenticated ? (
//                 <>
//                   <div className="flex items-center px-6 py-3">
//                     <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3">
//                       {user?.name?.charAt(0) || "U"}
//                     </div>
//                     <span className="text-gray-700 font-medium">{user?.name || "User"}</span>
//                   </div>
//                   <motion.button
//                     onClick={() => {
//                       handleLogout()
//                       setIsMenuOpen(false)
//                     }}
//                     className="mx-6 my-2 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-300"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Logout
//                   </motion.button>
//                 </>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3 px-6 py-3">
//                   <Link to="/login" className="w-full">
//                     <motion.button
//                       className="w-full py-2 bg-white text-teal-600 rounded-lg font-medium border border-teal-100"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Sign In
//                     </motion.button>
//                   </Link>
//                   <Link to="/signup" className="w-full">
//                     <motion.button
//                       className="w-full py-2 bg-teal-600 text-white rounded-lg font-medium"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Sign Up
//                     </motion.button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </motion.nav>
//     </>
//   )
// }

// export default Navbar



"use client"

import { useState, useEffect } from "react"
import { motion, useViewportScroll } from "framer-motion"
import { Menu, X, BookOpen, Bell, Search } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ProgressBar = () => {
  const { scrollYProgress } = useViewportScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-700 z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        opacity: 0.9,
      }}
    />
  )
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/tests" },
    { name: "Dashboard", path: "/dashboard", authRequired: true },
    { name: "About", path: "/about" },
  ]

  return (
    <>
      <ProgressBar />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/90 shadow-md backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <BookOpen className={`w-7 h-7 ${scrolled ? "text-fuchsia-500" : "text-fuchsia-400"}`} />
              <span className={`text-2xl font-bold ${scrolled ? "text-white" : "text-white"}`}>ExamGenius</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(
              (item, index) =>
                (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                  <Link key={item.name} to={item.path}>
                    <motion.div
                      className={`font-medium transition-colors duration-300 cursor-pointer ${
                        scrolled ? "text-gray-300 hover:text-fuchsia-400" : "text-white hover:text-fuchsia-300"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ),
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className={`p-2 rounded-full cursor-pointer ${
                scrolled ? "hover:bg-gray-800 text-gray-300" : "hover:bg-white/10 text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.div>

            {isAuthenticated ? (
              <>
                <motion.div
                  className={`p-2 rounded-full cursor-pointer ${
                    scrolled ? "hover:bg-gray-800 text-gray-300" : "hover:bg-white/10 text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="w-5 h-5" />
                </motion.div>

                <motion.div
                  className={`flex items-center space-x-2 ${scrolled ? "text-gray-300" : "text-white"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center text-white">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="font-medium">{user?.name || "User"}</span>
                </motion.div>

                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    className="px-5 py-2 bg-gray-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg border border-gray-700"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-5 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          <motion.div className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </motion.div>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col py-4">
              {navLinks.map(
                (item) =>
                  (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                    <Link key={item.name} to={item.path} className="w-full">
                      <motion.div
                        className="w-full px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-fuchsia-400 transition duration-300"
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ),
              )}

              <div className="border-t border-gray-800 my-2"></div>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-6 py-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center text-white mr-3">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-gray-300 font-medium">{user?.name || "User"}</span>
                  </div>
                  <motion.button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="mx-6 my-2 py-2 text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-lg hover:shadow-lg transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-6 py-3">
                  <Link to="/login" className="w-full">
                    <motion.button
                      className="w-full py-2 bg-gray-800 text-white rounded-lg font-medium border border-gray-700"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <motion.button
                      className="w-full py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

export default Navbar
