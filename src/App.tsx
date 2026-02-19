import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Global scroll-triggered animations for sections
      const sections = document.querySelectorAll('.animate-section');
      
      sections.forEach((section) => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      });
    }, mainRef);

    return () => {
      // Only kill the triggers we created
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Testimonials />
        <Blog />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
