import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Dribbble,
  ArrowUp,
  Heart
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Dribbble, href: '#', label: 'Dribbble' },
  ];

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#cta' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer reveal animation
      const trigger = ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            footerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    }, footerRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-topaz/30 to-transparent" />

      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="inline-block font-display font-bold text-2xl text-white mb-4"
              >
                JOYANTA<span className="text-topaz">.</span>
              </a>
              <p className="text-white/60 max-w-md mb-6 leading-relaxed">
                Crafting digital experiences that merge art with functionality. 
                Let's build something extraordinary together.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-topaz hover:glass-topaz transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-white/60 hover:text-topaz transition-colors duration-300 line-animate"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display font-semibold text-white mb-6">Get In Touch</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:hello@joyantahalder.com"
                    className="text-white/60 hover:text-topaz transition-colors duration-300"
                  >
                    hello@joyantahalder.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="text-white/60 hover:text-topaz transition-colors duration-300"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="text-white/60">
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm flex items-center gap-1">
              © 2025 Joyanta Halder. Made with <Heart className="w-4 h-4 text-topaz fill-topaz" /> in San Francisco
            </p>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/40 hover:text-topaz transition-colors duration-300 group"
              aria-label="Back to top"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:glass-topaz transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
