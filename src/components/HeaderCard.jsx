import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

const HeaderCard = ({ header, value, status, importance, description, recommended, docs }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'missing':
        return <XCircle className="w-5 h-5 text-primary-red" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getImportanceColor = () => {
    switch (importance) {
      case 'high':
        return 'text-primary-red';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-primary-700';
    }
  };

  return (
    <div className="bg-primary-900 rounded-xl p-6 border border-primary-800 hover:border-primary-700 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold text-white font-forum">{header}</h3>
        </div>
        <span className={`text-sm font-medium ${getImportanceColor()}`}>
          {importance.toUpperCase()}
        </span>
      </div>

      <p className="text-primary-700 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-primary-700 text-sm font-medium">Status:</span>
          <span className={`ml-2 text-sm font-semibold ${
            status === 'present' ? 'text-green-500' : 'text-primary-red'
          }`}>
            {status === 'present' ? 'Implemented' : 'Not Implemented'}
          </span>
        </div>

        {status === 'present' && (
          <div>
            <span className="text-primary-700 text-sm font-medium">Current Value:</span>
            <code className="ml-2 text-sm text-white bg-primary-800 px-2 py-1 rounded">
              {value}
            </code>
          </div>
        )}

        <div>
          <span className="text-primary-700 text-sm font-medium">Recommended:</span>
          <code className="ml-2 text-sm text-white bg-primary-800 px-2 py-1 rounded">
            {recommended}
          </code>
        </div>
      </div>

      <a
        href={docs}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-primary-red hover:text-red-400 transition-colors text-sm font-medium"
      >
        Learn More
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

export default HeaderCard;