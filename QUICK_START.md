# TestAI - Quick Start Guide

Get TestAI running in 5 minutes!

## 🚀 Super Quick Start

### Option 1: Using Vite (Recommended - Fastest)

```bash
# 1. Create directory
mkdir testai && cd testai

# 2. Install Node dependencies
npm install

# 3. Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Option 2: Step-by-Step Manual Setup

```bash
# 1. Initialize project
npm init -y

# 2. Install frontend dependencies
npm install react react-dom framer-motion recharts lucide-react
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer

# 3. Install backend dependencies (optional)
npm install express cors dotenv

# 4. Initialize Tailwind
npx tailwindcss init -p

# 5. Create directory structure
mkdir -p src/{pages,components} public

# 6. Copy all files from the output folder to appropriate locations:
# - app.jsx → src/app.jsx
# - main.jsx → src/main.jsx
# - LandingPage.jsx → src/pages/LandingPage.jsx
# - LoginPage.jsx → src/pages/LoginPage.jsx
# - DashboardPage.jsx → src/pages/DashboardPage.jsx
# - Sidebar.jsx → src/components/Sidebar.jsx
# - StatsCard.jsx → src/components/StatsCard.jsx
# - ChartsSection.jsx → src/components/ChartsSection.jsx
# - TestGenerator.jsx → src/components/TestGenerator.jsx
# - EdgeCaseAnalyzer.jsx → src/components/EdgeCaseAnalyzer.jsx
# - FuzzTestingPanel.jsx → src/components/FuzzTestingPanel.jsx
# - index.css → src/index.css
# - index.html → root directory
# - tailwind.config.js → root directory
# - postcss.config.js → root directory
# - vite.config.js → root directory
# - package.json → root directory

# 7. Start development
npm run dev
```

## 📁 Complete File Structure

```
testai/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── ChartsSection.jsx
│   │   ├── TestGenerator.jsx
│   │   ├── EdgeCaseAnalyzer.jsx
│   │   └── FuzzTestingPanel.jsx
│   ├── app.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── server.js (optional)
└── .env (optional)
```

## 🎯 Testing the Application

### 1. Landing Page
- Navigate to `http://localhost:5173`
- See the hero section with animated background
- Click "Get Started Free" button

### 2. Sign Up
- Enter any email and password
- Click "Create Account"
- See the glassmorphism login card animation

### 3. Dashboard
- Explore the Overview tab with stats and charts
- Click on "Test Generator" tab
- Paste code or use the sample and click "Generate Tests"
- Check "Edge Cases" tab to see detected edge cases
- Try "Fuzz Testing" tab to run simulations

## 🔧 Environment Variables (Optional)

Create `.env` file in root:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=TestAI
VITE_APP_VERSION=1.0.0
```

## 🎨 UI Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      purple: { 600: '#your-color' },
      cyan: { 600: '#your-color' },
    },
  },
},
```

### Change Fonts
Edit `src/index.css`:
```css
@import url('your-font-url');
body {
  font-family: 'Your Font', sans-serif;
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 5174,
}
```

### Tailwind Classes Not Working
```bash
# Rebuild Tailwind
npm run build
```

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Framer Motion Not Animating
- Ensure Framer Motion is installed: `npm list framer-motion`
- Check that components are using `motion` correctly

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android latest

## 🔒 Security Checklist

- [ ] Environment variables in `.env` (not committed)
- [ ] HTTPS enabled in production
- [ ] Input validation on all forms
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] No hardcoded API keys

## 📊 Performance Tips

1. **Code Splitting**: Vite does this automatically
2. **Image Optimization**: Use WebP format
3. **Lazy Loading**: Use React.lazy() for components
4. **Caching**: Configure proper cache headers
5. **Minification**: Vite handles this in build

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Examples](https://recharts.org/examples)

## 💡 Next Steps

1. **Add Authentication**: Implement JWT with backend
2. **Connect Real AI**: Use Claude API or OpenAI
3. **Database**: Add MongoDB or PostgreSQL
4. **User Management**: Implement user accounts
5. **Advanced Analytics**: Add more chart types
6. **Mobile App**: Build React Native version
7. **CI/CD**: Setup GitHub Actions

## 📞 Support & Help

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Install specific package version
npm install package-name@version

# Update all packages
npm update

# Clean cache
npm cache clean --force
```

## 🎉 Success Checklist

- [ ] Node.js and npm installed
- [ ] All dependencies installed (`npm install`)
- [ ] Files organized in correct directories
- [ ] `npm run dev` runs without errors
- [ ] Browser opens at localhost:5173
- [ ] Landing page displays correctly
- [ ] Animations are smooth
- [ ] All buttons are clickable
- [ ] Navigation works between pages
- [ ] Charts display data properly

## 🚢 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Output will be in 'dist' folder
```

## 📈 Monitoring & Analytics (Optional)

Add Google Analytics:
```jsx
import { useEffect } from 'react';

useEffect(() => {
  window.gtag?.pageview({
    page_path: window.location.pathname,
  });
}, []);
```

## 🔄 CI/CD Setup with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run preview
```

## 🎨 Design System

### Colors
- Primary: Purple (#a855f7)
- Secondary: Cyan (#06b6d4)
- Background: Black (#000)
- Surface: Slate-900 (#0f172a)

### Spacing
- Use Tailwind's default scale
- Consistent padding: 4px, 8px, 12px, 16px, 24px

### Typography
- Display: Inter Bold 32px+
- Heading: Inter Semibold 18-24px
- Body: Inter Regular 14-16px
- Code: Space Mono 12-14px

### Shadows
- Subtle: 0 1px 2px rgba(0,0,0,0.05)
- Medium: 0 4px 6px rgba(0,0,0,0.1)
- Large: 0 10px 20px rgba(0,0,0,0.15)

---

**Happy Testing! 🚀**

For more details, see SETUP_GUIDE.md
