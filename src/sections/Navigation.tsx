import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#cta' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    // Animate links when menu opens
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      if (isMenuOpen) {
        gsap.fromTo(
          links,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
        );
      }
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'top-4' : 'top-6'
        }`}
      >
        <div
          className={`glass rounded-full px-4 py-3 flex items-center gap-2 transition-all duration-500 ${
            isScrolled ? 'glass-strong shadow-glass' : ''
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="font-display font-bold text-white text-sm sm:text-base tracking-wider mr-4"
          >
            JOYANTA<span className="text-topaz">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative px-4 py-2 text-sm text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-topaz to-golden group-hover:w-1/2 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#cta"
            onClick={(e) => handleLinkClick(e, '#cta')}
            className="hidden lg:block ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-topaz to-golden text-black text-sm font-semibold hover:shadow-neon transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-topaz transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
        <div
          ref={linksRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-3xl font-display font-bold text-white hover:text-topaz transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => handleLinkClick(e, '#cta')}
            className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-topaz to-golden text-black text-lg font-semibold"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
