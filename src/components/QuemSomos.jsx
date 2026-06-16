import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function QuemSomos() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const badgesRef = useRef(null);
  const cardRef = useRef(null);
  const lineRef = useRef(null);
  const letterNRef = useRef(null);
  const letterVRef = useRef(null);
  const cardTextRef = useRef(null);

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
    // 1. Animação de entrada do Título com clip-path linha por linha
    let titleSplit;
    if (titleRef.current) {
      titleSplit = new SplitType(titleRef.current, { types: 'lines' });

      // Configura as linhas para serem compatíveis com o clip-path
      titleSplit.lines.forEach(line => {
        line.style.display = 'block';
        line.style.willChange = 'clip-path';
      });

      gsap.fromTo(titleSplit.lines,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );
    }

    // 2. Animação de fade-in + slide-up do Eyebrow, Corpo e Badges
    gsap.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo(bodyRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo(badgesRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: badgesRef.current,
          start: 'top 85%',
        }
      }
    );

    // 3. Animação do Card N|V
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
      }
    });

    // Fade-in e scale do card em si
    cardTl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Entrada da letra N (fade + slide-right)
    cardTl.fromTo(letterNRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    // Crescimento da linha vertical (0 -> 100% height)
    cardTl.fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Entrada da letra V (fade + slide-left)
    cardTl.fromTo(letterVRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    );

    // Texto abaixo no card
    cardTl.fromTo(cardTextRef.current?.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      '-=0.2'
    );

    return () => {
      if (titleSplit) titleSplit.revert();
      cardTl.scrollTrigger?.kill();
      cardTl.kill();
    };
  }, []);

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="section-padding"
      style={{
        width: '100%',
        backgroundColor: '#F5F5F0',
        color: '#2D2D2D',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'center',
          }}
        >
          {/* Coluna Texto (Esquerda) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div ref={eyebrowRef} className="eyebrow" style={{ color: '#C9A84C' }}>
              CONHEÇA A DUPLA
            </div>
            
            <h2
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: isMobile ? '26px' : '38px',
                lineHeight: 1.15,
                color: '#1A1A2E',
                margin: 0,
              }}
            >
              Duas profissionais. Uma missão: o seu melhor negócio.
            </h2>

            <p
              ref={bodyRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: 1.75,
                color: '#2D2D2D',
                marginTop: '12px',
              }}
            >
              Nilza e Vera Neves são corretoras de imóveis com atuação em Salvador e região, especializadas em conectar pessoas aos imóveis que realmente combinam com seu estilo de vida e objetivos. Com atendimento humanizado e total transparência, guiam cada cliente do primeiro contato até a assinatura do contrato.
            </p>

            {/* Badges */}
            <div
              ref={badgesRef}
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: '#C9A84C',
                  backgroundColor: 'rgba(201, 168, 76, 0.05)',
                }}
              >
                CRECI-BA Ativo
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: '#C9A84C',
                  backgroundColor: 'rgba(201, 168, 76, 0.05)',
                }}
              >
                Especialistas Locais
              </span>
            </div>
          </div>

          {/* Coluna Card N|V (Direita) */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              ref={cardRef}
              style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#1A1A2E',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                borderRadius: '16px',
                padding: isMobile ? '36px' : '48px',
                boxShadow: '0 12px 40px rgba(26, 26, 46, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
            >
              {/* Monograma N | V */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  marginBottom: '24px',
                  height: '100px',
                }}
              >
                <span
                  ref={letterNRef}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '60px',
                    color: '#C9A84C',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  N
                </span>
                
                {/* Linha divisória vertical */}
                <div
                  ref={lineRef}
                  style={{
                    width: '2px',
                    height: '80px',
                    backgroundColor: '#C9A84C',
                    transformOrigin: 'top center',
                    willChange: 'transform',
                  }}
                />

                <span
                  ref={letterVRef}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '60px',
                    color: '#C9A84C',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  V
                </span>
              </div>

              {/* Informações da dupla */}
              <div ref={cardTextRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}
                >
                  Nilza Raul & Vera Neves
                </h3>
                
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#C9A84C',
                    margin: 0,
                  }}
                >
                  Especialistas em Imóveis · Salvador, BA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
