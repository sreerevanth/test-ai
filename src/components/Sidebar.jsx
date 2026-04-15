import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Code, AlertTriangle, Settings, LogOut, HelpCircle } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
    { icon: Code, label: 'Test Generator', id: 'generator' },
    { icon: AlertTriangle, label: 'Edge Cases', id: 'edgecases' },
    { icon: Zap, label: 'Fuzz Testing', id: 'fuzz' },
    { icon: BarChart3, label: 'Reports', id: 'reports' }
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'Help & Docs', id: 'help' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="w-64 h-full bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">TestAI</h1>
      </motion.div>

      {/* Main Menu */}
      <motion.nav
        className="flex-1 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            variants={itemVariants}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group"
            whileHover={{ x: 4 }}
          >
            <item.icon className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </motion.nav>

      {/* Bottom Menu */}
      <motion.div
        className="space-y-2 pt-6 border-t border-slate-800/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bottomItems.map((item, idx) => (
          <motion.button
            key={idx}
            variants={itemVariants}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group"
            whileHover={{ x: 4 }}
          >
            <item.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}

        {/* User Profile */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-800/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          <motion.button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-slate-300 hover:text-white border border-purple-600/30 hover:border-purple-600/50 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
