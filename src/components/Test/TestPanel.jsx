

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   AlertTriangle, Clock, CheckCircle, AlertCircle,
//   X, ChevronLeft, ChevronRight 
// } from 'lucide-react';

// const TestPanel = () => {
//   const { user } = useAuth();
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [test, setTest] = useState(null);
//   const [shuffledQuestions, setShuffledQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [warningCount, setWarningCount] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const maxWarnings = 3;
//   const timerRef = useRef(null);
//   const tabSwitchCount = useRef(0);
//   const questionNavRef = useRef(null);
//   const lastWarningRef = useRef(null);

//   const shuffleQuestions = (questions) => {
//     const shuffled = [...questions];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

  
//   const enterFullScreen = async () => {
//     try {
//       const element = document.documentElement;
      
//       if (!document.fullscreenEnabled && 
//           !document.webkitFullscreenEnabled && 
//           !document.mozFullScreenEnabled && 
//           !document.msFullscreenEnabled) {
//         alert('Fullscreen is not supported by your browser. Please use a modern browser.');
//         return false;
//       }

//       if (element.requestFullscreen) {
//         await element.requestFullscreen();
//       } else if (element.mozRequestFullScreen) {
//         await element.mozRequestFullScreen();
//       } else if (element.webkitRequestFullscreen) {
//         await element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//       } else if (element.msRequestFullscreen) {
//         await element.msRequestFullscreen();
//       }

//       return !!(
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement
//       );
//     } catch (err) {
//       console.error('Fullscreen error:', err);
//       return false;
//     }
//   };

//   const exitFullScreen = async () => {
//     try {
//       if (document.exitFullscreen) {
//         await document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         await document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         await document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         await document.msExitFullscreen();
//       }
//     } catch (err) {
//       console.error('Error exiting fullscreen:', err);
//     }
//   };

  
//   const handleFullScreenChange = useCallback(() => {
//     const isCurrentlyFullScreen = !!(
//       document.fullscreenElement ||
//       document.webkitFullscreenElement ||
//       document.mozFullScreenElement ||
//       document.msFullscreenElement
//     );

//     setIsFullScreen(isCurrentlyFullScreen);

//     if (!isCurrentlyFullScreen && !submitted) {
//       handleWarning('Fullscreen mode is recommended');
//       enterFullScreen().catch(() => {
//         console.log('Failed to re-enter fullscreen');
//       });
//     }
//   }, [submitted]);

  
//   const handleVisibilityChange = useCallback(() => {
//     if (document.hidden && !submitted) {
//       tabSwitchCount.current += 1;
//       handleWarning('Tab switching detected');
      
//       if (tabSwitchCount.current >= maxWarnings) {
//         handleAutoSubmit('Multiple tab switches detected');
//       }
//     }
//   }, [submitted]);

  
//   const handleWarning = (message) => {
//     const now = Date.now();
//     if (lastWarningRef.current && now - lastWarningRef.current < 1000) {
//       return; 
//     }
//     lastWarningRef.current = now;

//     setWarningCount(prev => {
//       const newCount = prev + 1;
//       if (newCount >= maxWarnings) {
//         handleAutoSubmit('Maximum warnings reached');
//         return prev;
//       }
//       alert(`Warning ${newCount}/${maxWarnings}: ${message}`);
//       return newCount;
//     });
//   };

  
//   const handleAutoSubmit = async (reason) => {
//     alert(`Test auto-submitted: ${reason}`);
//     await handleSubmit(true);
//   };

  
//   const scrollToQuestion = (index) => {
//     if (questionNavRef.current) {
//       const questionElement = questionNavRef.current.children[index];
//       if (questionElement) {
//         questionElement.scrollIntoView({
//           behavior: 'smooth',
//           block: 'nearest',
//           inline: 'center'
//         });
//       }
//     }
//   };

  
//   useEffect(() => {
//     const handleContextMenu = (e) => {
//       e.preventDefault();
//       handleWarning('Right-clicking is not allowed');
//     };

