// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Edit, Trash, Save, ArrowLeft } from 'lucide-react';
// import axios from 'axios';

// const QuestionManager = () => {
//   const { testId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [newQuestion, setNewQuestion] = useState({
//     text: '',
//     options: ['', '', '', ''],
//     correctAnswer: ''
//   });

//   useEffect(() => {
//     fetchQuestions();
//   }, [testId]);

//   const fetchQuestions = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
//       const fetchedQuestions = response.data.questions || [];
      
//       const validQuestions = fetchedQuestions.filter(q => 
//         q.text && 
//         Array.isArray(q.options) && 
//         q.options.length > 0 && 
//         q.correctAnswer
//       );
      
//       setQuestions(fetchedQuestions);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching questions:', err);
//       setError('Failed to fetch questions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...newQuestion.options];
//     newOptions[index] = value;
//     setNewQuestion({ ...newQuestion, options: newOptions });
//   };

//   const handleCreateQuestion = async () => {
//     try {
//       if (!newQuestion.text.trim()) {
//         setError('Question text is required');
//         return;
//       }

//       const validOptions = newQuestion.options.filter(opt => opt.trim() !== '');
//       if (validOptions.length < 2) {
//         setError('At least two options are required');
//         return;
//       }

//       if (!newQuestion.correctAnswer) {
//         setError('Please select a correct answer');
//         return;
//       }

//       await axios.post(`http://localhost:5000/api/tests/${testId}/questions`, {
//         ...newQuestion,
//         options: validOptions
//       });

//       await fetchQuestions();
//       setNewQuestion({
//         text: '',
//         options: ['', '', '', ''],
//         correctAnswer: ''
//       });
//       setError(null);
//     } catch (err) {
//       console.error('Error creating question:', err);
//       setError('Failed to create question');
//     }
//   };

//   const handleDeleteQuestion = async (questionId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tests/${testId}/questions/${questionId}`);
//       await fetchQuestions();
//     } catch (err) {
//       console.error('Error deleting question:', err);
//       setError('Failed to delete question');
//     }
//   };

//   const handleUpdateQuestion = async (questionId) => {
//     try {
//       if (!editingQuestion.text.trim()) {
//         setError('Question text is required');
//         return;
//       }

//       const validOptions = editingQuestion.options.filter(opt => opt.trim() !== '');
//       if (validOptions.length < 2) {
//         setError('At least two options are required');
//         return;
//       }

//       await axios.put(`http://localhost:5000/api/tests/${testId}/questions/${questionId}`, {
//         ...editingQuestion,
//         options: validOptions
//       });

//       setEditingQuestion(null);
//       await fetchQuestions();
//     } catch (err) {
//       console.error('Error updating question:', err);
//       setError('Failed to update question');
//     }
//   };

//   const downloadQuestionsPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text(`Test Questions - Test ID: ${testId}`, 10, 10);
//     doc.setFontSize(12);

//     let yPosition = 30;

//     questions.forEach((question, index) => {
//       // Add question text
//       doc.text(`Q${index + 1}: ${question.text}`, 10, yPosition);
//       yPosition += 10;

//       // Add options
//       question.options.forEach((option, optIndex) => {
//         doc.text(`  ${optIndex + 1}. ${option}`, 15, yPosition);
//         yPosition += 8;
//       });

//       // Add correct answer
//       doc.text(`Correct Answer: ${question.correctAnswer}`, 10, yPosition);
//       yPosition += 20; // Add extra space between questions
//     });

//     doc.save(`Test-Questions-${testId}.pdf`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 py-8 pt-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             Manage Questions
//           </h2>
//           <motion.button
//             className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-pink-700 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={downloadQuestionsPDF}
//           >
//             <Download size={16} className="mr-2" />
//             Download PDF
//           </motion.button>
//         </div>

//         {/* Add New Question Section */}
//         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 mb-8">
//           <h3 className="text-xl font-semibold text-white mb-6">Add New Question</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Question Text</label>
//               <textarea
//                 className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 value={newQuestion.text}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
//                 placeholder="Enter your question"
//                 rows={3}
//               />
//             </div>

