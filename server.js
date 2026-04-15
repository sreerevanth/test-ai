import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Generate Tests Endpoint
app.post('/api/generate-tests', (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Mock AI response
    const mockTests = [
      {
        name: 'test_basic_functionality',
        code: 'test("should pass basic test", () => { expect(true).toBe(true); });',
        confidence: 0.95
      },
      {
        name: 'test_edge_case_empty_input',
        code: 'test("should handle empty input", () => { expect(func("")).toBeDefined(); });',
        confidence: 0.87
      },
      {
        name: 'test_error_handling',
        code: 'test("should throw on invalid input", () => { expect(() => func(null)).toThrow(); });',
        confidence: 0.92
      }
    ];

    res.json({
      success: true,
      tests: mockTests,
      coverage: '89.2%',
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analyze Edge Cases Endpoint
app.post('/api/analyze-edge-cases', (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Mock edge case analysis
    const mockEdgeCases = [
      {
        type: 'Boundary Condition',
        severity: 'critical',
        description: 'Division by zero not handled',
        testCase: 'Test with denominator = 0'
      },
      {
        type: 'Type Error',
        severity: 'high',
        description: 'Non-numeric string input causes issues',
        testCase: 'Test with string input'
      },
      {
        type: 'Null Reference',
        severity: 'critical',
        description: 'Null/undefined inputs not validated',
        testCase: 'Test with null/undefined'
      }
    ];

    res.json({
      success: true,
      edgeCases: mockEdgeCases,
      totalFound: 3,
      analysisTime: '245ms'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fuzz Testing Endpoint
app.post('/api/fuzz-test', (req, res) => {
  try {
    const { functionName, iterations = 100 } = req.body;
    
    if (!functionName) {
      return res.status(400).json({ error: 'Function name is required' });
    }

    // Mock fuzz testing results
    const mockResults = Array.from({ length: Math.min(iterations, 20) }, (_, i) => ({
      id: i,
      input: ['NaN', 'Infinity', '[]', '{}', '""', 'null', 'undefined'][i % 7],
      output: ['Unexpected: NaN', 'Unexpected: Infinity', 'Unexpected: 0', 'Unexpected: NaN', 'Unexpected: 0', 'Unexpected: null', 'Unexpected: undefined'][i % 7],
      error: i % 3 === 0,
      severity: i % 4 === 0 ? 'critical' : 'warning'
    }));

    const errorCount = mockResults.filter(r => r.error).length;

    res.json({
      success: true,
      results: mockResults,
      summary: {
        totalTests: iterations,
        errorsFound: errorCount,
        successRate: ((iterations - errorCount) / iterations * 100).toFixed(2) + '%'
      },
      completedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Dashboard Stats
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    testsGenerated: 2847,
    bugsDetected: 156,
    coverage: 89.2,
    testSpeed: 342,
    trendData: [
      { week: 'Week 1', bugs: 12, fixed: 8 },
      { week: 'Week 2', bugs: 19, fixed: 12 },
      { week: 'Week 3', bugs: 15, fixed: 14 },
      { week: 'Week 4', bugs: 22, fixed: 18 },
      { week: 'Week 5', bugs: 18, fixed: 17 },
      { week: 'Week 6', bugs: 25, fixed: 22 }
    ]
  });
});

// Export Test Results
app.post('/api/export-results', (req, res) => {
  try {
    const { format = 'json' } = req.body;
    
    const data = {
      project: 'TestAI Export',
      exportDate: new Date().toISOString(),
      format: format,
      testCount: 47,
      bugCount: 12,
      coverage: '89.2%'
    };

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="testai-results.csv"');
      res.send('Test Name,Status,Duration\nTest 1,PASS,245ms\nTest 2,FAIL,123ms');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="testai-results.json"');
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║         TestAI Backend Server         ║
║         Running on port ${PORT}          ║
╚═══════════════════════════════════════╝
  `);
});

export default app;
