import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Chrome, Zap } from 'lucide-react';

export default function LoginPage({ onSignUp, onBackClick, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onSignUp(email);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full pointer-events-none -z-10"
          style={{
            background: ['rgba(168, 85, 247, 0.6)', 'rgba(34, 211, 238, 0.6)', 'rgba(168, 85, 247, 0.6)'][i],
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`
          }}
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={onBackClick}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        {/* Main Card with Glassmorphism */}
        <motion.div
          variants={itemVariants}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 -z-10" />

          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 space-y-6">
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Join TestAI' : 'Welcome Back'}
              </h1>
              <p className="text-slate-400">
                {isSignUp ? 'Start testing smarter today' : 'Sign in to your account'}
              </p>
            </motion.div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <motion.label
                  className="block text-sm font-medium text-slate-300 mb-2"
                  animate={{
                    color: emailFocused ? '#a78bfa' : '#cbd5e1'
                  }}
                >
                  Email Address
                </motion.label>
                <div className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                  emailFocused
                    ? 'border-purple-500 bg-slate-800/50'
                    : 'border-slate-700/50 bg-slate-800/20'
                }`}>
                  <Mail className={`absolute left-4 top-3 w-5 h-5 transition-colors ${
                    emailFocused ? 'text-purple-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none"
                  />
                  {emailFocused && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <motion.label
                  className="block text-sm font-medium text-slate-300 mb-2"
                  animate={{
                    color: passwordFocused ? '#a78bfa' : '#cbd5e1'
                  }}
                >
                  Password
                </motion.label>
                <div className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
                  passwordFocused
                    ? 'border-purple-500 bg-slate-800/50'
                    : 'border-slate-700/50 bg-slate-800/20'
                }`}>
                  <Lock className={`absolute left-4 top-3 w-5 h-5 transition-colors ${
                    passwordFocused ? 'text-purple-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none"
                  />
                  {passwordFocused && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full relative group mt-6 px-4 py-3 text-white font-semibold rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center">
                  {isLoading ? 'Signing in...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </span>
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/50 text-slate-400">or continue with</span>
              </div>
            </motion.div>

            {/* Google Button */}
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-700/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800/30 transition-all duration-300"
            >
              <Chrome className="w-5 h-5" />
              Google
            </motion.button>

            {/* Toggle Sign In/Up */}
            <motion.p variants={itemVariants} className="text-center text-slate-400">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </motion.p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p variants={itemVariants} className="text-center text-xs text-slate-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}
