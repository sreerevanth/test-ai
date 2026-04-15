import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Code, AlertTriangle, BarChart3, ArrowRight, LogOut, Menu, X } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (email) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ email, name: email.split('@')[0] });
      setCurrentPage('dashboard');
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const pageTransition = { duration: 0.5, ease: 'easeInOut' };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Global Background Effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-purple-950/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5 mix-blend-multiply" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60"%3E%3Cg fill="white"%3E%3Ccircle cx="10" cy="10" r="1"/%3E%3Ccircle cx="40" cy="10" r="1"/%3E%3Ccircle cx="10" cy="40" r="1"/%3E%3Ccircle cx="40" cy="40" r="1"/%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LandingPage onGetStarted={() => setCurrentPage('login')} />
          </motion.div>
        )}

        {currentPage === 'login' && (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginPage
              onSignUp={handleSignUp}
              onBackClick={() => setCurrentPage('landing')}
              isLoading={isLoading}
            />
          </motion.div>
        )}

        {currentPage === 'dashboard' && user && (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <DashboardPage user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative w-16 h-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-75 blur-md" />
            <div className="absolute inset-2 bg-black rounded-full" />
            <div className="absolute inset-1 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-full" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
