import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';
import { Phone, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// WhatsApp SVG Logo Component
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
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

      gsap.fromTo(
        ctaRef.current,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const contactItems = contactRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        gsap.fromTo(
          contactItems,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'footer' });
    window.open(whatsappUrl(), '_blank');
  };

  const callPhone = () => {
    // Do not open the phone dialer; send users to WhatsApp Web instead.
    trackEvent('whatsapp_click', { source: 'footer_phone_button' });
    window.open(whatsappUrl(), '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative bg-[#0B0B0D] min-h-screen flex flex-col z-[70]"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-24">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F1EC] leading-[0.95] text-center max-w-4xl mb-12"
        >
          LA FORMA SEGURA DE COMPRAR SU PRÓXIMO VEHÍCULO
        </h2>

        {/* CTA Row */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link
            to="/solicitar-turno"
            className="btn-primary flex items-center gap-3"
          >
            <WhatsAppLogo className="w-5 h-5" />
            Solicitar turno
          </Link>
          <button
            onClick={callPhone}
            className="btn-secondary flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            11-5698-0573
          </button>
        </div>

        {/* Contact Grid */}
        <div
          ref={contactRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 max-w-4xl w-full"
        >
          <div className="contact-item flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center mb-4">
              <WhatsAppLogo className="w-6 h-6 text-[#C8A161]" />
            </div>
            <p className="text-sm text-[#B8B2AA] uppercase tracking-wider mb-2">
              WhatsApp
            </p>
            <button
              onClick={openWhatsApp}
              className="text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
            >
              11-5698-0573
            </button>
          </div>

          <div className="contact-item flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#C8A161]" />
            </div>
            <p className="text-sm text-[#B8B2AA] uppercase tracking-wider mb-2">
              Horario
            </p>
            <p className="text-[#F4F1EC]">Lunes a sábado</p>
            <p className="text-[#B8B2AA]">9:00 – 19:00 hs</p>
          </div>

          <div className="contact-item flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-[#C8A161]" />
            </div>
            <p className="text-sm text-[#B8B2AA] uppercase tracking-wider mb-2">
              Cobertura
            </p>
            <p className="text-[#F4F1EC]">CABA · GBA · Córdoba</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="border-t border-[#2a2a2c] py-8 px-6 lg:px-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5a5a5c]">
            © carChecking 2011–2026. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={openWhatsApp}
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              WhatsApp
            </button>
            <Link
              to="/blog"
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/blog/inspeccion-pre-compra-auto-a-domicilio"
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              Inspección pre compra (a domicilio)
            </Link>
            <Link
              to="/blog/que-revisar-antes-de-comprar-auto-usado-checklist"
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              Checklist para comprar un usado
            </Link>
            <Link
              to="/blog/papeles-auto-usado-argentina-informe-dominio-verificacion-policial"
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              Papeles en Argentina (guía)
            </Link>
            <Link
              to="/solicitar-turno"
              className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              Solicitar turno
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
