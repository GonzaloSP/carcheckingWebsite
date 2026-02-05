import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PRICING, servicePriceText } from '../config/pricing';
import { buildWhatsAppLeadMessage, whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';
import Navigation from '../sections/Navigation';
import { Check, Phone, MapPin, Clock, Shield, FileText, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// WhatsApp SVG Logo Component
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function BookingPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    zona: '',
    fecha: '',
    horario: '',
    mensaje: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const featureItems = featuresRef.current?.querySelectorAll('.feature-item');
      if (featureItems) {
        gsap.fromTo(
          featureItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

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
      source: 'booking_page',
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
      source: 'booking_page_form',
      has_message: Boolean(formData.mensaje && formData.mensaje.trim()),
    });

    // Send the user to WhatsApp with the filled-in info
    openWhatsApp(message);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        zona: '',
        fecha: '',
        horario: '',
        mensaje: '',
      });
    }, 3000);
  };

  const features = [
    { icon: Shield, title: '+350 puntos revisados', description: 'Inspección completa de todos los sistemas' },
    { icon: FileText, title: 'Informe escrito', description: 'Documento detallado con hallazgos' },
    { icon: Camera, title: 'Fotos documentadas', description: 'Evidencia visual de cada punto revisado' },
    { icon: WhatsAppLogo, title: 'Asesoramiento', description: 'Recomendaciones personalizadas' },
  ];

  return (
    <HelmetProvider>
      <SEO
        title="Solicitar Turno | carChecking - Inspección de Vehículos a Domicilio"
        description={`Reserve su turno para inspección de vehículos. ${PRICING.serviceName} ${servicePriceText()}. Más de 350 puntos revisados. CABA y GBA.`}
        canonicalUrl="/solicitar-turno"
      />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-24 pb-16">
          {/* Header */}
          <div ref={headerRef} className="px-6 lg:px-12 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-[#B8B2AA] mb-4">
                <Link to="/" className="hover:text-[#C8A161] transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <span className="text-[#C8A161]">Solicitar turno</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F1EC] mb-4">
                RESERVE SU TURNO
              </h1>
              <p className="text-lg text-[#B8B2AA] max-w-2xl mx-auto">
                Complete el formulario y nos pondremos en contacto para confirmar su inspección.
              </p>
            </div>
          </div>

          {/* Price Banner */}
          <div className="px-6 lg:px-12 mb-12">
            <div className="max-w-4xl mx-auto bg-[#C8A161] rounded-lg p-8 text-center">
              <p className="text-sm text-[#0B0B0D]/70 uppercase tracking-wider mb-2">
                {PRICING.serviceName}
              </p>
              <p className="text-5xl lg:text-6xl font-bold text-[#0B0B0D]">
                {servicePriceText()}
              </p>
              <p className="text-sm text-[#0B0B0D]/70 mt-2">
                {PRICING.includedLine}
              </p>
            </div>
          </div>

          <div className="px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div ref={formRef}>
                  <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-[#F4F1EC] mb-6">
                      Complete sus datos
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
                          placeholder="Ej: Juan Pérez"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
                            placeholder="(opcional)"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
                            placeholder="juan@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                          Zona / Dirección
                        </label>
                        <input
                          type="text"
                          value={formData.zona}
                          onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                          className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors"
                          placeholder="(opcional)"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                            Fecha preferida
                          </label>
                          <input
                            type="date"
                            value={formData.fecha}
                            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] focus:border-[#C8A161] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                            Horario preferido
                          </label>
                          <select
                            value={formData.horario}
                            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                            className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] focus:border-[#C8A161] focus:outline-none transition-colors"
                          >
                            <option value="">Seleccionar</option>
                            <option value="mañana">Mañana (9-13hs)</option>
                            <option value="tarde">Tarde (13-17hs)</option>
                            <option value="noche">Noche (17-19hs)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">
                          Mensaje adicional
                        </label>
                        <textarea
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded px-4 py-3 text-[#F4F1EC] placeholder-[#5a5a5c] focus:border-[#C8A161] focus:outline-none transition-colors h-24 resize-none"
                          placeholder="Información adicional sobre el vehículo..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitted}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitted ? (
                          <>
                            <Check className="w-5 h-5" />
                            Solicitud enviada correctamente
                          </>
                        ) : (
                          <>
                            <WhatsAppLogo className="w-5 h-5" />
                            Solicitar turno por WhatsApp
                          </>
                        )}
                      </button>

                      <p className="text-xs text-[#5a5a5c] text-center">
                        También puede contactarnos directamente al{' '}
                        <button
                          type="button"
                          onClick={() => openWhatsApp()}
                          className="text-[#C8A161] hover:underline"
                        >
                          11-5698-0573
                        </button>
                      </p>
                    </form>
                  </div>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-8">
                  {/* Features */}
                  <div ref={featuresRef} className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
                    <h3 className="text-xl font-bold text-[#F4F1EC] mb-6">
                      ¿Qué incluye el servicio?
                    </h3>
                    <div className="space-y-5">
                      {features.map((feature, index) => (
                        <div key={index} className="feature-item flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#C8A161]/10 flex items-center justify-center flex-shrink-0">
                            <feature.icon className="w-5 h-5 text-[#C8A161]" />
                          </div>
                          <div>
                            <h4 className="text-[#F4F1EC] font-medium">{feature.title}</h4>
                            <p className="text-sm text-[#B8B2AA]">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
                    <h3 className="text-xl font-bold text-[#F4F1EC] mb-6">
                      Información de contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#C8A161]" />
                        <div>
                          <p className="text-sm text-[#B8B2AA]">WhatsApp / Teléfono</p>
                          <button
                            onClick={() => openWhatsApp()}
                            className="text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
                          >
                            11-5698-0573
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#C8A161]" />
                        <div>
                          <p className="text-sm text-[#B8B2AA]">Horario de atención</p>
                          <p className="text-[#F4F1EC]">Lunes a sábado: 9:00 - 19:00 hs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#C8A161]" />
                        <div>
                          <p className="text-sm text-[#B8B2AA]">Cobertura</p>
                          <p className="text-[#F4F1EC]">CABA · Gran Buenos Aires</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick WhatsApp */}
                  <button
                    onClick={() => openWhatsApp()}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                  >
                    <WhatsAppLogo className="w-6 h-6" />
                    Contactar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2c] py-8 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#5a5a5c]">
              © carChecking 2011–2026. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Inicio
              </Link>
              <Link to="/blog" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Consejos para comprar
              </Link>
              <Link to="/solicitar-turno" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Solicitar turno
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
