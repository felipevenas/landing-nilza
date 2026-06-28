import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#111120',
        color: 'rgba(255, 255, 255, 0.55)',
        paddingTop: '64px',
        paddingBottom: '48px',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(201, 168, 76, 0.1)',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        
        {/* Bloco Logo & Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', color: '#C9A84C' }}>N&V</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '15px', color: '#FFFFFF', letterSpacing: '0.2em', marginLeft: '8px', textTransform: 'uppercase' }}>Imóveis</span>
          </a>
          
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.45)',
              margin: 0,
            }}
          >
            Especialistas em imóveis em Salvador e região
          </p>
        </div>

        {/* Links Rápidos */}
        <nav
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {[
            { label: 'Início', href: '#inicio' },
            { label: 'Quem Somos', href: '#quem-somos' },
            { label: 'Serviços', href: '#servicos' },
            { label: 'Por que Nós', href: '#diferenciais' },
            { label: 'Depoimentos', href: '#depoimentos' },
            { label: 'Contato', href: '#contato' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="footer-link clickable"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.55)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Linha Divisória */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(201, 168, 76, 0.2)',
            marginTop: '16px',
          }}
        />

        {/* Bloco Copyright & CRECI */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          <span>
            &copy; {currentYear} N&V Imóveis &mdash; Nilza Raul &amp; Vera Neves. Todos os direitos reservados.
          </span>
          <span style={{ letterSpacing: '0.05em' }}>
            CRECI-BA 20284 &bull; CRECI-BA 24058
          </span>
        </div>
      </div>

      {/* Hover link do footer */}
      <style>{`
        .footer-link:hover {
          color: #C9A84C !important;
        }
      `}</style>
    </footer>
  );
}
