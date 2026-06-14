import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navbarRef = useRef(null);
  const progressBarRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef([]);

  // Links do menu
  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Por que Nós', href: '#diferenciais' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  // Scroll handler para fundo da Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animação de entrada da Navbar e Scroll Progress Bar
  useEffect(() => {
    // Entrada da navbar
    gsap.fromTo(navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.4 }
    );

    // Scroll progress bar scrub
    const progressAnimation = gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    return () => {
      progressAnimation.scrollTrigger?.kill();
      progressAnimation.kill();
    };
  }, []);

  // Animação do menu mobile fullscreen overlay
  useEffect(() => {
    if (isOpen) {
      // Abre o menu
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(150% at 90% 10%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });

      // Animando links do menu mobile com stagger
      gsap.fromTo(menuLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );

      // Bloquear scroll no body ao abrir menu
      document.body.style.overflow = 'hidden';
    } else {
      // Fecha o menu
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(0% at 90% 10%)',
        duration: 0.7,
        ease: 'power3.inOut'
      });

      // Liberar scroll
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Suave scroll via Lenis (que está escutando eventos de hash)
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Obter a instância do Lenis global pelo window se necessário, ou usar scrollIntoView com comportamento do Lenis
      // Lenis faz o scroll nativamente se usarmos window.scrollTo ou scrollIntoView já que ele sobrescreve.
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        ref={progressBarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: '#C9A84C',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          zIndex: 10001,
          pointerEvents: 'none',
        }}
      />

      {/* Navbar Container */}
      <header
        ref={navbarRef}
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10000,
          padding: scrolled ? '16px 0' : '24px 0',
          background: scrolled ? 'rgba(26, 26, 46, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.15)' : '1px solid transparent',
          transition: 'padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a 
            href="#inicio" 
            onClick={(e) => handleLinkClick(e, '#inicio')}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px', color: '#C9A84C' }}>N&V</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.2em', marginLeft: '8px', textTransform: 'uppercase' }}>Imóveis</span>
          </a>

          {/* Links Desktop */}
          <nav className="nav-desktop-menu" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="nav-link"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '8px 0',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="cta-desktop-wrapper">
            <a 
              href="#contato"
              onClick={(e) => handleLinkClick(e, '#contato')}
              className="btn-pill btn-primary"
              style={{ padding: '12px 24px', fontSize: '13px' }}
            >
              Fale Conosco
            </a>
          </div>

          {/* Hambúrguer Mobile */}
          <button 
            className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Menu Overlay Fullscreen Mobile */}
      <div
        ref={menuOverlayRef}
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#1A1A2E',
          zIndex: 9999,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath: 'circle(0% at 90% 10%)',
          pointerEvents: isOpen ? 'all' : 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              ref={(el) => (menuLinksRef.current[index] = el)}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '32px',
                color: '#FFFFFF',
                textDecoration: 'none',
                opacity: 0,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = '#C9A84C'}
              onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}
            >
              {link.label}
            </a>
          ))}
          <a
            ref={(el) => (menuLinksRef.current[navLinks.length] = el)}
            href="#contato"
            onClick={(e) => handleLinkClick(e, '#contato')}
            className="btn-pill btn-primary"
            style={{ marginTop: '24px', opacity: 0 }}
          >
            Falar no WhatsApp
          </a>
        </nav>
      </div>

      {/* Estilos adicionais injetados */}
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-desktop-menu {
          display: none;
        }
        .cta-desktop-wrapper {
          display: none;
        }
        .mobile-menu-btn {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 32px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 10002;
          padding: 0;
        }
        .mobile-menu-btn span {
          display: block;
          width: 100%;
          height: 2px;
          background-color: #C9A84C;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .mobile-menu-btn.active span:nth-child(1) {
          transform: translateY(11px) rotate(45deg);
        }
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
          transform: translateY(-11px) rotate(-45deg);
        }
        .mobile-menu-overlay {
          display: flex;
        }
        
        @media (min-width: 768px) {
          .nav-desktop-menu {
            display: flex !important;
          }
          .cta-desktop-wrapper {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
