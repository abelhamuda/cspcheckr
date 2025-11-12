# 🛡️ CspCheckr

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, enterprise-grade security headers analyzer with smart demo data simulation.

[Live Demo](https://cspcheckr.netlify.app/) • [Report Bug](https://github.com/abelhamuda/cspcheckr/issues) • [Request Feature](https://github.com/abelhamuda/cspcheckr/issues)

![Dashboard Preview](https://via.placeholder.com/800x400/000000/DC2626?text=Security+Headers+Checker+-+Modern+Security+Analysis)

</div>

## ✨ Features

### 🔍 **Smart Header Analysis**
- **7 Critical Security Headers** monitoring
- **Real-time Security Scoring** with visual grades
- **Domain-based Intelligence** - Different results for enterprise, tech, e-commerce sites
- **Actionable Recommendations** with MDN documentation links

### 🎨 **Enterprise-Grade Design**
- **Monochrome Red & Black** theme
- **Fully Responsive** - Perfect on all devices
- **Smooth Animations** & micro-interactions
- **Modern Typography** with Forum font
- **Vercel-inspired** clean, professional interface

### 🚀 **Developer Experience**
- **Zero Backend Required** - Smart mock data system
- **Fast Development** with Vite + React
- **Type-Safe** with PropTypes
- **Easy Customization** with Tailwind CSS

## 🛠️ Tech Stack

**Frontend Framework:** React 18 + Vite  
**Styling:** Tailwind CSS  
**Icons:** Lucide React  
**Font:** Google Fonts (Forum)  
**Deployment:** Vercel/Netlify ready

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/abelhamuda/cspcheckr.git
cd cspcheckr
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🎯 Usage

### Basic Analysis
1. Enter any website URL in the input field
2. Click "Analyze" to start the security check
3. View detailed results with security score and header status

### Demo Examples
Try these domains to see different security profiles:

- `google.com` - Enterprise grade (90-100% score)
- `github.com` - Tech company (70-85% score)
- `tokopedia.com` - E-commerce site (50-70% score)
- `example.com` - Basic website (20-40% score)

### Understanding Results
- 🟢 **Implemented** - Security header is properly configured
- 🔴 **Missing** - Security header is not implemented
- 📊 **Security Score** - Overall security rating (A-F)
- 🎯 **Recommendations** - Specific guidance for improvement

## 🔧 Configuration

### Customizing Security Headers
Edit `src/data/securityHeaders.js` to modify monitored headers:

```javascript
export const securityHeaders = [
  {
    id: 'custom-header',
    name: 'Custom-Security-Header',
    description: 'Your custom header description',
    importance: 'high',
    recommended: 'recommended-value',
    docs: 'https://example.com/docs'
  }
  // ... add more headers
];
```

### Styling Customization
Modify the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        black: '#000000',
        red: '#DC2626',
        // ... add your colors
      }
    }
  }
}
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── HeaderChecker.jsx    # Main analysis component
│   ├── SecurityScore.jsx    # Score visualization
│   ├── HeaderCard.jsx       # Individual header card
│   ├── LoadingSpinner.jsx   # Animated loader
│   └── AnimatedBackground.jsx # Background effects
├── hooks/               # Custom React hooks
│   └── useSecurityHeaders.js # Header analysis logic
├── data/               # Static data and configurations
│   └── securityHeaders.js   # Header definitions
└── App.jsx             # Main application component
```

## 🌟 Smart Mock Data System

The application uses an intelligent mock data system that simulates real-world security header patterns:

### Domain Classification
- 🏢 **Enterprise** (Google, Microsoft) - Comprehensive security
- 💻 **Tech Companies** (GitHub, Vercel) - Strong security practices
- 🛒 **E-commerce** (Tokopedia, Shopee) - Mixed security implementation
- 🏛️ **Government** (.gov domains) - Strict but limited headers
- 👤 **Personal Sites** - Basic security measures

### Realistic Variations
- Random header completeness (not always 100%)
- Domain-specific CSP policies
- Realistic HSTS max-age values
- Various server headers (Nginx, Apache, Cloudflare)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist folder to Netlify dashboard
```

### Other Platforms
The app is static and can be deployed on any platform:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper PropTypes
- Test across different domains

## 📊 Supported Security Headers

| Header | Importance | Description |
|--------|-----------|-------------|
| Content-Security-Policy | 🔴 High | Prevents XSS and code injection |
| Strict-Transport-Security | 🔴 High | Enforces HTTPS connections |
| X-Frame-Options | 🔴 High | Protects against clickjacking |
| X-Content-Type-Options | 🟡 Medium | Prevents MIME sniffing |
| Referrer-Policy | 🟡 Medium | Controls referrer information |
| Permissions-Policy | 🟡 Medium | Controls browser features |
| X-XSS-Protection | 🟢 Low | Legacy XSS protection |

## 🐛 Known Limitations

- 🔄 **Demo Data** - Currently uses smart mock data (real API integration planned)
- 🌐 **CORS Restrictions** - Browser security prevents direct header fetching
- ⚡ **Static Analysis** - Cannot detect dynamically set headers

## 🛡️ Privacy & Security

- 🔒 **No Data Storage** - All analysis happens in your browser
- 🌐 **No Tracking** - Zero analytics or user tracking
- ⚡ **Client-Side Only** - No data sent to external servers

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Security Headers Inspiration** - Based on securityheaders.com
- **Design Inspiration** - Vercel design system
- **Icons** - Lucide React
- **Font** - Google Fonts (Forum)

---

<div align="center">

Built with ❤️ using React, Vite, and Tailwind CSS

[Report Bug](https://github.com/abelhamuda/cspcheckr/issues) • [Request Feature](https://github.com/abelhamuda/cspcheckr/issues) • [Contributing](#-contributing)

</div>
