import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import sociasImg from '../assets/socias.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function QuemSomos() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const badgesRef = useRef(null);
  const cardRef = useRef(null);
  const creciBlockRef = useRef(null);

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

    // 2. Animação de fade-in + slide-up do Eyebrow, Corpo, Creci e Badges
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

    gsap.fromTo(creciBlockRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: creciBlockRef.current,
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

    // 3. Animação do Container da Foto
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
      }
    });

    // Fade-in e scale do container da foto em si
    cardTl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
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
              Nilza Raul e Vera Neves são corretoras de imóveis com atuação em Salvador e região, especializadas em conectar pessoas aos imóveis que realmente combinam com seu estilo de vida e objetivos. Com atendimento humanizado e total transparência, guiam cada cliente do primeiro contato até a assinatura do contrato.
            </p>

            {/* Bloco de Assinaturas/CRECI */}
            <div
              ref={creciBlockRef}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '16px' : '24px',
                marginTop: '12px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(201, 168, 76, 0.15)',
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Nilza Raul</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9A84C', margin: '4px 0 0 0', fontWeight: 500 }}>Corretora de Imóveis · CRECI BA 20284</p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Vera Neves</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C9A84C', margin: '4px 0 0 0', fontWeight: 500 }}>Corretora de Imóveis · CRECI BA 24058</p>
              </div>
            </div>

            {/* Badges */}
            <div
              ref={badgesRef}
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
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

          {/* Coluna Foto (Direita) */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div
              ref={cardRef}
              className="photo-container"
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(26, 26, 46, 0.15)',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                position: 'relative',
                aspectRatio: '3 / 4',
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={sociasImg}
                alt="Nilza Raul & Vera Neves - Sócias Fundadoras da N&V Imóveis"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className="photo-img"
              />
              {/* Overlay sofisticado no hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 26, 46, 0.4) 0%, rgba(26, 26, 46, 0) 50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .photo-container {
          cursor: pointer;
        }
        .photo-container:hover .photo-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
