import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartsSection() {
  const bugTrendData = [
    { week: 'Week 1', bugs: 12, fixed: 8 },
    { week: 'Week 2', bugs: 19, fixed: 12 },
    { week: 'Week 3', bugs: 15, fixed: 14 },
    { week: 'Week 4', bugs: 22, fixed: 18 },
    { week: 'Week 5', bugs: 18, fixed: 17 },
    { week: 'Week 6', bugs: 25, fixed: 22 }
  ];

  const coverageData = [
    { name: 'Unit Tests', value: 89 },
    { name: 'Integration', value: 76 },
    { name: 'E2E', value: 64 },
    { name: 'Performance', value: 58 }
  ];

  const testTypesData = [
    { name: 'Functional', value: 45 },
    { name: 'Edge Cases', value: 25 },
    { name: 'Fuzz Tests', value: 20 },
    { name: 'Regression', value: 10 }
  ];

  const colors = ['#a855f7', '#06b6d4', '#3b82f6', '#ec4899'];

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-slate-300">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartCard = ({ title, children, index }) => (
    <motion.div
      custom={index}
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      className="group relative rounded-xl overflow-hidden"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

      <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-purple-600/50 transition-all duration-300 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
        {children}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Line Chart - Bug Trends */}
      <ChartCard title="Bug Detection Trends" index={0}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bugTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="bugs"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ fill: '#a855f7', r: 5 }}
              activeDot={{ r: 7 }}
              name="Bugs Detected"
            />
            <Line
              type="monotone"
              dataKey="fixed"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: '#06b6d4', r: 5 }}
              activeDot={{ r: 7 }}
              name="Bugs Fixed"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bar Chart - Coverage */}
      <ChartCard title="Test Coverage by Type" index={1}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={coverageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#a855f7" name="Coverage %" radius={[8, 8, 0, 0]}>
              {coverageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pie Chart - Test Types */}
      <ChartCard title="Test Distribution" index={2}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={testTypesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {testTypesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Summary Stats */}
      <ChartCard title="Performance Metrics" index={3}>
        <div className="space-y-4">
          {[
            { label: 'Avg Test Execution Time', value: '342ms', change: '-12ms' },
            { label: 'Success Rate', value: '99.2%', change: '+0.3%' },
            { label: 'Tests per Deployment', value: '847', change: '+124' }
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="text-sm text-slate-300">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{metric.value}</span>
                <span className="text-xs text-green-400">{metric.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
