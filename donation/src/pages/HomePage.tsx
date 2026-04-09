import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StatCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [stats] = useState<StatCard[]>([
    { icon: '🍜', label: 'Food Donations', value: '0', color: 'from-orange-500 to-red-500' },
    { icon: '💰', label: 'Monetary Donations', value: '₹0', color: 'from-green-500 to-emerald-500' },
    { icon: '👔', label: 'Clothing Items', value: '0', color: 'from-blue-500 to-cyan-500' },
  ]);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const donationTypes = [
    {
      id: 'food',
      title: 'Food Donations',
      description: 'Share nutritious meals and food items with those in need. Help combat hunger in our community.',
      icon: '🍜',
      color: 'from-orange-400 via-orange-500 to-red-500',
      path: '/donate/food',
    },
    {
      id: 'money',
      title: 'Monetary Donations',
      description: 'Contribute funds to support our mission of helping underprivileged families and organizations.',
      icon: '💰',
      color: 'from-green-400 via-emerald-500 to-teal-500',
      path: '/donate/money',
    },
    {
      id: 'clothing',
      title: 'Clothing Donations',
      description: 'Donate gently used clothes and apparel to provide dignity and warmth to those in need.',
      icon: '👔',
      color: 'from-blue-400 via-blue-500 to-cyan-500',
      path: '/donate/clothing',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💝
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">DonateHub</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Connecting Hearts, Changing Lives</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to DonateHub
                </p>
                <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                  Make a <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Real Impact</span> Today
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your generosity transforms lives. Donate food, clothing, or money to help those in need. Every contribution counts.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Start Donating
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square">
                {/* Floating cards */}
                <div
                  className="absolute top-0 right-0 w-48 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500"
                  style={{ transform: `translateY(${scrollY * 0.1}px) rotate(-12deg)` }}
                >
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <p className="text-4xl mb-2">🍜</p>
                      <p className="font-semibold">Food Aid</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-40 left-0 w-48 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500"
                  style={{ transform: `translateY(${scrollY * 0.15}px) rotate(12deg)` }}
                >
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <p className="text-4xl mb-2">💰</p>
                      <p className="font-semibold">Fund Support</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 right-12 w-48 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                  style={{ transform: `translateY(${scrollY * 0.12}px) rotate(-6deg)` }}
                >
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <p className="text-4xl mb-2">👔</p>
                      <p className="font-semibold">Clothing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Types Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Choose Your Way to Help
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Select the type of donation that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {donationTypes.map((type, idx) => (
              <div
                key={type.id}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="relative h-full overflow-hidden backdrop-blur-sm group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 bg-white dark:bg-slate-800 rounded-2xl p-6">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative space-y-6 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="text-6xl">{type.icon}</div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} opacity-20 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {type.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(type.path)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r ${type.color} text-white hover:shadow-lg transform hover:scale-105`}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white">Why Choose DonateHub?</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: '✓',
                    title: 'Transparent Tracking',
                    description: 'Track your donations in real-time and see the impact you make.',
                  },
                  {
                    icon: '✓',
                    title: 'Secure Transactions',
                    description: 'Your data and donations are protected with enterprise-grade security.',
                  },
                  {
                    icon: '✓',
                    title: 'Multiple Options',
                    description: 'Donate food, money, or clothing based on your preferences.',
                  },
                  {
                    icon: '✓',
                    title: 'Community Impact',
                    description: 'Join thousands of donors making a real difference in lives.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Column */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '10K+', label: 'Active Donors' },
                { value: '50K+', label: 'Lives Helped' },
                { value: '₹5Cr+', label: 'Raised' },
                { value: '24/7', label: 'Support' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join our community of generous donors and help us create a world where everyone has access to basic necessities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
              >
                Already a Member?
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">💝 DonateHub</p>
                <p className="text-slate-600 dark:text-slate-400">Connecting hearts, changing lives through generosity.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li><button onClick={() => navigate('/donate/food')} className="hover:text-blue-600 transition">Donate Food</button></li>
                  <li><button onClick={() => navigate('/donate/money')} className="hover:text-blue-600 transition">Donate Money</button></li>
                  <li><button onClick={() => navigate('/donate/clothing')} className="hover:text-blue-600 transition">Donate Clothing</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li><a href="mailto:support@donatehub.com" className="hover:text-blue-600 transition">Email us</a></li>
                  <li><a href="tel:+919876543210" className="hover:text-blue-600 transition">Call us</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400">
              <p>© 2024 DonateHub. All rights reserved. 💝 Connecting hearts, changing lives through generous donations.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Add animations to index.css */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
