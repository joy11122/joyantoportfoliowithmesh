import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const skills = [
    { name: 'Webflow', level: 95, color: 'from-topaz to-golden' },
    { name: 'HTML/CSS', level: 98, color: 'from-topaz to-golden' },
    { name: 'JavaScript', level: 90, color: 'from-topaz to-golden' },
    { name: 'React', level: 85, color: 'from-topaz to-golden' },
    { name: 'TypeScript', level: 80, color: 'from-topaz to-golden' },
    { name: 'UI/UX Design', level: 88, color: 'from-topaz to-golden' },
    { name: 'GSAP Animation', level: 92, color: 'from-topaz to-golden' },
    { name: 'SEO Optimization', level: 85, color: 'from-topaz to-golden' },
  ];

  const tools = [
    'Figma', 'Adobe XD', 'VS Code', 'Git', 'Webpack', 'Tailwind CSS',
    'Framer Motion', 'Three.js', 'Node.js', 'MongoDB'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars
      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll('.skill-bar');
        
        bars.forEach((bar, index) => {
          const progressBar = bar.querySelector('.progress-bar');
          const level = skills[index]?.level || 0;
          
          const trigger = ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            onEnter: () => {
              // Animate the progress bar width
              gsap.fromTo(
                progressBar,
                { width: '0%' },
                {
                  width: `${level}%`,
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: 'power3.out',
                }
              );
              
              // Animate the glow effect
              gsap.fromTo(
                bar.querySelector('.progress-glow'),
                { opacity: 0, scaleX: 0 },
                {
                  opacity: 1,
                  scaleX: 1,
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: 'power3.out',
                }
              );
            },
            once: true,
          });
          triggersRef.current.push(trigger);
        });
      }

      // Animate tools
      const toolElements = document.querySelectorAll('.tool-tag');
      const trigger = ScrollTrigger.create({
        trigger: '.tools-grid',
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            toolElements,
            { y: 30, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: 'back.out(1.7)',
            }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-topaz/5 to-transparent" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
              My Expertise
            </span>
            <h2 className="font-display font-bold text-fluid-3xl text-white mb-6">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">Technologies</span>
            </h2>
            <p className="text-white/60 text-fluid-base max-w-2xl mx-auto">
              A comprehensive toolkit built over years of crafting digital experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Skills Bars */}
            <div ref={barsRef}>
              <h3 className="font-display font-semibold text-xl text-white mb-8">
                Core Competencies
              </h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-bar">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-topaz font-semibold">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      {/* Progress Bar */}
                      <div
                        className={`progress-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: '0%' }}
                      />
                      
                      {/* Glow Effect */}
                      <div
                        className="progress-glow absolute inset-y-0 left-0 rounded-full bg-topaz/50 blur-md"
                        style={{ width: `${skill.level}%`, opacity: 0, transformOrigin: 'left' }}
                      />
                      
                      {/* Neon Border */}
                      <div className="absolute inset-0 rounded-full border border-topaz/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h3 className="font-display font-semibold text-xl text-white mb-8">
                Tools & Technologies
              </h3>
              
              <div className="tools-grid flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <span
                    key={index}
                    className="tool-tag glass px-5 py-3 rounded-xl text-white/80 font-medium hover:glass-topaz hover:text-white hover:shadow-neon transition-all duration-300 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Additional Info Card */}
              <div className="mt-12 card-glass">
                <h4 className="font-display font-semibold text-lg text-white mb-4">
                  Always Learning
                </h4>
                <p className="text-white/60 leading-relaxed mb-6">
                  The digital landscape evolves rapidly, and so do I. I'm constantly exploring 
                  new technologies and methodologies to stay at the forefront of web development.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {['React', 'Next.js', 'AI'].map((tech, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-topaz to-golden flex items-center justify-center text-black text-xs font-bold border-2 border-black"
                      >
                        {tech[0]}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">Currently exploring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
