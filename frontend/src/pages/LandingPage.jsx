import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, Star, ArrowRight, Menu, X, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




export default function AppointmentLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();


  const signupHandle = () => {
    navigate('/signup');
  };
  const loginHandle = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered scheduling that finds the perfect time slots for everyone"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about appointment changes and reminders"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly coordinate appointments across teams and departments"
    }
  ];

  const testimonials = [
    {
      name: "Shreyansh Jain",
      role: "Business Owner",
      content: "This app transformed how we manage appointments. Our no-show rate dropped by 80%!",
      rating: 5
    },
    {
      name: "Dr. Kartik Mehta",
      role: "Healthcare Provider",
      content: "The automated reminders and easy rescheduling features save us hours every week.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Bookify
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4">
            <div className="px-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-blue-600">Reviews</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Schedule Smarter,
                  </span>
                  <br />
                  <span className="text-gray-900">Work Better</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                 Time is the one resource we can never earn back. Every missed appointment is a missed opportunity for growth, for connection, for success. That’s why we built this platform:
                  to help you take control of your schedule, 
                  eliminate the chaos of double bookings, 
                  and make every minute count. 
                  <br />
                  
                  Because when your time is organized, your goals are closer than ever.
                </p>
              </div>
             
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">Trusted by 10+ businesses</span>
              </div>
            </div>
            
            <div className="relative lg:ml-auto">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
                {/* CTA Card */}
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
                    <p className="text-gray-600 text-lg">Join thousands of professionals who trust Bookify for their scheduling needs</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button onClick={signupHandle} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                      <span>Start with Us</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button onClick={loginHandle} className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300">
                      Already have an account?
                    </button>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.9/5 rating</span>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-1 text-green-500" />
                          <span>Secure</span>
                        </div>
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                          <span>Fast Setup</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-blue-500" />
                          <span>20+ Users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 rounded-full animate-pulse opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage appointments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your scheduling process and delight your customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by businesses worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See what our customers are saying about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-blue-100">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your scheduling?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of businesses already using Bookify to streamline their operations
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Bookify</span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="/policy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/policy" className="hover:text-white transition-colors">Terms</a>
              <a href="/policy" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 bookify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}