import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export default function EdgeCaseAnalyzer() {
  const [expandedId, setExpandedId] = useState(0);

  const edgeCases = [
    {
      id: 0,
      type: 'Boundary Condition',
      title: 'Division by Zero',
      severity: 'critical',
      description: 'Function divides by input parameter without validation',
      impact: 'Application crash or undefined behavior',
      testCase: 'Test with denominator = 0',
      fix: 'Add validation: if (denominator === 0) throw new Error("Invalid input")'
    },
    {
      id: 1,
      type: 'Type Mismatch',
      title: 'Non-numeric String Input',
      severity: 'high',
      description: 'Function expects numbers but receives string values',
      impact: 'Type coercion issues, unexpected results',
      testCase: 'Test with calculateSum("5", "abc")',
      fix: 'Add type validation: if (typeof a !== "number") throw TypeError'
    },
    {
      id: 2,
      type: 'Range Overflow',
      title: 'Maximum Integer Exceeded',
      severity: 'medium',
      description: 'Sum of very large numbers may overflow',
      impact: 'Loss of precision or incorrect calculation',
      testCase: 'Test with Number.MAX_SAFE_INTEGER values',
      fix: 'Use BigInt for large number operations'
    },
    {
      id: 3,
      type: 'Null/Undefined',
      title: 'Null Reference',
      severity: 'critical',
      description: 'Function does not handle null or undefined inputs',
      impact: 'NaN propagation throughout calculation',
      testCase: 'Test with null, undefined parameters',
      fix: 'Validate inputs: if (a == null || b == null) return 0'
    },
    {
      id: 4,
      type: 'Floating Point',
      title: 'Precision Loss',
      severity: 'medium',
      description: 'Float addition produces inaccurate results',
      impact: '0.1 + 0.2 !== 0.3 in JavaScript',
      testCase: 'Test with calculateSum(0.1, 0.2)',
      fix: 'Use toFixed() or epsilon comparison for validation'
    }
  ];

  const severityColors = {
    critical: { bg: 'bg-red-600/20', border: 'border-red-600/50', text: 'text-red-400', label: 'Critical' },
    high: { bg: 'bg-orange-600/20', border: 'border-orange-600/50', text: 'text-orange-400', label: 'High' },
    medium: { bg: 'bg-yellow-600/20', border: 'border-yellow-600/50', text: 'text-yellow-400', label: 'Medium' }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {edgeCases.map((edgeCase) => {
        const severity = severityColors[edgeCase.severity];
        const isExpanded = expandedId === edgeCase.id;

        return (
          <motion.div
            key={edgeCase.id}
            variants={itemVariants}
            className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300`}
            onClick={() => setExpandedId(isExpanded ? -1 : edgeCase.id)}
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${severity.text === 'text-red-400' ? 'from-red-600 to-pink-600' : severity.text === 'text-orange-400' ? 'from-orange-600 to-yellow-600' : 'from-yellow-600 to-amber-600'} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10`} />

            <div className={`relative ${severity.bg} backdrop-blur-xl border ${severity.border} group-hover:border-purple-600/50 transition-all duration-300 p-6`}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${severity.bg} border ${severity.border}`}>
                    <AlertTriangle className={`w-5 h-5 ${severity.text}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{edgeCase.title}</h3>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${severity.text} ${severity.bg} border ${severity.border}`}>
                        {severity.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{edgeCase.type}</p>
                  </div>
                </div>

                <motion.button
                  className={`p-2 rounded-lg transition-all ${isExpanded ? 'bg-slate-700/50' : 'bg-slate-800/30'}`}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Expanded Content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? 'auto' : 0,
                  marginTop: isExpanded ? 16 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t border-slate-700/30">
                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
                    <p className="text-sm text-slate-400">{edgeCase.description}</p>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Impact</h4>
                    <p className="text-sm text-slate-400">{edgeCase.impact}</p>
                  </div>

                  {/* Test Case */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Test Case to Trigger</h4>
                    <code className="text-sm bg-black/30 border border-slate-700/30 rounded p-3 text-slate-300 block font-mono">
                      {edgeCase.testCase}
                    </code>
                  </div>

                  {/* Suggested Fix */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Suggested Fix</h4>
                    <code className="text-sm bg-black/30 border border-slate-700/30 rounded p-3 text-green-400 block font-mono whitespace-pre-wrap">
                      {edgeCase.fix}
                    </code>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      className="flex-1 px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-600/50 text-purple-300 hover:bg-purple-600/30 transition-all text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-4 h-4 inline mr-2" />
                      Generate Fix
                    </motion.button>
                    <motion.button
                      className="flex-1 px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/30 transition-all text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Test
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
