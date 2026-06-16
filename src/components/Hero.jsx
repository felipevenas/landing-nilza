import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Particles from '@tsparticles/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollArrowRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animação Orquestrada (GSAP Timeline)
  useEffect(() => {
    // 1. Marca d'água com rotação infinita lenta
    const watermarkAnimation = gsap.to(watermarkRef.current, {
      rotation: 360,
      duration: 140,
      repeat: -1,
      ease: 'none',
    });

    let textSplit;
    let timeline;

    const initTimeline = () => {
      // 2. Animação de digitação/entrada dos elementos de texto e botões
      timeline = gsap.timeline();

      // Eyebrow entrada (delay 0.2s)
      timeline.fromTo(eyebrowRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.2
      );

      // Headline entrada com SplitType
      if (headlineRef.current) {
        textSplit = new SplitType(headlineRef.current, { types: 'lines,words' });
        
        // Ajuste CSS necessário para as linhas criadas pelo SplitType terem overflow hidden
        textSplit.lines.forEach(line => {
          line.style.overflow = 'hidden';
          line.style.display = 'block';
        });

        textSplit.words.forEach(word => {
          word.style.display = 'inline-block';
        });

        timeline.fromTo(textSplit.words,
          { y: '110%' },
          { y: '0%', duration: 1.1, stagger: 0.06, ease: 'power4.out' },
          0.5
        );
      }

      // Subtítulo entrada
      timeline.fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        1.2
      );

      // Botões entrada (scale 0.8 -> 1 com elastic ease)
      timeline.fromTo(buttonsRef.current?.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.75)', stagger: 0.15 },
        1.6
      );
    };

    // Aguarda o carregamento das Google Fonts (Playfair Display) para que o SplitType calcule as linhas reais perfeitamente
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initTimeline();
      });
    } else {
      initTimeline();
    }

    // Seta de scroll animada (float bounce + fade out no scroll)
    const bounceAnimation = gsap.to(scrollArrowRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });

    const fadeOutAnimation = gsap.to(scrollArrowRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '200px top',
        scrub: true,
      }
    });

    // Cleanup
    return () => {
      watermarkAnimation.kill();
      timeline?.kill();
      if (textSplit) textSplit.revert();
      bounceAnimation.kill();
      fadeOutAnimation.scrollTrigger?.kill();
      fadeOutAnimation.kill();
    };
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.querySelector('#quem-somos');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Configurações das partículas douradas
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
        speed: 0.4,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: isMobile ? 20 : 35,
      },
      opacity: {
        value: 0.15,
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
      id="inicio"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '100svh' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #111120 100%)',
        paddingTop: isMobile ? '100px' : '100px',
        paddingBottom: isMobile ? '100px' : '100px',
        overflow: 'hidden',
      }}
    >
      {/* tsParticles */}
      {!window.matchMedia('(prefers-reduced-motion: reduce)').matches && (
        <Particles
          id="hero-particles"
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

      {/* Marca d'água rotativa "N&V" */}
      <div
        ref={watermarkRef}
        className="watermark"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: isMobile ? '50vw' : '20vw',
          color: '#C9A84C',
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 1,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        N&V
      </div>

      {/* Conteúdo Central */}
      <div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="eyebrow" style={{ opacity: 0 }}>
          CORRETORAS DE IMÓVEIS · SALVADOR, BA
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: isMobile ? '44px' : '52px',
            lineHeight: 1.15,
            color: '#FFFFFF',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          Seu próximo lar ou investimento começa com quem realmente entende o mercado.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: 1.75,
            color: 'var(--color-muted)',
            maxWidth: '680px',
            margin: '0 auto',
            opacity: 0,
          }}
        >
          Nilza e Vera Neves unem experiência, dedicação e expertise local para transformar a sua busca pelo imóvel ideal em uma jornada segura e tranquila.
        </p>

        {/* Botões */}
        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '16px',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
            marginTop: '12px',
          }}
        >
          <a
            href="#contato"
            className="btn-pill btn-primary"
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Quero encontrar meu imóvel
          </a>
          <a
            href="#quem-somos"
            className="btn-pill btn-secondary"
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Conheça nosso trabalho
          </a>
        </div>

      </div>

      {/* Seta de scroll bounce */}
      <button
        ref={scrollArrowRef}
        onClick={handleScrollClick}
        aria-label="Rolar para baixo"
        style={{
          position: 'absolute',
          bottom: '32px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#C9A84C',
          outline: 'none',
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
    </section>
  );
}
