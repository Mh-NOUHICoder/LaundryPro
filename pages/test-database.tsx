import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TestResult {
  success: boolean;
  message: string;
  timestamp?: string;
  error?: string;
  details?: {
    database: string;
    collections?: string[];
    pingResult?: any;
  };
}

const DatabaseTestPage = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data: TestResult = await response.json();
      setTestResult(data);
    } catch (error: any) {
      setTestResult({
        success: false,
        message: 'Failed to reach test endpoint',
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🧺</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MongoDB Connection Test
          </h1>
          <p className="text-gray-600">
            LaundryPro Database Status
          </p>
        </div>

        {/* Test Result */}
        <div className="mb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Testing MongoDB connection...</p>
            </div>
          ) : testResult ? (
            <div className={`p-6 rounded-lg border-2 ${
              testResult.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-4 h-4 rounded-full ${
                  testResult.success ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-lg font-semibold ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.success ? '✅ MongoDB Connected' : '❌ Connection Failed'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{testResult.message}</p>
              
              {testResult.timestamp && (
                <p className="text-sm text-gray-500 mb-4">
                  Tested at: {new Date(testResult.timestamp).toLocaleString()}
                </p>
              )}

              {/* Success Details */}
              {testResult.success && testResult.details && (
                <div className="mt-4 p-4 bg-white rounded border">
                  <h4 className="font-semibold text-gray-900 mb-2">Connection Details:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{testResult.details.database}</code>
                    </div>
                    {testResult.details.collections && (
                      <div>
                        <span className="text-gray-600">Collections ({testResult.details.collections.length}):</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {testResult.details.collections.map((collection, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {collection}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Details */}
              {testResult.error && (
                <div className="mt-4 p-4 bg-red-100 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Error Details:</h4>
                  <p className="text-sm text-red-700 font-mono bg-red-50 p-3 rounded">
                    {testResult.error}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={testDatabaseConnection}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-blue-300 disabled:to-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? 'Testing Connection...' : 'Test Connection Again'}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <Link href="/" className="block">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
                Back to Home
              </button>
            </Link>
            <Link href="/api/test-db" className="block" target="_blank">
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-3 px-4 rounded-lg transition-colors">
                View Raw API
              </button>
            </Link>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        {testResult && !testResult.success && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Tips</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Check if MONGODB_URI is set in .env.local</li>
              <li>• Verify MongoDB is running locally or Atlas cluster is accessible</li>
              <li>• Ensure your IP is whitelisted in MongoDB Atlas</li>
              <li>• Check network connection and firewall settings</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseTestPage;