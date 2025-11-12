import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SecurityScore = ({ score, grade, presentCount, totalCount }) => {
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-primary-red';
  };

  const getGradeColor = () => {
    if (grade === 'A') return 'text-green-500';
    if (grade === 'B') return 'text-yellow-500';
    if (grade === 'C') return 'text-orange-500';
    return 'text-primary-red';
  };

  return (
    <div className="bg-primary-900 rounded-2xl p-8 border border-primary-800 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-forum font-bold text-white">Security Score</h2>
        <Shield className="w-8 h-8 text-primary-red" />
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-8 border-primary-800 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor()}`}>
                {score}
              </div>
              <div className={`text-2xl font-bold ${getGradeColor()}`}>
                {grade}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary-red animate-spin-slow"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-primary-800 rounded-lg p-4">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{presentCount}</div>
          <div className="text-primary-700 text-sm">Implemented</div>
        </div>
        <div className="bg-primary-800 rounded-lg p-4">
          <XCircle className="w-6 h-6 text-primary-red mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{totalCount - presentCount}</div>
          <div className="text-primary-700 text-sm">Missing</div>
        </div>
      </div>

      {score < 70 && (
        <div className="mt-6 p-4 bg-primary-800 rounded-lg border border-primary-700">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-primary-red" />
            <span className="text-white font-semibold">Security Improvement Needed</span>
          </div>
          <p className="text-primary-700 text-sm mt-2">
            Consider implementing missing security headers to enhance your website's protection.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityScore;