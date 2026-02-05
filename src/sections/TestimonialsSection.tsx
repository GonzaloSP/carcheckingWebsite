import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Rápido, claro y sin sorpresas. Me salvó de comprar un auto con el kilometraje adulterado.',
    author: 'Martín G.',
    location: 'CABA',
    rating: 5,
  },
  {
    quote:
      'El informe escrito me dio la tranquilidad para negociar el precio. Excelente servicio.',
    author: 'Lucía R.',
    location: 'GBA',
    rating: 5,
  },
  {
    quote:
      'Profesionales. Llegaron a tiempo y explicaron todo. Totalmente recomendable.',
    author: 'Diego P.',
    location: 'Zona Norte',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative bg-[#0B0B0D] py-24 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] leading-[0.95] mb-4">
            TESTIMONIOS
          </h2>
          <p className="text-lg text-[#B8B2AA]">
            El <span className="text-[#C8A161] font-semibold">96.6%</span> de
            nuestros clientes nos recomienda.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-[#141416] border border-[#2a2a2c] p-8 rounded-lg relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C8A161]/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#C8A161] fill-[#C8A161]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#F4F1EC] text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A161]/20 flex items-center justify-center">
                  <span className="text-[#C8A161] font-semibold text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[#F4F1EC] font-medium text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-[#B8B2AA] text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Gold underline */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#C8A161]/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
