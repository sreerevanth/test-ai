import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Play, Square, Download, TrendingUp } from 'lucide-react';

export default function FuzzTestingPanel() {
  const [isFuzzing, setIsFuzzing] = useState(false);
  const [results, setResults] = useState([]);
  const [iterations, setIterations] = useState(100);
  const [progress, setProgress] = useState(0);

  const mockFuzzResults = [
    { input: 'NaN', output: 'Unexpected: NaN', error: true },
    { input: 'Infinity', output: 'Unexpected: Infinity', error: true },
    { input: '[]', output: 'Unexpected: 0', error: false },
    { input: '{}', output: 'Unexpected: NaN', error: true },
    { input: '""', output: 'Unexpected: 0', error: false },
    { input: 'null', output: 'Unexpected: null', error: true },
    { input: 'undefined', output: 'Unexpected: undefined', error: true }
  ];

  const handleStartFuzzing = async () => {
    setIsFuzzing(true);
    setResults([]);
    setProgress(0);

    for (let i = 0; i < iterations; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const randomResult = mockFuzzResults[Math.floor(Math.random() * mockFuzzResults.length)];
      setResults(prev => {
        const newResults = [...prev, { ...randomResult, id: i }];
        return newResults.slice(-20); // Keep only last 20
      });
      
      setProgress(Math.round((i / iterations) * 100));
    }

    setProgress(100);
    setIsFuzzing(false);
  };

  const errorCount = results.filter(r => r.error).length;
  const successCount = results.filter(r => !r.error).length;

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
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Control Panel */}
      <motion.div
        variants={itemVariants}
        className="group relative rounded-xl overflow-hidden"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-purple-600/50 transition-all duration-300 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Fuzz Testing Configuration
          </h3>

          <div className="space-y-6">
            {/* Iterations Slider */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Number of Iterations
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  disabled={isFuzzing}
                  className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${(iterations / 1000) * 100}%, rgb(51, 65, 85) ${(iterations / 1000) * 100}%, rgb(51, 65, 85) 100%)`
                  }}
                />
                <span className="text-lg font-bold text-white min-w-16 text-right">{iterations}</span>
              </div>
            </div>

            {/* Function Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Target Function
              </label>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 text-slate-300 font-mono text-sm">
                function calculateSum(a, b) {'{'} return a + b; {'}'}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={handleStartFuzzing}
                disabled={isFuzzing}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:shadow-lg hover:shadow-purple-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isFuzzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Square className="w-5 h-5" />
                    </motion.div>
                    Fuzzing in Progress...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Fuzzing
                  </>
                )}
              </motion.button>

              <motion.button
                disabled={!isFuzzing}
                className="px-6 py-3 border border-slate-700/50 text-slate-300 font-semibold rounded-lg hover:border-red-500 hover:text-red-400 transition-all disabled:opacity-30"
                whileHover={{ scale: 1.02 }}
              >
                <Square className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      {isFuzzing && (
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Progress</span>
              <span className="text-sm font-bold text-purple-400">{progress}%</span>
            </div>
            <motion.div
              className="h-2 bg-slate-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-cyan-600"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Results Summary */}
      {results.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="group relative rounded-xl overflow-hidden"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

          <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-green-600/50 transition-all duration-300 p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{results.length}</div>
                <p className="text-xs text-slate-400 mt-1">Tests Run</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{errorCount}</div>
                <p className="text-xs text-slate-400 mt-1">Errors Found</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{successCount}</div>
                <p className="text-xs text-slate-400 mt-1">Passed</p>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-300 mb-4">Recent Results</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {results.map((result, idx) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`p-3 rounded-lg border ${
                        result.error
                          ? 'bg-red-600/10 border-red-600/30'
                          : 'bg-green-600/10 border-green-600/30'
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-mono text-slate-300 truncate">
                            Input: {result.input}
                          </p>
                          <p className={`text-xs font-mono mt-1 truncate ${
                            result.error ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {result.output}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          result.error ? 'bg-red-500' : 'bg-green-500'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Export Button */}
            {!isFuzzing && (
              <motion.button
                className="w-full mt-6 px-4 py-3 rounded-lg border border-slate-700/50 text-white font-semibold hover:bg-slate-800/30 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <Download className="w-4 h-4" />
                Export Report
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Info Section */}
      {results.length === 0 && !isFuzzing && (
        <motion.div
          variants={itemVariants}
          className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-6"
        >
          <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            How Fuzz Testing Works
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Generates random inputs and edge case values</li>
            <li>• Tests function robustness and error handling</li>
            <li>• Identifies crashes and unexpected behaviors</li>
            <li>• Tracks error patterns and failure rates</li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
