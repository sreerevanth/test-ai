import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, AlertTriangle, BarChart3, ArrowRight, Star } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Auto Test Generation',
      desc: 'Generate comprehensive unit tests from your code automatically'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Edge Case Detection',
      desc: 'Identify corner cases and boundary conditions instantly'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Smart Fuzz Testing',
      desc: 'Intelligent random testing to break your application'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Live Insights',
      desc: 'Real-time dashboards and comprehensive analytics'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          x: mousePos.x * 0.02,
          y: mousePos.y * 0.02
        }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur-xl opacity-50" />
              <div className="relative bg-black px-6 py-3 rounded-lg border border-purple-500/50 flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium text-sm">AI-Powered Testing</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              TestAI
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Generate tests, detect bugs, and achieve coverage with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI-powered precision</span>
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={onGetStarted}
            className="relative group px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 group-hover:gap-3 transition-all">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="text-sm text-slate-400 mt-4"
          >
            No credit card required • Setup in 2 minutes
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 hover:border-purple-600/50 transition-all duration-300 backdrop-blur-xl overflow-hidden"
              whileHover={{ translateY: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 text-center py-12 border-t border-b border-slate-800/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { number: '10K+', label: 'Tests Generated' },
            { number: '99.2%', label: 'Bug Detection Rate' },
            { number: '5000+', label: 'Teams Worldwide' }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
