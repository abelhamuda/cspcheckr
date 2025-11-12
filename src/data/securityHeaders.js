export const securityHeaders = [
  {
    id: 'csp',
    name: 'Content-Security-Policy',
    description: 'Mencegah serangan XSS dan injection dengan membatasi sumber daya yang boleh dimuat',
    importance: 'high',
    recommended: "default-src 'self'; script-src 'self'; object-src 'none'",
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP'
  },
  {
    id: 'hsts',
    name: 'Strict-Transport-Security',
    description: 'Memaksa browser untuk selalu menggunakan HTTPS',
    importance: 'high',
    recommended: 'max-age=31536000; includeSubDomains',
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security'
  },
  {
    id: 'x-frame-options',
    name: 'X-Frame-Options',
    description: 'Melindungi dari clickjacking dengan mengontrol embedding frame',
    importance: 'high',
    recommended: 'SAMEORIGIN',
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options'
  },
  {
    id: 'x-content-type-options',
    name: 'X-Content-Type-Options',
    description: 'Mencegah MIME type sniffing',
    importance: 'medium',
    recommended: 'nosniff',
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options'
  },
  {
    id: 'referrer-policy',
    name: 'Referrer-Policy',
    description: 'Mengontrol informasi referrer yang dikirim',
    importance: 'medium',
    recommended: 'strict-origin-when-cross-origin',
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy'
  },
  {
    id: 'permissions-policy',
    name: 'Permissions-Policy',
    description: 'Mengontrol fitur browser dan API yang boleh digunakan',
    importance: 'medium',
    recommended: "geolocation=(), microphone=(), camera=()",
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy'
  },
  {
    id: 'x-xss-protection',
    name: 'X-XSS-Protection',
    description: 'Mengaktifkan filter XSS di browser lama',
    importance: 'low',
    recommended: '1; mode=block',
    docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection'
  }
];

export const analyzeHeaders = (headers) => {
  const results = securityHeaders.map(header => {
    const foundHeader = headers.find(h => 
      h.key.toLowerCase() === header.id.toLowerCase() ||
      h.key.toLowerCase().includes(header.id)
    );
    
    return {
      ...header,
      present: !!foundHeader,
      value: foundHeader?.value || 'Not Set',
      status: foundHeader ? 'present' : 'missing'
    };
  });

  const presentCount = results.filter(r => r.present).length;
  const totalCount = securityHeaders.length;
  const score = Math.round((presentCount / totalCount) * 100);

  return {
    results,
    score,
    presentCount,
    totalCount,
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  };
};