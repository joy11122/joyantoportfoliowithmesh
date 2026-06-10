import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const vortexRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.reveal-item');
        
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              elements,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
              }
            );
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      }

      // Vortex rotation
      if (vortexRef.current) {
        gsap.to(vortexRef.current, {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
        });
      }

      // Title pulse animation
      gsap.to('.cta-title', {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Vortex Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={vortexRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                rgba(230, 165, 32, 0.1) 0deg,
                transparent 30deg,
                rgba(255, 215, 122, 0.15) 60deg,
                transparent 90deg,
                rgba(230, 165, 32, 0.1) 120deg,
                transparent 150deg,
                rgba(122, 74, 0, 0.1) 180deg,
                transparent 210deg,
                rgba(255, 248, 231, 0.05) 240deg,
                transparent 270deg,
                rgba(230, 165, 32, 0.1) 300deg,
                transparent 330deg
              )
            `,
            filter: 'blur(40px)',
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-topaz/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-golden/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <div ref={contentRef} className="text-center">
            {/* Main CTA */}
            <h2 className="cta-title reveal-item font-display font-black text-fluid-4xl text-white mb-6">
              Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz via-golden to-topaz">Together</span>
            </h2>
            
            <p className="reveal-item text-white/60 text-fluid-lg max-w-2xl mx-auto mb-10">
              Have a project in mind? Let's create something extraordinary. 
              I'm always excited to work on new challenges.
            </p>

            {/* CTA Buttons */}
            <div className="reveal-item flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="mailto:joyhaldar112233@gmail.com"
                className="btn-neon inline-flex items-center gap-2"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline-neon"
              >
                View Portfolio
              </a>
            </div>

            {/* Contact Info Cards */}
            <div className="reveal-item grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'joyhaldar112233@gmail.com',
                  href: 'mailto: joyhaldar112233@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+8801904914544',
                  href: 'tel:+8801904914544',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Khulna, Bangladesh',
                  href: '#',
                },
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="card-glass group hover:glass-strong transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-topaz/20 to-golden/20 flex items-center justify-center mb-4 mx-auto group-hover:from-topaz/40 group-hover:to-golden/40 transition-all duration-300">
                    <contact.icon className="w-5 h-5 text-topaz" />
                  </div>
                  <div className="text-white/50 text-sm mb-1">{contact.label}</div>
                  <div className="text-white font-medium group-hover:text-topaz transition-colors duration-300">
                    {contact.value}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