//             {newQuestion.options.map((option, index) => (
//               <div key={index}>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Option {index + 1}
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   placeholder={`Enter option ${index + 1}`}
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Correct Answer
//               </label>
//               <select
//                 className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 value={newQuestion.correctAnswer}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
//               >
//                 <option value="">Select correct answer</option>
//                 {newQuestion.options.map((option, index) => (
//                   option && (
//                     <option key={index} value={option}>
//                       {option}
//                     </option>
//                   )
//                 ))}
//               </select>
//             </div>

//             {error && (
//               <div className="bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
//                 {error}
//               </div>
//             )}

//             <motion.button
//               className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-700 transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleCreateQuestion}
//             >
//               <Plus size={20} className="mr-2" />
//               Add Question
//             </motion.button>
//           </div>
//         </div>

//         {/* Questions List */}
//         <div className="space-y-4">
//           {questions.length === 0 ? (
//             <div className="text-center py-8 text-gray-400 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50">
//               No questions added yet.
//             </div>
//           ) : (
//             questions.map((question, index) => (
//               <motion.div
//                 key={question._id || index}
//                 className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 {editingQuestion && editingQuestion._id === question._id ? (
//                   <div className="space-y-4">
//                     <textarea
//                       className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
//                       value={editingQuestion.text}
//                       onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
//                       placeholder="Question text"
//                       rows={3}
//                     />
//                     {editingQuestion.options.map((option, optIndex) => (
//                       <input
//                         key={optIndex}
//                         type="text"
//                         className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
//                         value={option}
//                         onChange={(e) => {
//                           const newOptions = [...editingQuestion.options];
//                           newOptions[optIndex] = e.target.value;
//                           setEditingQuestion({ ...editingQuestion, options: newOptions });
//                         }}
//                         placeholder={`Option ${optIndex + 1}`}
//                       />
//                     ))}
//                     <select
//                       className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
//                       value={editingQuestion.correctAnswer}
//                       onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
//                     >
//                       <option value="">Select correct answer</option>
//                       {editingQuestion.options.map((option, optIndex) => (
//                         option && (
//                           <option key={optIndex} value={option}>
//                             {option}
//                           </option>
//                         )
//                       ))}
//                     </select>
//                     <div className="flex space-x-2">
//                       <motion.button
//                         className="bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleUpdateQuestion(question._id)}
//                       >
//                         <Save size={16} className="mr-2" />
//                         Save
//                       </motion.button>
//                       <motion.button
//                         className="bg-gray-600/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setEditingQuestion(null)}
//                       >
//                         Cancel
//                       </motion.button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <p className="text-lg font-medium text-white mb-4">{question.text}</p>
//                     <ul className="space-y-2 mb-4">
//                       {question.options && question.options.map((option, optIndex) => (
//                         <li
//                           key={optIndex}
//                           className={`pl-4 py-2 rounded-lg ${
//                             option === question.correctAnswer
//                               ? 'bg-green-500/20 text-green-400'
//                               : 'text-gray-300'
//                           }`}
//                         >
//                           {option}
//                         </li>
//                       ))}
//                     </ul>
//                     <div className="flex space-x-2">
//                       <motion.button
//                         className="bg-yellow-500/80 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setEditingQuestion({ ...question })}
//                       >
//                         <Edit size={16} className="mr-2" />
//                         Edit
//                       </motion.button>
//                       <motion.button
//                         className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleDeleteQuestion(question._id)}
//                       >
//                         <Trash size={16} className="mr-2" />
//                         Delete
//                       </motion.button>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionManager;

"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash, Save, ArrowLeft, Download } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';