//     const handleCopy = (e) => {
//       e.preventDefault();
//       handleWarning('Copying is not allowed');
//     };

//     const handleKeyDown = (e) => {
//       if (e.altKey && e.key === 'Tab') {
//         e.preventDefault();
//         handleWarning('Alt+Tab is not allowed');
//       }

//       if (e.ctrlKey) {
//         if (['c', 'v', 'p'].includes(e.key.toLowerCase())) {
//           e.preventDefault();
//           handleWarning('Keyboard shortcuts are not allowed');
//         }
//       }

//       if (e.key === 'F11') {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('copy', handleCopy);
//     document.addEventListener('paste', handleCopy);
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('fullscreenchange', handleFullScreenChange);
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('copy', handleCopy);
//       document.removeEventListener('paste', handleCopy);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('fullscreenchange', handleFullScreenChange);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [handleFullScreenChange, handleVisibilityChange]);

  
//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
//         const testData = response.data;
//         setTest(testData);
//         setShuffledQuestions(shuffleQuestions(testData.questions));
//         setTimeLeft(testData.duration * 60);
//         setLoading(false);
        
//         const fullscreenSuccess = await enterFullScreen();
//         if (!fullscreenSuccess) {
//           console.log('Continuing without fullscreen mode');
//         }
//       } catch (err) {
//         setError('Failed to load test');
//         setLoading(false);
//       }
//     };

//     fetchTest();
//   }, [testId]);

  
//   useEffect(() => {
//     if (timeLeft === null || submitted) return;

