import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import Particles from '@tsparticles/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contato() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Animação de entrada dos textos
    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: '#C9A84C',
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 0.3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: isMobile ? 30 : 60,
      },
      opacity: {
        value: 0.12,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1.5, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <section
      id="contato"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: isMobile ? '80px' : '110px',
        paddingBottom: isMobile ? '80px' : '110px',
        background: 'linear-gradient(135deg, #1A1A2E 0%, rgba(201, 168, 76, 0.08) 50%, #1A1A2E 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        borderTop: '1px solid rgba(201, 168, 76, 0.15)',
      }}
    >
      {/* tsParticles (mais denso) */}
      {!window.matchMedia('(prefers-reduced-motion: reduce)').matches && (
        <Particles
          id="contact-particles"
          options={particlesOptions}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Eyebrow */}
          <div className="eyebrow" style={{ color: '#C9A84C' }}>CONTATO</div>

          {/* Título */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isMobile ? '28px' : '42px',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Pronta para encontrar o seu imóvel ideal?
          </h2>

          {/* Subtítulo */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: isMobile ? '15px' : '16px',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: 0,
            }}
          >
            Entre em contato agora e descubra como Nilza e Vera Neves podem transformar essa jornada para você.
          </p>

          {/* Botão de WhatsApp Pulsante */}
          <div className="whatsapp-btn-wrapper" style={{ marginTop: '16px', width: isMobile ? '100%' : 'auto' }}>
            {/* Efeito ripple expansivo por trás */}
            <div className="whatsapp-btn-ripple" />
            
            <a
              href="https://wa.me/5571982613371"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill whatsapp-pulse-btn clickable"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#1A1A2E',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: isMobile ? '100%' : 'auto',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                fontWeight: 600,
              }}
            >
              {/* WhatsApp Icon */}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ color: '#25D366' }}
              >
                <path d="M12.004 2C6.5 2 2.003 6.5 2.003 12c0 1.88.52 3.65 1.43 5.17l-1.52 5.56 5.69-1.49c1.45.79 3.1 1.22 4.86 1.22 5.5 0 9.998-4.5 9.998-10S17.5 2 12.004 2zm5.72 14.19c-.24.67-1.39 1.28-1.92 1.36-.48.07-.94.13-3.04-.73-2.68-1.09-4.41-3.83-4.54-4.01-.13-.18-1.07-1.42-1.07-2.71s.67-1.93.91-2.18c.24-.25.53-.31.71-.31h.51c.16 0 .37.01.54.42.18.42.61 1.48.66 1.59.05.11.08.24 0 .41-.08.16-.12.27-.24.41-.12.14-.26.31-.37.42-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.05.15-.17.66-.77.84-1.03.18-.26.36-.22.61-.13.25.09 1.59.75 1.86.89.27.14.45.21.52.32.07.12.07.69-.17 1.36z"/>
              </svg>
              Falar no WhatsApp agora
            </a>
          </div>

          {/* E-mail */}
          <a
            href="mailto:nil.luar@hotmail.com"
            className="email-link clickable"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '15px',
              color: '#C9A84C',
              textDecoration: 'none',
              marginTop: '12px',
              padding: '6px 12px',
              position: 'relative',
            }}
          >
            <Mail size={16} />
            nil.luar@hotmail.com
          </a>
        </div>
      </div>

      {/* Estilos adicionais injetados */}
      <style>{`
        /* Animação de pulso contínuo */
        @keyframes pulseBtn {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        .whatsapp-pulse-btn {
          animation: pulseBtn 2s infinite ease-in-out;
        }

        .whatsapp-btn-wrapper {
          position: relative;
          display: inline-block;
        }

        /* Anel expansivo por trás */
        .whatsapp-btn-ripple {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: #C9A84C;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }

        @media (hover: hover) and (pointer: fine) {
          .whatsapp-btn-wrapper:hover .whatsapp-btn-ripple {
            animation: rippleEffectContact 1.2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          }

          .whatsapp-pulse-btn:hover {
            background-color: #F5F5F0 !important;
            transform: scale(1.05) translateY(-2px) !important;
            box-shadow: 0 12px 35px rgba(201, 168, 76, 0.35) !important;
            animation: none; /* pausa pulso ao passar o mouse */
          }

          .email-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #C9A84C;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }

          .email-link:hover::after {
            transform: scaleX(1);
          }
        }

        @keyframes rippleEffectContact {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
