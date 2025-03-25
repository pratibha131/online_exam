import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Search, CheckCircle, XCircle, Book, Filter, SortAsc, Calendar, Loader, Users, Trophy, Star, GraduationCap, Timer, AlertTriangle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const TestList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [testStats, setTestStats] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Particle animation for background
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles for background effect
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const testsResponse = await axios.get('http://localhost:5000/api/tests');
        setTests(testsResponse.data);

        try {
          const statsResponse = await axios.get('http://localhost:5000/api/tests/stats');
          setTestStats(statsResponse.data || {});
        } catch (statsErr) {
          console.warn('Failed to load test statistics:', statsErr);
          setTestStats({});
        }

        if (user?.id) {
          try {
            const attemptsResponse = await axios.get(
              `http://localhost:5000/api/users/${user.id}/test-attempts`
            );
            setAttemptedTests(attemptsResponse.data || []);
          } catch (attemptsErr) {
            console.warn('Failed to load user attempts:', attemptsErr);
            setAttemptedTests([]);
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Failed to load tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchTests();
    }
  }, [user, authLoading]);

  const handleStartTest = (testId) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: `/tests/${testId}`,
          message: 'Please login to take the test' 
        } 
      });
      return;
    }
    navigate(`/tests/${testId}`);
  };

  const getFilteredAndSortedTests = () => {
    let filtered = [...tests];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(test => 
        test.title.toLowerCase().includes(searchLower) ||
        test.description.toLowerCase().includes(searchLower) ||
        test.category?.toLowerCase().includes(searchLower)
      );
    }

    if (filter !== 'all' && user) {
      filtered = filtered.filter(test => {
        const isAttempted = attemptedTests.includes(test._id);
        return filter === 'attempted' ? isAttempted : !isAttempted;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          return a.duration - b.duration;
        case 'popularity':
          return (testStats[b._id]?.attempts || 0) - (testStats[a._id]?.attempts || 0);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-fuchsia-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading available tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 relative overflow-hidden">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-fuchsia-500/10"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: particle.delay,
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BookOpen className="mr-4 h-8 w-8 text-fuchsia-400" />
              Available Tests
            </h1>
            <p className="text-xl text-gray-300">
              {user ? 'Choose a test to begin your assessment' : 'Log in to take tests'}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                  boxShadow: isSearchFocused ? "0 0 20px rgba(217, 70, 239, 0.5)" : "none"
                }}
                className="relative"
              >
                <Search 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200
                    ${isSearchFocused ? 'text-fuchsia-400' : 'text-gray-400'}`} 
                  size={20} 
                />
                <input
                  type="text"
                  placeholder="Search tests by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/70 backdrop-blur-md text-white rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all duration-200 placeholder-gray-500 border border-gray-700"
                />
              </motion.div>
            </div>

            {user && (
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-800/70 backdrop-blur-md text-white rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:outline-none cursor-pointer hover:bg-gray-700/70 transition-colors duration-200 border border-gray-700"
                >
                  <option value="all">All Tests</option>
                  <option value="attempted">Attempted</option>
                  <option value="notAttempted">Not Attempted</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-800/70 backdrop-blur-md text-white rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:outline-none cursor-pointer hover:bg-gray-700/70 transition-colors duration-200 border border-gray-700"
                >
                  <option value="date">Latest</option>
                  <option value="title">Title</option>
                  <option value="duration">Duration</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {getFilteredAndSortedTests().map((test, index) => (
              <motion.div
                key={test._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">
                        {test.title}
                      </h2>
                      <p className="text-gray-400 text-sm line-clamp-2">{test.description}</p>
                    </div>
                    {user && (
                      attemptedTests.includes(test._id) ? (
                        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm flex items-center border border-green-800">
                          <CheckCircle size={16} className="mr-1" />
                          Completed
                        </span>
                      ) : (
                        <span className="bg-fuchsia-900/30 text-fuchsia-400 px-3 py-1 rounded-full text-sm flex items-center border border-fuchsia-800">
                          <Star size={16} className="mr-1" />
                          New
                        </span>
                      )
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <Timer size={16} className="mr-2 text-fuchsia-500" />
                      <span>{test.duration} minutes</span>
                    </div>
                    
                    {testStats[test._id] && (
                      <div className="flex items-center text-gray-400">
                        <Users size={16} className="mr-2 text-fuchsia-500" />
                        <span>{testStats[test._id].attempts || 0} attempts</span>
                      </div>
                    )}
                    
                    {testStats[test._id]?.avgScore > 0 && (
                      <div className="flex items-center text-gray-400">
                        <Trophy size={16} className="mr-2 text-fuchsia-500" />
                        <span>Avg. Score: {testStats[test._id].avgScore}%</span>
                      </div>
                    )}

                    {test.category && (
                      <div className="flex items-center text-gray-400">
                        <GraduationCap size={16} className="mr-2 text-fuchsia-500" />
                        <span>{test.category}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartTest(test._id)}
                    className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center justify-center group hover:from-fuchsia-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-fuchsia-500/20"
                  >
                    {user ? 'Start Test' : 'Login to Start'}
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {getFilteredAndSortedTests().length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <XCircle className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No tests found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestList;