//     timerRef.current = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleAutoSubmit('Time expired');
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [timeLeft, submitted]);

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const getSubmissionSummary = () => {
//     const totalQuestions = shuffledQuestions.length;
//     const attemptedQuestions = Object.keys(answers).length;
//     const unattemptedQuestions = shuffledQuestions
//       .map((q, index) => ({ ...q, index }))
//       .filter(q => !answers[q._id]);

//     return {
//       totalQuestions,
//       attemptedQuestions,
//       unattemptedQuestions
//     };
//   };

//   const handleSubmit = async (isAutoSubmit = false) => {
//     try {
//       if (submitted) return;
      
//       setSubmitted(true);
//       clearInterval(timerRef.current);

//       const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
//         questionId,
//         answer
//       }));

//       const response = await axios.post(
//         `http://localhost:5000/api/tests/${testId}/submit`,
//         { 
//           answers: formattedAnswers,
//           userId: user.id,
//           autoSubmitted: isAutoSubmit
//         }
//       );

//       console.log('Submission response:', response.data);

//       await exitFullScreen().catch(err => {
//         console.log('Error exiting fullscreen:', err);
//       });

//       navigate('/dashboard', {
//         state: {
//           score: response.data.score,
//           totalQuestions: response.data.totalQuestions,
//           correctAnswers: response.data.correctAnswers,
//           autoSubmitted: isAutoSubmit
//         }
//       });
//     } catch (err) {
//       console.error('Error submitting test:', err);
//       setError(err.response?.data?.message || 'Failed to submit test');
//       setSubmitted(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="text-center">
//           <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//           <h2 className="text-2xl font-bold mb-2">Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <div className="max-w-4xl mx-auto">
        
//         {warningCount > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-6"
//           >
//             Warning {warningCount}/{maxWarnings}: Further violations will result in automatic submission
//           </motion.div>
//         )}

        
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">{test.title}</h1>
//           <div className="flex items-center gap-4">
//             <span className="px-4 py-2 bg-gray-800 rounded-lg">
//               Question {currentQuestion + 1}/{shuffledQuestions.length}
//             </span>
//             <span className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
//               <Clock size={20} />
//               {formatTime(timeLeft)}
//             </span>
//           </div>
//         </div>

        
//         <div className="mb-6 relative">
//           <button 
//             onClick={() => questionNavRef.current.scrollBy(-100, 0)}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
//           >
//             <ChevronLeft size={20} />
//           </button>
          
//           <div 
//             ref={questionNavRef}
//             className="flex overflow-x-auto space-x-2 py-2 px-8 bg-gray-800 rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             {shuffledQuestions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
//                   currentQuestion === index
//                     ? 'bg-blue-500 text-white'
//                     : answers[shuffledQuestions[index]._id]
//                     ? 'bg-green-500/20 text-green-500'
//                     : 'bg-gray-700 hover:bg-gray-600'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>

//           <button 
//             onClick={() => questionNavRef.current.scrollBy(100, 0)}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

        
//         <motion.div
//           key={currentQuestion}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg"
//         >
//           <h2 className="text-xl mb-4">{shuffledQuestions[currentQuestion].text}</h2>
//           <div className="space-y-4">
//             {shuffledQuestions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswer(shuffledQuestions[currentQuestion]._id, option)}
//                 className={`w-full p-4 text-left rounded-lg transition-colors ${
//                   answers[shuffledQuestions[currentQuestion]._id] === option
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-700 hover:bg-gray-600'
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </motion.div>

        
//         <div className="flex justify-between">
//           <button
//             onClick={() => {
//               setCurrentQuestion(prev => {
//                 const newIndex = Math.max(0, prev - 1);
//                 scrollToQuestion(newIndex);
//                 return newIndex;
//               });
//             }}
//             disabled={currentQuestion === 0}
//             className="px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
          
//           {currentQuestion === shuffledQuestions.length - 1 ? (
//             <button
//               onClick={() => setShowSubmitModal(true)}
//               disabled={submitted}
//               className="px-6 py-2 bg-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Review & Submit
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 setCurrentQuestion(prev => {
//                   const newIndex = Math.min(shuffledQuestions.length - 1, prev + 1);
//                   scrollToQuestion(newIndex);
//                   return newIndex;
//                 });
//               }}
//               className="px-6 py-2 bg-blue-500 rounded-lg"
//             >
//               Next
//             </button>
//           )}
//         </div>

        
//         <AnimatePresence>
//           {showSubmitModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.95 }}
//                 className="bg-gray-800 rounded-xl p-6 max-w-lg w-full"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-xl font-bold">Submission Summary</h2>
//                   <button
//                     onClick={() => setShowSubmitModal(false)}
//                     className="p-1 hover:bg-gray-700 rounded-lg"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {(() => {
//                     const summary = getSubmissionSummary();
//                     return (
//                       <>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Total Questions</span>
//                           <span className="font-bold">{summary.totalQuestions}</span>
//                         </div>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Attempted Questions</span>
//                           <span className="font-bold">{summary.attemptedQuestions}</span>
//                         </div>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Unattempted Questions</span>
//                           <span className="font-bold">{summary.unattemptedQuestions.length}</span>
//                         </div>

//                         {summary.unattemptedQuestions.length > 0 && (
//                           <div className="p-4 bg-gray-700 rounded-lg">
//                             <p className="mb-2">Unattempted Question Numbers:</p>
//                             <div className="flex flex-wrap gap-2">
//                               {summary.unattemptedQuestions.map((q) => (
//                                 <button
//                                   key={q._id}
//                                   onClick={() => {
//                                     setCurrentQuestion(q.index);
//                                     setShowSubmitModal(false);
//                                   }}
//                                   className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500"
//                                 >
//                                   {q.index + 1}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     );
//                   })()}

//                   <div className="flex justify-end gap-4 mt-6">
//                     <button
//                       onClick={() => setShowSubmitModal(false)}
//                       className="px-4 py-2 bg-gray-700 rounded-lg"
//                     >
//                       Review Test
//                     </button>
//                     <button
//                       onClick={() => handleSubmit()}
//                       className="px-4 py-2 bg-green-500 rounded-lg"
//                     >
//                       Submit Test
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default TestPanel;




// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import {
//   AlertTriangle, Clock, CheckCircle, AlertCircle,
//   X, ChevronLeft, ChevronRight
// } from 'lucide-react';

// const TestPanel = () => {
//   const { user } = useAuth();
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [test, setTest] = useState(null);
//   const [shuffledQuestions, setShuffledQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [warningCount, setWarningCount] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const maxWarnings = 3;
//   const timerRef = useRef(null);
//   const tabSwitchCount = useRef(0);
//   const questionNavRef = useRef(null);
//   const lastWarningRef = useRef(null);

//   const shuffleQuestions = (questions) => {
//     const shuffled = [...questions];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   const enterFullScreen = async () => {
//     try {
//       const element = document.documentElement;

//       if (!document.fullscreenEnabled &&
//           !document.webkitFullscreenEnabled &&
//           !document.mozFullScreenEnabled &&
//           !document.msFullscreenEnabled) {
//         alert('Fullscreen is not supported by your browser. Please use a modern browser.');
//         return false;
//       }

//       if (element.requestFullscreen) {
//         await element.requestFullscreen();
//       } else if (element.mozRequestFullScreen) {
//         await element.mozRequestFullScreen();
//       } else if (element.webkitRequestFullscreen) {
//         await element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//       } else if (element.msRequestFullscreen) {
//         await element.msRequestFullscreen();
//       }

//       return !!(
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement
//       );
//     } catch (err) {
//       console.error('Fullscreen error:', err);
//       return false;
//     }
//   };

//   const exitFullScreen = async () => {
//     try {
//       if (document.exitFullscreen) {
//         await document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         await document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         await document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         await document.msExitFullscreen();
//       }
//     } catch (err) {
//       console.error('Error exiting fullscreen:', err);
//     }
//   };

//   const handleFullScreenChange = useCallback(() => {
//     const isCurrentlyFullScreen = !!(
//       document.fullscreenElement ||
//       document.webkitFullscreenElement ||
//       document.mozFullScreenElement ||
//       document.msFullscreenElement
//     );

//     setIsFullScreen(isCurrentlyFullScreen);

//     if (!isCurrentlyFullScreen && !submitted) {
//       handleWarning('Fullscreen mode is recommended');
//       enterFullScreen().catch(() => {
//         console.log('Failed to re-enter fullscreen');
//       });
//     }
//   }, [submitted]);

//   const handleVisibilityChange = useCallback(() => {
//     if (document.hidden && !submitted) {
//       tabSwitchCount.current += 1;
//       handleWarning('Tab switching detected');

//       if (tabSwitchCount.current >= maxWarnings) {
//         handleAutoSubmit('Multiple tab switches detected');
//       }
//     }
//   }, [submitted]);

//   const handleWarning = (message) => {
//     const now = Date.now();
//     if (lastWarningRef.current && now - lastWarningRef.current < 1000) {
//       return;
//     }
//     lastWarningRef.current = now;

//     setWarningCount(prev => {
//       const newCount = prev + 1;
//       if (newCount >= maxWarnings) {
//         handleAutoSubmit('Maximum warnings reached');
//         return prev;
//       }
//       alert(`Warning ${newCount}/${maxWarnings}: ${message}`);
//       return newCount;
//     });
//   };

//   const handleAutoSubmit = async (reason) => {
//     alert(`Test auto-submitted: ${reason}`);
//     await handleSubmit(true);
//   };

//   const scrollToQuestion = (index) => {
//     if (questionNavRef.current) {
//       const questionElement = questionNavRef.current.children[index];
//       if (questionElement) {
//         questionElement.scrollIntoView({
//           behavior: 'smooth',
//           block: 'nearest',
//           inline: 'center'
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const handleContextMenu = (e) => {
//       e.preventDefault();
//       handleWarning('Right-clicking is not allowed');
//     };

//     const handleCopy = (e) => {
//       e.preventDefault();
//       handleWarning('Copying is not allowed');
//     };

//     const handleKeyDown = (e) => {
//       if (e.altKey && e.key === 'Tab') {
//         e.preventDefault();
//         handleWarning('Alt+Tab is not allowed');
//       }

//       if (e.ctrlKey) {
//         if (['c', 'v', 'p'].includes(e.key.toLowerCase())) {
//           e.preventDefault();
//           handleWarning('Keyboard shortcuts are not allowed');
//         }
//       }

//       if (e.key === 'F11') {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('copy', handleCopy);
//     document.addEventListener('paste', handleCopy);
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('fullscreenchange', handleFullScreenChange);
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('copy', handleCopy);
//       document.removeEventListener('paste', handleCopy);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('fullscreenchange', handleFullScreenChange);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [handleFullScreenChange, handleVisibilityChange]);

//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
//         const testData = response.data;
//         setTest(testData);
//         setShuffledQuestions(shuffleQuestions(testData.questions));
//         setTimeLeft(testData.duration * 60);
//         setLoading(false);

//         const fullscreenSuccess = await enterFullScreen();
//         if (!fullscreenSuccess) {
//           console.log('Continuing without fullscreen mode');
//         }
//       } catch (err) {
//         setError('Failed to load test');
//         setLoading(false);
//       }
//     };

//     fetchTest();
//   }, [testId]);

//   useEffect(() => {
//     if (timeLeft === null || submitted) return;

//     timerRef.current = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleAutoSubmit('Time expired');
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [timeLeft, submitted]);

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const getSubmissionSummary = () => {
//     const totalQuestions = shuffledQuestions.length;
//     const attemptedQuestions = Object.keys(answers).length;
//     const unattemptedQuestions = shuffledQuestions
//       .map((q, index) => ({ ...q, index }))
//       .filter(q => !answers[q._id]);

//     return {
//       totalQuestions,
//       attemptedQuestions,
//       unattemptedQuestions
//     };
//   };

//   const handleSubmit = async (isAutoSubmit = false) => {
//     try {
//       if (submitted) return;

//       setSubmitted(true);
//       clearInterval(timerRef.current);

//       const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
//         questionId,
//         answer
//       }));

//       const response = await axios.post(
//         `http://localhost:5000/api/tests/${testId}/submit`,
//         {
//           answers: formattedAnswers,
//           userId: user.id,
//           autoSubmitted: isAutoSubmit
//         }
//       );

//       console.log('Submission response:', response.data);

//       await exitFullScreen().catch(err => {
//         console.log('Error exiting fullscreen:', err);
//       });

//       navigate('/dashboard', {
//         state: {
//           score: response.data.score,
//           totalQuestions: response.data.totalQuestions,
//           correctAnswers: response.data.correctAnswers,
//           autoSubmitted: isAutoSubmit
//         }
//       });
//     } catch (err) {
//       console.error('Error submitting test:', err);
//       setError(err.response?.data?.message || 'Failed to submit test');
//       setSubmitted(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-fuchsia-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="text-center">
//           <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//           <h2 className="text-2xl font-bold mb-2">Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <div className="max-w-4xl mx-auto">

//         {warningCount > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-6"
//           >
//             Warning {warningCount}/{maxWarnings}: Further violations will result in automatic submission
//           </motion.div>
//         )}

//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">{test.title}</h1>
//           <div className="flex items-center gap-4">
//             <span className="px-4 py-2 bg-gray-800 rounded-lg">
//               Question {currentQuestion + 1}/{shuffledQuestions.length}
//             </span>
//             <span className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
//               <Clock size={20} />
//               {formatTime(timeLeft)}
//             </span>
//           </div>
//         </div>

//         <div className="mb-6 relative">
//           <button
//             onClick={() => questionNavRef.current.scrollBy(-100, 0)}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
//           >
//             <ChevronLeft size={20} />
//           </button>

//           <div
//             ref={questionNavRef}
//             className="flex overflow-x-auto space-x-2 py-2 px-8 bg-gray-800 rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             {shuffledQuestions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
//                   currentQuestion === index
//                     ? 'bg-fuchsia-500 text-white'
//                     : answers[shuffledQuestions[index]._id]
//                     ? 'bg-green-500/20 text-green-500'
//                     : 'bg-gray-700 hover:bg-gray-600'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => questionNavRef.current.scrollBy(100, 0)}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         <motion.div
//           key={currentQuestion}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg"
//         >
//           <h2 className="text-xl mb-4">{shuffledQuestions[currentQuestion].text}</h2>
//           <div className="space-y-4">
//             {shuffledQuestions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswer(shuffledQuestions[currentQuestion]._id, option)}
//                 className={`w-full p-4 text-left rounded-lg transition-colors ${
//                   answers[shuffledQuestions[currentQuestion]._id] === option
//                     ? 'bg-fuchsia-500 text-white'
//                     : 'bg-gray-700 hover:bg-gray-600'
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         <div className="flex justify-between">
//           <button
//             onClick={() => {
//               setCurrentQuestion(prev => {
//                 const newIndex = Math.max(0, prev - 1);
//                 scrollToQuestion(newIndex);
//                 return newIndex;
//               });
//             }}
//             disabled={currentQuestion === 0}
//             className="px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           {currentQuestion === shuffledQuestions.length - 1 ? (
//             <button
//               onClick={() => setShowSubmitModal(true)}
//               disabled={submitted}
//               className="px-6 py-2 bg-fuchsia-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Review & Submit
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 setCurrentQuestion(prev => {
//                   const newIndex = Math.min(shuffledQuestions.length - 1, prev + 1);
//                   scrollToQuestion(newIndex);
//                   return newIndex;
//                 });
//               }}
//               className="px-6 py-2 bg-fuchsia-500 rounded-lg"
//             >
//               Next
//             </button>
//           )}
//         </div>

//         <AnimatePresence>
//           {showSubmitModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.95 }}
//                 className="bg-gray-800 rounded-xl p-6 max-w-lg w-full"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-xl font-bold">Submission Summary</h2>
//                   <button
//                     onClick={() => setShowSubmitModal(false)}
//                     className="p-1 hover:bg-gray-700 rounded-lg"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {(() => {
//                     const summary = getSubmissionSummary();
//                     return (
//                       <>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Total Questions</span>
//                           <span className="font-bold">{summary.totalQuestions}</span>
//                         </div>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Attempted Questions</span>
//                           <span className="font-bold">{summary.attemptedQuestions}</span>
//                         </div>
//                         <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
//                           <span>Unattempted Questions</span>
//                           <span className="font-bold">{summary.unattemptedQuestions.length}</span>
//                         </div>

//                         {summary.unattemptedQuestions.length > 0 && (
//                           <div className="p-4 bg-gray-700 rounded-lg">
//                             <p className="mb-2">Unattempted Question Numbers:</p>
//                             <div className="flex flex-wrap gap-2">
//                               {summary.unattemptedQuestions.map((q) => (
//                                 <button
//                                   key={q._id}
//                                   onClick={() => {
//                                     setCurrentQuestion(q.index);
//                                     setShowSubmitModal(false);
//                                   }}
//                                   className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500"
//                                 >
//                                   {q.index + 1}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     );
//                   })()}

//                   <div className="flex justify-end gap-4 mt-6">
//                     <button
//                       onClick={() => setShowSubmitModal(false)}
//                       className="px-4 py-2 bg-gray-700 rounded-lg"
//                     >
//                       Review Test
//                     </button>
//                     <button
//                       onClick={() => handleSubmit()}
//                       className="px-4 py-2 bg-fuchsia-500 rounded-lg"
//                     >
//                       Submit Test
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default TestPanel;



import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  AlertTriangle, Clock, CheckCircle, AlertCircle,
  X, ChevronLeft, ChevronRight, Video
} from 'lucide-react';

const TestPanel = () => {
  const { user } = useAuth();
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const maxWarnings = 3;
  const timerRef = useRef(null);
  const tabSwitchCount = useRef(0);
  const questionNavRef = useRef(null);
  const lastWarningRef = useRef(null);
  const videoRef = useRef(null);

  const shuffleQuestions = (questions) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const enterFullScreen = async () => {
    try {
      const element = document.documentElement;

      if (!document.fullscreenEnabled &&
          !document.webkitFullscreenEnabled &&
          !document.mozFullScreenEnabled &&
          !document.msFullscreenEnabled) {
        alert('Fullscreen is not supported by your browser. Please use a modern browser.');
        return false;
      }

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }

      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    } catch (err) {
      console.error('Fullscreen error:', err);
      return false;
    }
  };

  const exitFullScreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    } catch (err) {
      console.error('Error exiting fullscreen:', err);
    }
  };

  const handleFullScreenChange = useCallback(() => {
    const isCurrentlyFullScreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    setIsFullScreen(isCurrentlyFullScreen);

    if (!isCurrentlyFullScreen && !submitted) {
      handleWarning('Fullscreen mode is recommended');
      enterFullScreen().catch(() => {
        console.log('Failed to re-enter fullscreen');
      });
    }
  }, [submitted]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && !submitted) {
      tabSwitchCount.current += 1;
      handleWarning('Tab switching detected');

      if (tabSwitchCount.current >= maxWarnings) {
        handleAutoSubmit('Multiple tab switches detected');
      }
    }
  }, [submitted]);

  const handleWarning = (message) => {
    const now = Date.now();
    if (lastWarningRef.current && now - lastWarningRef.current < 1000) {
      return;
    }
    lastWarningRef.current = now;

    setWarningCount(prev => {
      const newCount = prev + 1;
      if (newCount >= maxWarnings) {
        handleAutoSubmit('Maximum warnings reached');
        return prev;
      }
      alert(`Warning ${newCount}/${maxWarnings}: ${message}`);
      return newCount;
    });
  };

  const handleAutoSubmit = async (reason) => {
    alert(`Test auto-submitted: ${reason}`);
    await handleSubmit(true);
  };

  const scrollToQuestion = (index) => {
    if (questionNavRef.current) {
      const questionElement = questionNavRef.current.children[index];
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      handleWarning('Right-clicking is not allowed');
    };

    const handleCopy = (e) => {
      e.preventDefault();
      handleWarning('Copying is not allowed');
    };

    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        handleWarning('Alt+Tab is not allowed');
      }

      if (e.ctrlKey) {
        if (['c', 'v', 'p'].includes(e.key.toLowerCase())) {
          e.preventDefault();
          handleWarning('Keyboard shortcuts are not allowed');
        }
      }

      if (e.key === 'F11') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleFullScreenChange, handleVisibilityChange]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
        const testData = response.data;
        setTest(testData);
        setShuffledQuestions(shuffleQuestions(testData.questions));
        setTimeLeft(testData.duration * 60);
        setLoading(false);

        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const fullscreenSuccess = await enterFullScreen();
        if (!fullscreenSuccess) {
          console.log('Continuing without fullscreen mode');
        }
      } catch (err) {
        setError('Failed to load test or access camera');
        setLoading(false);
      }
    };

    fetchTest();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [testId]);

  useEffect(() => {
    if (timeLeft === null || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit('Time expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, submitted]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getSubmissionSummary = () => {
    const totalQuestions = shuffledQuestions.length;
    const attemptedQuestions = Object.keys(answers).length;
    const unattemptedQuestions = shuffledQuestions
      .map((q, index) => ({ ...q, index }))
      .filter(q => !answers[q._id]);

    return {
      totalQuestions,
      attemptedQuestions,
      unattemptedQuestions
    };
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    try {
      if (submitted) return;

      setSubmitted(true);
      clearInterval(timerRef.current);

      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const response = await axios.post(
        `http://localhost:5000/api/tests/${testId}/submit`,
        {
          answers: formattedAnswers,
          userId: user.id,
          autoSubmitted: isAutoSubmit
        }
      );

      console.log('Submission response:', response.data);

      await exitFullScreen().catch(err => {
        console.log('Error exiting fullscreen:', err);
      });

      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }

      navigate('/dashboard', {
        state: {
          score: response.data.score,
          totalQuestions: response.data.totalQuestions,
          correctAnswers: response.data.correctAnswers,
          autoSubmitted: isAutoSubmit
        }
      });
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err.response?.data?.message || 'Failed to submit test');
      setSubmitted(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <div className="max-w-4xl mx-auto">

        {warningCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 text-red-500 p-4 rounded-lg mb-6"
          >
            Warning {warningCount}/{maxWarnings}: Further violations will result in automatic submission
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-gray-800 rounded-lg">
              Question {currentQuestion + 1}/{shuffledQuestions.length}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <Clock size={20} />
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mb-6 relative">
          <button
            onClick={() => questionNavRef.current.scrollBy(-100, 0)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={questionNavRef}
            className="flex overflow-x-auto space-x-2 py-2 px-8 bg-gray-800 rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            style={{ scrollBehavior: 'smooth' }}
          >
            {shuffledQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentQuestion === index
                    ? 'bg-fuchsia-500 text-white'
                    : answers[shuffledQuestions[index]._id]
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => questionNavRef.current.scrollBy(100, 0)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg"
        >
          <h2 className="text-xl mb-4">{shuffledQuestions[currentQuestion].text}</h2>
          <div className="space-y-4">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(shuffledQuestions[currentQuestion]._id, option)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  answers[shuffledQuestions[currentQuestion]._id] === option
                    ? 'bg-fuchsia-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentQuestion(prev => {
                const newIndex = Math.max(0, prev - 1);
                scrollToQuestion(newIndex);
                return newIndex;
              });
            }}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestion === shuffledQuestions.length - 1 ? (
            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={submitted}
              className="px-6 py-2 bg-fuchsia-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review & Submit
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentQuestion(prev => {
                  const newIndex = Math.min(shuffledQuestions.length - 1, prev + 1);
                  scrollToQuestion(newIndex);
                  return newIndex;
                });
              }}
              className="px-6 py-2 bg-fuchsia-500 rounded-lg"
            >
              Next
            </button>
          )}
        </div>

        <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-bold mb-2">Camera Feed</h3>
          <div className="flex justify-center">
            <video ref={videoRef} autoPlay playsInline className="rounded-lg w-32 h-32 object-cover"></video>
          </div>
        </div>

        <AnimatePresence>
          {showSubmitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-gray-800 rounded-xl p-6 max-w-lg w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Submission Summary</h2>
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="p-1 hover:bg-gray-700 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {(() => {
                    const summary = getSubmissionSummary();
                    return (
                      <>
                        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                          <span>Total Questions</span>
                          <span className="font-bold">{summary.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                          <span>Attempted Questions</span>
                          <span className="font-bold">{summary.attemptedQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                          <span>Unattempted Questions</span>
                          <span className="font-bold">{summary.unattemptedQuestions.length}</span>
                        </div>

                        {summary.unattemptedQuestions.length > 0 && (
                          <div className="p-4 bg-gray-700 rounded-lg">
                            <p className="mb-2">Unattempted Question Numbers:</p>
                            <div className="flex flex-wrap gap-2">
                              {summary.unattemptedQuestions.map((q) => (
                                <button
                                  key={q._id}
                                  onClick={() => {
                                    setCurrentQuestion(q.index);
                                    setShowSubmitModal(false);
                                  }}
                                  className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500"
                                >
                                  {q.index + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 bg-gray-700 rounded-lg"
                    >
                      Review Test
                    </button>
                    <button
                      onClick={() => handleSubmit()}
                      className="px-4 py-2 bg-fuchsia-500 rounded-lg"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestPanel;
