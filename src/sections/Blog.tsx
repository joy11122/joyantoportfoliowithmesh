import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const posts = [
    {
      title: 'The Future of Web Design: Trends to Watch in 2025',
      excerpt: 'Explore the emerging trends shaping the future of web design, from AI-powered interfaces to immersive 3D experiences.',
      image: '/blog-1.jpg',
      category: 'Design Trends',
      date: 'Jan 15, 2025',
      readTime: '5 min read',
    },
    {
      title: 'Mastering Webflow: Advanced Animation Techniques',
      excerpt: 'Learn how to create stunning animations in Webflow that will elevate your websites to the next level.',
      image: '/blog-2.jpg',
      category: 'Development',
      date: 'Jan 10, 2025',
      readTime: '8 min read',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Posts entrance animation
      if (postsRef.current) {
        const cards = postsRef.current.querySelectorAll('.blog-card');
        
        const trigger = ScrollTrigger.create({
          trigger: postsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
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
      id="blog"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-topaz/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="inline-block text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
                Latest Insights
              </span>
              <h2 className="font-display font-bold text-fluid-3xl text-white">
                From The <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">Blog</span>
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white/60 hover:text-topaz transition-colors duration-300 mt-4 md:mt-0 group"
            >
              <span>View All Articles</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Blog Grid */}
          <div 
            ref={postsRef}
            className="grid md:grid-cols-2 gap-8"
          >
            {posts.map((post, index) => (
              <article
                key={index}
                className="blog-card group cursor-pointer"
                onMouseEnter={() => setHoveredPost(index)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="relative rounded-3xl overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`
                        w-full h-full object-cover transition-all duration-700
                        ${hoveredPost === index ? 'scale-110 grayscale-0' : 'scale-100 grayscale'}
                      `}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="glass px-4 py-1.5 rounded-full text-sm text-white/90">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4 text-white/50 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className={`
                        font-display font-bold text-xl md:text-2xl text-white mb-3 transition-all duration-300
                        ${hoveredPost === index ? 'text-topaz' : ''}
                      `}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p 
                      className={`
                        text-white/60 text-sm leading-relaxed mb-4 transition-all duration-500
                        ${hoveredPost === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      `}
                    >
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div 
                      className={`
                        flex items-center gap-2 text-topaz font-medium transition-all duration-500
                        ${hoveredPost === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                      `}
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Border */}
                  <div 
                    className={`
                      absolute inset-0 rounded-3xl border-2 transition-all duration-500 pointer-events-none
                      ${hoveredPost === index ? 'border-topaz/50' : 'border-white/10'}
                    `}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
