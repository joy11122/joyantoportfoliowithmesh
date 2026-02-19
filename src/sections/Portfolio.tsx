import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const projects = [
    {
      title: 'Brandly',
      category: 'Brand Identity & Web Design',
      description: 'A complete brand overhaul for a luxury fashion retailer, featuring an elegant e-commerce experience.',
      image: '/project-1.jpg',
      tags: ['Webflow', 'E-commerce', 'Branding'],
      link: '#',
      github: '#',
    },
    {
      title: 'Aurum Atelier',
      category: 'E-commerce Platform',
      description: 'Premium jewelry e-commerce platform with immersive product showcases and seamless checkout.',
      image: '/project-2.jpg',
      tags: ['React', 'Shopify', 'Animation'],
      link: '#',
      github: '#',
    },
    {
      title: 'SAS Dashboard',
      category: 'SaaS Application',
      description: 'Analytics dashboard with real-time data visualization and intuitive user interface.',
      image: '/project-3.jpg',
      tags: ['TypeScript', 'D3.js', 'Node.js'],
      link: '#',
      github: '#',
    },
    {
      title: 'Aurelia Atelier',
      category: 'Fashion Website',
      description: 'High-fashion brand website with editorial design and immersive storytelling.',
      image: '/project-4.jpg',
      tags: ['Webflow', 'GSAP', 'CMS'],
      link: '#',
      github: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Projects entrance animation
      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll('.project-card');
        
        const trigger = ScrollTrigger.create({
          trigger: projectsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 100, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.2,
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
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-topaz/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-topaz/30 to-transparent" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="inline-block text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
                Selected Works
              </span>
              <h2 className="font-display font-bold text-fluid-3xl text-white">
                Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">Projects</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md mt-4 md:mt-0">
              A curated selection of projects that showcase my expertise in design and development.
            </p>
          </div>

          {/* Projects Grid */}
          <div 
            ref={projectsRef}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative rounded-3xl overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`
                        w-full h-full object-cover transition-all duration-700
                        ${hoveredProject === index ? 'scale-110' : 'scale-100'}
                      `}
                    />
                    
                    {/* Overlay */}
                    <div 
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500
                        ${hoveredProject === index ? 'opacity-90' : 'opacity-60'}
                      `}
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* Tags */}
                      <div 
                        className={`
                          flex flex-wrap gap-2 mb-4 transition-all duration-500
                          ${hoveredProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                      >
                        {project.tags.map((tag, tIndex) => (
                          <span
                            key={tIndex}
                            className="text-xs text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-topaz text-sm font-medium mb-3">
                        {project.category}
                      </p>
                      <p 
                        className={`
                          text-white/70 text-sm max-w-md transition-all duration-500
                          ${hoveredProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                      >
                        {project.description}
                      </p>

                      {/* Action Buttons */}
                      <div 
                        className={`
                          flex gap-4 mt-6 transition-all duration-500
                          ${hoveredProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        `}
                      >
                        <a
                          href={project.link}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-topaz transition-colors duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          View Live
                        </a>
                        <a
                          href={project.github}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white text-sm font-medium hover:glass-strong transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Border Glow */}
                  <div 
                    className={`
                      absolute inset-0 rounded-3xl border-2 transition-all duration-500 pointer-events-none
                      ${hoveredProject === index ? 'border-topaz/50 shadow-neon' : 'border-white/10'}
                    `}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-white/60 hover:text-topaz transition-colors duration-300 group"
            >
              <span className="text-lg">View All Projects</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
