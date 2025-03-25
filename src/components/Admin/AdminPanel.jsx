

"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, BookOpen, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [newTest, setNewTest] = useState({ title: '', description: '', duration: 60 });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tests');
      setTests(response.data || []);
    } catch (err) {
      console.error('Error fetching tests:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    try {
      await axios.post('http://localhost:5000/api/tests', newTest);
      setNewTest({ title: '', description: '', duration: 60 });
      fetchTests();
    } catch (err) {
      console.error('Error creating test:', err);
      setError(err.message);
    }
  };

  const handleUpdateTest = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tests/${id}`, editingTest);
      setEditingTest(null);
      fetchTests();
    } catch (err) {
      console.error('Error updating test:', err);
      setError(err.message);
    }
  };

  const handleDeleteTest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tests/${id}`);
      fetchTests();
    } catch (err) {
      console.error('Error deleting test:', err);
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="text-red-400 bg-red-900/50 px-4 py-2 rounded-lg">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-400">Manage your tests and questions</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Create New Test</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Test Title"
              className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newTest.title}
              onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newTest.description}
              onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              className="w-40 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newTest.duration}
              onChange={(e) => setNewTest({ ...newTest, duration: parseInt(e.target.value) })}
            />
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-700 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateTest}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Test
            </motion.button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Manage Tests</h2>
            <CSVLink 
              data={tests} 
              filename="tests.csv"
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Tests
            </CSVLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tests.map((test) => (
                  <motion.tr
                    key={test._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    {editingTest && editingTest._id === test._id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                            value={editingTest.title}
                            onChange={(e) => setEditingTest({ ...editingTest, title: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                            value={editingTest.description}
                            onChange={(e) => setEditingTest({ ...editingTest, description: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            className="w-24 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                            value={editingTest.duration}
                            onChange={(e) => setEditingTest({ ...editingTest, duration: parseInt(e.target.value) })}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <motion.button
                            className="bg-green-500/80 hover:bg-green-600 text-white p-2 rounded-lg mr-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateTest(test._id)}
                          >
                            <Save className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-300">{test.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{test.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{test.duration} minutes</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <motion.button
                              className="bg-purple-500/80 hover:bg-purple-600 text-white p-2 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => navigate(`/admin/tests/${test._id}/questions`)}
                            >
                              <BookOpen className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              className="bg-yellow-500/80 hover:bg-yellow-600 text-white p-2 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingTest(test)}
                            >
                              <Edit className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteTest(test._id)}
                            >
                              <Trash className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;