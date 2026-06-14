import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Depoimentos() {
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const quotesRef = useRef([]);
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
    // 1. Entrada do Título
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. Entrada dos Cards
    gsap.fromTo(cardsContainerRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 80%',
        }
      }
    );

    // 3. Entrada das Aspas (Scale 0->1 + Rotate -15->0)
    quotesRef.current.forEach((quote) => {
      if (quote) {
        gsap.fromTo(quote,
          { scale: 0, rotation: -15, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 0.4,
            duration: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: quote,
              start: 'top 85%',
            }
          }
        );
      }
    });
  }, []);

  const depoimentos = [
    {
      text: "Nilza e Vera foram incríveis! Me ajudaram a encontrar exatamente o que eu precisava em tempo recorde. Profissionalismo e atenção do início ao fim.",
      author: "Mariana S.",
      location: "Salvador",
    },
    {
      text: "Vendi meu apartamento com muito mais facilidade do que imaginava. A expertise delas no mercado local faz toda a diferença.",
      author: "Carlos M.",
      location: "Lauro de Freitas",
    },
    {
      text: "Atendimento excepcional, sempre disponíveis e transparentes. Recomendo sem hesitar para qualquer pessoa que queira segurança na hora de negociar.",
      author: "Fernanda R.",
      location: "Salvador",
    },
  ];

  return (
    <section
      id="depoimentos"
      className="section-padding"
      style={{
        width: '100%',
        backgroundColor: '#16213E',
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container">
        
        {/* Título */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '48px' : '72px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div className="eyebrow" style={{ color: '#C9A84C' }}>DEPOIMENTOS</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isMobile ? '26px' : '38px',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            O que nossos clientes dizem
          </h2>
        </div>

        {/* Grid de Cards */}
        <div
          ref={cardsContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {depoimentos.map((d, index) => (
            <div
              key={index}
              className="glass-card testimonial-card"
              style={{
                padding: '40px 32px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                height: 'auto',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                border: '1px solid rgba(201, 168, 76, 0.18)',
              }}
            >
              {/* Aspas Abertura */}
              <div
                ref={(el) => (quotesRef.current[index] = el)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '64px',
                  color: '#C9A84C',
                  lineHeight: '1',
                  opacity: 0.4,
                  position: 'absolute',
                  top: '16px',
                  left: '24px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  willChange: 'transform, opacity',
                }}
              >
                &ldquo;
              </div>

              {/* Texto Depoimento */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '40px',
                  marginBottom: '24px',
                }}
              >
                {d.text}
              </p>

              {/* Autor */}
              <div 
                style={{ 
                  borderTop: '1px solid rgba(201, 168, 76, 0.15)', 
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#FFFFFF',
                  }}
                >
                  {d.author}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#C9A84C',
                  }}
                >
                  {d.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos adicionais de hover no card */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .testimonial-card:hover {
            border-color: rgba(201, 168, 76, 0.6) !important;
            box-shadow: 0 12px 32px rgba(201, 168, 76, 0.15) !important;
            transform: translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
}
