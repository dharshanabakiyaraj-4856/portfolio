import './App.css'
import { Navbar } from './components/Navbar'
import { portfolioData } from './data/portfolioData'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Achievements } from './pages/Achievements'
import { ContactPage } from './pages/ContactPage'
import { NotFound } from './pages/NotFound'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
          <AnimatedRoutes />
        </main>
        <footer className="site-footer">
          <div className="container">
            <span>© {new Date().getFullYear()} {portfolioData.name}</span>
            <span>Designed &amp; built with intention.</span>
            <a href="#home">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App