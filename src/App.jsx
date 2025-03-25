

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserDashboard from './components/User/UserDashboard';
import AdminPanel from './components/Admin/AdminPanel';
import TestPanel from './components/Test/TestPanel';
import TestList from './components/Test/TestList';
import QuestionManager from './components/Admin/QuestionManager';
import { AuthProvider } from './context/AuthContext';
import UserProtectedRoute from './Protected_Routes/UserProtectedRoute';
import AdminProtectedRoute from './Protected_Routes/AdminProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route element={<UserProtectedRoute />}>
              <Route path="tests" element={<TestList />} />
              <Route path="dashboard" element={<UserDashboard />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="admin" element={<AdminPanel />} />
              <Route path="admin/tests/:testId/questions" element={<QuestionManager />} />
            </Route>
          </Route>

          <Route element={<UserProtectedRoute />}>
            <Route path="/tests/:testId" element={<TestPanel />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;