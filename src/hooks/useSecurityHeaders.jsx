import { useState } from 'react';
import { analyzeHeaders } from '../data/securityHeaders';

export const useSecurityHeaders = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const checkHeaders = async (url) => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Clean the URL
      const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1000));
      
      // Generate SMART mock data based on domain patterns
      const mockHeaders = generateSmartMockHeaders(cleanUrl);
      const analysis = analyzeHeaders(mockHeaders);
      
      setResults({
        url: cleanUrl,
        ...analysis,
        checkedAt: new Date().toISOString(),
        isDemo: true // Flag untuk demo data
      });
    } catch (err) {
      setError('Failed to check headers. Using demo data.');
      // Fallback dengan demo data
      const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
      const mockHeaders = generateSmartMockHeaders(cleanUrl);
      const analysis = analyzeHeaders(mockHeaders);
      setResults({
        url: cleanUrl,
        ...analysis,
        checkedAt: new Date().toISOString(),
        isDemo: true
      });
    } finally {
      setLoading(false);
    }
  };

  return { checkHeaders, results, loading, error };
};

// Enhanced Smart Mock Data Generator
const generateSmartMockHeaders = (url) => {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    const path = new URL(url).pathname;
    
    // Domain-based pattern matching
    if (isEnterpriseDomain(domain)) {
      return generateEnterpriseHeaders(domain);
    } else if (isTechDomain(domain)) {
      return generateTechHeaders(domain);
    } else if (isEcommerceDomain(domain)) {
      return generateEcommerceHeaders(domain);
    } else if (isGovernmentDomain(domain)) {
      return generateGovernmentHeaders(domain);
    } else if (isPersonalDomain(domain)) {
      return generatePersonalHeaders(domain);
    } else {
      return generateBasicHeaders(domain);
    }
  } catch (error) {
    // Fallback untuk URL invalid
    return generateBasicHeaders('unknown');
  }
};

// Domain Classification Functions
const isEnterpriseDomain = (domain) => {
  const enterprisePatterns = [
    'google', 'microsoft', 'apple', 'facebook', 'amazon', 'netflix',
    'twitter', 'linkedin', 'salesforce', 'adobe', 'ibm', 'oracle',
    'cloudflare', 'akamai', 'fastly'
  ];
  return enterprisePatterns.some(pattern => domain.includes(pattern));
};

const isTechDomain = (domain) => {
  const techPatterns = [
    'github', 'gitlab', 'vercel', 'netlify', 'heroku', 'digitalocean',
    'aws', 'azure', 'gcp', 'cloud', 'stackoverflow', 'digitalocean',
    'linode', 'vultr', 'docker', 'kubernetes'
  ];
  return techPatterns.some(pattern => domain.includes(pattern));
};

const isEcommerceDomain = (domain) => {
  const ecommercePatterns = [
    'shop', 'store', 'cart', 'buy', 'market', 'trade', 'ebay',
    'amazon', 'aliexpress', 'tokopedia', 'shopee', 'bukalapak'
  ];
  return ecommercePatterns.some(pattern => domain.includes(pattern));
};

const isGovernmentDomain = (domain) => {
  return domain.includes('.gov') || domain.includes('.go.id');
};

const isPersonalDomain = (domain) => {
  return domain.includes('.blog') || domain.includes('.personal') || 
         domain.split('.').length > 2; // subdomain banyak
};

// Header Generators for Different Categories
const generateEnterpriseHeaders = (domain) => {
  const baseHeaders = [
    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:;" },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=()' },
  ];

  // Variasi berdasarkan specific enterprise
  if (domain.includes('google')) {
    baseHeaders.push({ key: 'X-XSS-Protection', value: '1; mode=block' });
    baseHeaders.push({ key: 'Server', value: 'gws' });
  } else if (domain.includes('microsoft')) {
    baseHeaders.push({ key: 'X-XSS-Protection', value: '1; mode=block' });
  } else if (domain.includes('cloudflare')) {
    baseHeaders.push({ key: 'Server', value: 'cloudflare' });
    baseHeaders[0].value = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'";
  }

  return addRandomVariation(baseHeaders, 0.9); // 90% completion
};

const generateTechHeaders = (domain) => {
  const baseHeaders = [
    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ];

  if (domain.includes('github')) {
    baseHeaders.push({ key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' });
  } else if (domain.includes('vercel')) {
    baseHeaders[0].value = "default-src 'self' vercel.com; script-src 'self' 'unsafe-eval'";
  }

  return addRandomVariation(baseHeaders, 0.7); // 70% completion
};

const generateEcommerceHeaders = (domain) => {
  const baseHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  ];

  // Ecommerce biasanya punya CSP yang lebih relaxed untuk payment
  if (Math.random() > 0.3) {
    baseHeaders.push({ 
      key: 'Content-Security-Policy', 
      value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'" 
    });
  }

  if (Math.random() > 0.5) {
    baseHeaders.push({ key: 'Strict-Transport-Security', value: 'max-age=15552000' });
  }

  return addRandomVariation(baseHeaders, 0.6); // 60% completion
};

const generateGovernmentHeaders = (domain) => {
  const baseHeaders = [
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
  ];

  // Government biasanya strict
  if (Math.random() > 0.2) {
    baseHeaders.push({ 
      key: 'Content-Security-Policy', 
      value: "default-src 'self'; script-src 'self'; style-src 'self'" 
    });
  }

  return addRandomVariation(baseHeaders, 0.8); // 80% completion
};

const generatePersonalHeaders = (domain) => {
  const baseHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
  ];

  // Personal sites biasanya basic
  if (Math.random() > 0.7) {
    baseHeaders.push({ key: 'Strict-Transport-Security', value: 'max-age=15768000' });
  }

  return addRandomVariation(baseHeaders, 0.4); // 40% completion
};

const generateBasicHeaders = (domain) => {
  const baseHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
  ];

  // Random basic headers
  if (Math.random() > 0.5) {
    baseHeaders.push({ key: 'X-Frame-Options', value: Math.random() > 0.5 ? 'SAMEORIGIN' : 'DENY' });
  }

  return addRandomVariation(baseHeaders, 0.3); // 30% completion
};

// Add realistic random variations
const addRandomVariation = (headers, completeness) => {
  const finalHeaders = [...headers];
  
  // Randomly remove some headers based on completeness
  if (Math.random() > completeness) {
    const removeIndex = Math.floor(Math.random() * finalHeaders.length);
    finalHeaders.splice(removeIndex, 1);
  }
  
  // Add random server headers
  const servers = ['nginx', 'apache', 'cloudflare', 'LiteSpeed', 'Microsoft-IIS'];
  if (Math.random() > 0.5) {
    finalHeaders.push({ key: 'Server', value: servers[Math.floor(Math.random() * servers.length)] });
  }
  
  return finalHeaders;
};