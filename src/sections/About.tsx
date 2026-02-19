import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Rocket, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following best practices.',
    },
    {
      icon: Palette,
      title: 'Pixel Perfect',
      description: 'Meticulous attention to detail in every design element.',
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Efficient workflow ensuring timely project completion.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Delivering excellence that exceeds expectations.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax and rotation
      if (imageRef.current) {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                rotation: -5 + self.progress * 10,
                y: self.progress * 50,
                duration: 0.3,
              });
            }
          },
        });
        triggersRef.current.push(trigger);
      }

      // Content reveal
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.reveal-item');
        elements.forEach((el, index) => {
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                el,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'power3.out' }
              );
            },
            once: true,
          });
          triggersRef.current.push(trigger);
        });
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.feature-card');
        const trigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0, scale: 0.9 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
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
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-topaz/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-golden/5 rounded-full blur-[100px]" />

      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
              About Me
            </span>
            <h2 className="font-display font-bold text-fluid-3xl text-white">
              Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">Excellence</span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Image Column */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="/about-portrait.jpg"
                  alt="About Joyanta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-topaz/30 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-golden/20 rounded-full" />
              
              {/* Experience Card */}
              <div className="absolute bottom-8 left-8 glass-strong rounded-2xl p-6">
                <div className="text-4xl font-display font-bold text-topaz mb-1">5+</div>
                <div className="text-white/70 text-sm">Years of<br />Experience</div>
              </div>
            </div>

            {/* Content Column */}
            <div ref={contentRef}>
              <h3 className="reveal-item font-display font-bold text-fluid-xl text-white mb-6">
                Transforming Ideas Into <span className="text-topaz">Digital Reality</span>
              </h3>
              
              <p className="reveal-item text-white/70 text-fluid-base leading-relaxed mb-6">
                With over 5 years of experience in web development, I specialize in creating 
                stunning, high-performance websites using Webflow and modern technologies. My 
                passion lies in bridging the gap between design and functionality.
              </p>
              
              <p className="reveal-item text-white/70 text-fluid-base leading-relaxed mb-8">
                I believe every pixel matters. From concept to deployment, I ensure each project 
                receives the attention it deserves, delivering results that not only meet but 
                exceed expectations.
              </p>

              {/* Skills Tags */}
              <div className="reveal-item flex flex-wrap gap-3 mb-8">
                {['Webflow', 'React', 'TypeScript', 'UI/UX', 'Animation', 'SEO'].map((skill) => (
                  <span
                    key={skill}
                    className="glass px-4 py-2 rounded-full text-sm text-white/80 hover:glass-topaz hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="reveal-item btn-outline-neon inline-block"
              >
                Let's Work Together
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card card-neon group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-topaz/20 to-golden/20 flex items-center justify-center mb-4 group-hover:from-topaz/40 group-hover:to-golden/40 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-topaz" />
                </div>
                <h4 className="font-display font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
