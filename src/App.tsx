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

  // ========================================================
  // Meta Pixel Initialization & PageView Tracking
  // ========================================================
  useEffect(() => {
    // Check if fbq is already initialized to prevent duplicate scripts
    if (!(window as any).fbq) {
      !(function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize with your unique Pixel ID
      (window as any).fbq('init', '1378447597539400');
    }

    // Fire a PageView event automatically on component mount
    (window as any).fbq('track', 'PageView');
  }, []);

  // ========================================================
  // GSAP Animations Configuration
  // ========================================================
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
