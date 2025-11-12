import React, { useState } from 'react';
import { Search, Shield, Globe, TestTube } from 'lucide-react';
import { useSecurityHeaders } from '../hooks/useSecurityHeaders';
import SecurityScore from './SecurityScore';
import HeaderCard from './HeaderCard';
import LoadingSpinner from './LoadingSpinner';

const HeaderChecker = () => {
  const [url, setUrl] = useState('');
  const { checkHeaders, results, loading, error } = useSecurityHeaders();

  const handleSubmit = (e) => {
    e.preventDefault();
    checkHeaders(url);
  };

  // Demo examples untuk quick test
  const demoExamples = [
    'google.com',
    'github.com',
    'tokopedia.com',
    'example.com',
    'netlify.app'
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-primary-red" />
            <h1 className="text-5xl md:text-6xl font-forum font-bold">
              Csp<span className="text-primary-red">Checkr</span>
            </h1>
          </div>
          
          {/* Demo Indicator */}
          {/* <div className="inline-flex items-center gap-2 bg-primary-900 border border-primary-700 rounded-full px-4 py-2 mb-6">
            <TestTube className="w-4 h-4 text-primary-red" />
            <span className="text-sm text-primary-700">Enhanced Demo Mode</span>
          </div> */}
          
          <p className="text-xl text-primary-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Analyze your website's security headers with smart demo data. 
            <span className="block text-primary-red text-sm mt-2">
              Try: google.com, github.com, or any domain to see different results!
            </span>
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="w-5 h-5 text-primary-700" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full pl-12 pr-32 py-4 bg-primary-900 border border-primary-800 rounded-2xl text-white placeholder-primary-700 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="absolute right-2 top-2 bottom-2 px-6 bg-primary-red hover:bg-red-700 disabled:bg-primary-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                {loading ? 'Analyzing...' : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Examples */}
          <div className="max-w-2xl mx-auto">
            <p className="text-primary-700 text-sm mb-3">Quick test:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {demoExamples.map((example) => (
                <button
                  key={example}
                  onClick={() => setUrl(example)}
                  className="px-4 py-2 bg-primary-900 border border-primary-800 rounded-xl text-primary-700 hover:border-primary-red hover:text-primary-red transition-all duration-300 text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-primary-900 border border-primary-red rounded-2xl text-primary-red max-w-2xl mx-auto">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-900 border border-primary-700 rounded-full px-4 py-2 mb-4">
                <TestTube className="w-4 h-4 text-primary-red" />
                <span className="text-sm text-primary-700">Demo Analysis - Smart Mock Data</span>
              </div>
              <h2 className="text-3xl font-forum font-bold mb-4">
                Analysis for <span className="text-primary-red">{results.url}</span>
              </h2>
              <p className="text-primary-700">
                Checked at {new Date(results.checkedAt).toLocaleString()}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Security Score */}
              <div className="lg:col-span-1">
                <SecurityScore
                  score={results.score}
                  grade={results.grade}
                  presentCount={results.presentCount}
                  totalCount={results.totalCount}
                />
              </div>

              {/* Headers List */}
              <div className="lg:col-span-2">
                <div className="grid gap-6">
                  {results.results.map((header) => (
                    <HeaderCard
                      key={header.id}
                      header={header.name}
                      value={header.value}
                      status={header.status}
                      importance={header.importance}
                      description={header.description}
                      recommended={header.recommended}
                      docs={header.docs}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default HeaderChecker;