import React, { useState } from 'react';
import { Eye, EyeOff, Mail,AlertCircle,X, Lock, User, UserCheck } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const showNotification = (message, type = 'success') => {
   setNotification({ message, type });
   setTimeout(() => {
     setNotification(null);
   }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/signup',formData); 
        showNotification('Signup successful! Please log in.', 'success');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
    showNotification(error.response?.data?.message || error.message, 'error');
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>
      {/* Put this right after: <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"> */}

{notification && (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    notification.type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`}>
    <div className="flex items-center space-x-2">
      {notification.type === 'success' ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="font-medium">{notification.message}</span>
      <button 
        onClick={() => setNotification(null)}
        className="ml-auto hover:bg-white hover:bg-opacity-20 rounded p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
)}

      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join us today and get started</p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 block">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                    formData.role === 'user' 
                      ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg' 
                      : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20'
                  }`}>
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">User</span>
                  </div>
                </label>
                
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="serviceProvider"
                    checked={formData.role === 'serviceProvider'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                    formData.role === 'serviceProvider' 
                      ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg' 
                      : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20'
                  }`}>
                    <UserCheck className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Provider</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="cursor-pointer w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{' '}
              <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
