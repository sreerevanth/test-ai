import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Zap, Code, Loader } from 'lucide-react';

export default function TestGenerator() {
  const [code, setCode] = useState('function calculateSum(a, b) {\n  return a + b;\n}');
  const [generatedTests, setGeneratedTests] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const sampleCode = `function calculateSum(a, b) {
  return a + b;
}`;

  const mockGeneratedTests = [
    {
      name: 'test_sum_positive_numbers',
      code: 'test("calculateSum with positive numbers", () => {\n  expect(calculateSum(5, 3)).toBe(8);\n});'
    },
    {
      name: 'test_sum_negative_numbers',
      code: 'test("calculateSum with negative numbers", () => {\n  expect(calculateSum(-5, -3)).toBe(-8);\n});'
    },
    {
      name: 'test_sum_mixed_numbers',
      code: 'test("calculateSum with mixed numbers", () => {\n  expect(calculateSum(5, -3)).toBe(2);\n});'
    },
    {
      name: 'test_sum_zero',
      code: 'test("calculateSum with zero", () => {\n  expect(calculateSum(0, 0)).toBe(0);\n});'
    },
    {
      name: 'test_sum_floating_point',
      code: 'test("calculateSum with floating point", () => {\n  expect(calculateSum(0.1, 0.2)).toBeCloseTo(0.3);\n});'
    }
  ];

  const handleGenerate = async () => {
    if (!code.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGeneratedTests(mockGeneratedTests);
    setIsGenerating(false);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Input Section */}
      <motion.div
        className="group relative rounded-xl overflow-hidden"
        whileHover={{ translateY: -2 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-purple-600/50 transition-all duration-300 p-6">
          <label className="block text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            Paste Your Code
          </label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your function or code snippet here..."
            className="w-full h-48 bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />

          <div className="mt-4 flex gap-2">
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || !code.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:shadow-lg hover:shadow-purple-600/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating Tests...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Tests
                </>
              )}
            </motion.button>

            <motion.button
              onClick={() => setCode(sampleCode)}
              className="px-6 py-3 border border-slate-700/50 text-slate-300 font-semibold rounded-lg hover:border-purple-500 hover:text-white transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Use Sample
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Generated Tests */}
      <AnimatePresence>
        {generatedTests && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Generated Tests ({generatedTests.length})</h3>
            </div>

            {generatedTests.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 -z-10" />

                <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-green-600/50 transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-white text-sm">{test.name}</h4>
                    <motion.button
                      onClick={() => copyToClipboard(test.code, idx)}
                      className={`p-2 rounded-lg transition-all ${
                        copiedIndex === idx
                          ? 'bg-green-600/30 text-green-400'
                          : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>

                  <pre className="bg-black/30 border border-slate-700/30 rounded-lg p-4 overflow-x-auto text-slate-100 text-sm font-mono">
                    {test.code}
                  </pre>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
                    <span className="text-xs text-green-400 font-medium">High Confidence</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Export Option */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full px-6 py-3 rounded-lg border border-slate-700/50 text-white font-semibold hover:bg-slate-800/30 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Export All Tests
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
