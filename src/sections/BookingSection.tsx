import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import { PRICING, servicePriceText } from '../config/pricing';
import { buildWhatsAppLeadMessage, whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';
import { isDesktop } from '../lib/isDesktop';

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    zona: '',
    fecha: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    if (!isDesktop()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Image slides in from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 1.08 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Diagonal line
      scrollTl.fromTo(
        diagonalRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Price
      scrollTl.fromTo(
        priceRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Form fields
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        scrollTl.fromTo(
          formFields,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.18
        );
      }

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.28
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headlineRef.current, priceRef.current, formRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-10vw', scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        diagonalRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = (overrideMessage?: string) => {
    const message =
      overrideMessage ??
      buildWhatsAppLeadMessage({
        ...formData,
        servicio: PRICING.serviceName,
      });

    trackEvent('whatsapp_click', {
      source: 'home_booking_section',
      has_message: Boolean(message && message.trim()),
    });

    window.open(whatsappUrl(message), '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = buildWhatsAppLeadMessage({
      ...formData,
      servicio: PRICING.serviceName,
    });

    trackEvent('lead_submit', {
      source: 'home_booking_section_form',
      has_message: true,
    });

    openWhatsApp(message);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nombre: '', telefono: '', zona: '', fecha: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0D] z-[60]"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="relative md:absolute md:left-0 md:top-0 w-full md:w-[55vw] h-[34svh] md:h-full overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/mechanic_working.jpg`}
          alt="Mecánico trabajando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0D]/70" />
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="hidden md:block absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/70"
        style={{
          left: '52vw',
          transformOrigin: 'top center',
          transform: 'rotate(28deg) translateY(-10%)',
        }}
      />

      {/* Right Text Panel */}
      <div className="relative md:absolute md:right-0 md:top-0 w-full md:w-[48vw] min-h-[66svh] md:h-full bg-[#0B0B0D] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 md:py-0">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F1EC] leading-[0.95] mb-6"
        >
          RESERVE SU TURNO
        </h2>

        {/* Price */}
        <div ref={priceRef} className="mb-8">
          <p className="text-sm text-[#B8B2AA] uppercase tracking-wider mb-1">
            {PRICING.serviceName}
          </p>
          <p className="text-4xl lg:text-5xl font-bold text-[#C8A161]">
            {servicePriceText()}
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="form-field">
            <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className="w-full bg-[#141416] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
              placeholder="Su nombre"
              required
            />
          </div>

          <div className="form-field">
            <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
              className="w-full bg-[#141416] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
              placeholder="(opcional)"
            />
          </div>

          <div className="form-field">
            <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
              Zona
            </label>
            <input
              type="text"
              value={formData.zona}
              onChange={(e) =>
                setFormData({ ...formData, zona: e.target.value })
              }
              className="w-full bg-[#141416] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
              placeholder="(opcional)"
            />
          </div>

          <div className="form-field">
            <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
              Fecha preferida
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) =>
                setFormData({ ...formData, fecha: e.target.value })
              }
              className="w-full bg-[#141416] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] focus:border-[#C8A161] focus:outline-none transition-colors"
            />
          </div>
        </form>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="btn-primary flex items-center justify-center gap-3 w-full disabled:opacity-70"
          >
            {isSubmitted ? (
              <>
                <Check className="w-5 h-5" />
                Solicitud enviada
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Solicitar turno
              </>
            )}
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="flex items-center justify-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors group"
          >
            <span className="text-sm tracking-wide">
              O escríbanos por WhatsApp
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
