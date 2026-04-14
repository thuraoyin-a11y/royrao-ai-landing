import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProblemSolution from './components/sections/ProblemSolution';
import Services from './components/sections/Services';
import Demo from './components/sections/Demo';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

function App() {
  useLenis();

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#FAFAFA]">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Services />
        <Demo />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
