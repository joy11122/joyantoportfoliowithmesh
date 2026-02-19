import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Brandly Inc.',
      avatar: '/avatar-1.jpg',
      content: 'Joyanta transformed our vision into reality. His attention to detail and creative approach exceeded our expectations. The website he built has significantly increased our conversions.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, TechStart',
      avatar: '/avatar-2.jpg',
      content: 'Working with Joyanta was an absolute pleasure. He understood our requirements perfectly and delivered a stunning website ahead of schedule. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Luxe',
      avatar: '/avatar-3.jpg',
      content: 'The level of professionalism and creativity Joyanta brings to every project is remarkable. Our new website has received countless compliments from clients and partners.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        
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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-topaz/5 rounded-full blur-[150px]" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-topaz text-sm font-semibold tracking-widest uppercase mb-4">
              Testimonials
            </span>
            <h2 className="font-display font-bold text-fluid-3xl text-white mb-6">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-topaz to-golden">Feedback</span>
            </h2>
            <p className="text-white/60 text-fluid-base max-w-2xl mx-auto">
              What my clients say about working together
            </p>
          </div>

          {/* Testimonials Grid - Desktop */}
          <div 
            ref={cardsRef}
            className="hidden md:grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card card-glass group hover:glass-strong transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-topaz/50" />
                </div>

                {/* Content */}
                <p className="text-white/80 leading-relaxed mb-8 min-h-[120px]">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-topaz text-topaz" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-topaz/30">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-white/50 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="card-glass">
                        <Quote className="w-8 h-8 text-topaz/50 mb-4" />
                        <p className="text-white/80 leading-relaxed mb-6">
                          "{testimonial.content}"
                        </p>
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-topaz text-topaz" />
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-topaz/30">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-display font-semibold text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-white/50 text-xs">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:glass-strong transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex ? 'w-6 bg-topaz' : 'bg-white/30'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:glass-strong transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