const QuestionManager = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
      const fetchedQuestions = response.data.questions || [];
      
      const validQuestions = fetchedQuestions.filter(q => 
        q.text && 
        Array.isArray(q.options) && 
        q.options.length > 0 && 
        q.correctAnswer
      );
      
      setQuestions(fetchedQuestions);
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const handleCreateQuestion = async () => {
    try {
      if (!newQuestion.text.trim()) {
        setError('Question text is required');
        return;
      }

      const validOptions = newQuestion.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        setError('At least two options are required');
        return;
      }

      if (!newQuestion.correctAnswer) {
        setError('Please select a correct answer');
        return;
      }

      await axios.post(`http://localhost:5000/api/tests/${testId}/questions`, {
        ...newQuestion,
        options: validOptions
      });

      await fetchQuestions();
      setNewQuestion({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      });
      setError(null);
    } catch (err) {
      console.error('Error creating question:', err);
      setError('Failed to create question');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tests/${testId}/questions/${questionId}`);
      await fetchQuestions();
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question');
    }
  };

  const handleUpdateQuestion = async (questionId) => {
    try {
      if (!editingQuestion.text.trim()) {
        setError('Question text is required');
        return;
      }

      const validOptions = editingQuestion.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        setError('At least two options are required');
        return;
      }

      await axios.put(`http://localhost:5000/api/tests/${testId}/questions/${questionId}`, {
        ...editingQuestion,
        options: validOptions
      });

      setEditingQuestion(null);
      await fetchQuestions();
    } catch (err) {
      console.error('Error updating question:', err);
      setError('Failed to update question');
    }
  };

  const downloadQuestionsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Test Questions - Test ID: ${testId}`, 10, 10);
    doc.setFontSize(12);

    let yPosition = 30;

    questions.forEach((question, index) => {
      // Add question text
      doc.text(`Q${index + 1}: ${question.text}`, 10, yPosition);
      yPosition += 10;

      // Add options
      question.options.forEach((option, optIndex) => {
        doc.text(`  ${optIndex + 1}. ${option}`, 15, yPosition);
        yPosition += 8;
      });

      // Add correct answer
      doc.text(`Correct Answer: ${question.correctAnswer}`, 10, yPosition);
      yPosition += 20; // Add extra space between questions
    });

    doc.save(`Test-Questions-${testId}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Manage Questions
          </h2>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-pink-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadQuestionsPDF}
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </motion.button>
        </div>

        {/* Add New Question Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Add New Question</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Question Text</label>
              <textarea
                className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                placeholder="Enter your question"
                rows={3}
              />
            </div>

            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Correct Answer
              </label>
              <select
                className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newQuestion.correctAnswer}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              >
                <option value="">Select correct answer</option>
                {newQuestion.options.map((option, index) => (
                  option && (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-700 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateQuestion}
            >
              <Plus size={20} className="mr-2" />
              Add Question
            </motion.button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50">
              No questions added yet.
            </div>
          ) : (
            questions.map((question, index) => (
              <motion.div
                key={question._id || index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {editingQuestion && editingQuestion._id === question._id ? (
                  <div className="space-y-4">
                    <textarea
                      className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
                      value={editingQuestion.text}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                      placeholder="Question text"
                      rows={3}
                    />
                    {editingQuestion.options.map((option, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...editingQuestion.options];
                          newOptions[optIndex] = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: newOptions });
                        }}
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    ))}
                    <select
                      className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white p-3"
                      value={editingQuestion.correctAnswer}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
                    >
                      <option value="">Select correct answer</option>
                      {editingQuestion.options.map((option, optIndex) => (
                        option && (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        )
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <motion.button
                        className="bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateQuestion(question._id)}
                      >
                        <Save size={16} className="mr-2" />
                        Save
                      </motion.button>
                      <motion.button
                        className="bg-gray-600/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingQuestion(null)}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-white mb-4">{question.text}</p>
                    <ul className="space-y-2 mb-4">
                      {question.options && question.options.map((option, optIndex) => (
                        <li
                          key={optIndex}
                          className={`pl-4 py-2 rounded-lg ${
                            option === question.correctAnswer
                              ? 'bg-green-500/20 text-green-400'
                              : 'text-gray-300'
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <div className="flex space-x-2">
                      <motion.button
                        className="bg-yellow-500/80 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingQuestion({ ...question })}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </motion.button>
                      <motion.button
                        className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        <Trash size={16} className="mr-2" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionManager;