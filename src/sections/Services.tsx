import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Monitor, 
  Palette, 
  Megaphone, 
  Code2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const services = [
    {
      icon: Monitor,
      title: 'Web Design',
      description: 'Creating visually stunning, user-centric designs that captivate audiences and drive engagement.',
      features: ['UI/UX Design', 'Responsive Design', 'Prototype', 'Design Systems'],
      color: 'from-topaz to-golden',
    },
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Building robust, scalable websites with clean code and cutting-edge technologies.',
      features: ['Webflow Development', 'Custom Code', 'CMS Integration', 'E-commerce'],
      color: 'from-golden to-topaz',
    },
    {
      icon: Palette,
      title: 'Branding',
      description: 'Crafting unique brand identities that resonate with your target audience.',
      features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      color: 'from-topaz to-golden',
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to boost your online presence and conversions.',
      features: ['SEO Optimization', 'Content Strategy', 'Analytics', 'Social Media'],
      color: 'from-golden to-topaz',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        
        const trigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 80, opacity: 0, rotateX: 15 },
              {
                y: 0,
                opacity: 1,
                rotateX: 0,
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
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-topaz/5 rounded-full blur-[150px]" />
      
      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              What I Offer
            </span>
            <h2 className="font-display font-bold text-fluid-3xl text-white mb-6">
              Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">& Solutions</span>
            </h2>
            <p className="text-white/60 text-fluid-base max-w-2xl mx-auto">
              Comprehensive digital services tailored to elevate your brand and drive results
            </p>
          </div>

          {/* Services Grid */}
          <div 
            ref={cardsRef}
            className="grid md:grid-cols-2 gap-6"
            style={{ perspective: '1000px' }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card relative group cursor-pointer`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div 
                  className={`
                    relative p-8 rounded-3xl transition-all duration-500 h-full
                    ${activeCard === index ? 'glass-strong' : 'glass'}
                  `}
                  style={{
                    borderColor: activeCard === index ? 'rgba(230, 165, 32, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: activeCard === index ? '0 0 40px rgba(230, 165, 32, 0.2)' : 'none',
                  }}
                >
                  {/* Glow Effect */}
                  <div 
                    className={`
                      absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-500
                      ${activeCard === index ? 'opacity-10' : ''}
                    `}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
                        bg-gradient-to-br ${service.color}
                        ${activeCard === index ? 'scale-110 shadow-neon' : ''}
                      `}
                    >
                      <service.icon className="w-8 h-8 text-black" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-2xl text-white mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div 
                      className={`
                        flex items-center gap-2 text-topaz font-medium transition-all duration-300
                        ${activeCard === index ? 'translate-x-2' : ''}
                      `}
                    >
                      <span>Learn More</span>
                      <ArrowRight 
                        className={`
                          w-4 h-4 transition-transform duration-300
                          ${activeCard === index ? 'translate-x-1' : ''}
                        `} 
                      />
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div 
                    className={`
                      absolute top-0 right-0 w-32 h-32 opacity-0 transition-opacity duration-500
                      ${activeCard === index ? 'opacity-100' : ''}
                    `}
                  >
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-topaz" />
                    <div className="absolute top-4 right-8 w-1 h-1 rounded-full bg-golden" />
                    <div className="absolute top-8 right-4 w-1 h-1 rounded-full bg-golden" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6">
              Need a custom solution? Let's discuss your project.
            </p>
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-neon inline-flex items-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
