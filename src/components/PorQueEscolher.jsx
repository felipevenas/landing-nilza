import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Heart, MapPin, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function PorQueEscolher() {
  const titleRef = useRef(null);
  const pilaresRef = useRef(null);
  const typewriterTextRef = useRef(null);
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
    // 1. Animação de entrada do Título
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

    // 2. Animação com stagger nos Pilares
    gsap.fromTo(pilaresRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pilaresRef.current,
          start: 'top 80%',
        }
      }
    );

    // 3. Efeito Typewriter com GSAP TextPlugin
    const typewriterAnimation = gsap.to(typewriterTextRef.current, {
      text: {
        value: "Realizamos sonhos. Construímos histórias. Um imóvel de cada vez.",
      },
      duration: 3.5,
      ease: "none",
      scrollTrigger: {
        trigger: typewriterTextRef.current,
        start: 'top 85%',
      }
    });

    return () => {
      typewriterAnimation.scrollTrigger?.kill();
      typewriterAnimation.kill();
    };
  }, []);

  const pilares = [
    {
      icon: <Heart size={36} style={{ color: '#C9A84C' }} />,
      title: 'Atendimento Humanizado',
      desc: 'Cada cliente é único. Ouvimos suas dores, entendemos seus anseios e agimos com total empatia e transparência em todas as etapas do processo.',
    },
    {
      icon: <MapPin size={36} style={{ color: '#C9A84C' }} />,
      title: 'Especialistas Locais',
      desc: 'Conhecimento aprofundado dos bairros, tendências e vetores de crescimento de Salvador e região metropolitana, garantindo as melhores oportunidades.',
    },
    {
      icon: <Handshake size={36} style={{ color: '#C9A84C' }} />,
      title: 'Negociação com Resultado',
      desc: 'Sólida experiência e técnicas avançadas de intermediação comercial para assegurar as condições comerciais mais vantajosas para o seu bolso.',
    },
  ];

  return (
    <section
      id="diferenciais"
      style={{
        width: '100%',
        backgroundColor: '#F5F5F0',
        color: '#2D2D2D',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* Parte Superior: Título e Pilares */}
      <div className="container" style={{ paddingTop: isMobile ? '64px' : '96px', paddingBottom: isMobile ? '64px' : '96px' }}>
        
        {/* Título da Seção */}
        <div 
          ref={titleRef} 
          style={{ 
            textAlign: 'center', 
            maxWidth: '750px', 
            margin: '0 auto 56px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div className="eyebrow" style={{ color: '#C9A84C' }}>POR QUE NOS ESCOLHER?</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isMobile ? '26px' : '38px',
              lineHeight: 1.15,
              color: '#1A1A2E',
              margin: 0,
            }}
          >
            Mais do que corretoras. Parceiras na sua conquista.
          </h2>
        </div>

        {/* Pilares */}
        <div
          ref={pilaresRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '40px' : '48px',
          }}
        >
          {pilares.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                textAlign: isMobile ? 'center' : 'left',
                gap: '16px',
                padding: '16px',
              }}
            >
              {/* Ícone */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(201, 168, 76, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                }}
              >
                {p.icon}
              </div>

              {/* Título Pilar */}
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#1A1A2E',
                  margin: 0,
                }}
              >
                {p.title}
              </h3>

              {/* Descrição Pilar */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: '#2D2D2D',
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa Motivacional Dark */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#1A1A2E',
          padding: '64px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: '1px solid rgba(201, 168, 76, 0.1)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.1)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span
            ref={typewriterTextRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: isMobile ? '20px' : '28px',
              lineHeight: 1.3,
              color: '#FFFFFF',
              minHeight: isMobile ? '64px' : '48px', // reserva espaço para evitar jump
              display: 'inline-block',
            }}
          />
          {/* Cursor piscante */}
          <span className="typewriter-cursor" />
        </div>
      </div>

      {/* Estilos adicionais do cursor de digitação */}
      <style>{`
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background-color: #C9A84C;
          margin-left: 8px;
          vertical-align: middle;
          animation: blinkCursor 0.8s step-end infinite;
        }

        @keyframes blinkCursor {
          from, to { background-color: transparent }
          50% { background-color: #C9A84C }
        }
      `}</style>
    </section>
  );
}
