import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function FloatingWhatsApp() {
  const btnRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
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
    // Entra após 3 segundos com bounce suave
    gsap.fromTo(btnRef.current,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)', 
        delay: 3 
      }
    );
  }, []);

  return (
    <div
      ref={btnRef}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        opacity: 0, // inicial, GSAP vai animar
        transform: 'scale(0)', // inicial
      }}
    >
      {/* Tooltip (Apenas Desktop) */}
      {!isMobile && (
        <div
          style={{
            marginRight: '16px',
            backgroundColor: '#111120',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '50px',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            opacity: showTooltip ? 1 : 0,
            transform: showTooltip ? 'translateX(0)' : 'translateX(10px)',
            visibility: showTooltip ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
          }}
        >
          Falar com Nilza e Vera
        </div>
      )}

      {/* Botão Flutuante */}
      <a
        href="https://wa.me/5571993805616"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn clickable"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Falar com Nilza e Vera no WhatsApp"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '56px' : '60px',
          height: isMobile ? '56px' : '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
          textDecoration: 'none',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
      >
        {/* WhatsApp Icon */}
        <svg
          width={isMobile ? '28' : '30'}
          height={isMobile ? '28' : '30'}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.004 2C6.5 2 2.003 6.5 2.003 12c0 1.88.52 3.65 1.43 5.17l-1.52 5.56 5.69-1.49c1.45.79 3.1 1.22 4.86 1.22 5.5 0 9.998-4.5 9.998-10S17.5 2 12.004 2zm5.72 14.19c-.24.67-1.39 1.28-1.92 1.36-.48.07-.94.13-3.04-.73-2.68-1.09-4.41-3.83-4.54-4.01-.13-.18-1.07-1.42-1.07-2.71s.67-1.93.91-2.18c.24-.25.53-.31.71-.31h.51c.16 0 .37.01.54.42.18.42.61 1.48.66 1.59.05.11.08.24 0 .41-.08.16-.12.27-.24.41-.12.14-.26.31-.37.42-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.05.15-.17.66-.77.84-1.03.18-.26.36-.22.61-.13.25.09 1.59.75 1.86.89.27.14.45.21.52.32.07.12.07.69-.17 1.36z" />
        </svg>
      </a>

      {/* CSS animado para pulso do box-shadow */}
      <style>{`
        .floating-whatsapp-btn {
          animation: floatingWapPulseEffect 2s infinite;
        }

        @keyframes floatingWapPulseEffect {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .floating-whatsapp-btn:hover {
            transform: scale(1.1);
            background-color: #20ba5a;
          }
        }
      `}</style>
    </div>
  );
}
