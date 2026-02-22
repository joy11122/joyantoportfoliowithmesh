import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - split text effect
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.8, ease: 'power2.out' }
        );
      }

      // CTA buttons animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button');
        gsap.fromTo(
          buttons,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 1, ease: 'power2.out' }
        );
      }

      // Image reveal animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.5,
            delay: 0.2,
            ease: 'power3.inOut',
          }
        );
      }

      // Prism rotation animation
      if (prismRef.current) {
        gsap.to(prismRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Prism Effect - Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <div
          ref={prismRef}
          className="absolute -right-1/4 top-1/2 -translate-y-1/2 w-[150%] aspect-square"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                rgba(230, 165, 32, 0.15) 30deg,
                rgba(255, 215, 122, 0.2) 60deg,
                rgba(230, 165, 32, 0.15) 90deg,
                transparent 120deg,
                rgba(122, 74, 0, 0.1) 150deg,
                rgba(230, 165, 32, 0.15) 180deg,
                transparent 210deg,
                rgba(255, 248, 231, 0.1) 240deg,
                rgba(230, 165, 32, 0.15) 270deg,
                transparent 300deg,
                rgba(255, 215, 122, 0.2) 330deg,
                transparent 360deg
              )
            `,
            filter: 'blur(60px)',
          }}
        />
        {/* Additional gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-topaz/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-golden/15 rounded-full blur-[80px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full section-padding py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="float-element inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-topaz" />
                <span className="text-sm text-white/80">Available for freelance work</span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="font-display font-black text-fluid-4xl leading-none mb-6"
                style={{ perspective: '1000px' }}
              >
                <span className="word inline-block text-white">WEBFLOW</span>
                <br />
                <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-topaz via-golden to-topaz">
                  DEVELOPER
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-fluid-lg text-white/70 max-w-xl mb-10 leading-relaxed"
              >
                I craft digital experiences that merge{' '}
                <span className="text-topaz">art with functionality</span>. Specializing in
                creating stunning, high-performance websites that leave lasting impressions.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-neon inline-flex items-center gap-2"
                >
                  View My Work
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-outline-neon"
                >
                  Get In Touch
                </a>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                {[
                  { value: '1+', label: 'Years Experience' },
                  { value: '10+', label: 'Projects Completed' },
                  { value: '03+', label: 'Happy Clients' },
                ].map((stat, index) => (
                  <div key={index} className="float-element">
                    <div className="text-fluid-2xl font-display font-bold text-topaz neon-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="order-1 lg:order-2 relative">
              <div
                ref={imageRef}
                className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none"
              >
                {/* Image Frame */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src="/hero.jpg"
                    alt="Joyanta Halder"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Decorative Border */}
                <div className="absolute -inset-4 border border-topaz/30 rounded-3xl pointer-events-none" />
                <div className="absolute -inset-8 border border-topaz/10 rounded-3xl pointer-events-none" />

                {/* Floating Badge */}
                <div className="float-element absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-topaz to-golden flex items-center justify-center">
                      <span className="text-black font-bold text-lg">J</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Joyanta Halder</div>
                      <div className="text-white/60 text-sm">Webflow Expert</div>
                    </div>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="float-element absolute -top-4 -right-4 glass-strong rounded-full w-24 h-24 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-topaz">1+</span>
                  <span className="text-xs text-white/60">Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-topaz transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
