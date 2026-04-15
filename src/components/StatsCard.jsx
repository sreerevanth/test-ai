import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ label, value, icon: Icon, trend }) {
  const isPositive = !trend.includes('decrease') && !trend.includes('decrease') && !trend.includes('-');

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden"
      whileHover={{ translateY: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

      <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-purple-600/50 transition-all duration-300 p-6 h-full">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{value}</h3>
          </div>

          <motion.div
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center group-hover:from-purple-600/40 group-hover:to-cyan-600/40 transition-all"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="w-6 h-6 text-purple-400" />
          </motion.div>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        </div>

        {/* Animated background bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
