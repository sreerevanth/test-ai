# TestAI - AI-Powered Smart Testing Tool

A premium SaaS platform for automated test generation, edge case detection, and smart fuzz testing.

## 🚀 Features

- **Auto Test Generation**: AI-powered unit test generation from code snippets
- **Edge Case Detection**: Automatic identification of boundary conditions and corner cases
- **Smart Fuzz Testing**: Intelligent random testing with pattern analysis
- **Live Dashboards**: Real-time analytics and test coverage insights
- **Premium UI**: Glassmorphism design with neon gradients and smooth animations

## 📋 Tech Stack

- **Frontend**: React 18, Next.js 14
- **UI**: Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Node.js, Express (or Next.js API routes)
- **Build**: Vite or Create React App

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Step 1: Create Project Structure

```bash
# Create a new directory
mkdir testai
cd testai

# Initialize npm project
npm init -y

# Install dependencies
npm install react react-dom framer-motion recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install express cors dotenv
```

### Step 2: Configure Tailwind CSS

```bash
# Initialize Tailwind
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0f1419',
        },
      },
    },
  },
  plugins: [],
}
```

### Step 3: Create Project Structure

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
│   ├── app.jsx (Main component)
│   ├── main.jsx (Entry point)
│   └── index.css
├── public/
├── package.json
├── vite.config.js (if using Vite)
└── README.md
```

### Step 4: Copy Component Files

Copy all the `.jsx` files provided to their respective directories:
- App.jsx → src/app.jsx
- LandingPage.jsx → src/pages/LandingPage.jsx
- LoginPage.jsx → src/pages/LoginPage.jsx
- DashboardPage.jsx → src/pages/DashboardPage.jsx
- Sidebar.jsx → src/components/Sidebar.jsx
- StatsCard.jsx → src/components/StatsCard.jsx
- ChartsSection.jsx → src/components/ChartsSection.jsx
- TestGenerator.jsx → src/components/TestGenerator.jsx
- EdgeCaseAnalyzer.jsx → src/components/EdgeCaseAnalyzer.jsx
- FuzzTestingPanel.jsx → src/components/FuzzTestingPanel.jsx

### Step 5: Create Entry Point

Create `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 6: Create CSS File

Create `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.8);
}
```

### Step 7: Create HTML Entry Point

Create `index.html` in root:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TestAI - AI-Powered Smart Testing</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Step 8: Configure Vite (if using Vite)

Create `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Install Vite dependency:
```bash
npm install -D vite @vitejs/plugin-react
```

### Step 9: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173` (Vite) or `http://localhost:3000` (Create React App)

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Usage Flow

1. **Landing Page**: First impression with feature showcase
2. **Sign Up/Login**: Create account with email or Google
3. **Dashboard**: Main interface with:
   - Overview tab: Statistics and charts
   - Test Generator: Paste code and generate tests
   - Edge Cases: View detected edge cases
   - Fuzz Testing: Run fuzzing simulations

## 🎨 Design Highlights

- **Dark Theme**: Black background (#000) with slate gradients
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Neon Gradients**: Purple (#a855f7) to Cyan (#06b6d4)
- **Smooth Animations**: Framer Motion for fluid interactions
- **3D Effects**: Card hover tilt and hover glow
- **Micro-interactions**: Smooth transitions on all elements

## 🔌 Backend Integration (Optional)

For production, add Express backend:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock endpoints
app.post('/api/generate-tests', (req, res) => {
  // Generate tests logic
  res.json({ tests: [] });
});

app.post('/api/analyze-edge-cases', (req, res) => {
  // Analyze edge cases logic
  res.json({ cases: [] });
});

app.post('/api/fuzz-test', (req, res) => {
  // Fuzz testing logic
  res.json({ results: [] });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## 📦 Deployment

### Vercel (Recommended for Next.js)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🔒 Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:3001
VITE_AI_API_KEY=your_api_key_here
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)

## 🛡️ Security Notes

- Use environment variables for API keys
- Implement authentication with JWT tokens
- Add rate limiting for API endpoints
- Sanitize user input before processing
- Use HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 💡 Future Enhancements

- Real AI integration with Claude API
- Database storage for tests and results
- Team collaboration features
- CI/CD pipeline integration
- Mobile app version
- Advanced analytics and reporting

## 🆘 Support

For issues and questions, please open an issue on GitHub or contact support@testai.com

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
