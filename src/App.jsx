import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Particles from './components/reactbits/Particles';
import GooeyNav from './components/reactbits/GooeyNav';
import LogoLoop from './components/reactbits/LogoLoop';
import Hero from './pages/Hero';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
// Project sub-pages
import FinancialModel from './pages/projects/FinancialModel';
import EquityResearch from './pages/projects/EquityResearch';
import MutualFund from './pages/projects/MutualFund';
import IpoAnalysis from './pages/projects/IpoAnalysis';
import './index.css';

// Navigation items for GooeyNav
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resume', path: '/resume' }
];

const AppContent = () => {
  return (
    <div className="app">
      {/* Particles Background */}
      <Particles
        particleCount={80}
        particleSpread={12}
        speed={0.05}
        particleColors={['#f8fafc', '#e2e8f0', '#cbd5e1']}
        moveParticlesOnHover={true}
        particleHoverFactor={1.5}
        alphaParticles={true}
        particleBaseSize={120}
        sizeRandomness={0.8}
        cameraDistance={25}
        disableRotation={false}
      />

      {/* GooeyNav - Works on both desktop (top) and mobile (bottom) */}
      <div className="gooey-nav-wrapper">
        <GooeyNav items={navItems} />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/financial-model" element={<FinancialModel />} />
          <Route path="/projects/equity-research" element={<EquityResearch />} />
          <Route path="/projects/mutual-fund" element={<MutualFund />} />
          <Route path="/projects/ipo-analysis" element={<IpoAnalysis />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>

      {/* Global Social Footer - Displays on all pages */}
      <footer className="social-footer">
        <div className="container">
          <p className="footer-text">Connect with me</p>
          <LogoLoop />
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
