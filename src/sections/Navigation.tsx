import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// WhatsApp SVG Logo Component
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0D]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
          >
            carChecking
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('servicio')}
                  className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
                >
                  Servicio
                </button>
                <button
                  onClick={() => scrollToSection('cobertura')}
                  className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
                >
                  Cobertura
                </button>
                <button
                  onClick={() => scrollToSection('testimonios')}
                  className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
                >
                  Testimonios
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
                >
                  Inicio
                </Link>
              </>
            )}
            {/* Blog Link with SEO text */}
            <Link
              to="/blog"
              className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
              title="Consejos para la compra de vehículos usados"
            >
              Consejos para comprar
            </Link>
            <Link
              to="/solicitar-turno"
              className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* CTA Button with WhatsApp Logo */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/solicitar-turno"
              className="btn-primary flex items-center gap-2"
            >
              <WhatsAppLogo className="w-4 h-4" />
              Solicitar turno
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#F4F1EC] p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#0B0B0D]/98 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {isHomePage ? (
            <>
              <button
                onClick={() => scrollToSection('servicio')}
                className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
              >
                Servicio
              </button>
              <button
                onClick={() => scrollToSection('cobertura')}
                className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
              >
                Cobertura
              </button>
              <button
                onClick={() => scrollToSection('testimonios')}
                className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
              >
                Testimonios
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
              >
                Inicio
              </Link>
            </>
          )}
          {/* Blog Link Mobile */}
          <Link
            to="/blog"
            className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
          >
            Consejos para comprar
          </Link>
          <Link
            to="/solicitar-turno"
            className="text-2xl text-[#F4F1EC] hover:text-[#C8A161] transition-colors"
          >
            Contacto
          </Link>
          <Link
            to="/solicitar-turno"
            className="btn-primary flex items-center gap-2 mt-4"
          >
            <WhatsAppLogo className="w-5 h-5" />
            Solicitar turno
          </Link>
        </div>
      </div>
    </>
  );
}
