import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, LogOut, Bell, Settings, BarChart3, Code, AlertTriangle,
  Zap, TrendingUp, Download, Copy, Check
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import TestGenerator from '../components/TestGenerator';
import EdgeCaseAnalyzer from '../components/EdgeCaseAnalyzer';
import FuzzTestingPanel from '../components/FuzzTestingPanel';
import ChartsSection from '../components/ChartsSection';

export default function DashboardPage({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCopied, setIsCopied] = useState(false);

  const stats = [
    { label: 'Tests Generated', value: '2,847', icon: Code, trend: '+12% this week' },
    { label: 'Bugs Detected', value: '156', icon: AlertTriangle, trend: '+8 new bugs' },
    { label: 'Coverage', value: '89.2%', icon: BarChart3, trend: '+2.3% increase' },
    { label: 'Test Speed', value: '342ms', icon: Zap, trend: '-23ms improvement' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'generate', label: 'Test Generator', icon: Code },
    { id: 'edgecases', label: 'Edge Cases', icon: AlertTriangle },
    { id: 'fuzz', label: 'Fuzz Testing', icon: Zap }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-black">
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full z-40"
        animate={{ marginLeft: sidebarOpen ? 0 : '-280px' }}
        transition={{ duration: 0.3 }}
      >
        <Sidebar user={user} onLogout={onLogout} />
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <motion.div
          className="h-16 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl flex items-center justify-between px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold text-white hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative"
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
            </motion.button>

            <motion.button
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Settings className="w-5 h-5 text-slate-400" />
            </motion.button>

            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Tabs */}
            <motion.div
              className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Overview Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Stats Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {stats.map((stat, idx) => (
                      <motion.div key={idx} variants={itemVariants}>
                        <StatsCard {...stat} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Charts Section */}
                  <ChartsSection />
                </motion.div>
              )}

              {/* Test Generator Tab */}
              {activeTab === 'generate' && (
                <motion.div
                  key="generate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TestGenerator />
                </motion.div>
              )}

              {/* Edge Cases Tab */}
              {activeTab === 'edgecases' && (
                <motion.div
                  key="edgecases"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EdgeCaseAnalyzer />
                </motion.div>
              )}

              {/* Fuzz Testing Tab */}
              {activeTab === 'fuzz' && (
                <motion.div
                  key="fuzz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FuzzTestingPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
