import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, FileText, Key, Award } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

export default function Servicos() {
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animação de entrada dos cabeçalhos e linha decorativa
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo(lineRef.current,
      { width: 0 },
      {
        width: 60,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
        }
      }
    );

    // Stagger para entrada dos cards
    gsap.fromTo(gridRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);



  const servicos = [
    {
      id: 'compra',
      icon: <Home className="service-icon" size={32} style={{ color: '#C9A84C', transition: 'all 0.3s ease' }} />,
      title: 'Compra de Imóveis',
      desc: 'Curadoria personalizada e criteriosa para encontrar o imóvel certo de acordo com o seu perfil, objetivos e momento de vida.',
    },
    {
      id: 'venda',
      icon: <Award className="service-icon" size={32} style={{ color: '#C9A84C', transition: 'all 0.3s ease' }} />,
      title: 'Venda de Imóveis',
      desc: 'Estratégia completa de marketing e divulgação para valorizar seu patrimônio e vender com máxima agilidade, segurança e resultado.',
    },
    {
      id: 'locacao',
      icon: <Key className="service-icon" size={32} style={{ color: '#C9A84C', transition: 'all 0.3s ease' }} />,
      title: 'Locação',
      desc: 'Intermediação profissional, segura e desburocratizada para alugar com total tranquilidade, seja você proprietário ou inquilino.',
    },
    {
      id: 'consultoria',
      icon: <FileText className="service-icon" size={32} style={{ color: '#C9A84C', transition: 'all 0.3s ease' }} />,
      title: 'Consultoria Imobiliária',
      desc: 'Orientação especializada, análise de mercado e parecer técnico para que você tome decisões patrimoniais seguras e inteligentes.',
    },
  ];

  return (
    <section
      id="servicos"
      className="section-padding"
      style={{
        width: '100%',
        backgroundColor: '#1A1A2E',
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(201, 168, 76, 0.1)',
      }}
    >
      <div className="container">
        {/* Cabeçalho */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: isMobile ? '48px' : '64px',
            gap: '12px',
          }}
        >
          <div className="eyebrow">O QUE FAZEMOS POR VOCÊ</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isMobile ? '26px' : '38px',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Nossos Serviços
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#C9A84C',
              margin: 0,
            }}
          >
            Do primeiro contato à entrega das chaves.
          </p>
          
          {/* Linha decorativa dourada */}
          <div
            ref={lineRef}
            style={{
              height: '2px',
              backgroundColor: '#C9A84C',
              marginTop: '16px',
              willChange: 'width',
            }}
          />
        </div>

        {/* Grid de Serviços */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '40px',
          }}
        >
          {servicos.map((s, index) => (
            <div
              key={s.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="glass-card service-card"
              style={{
                padding: isMobile ? '36px 24px' : '48px',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                cursor: 'default',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Ícone */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(201, 168, 76, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                }}
              >
                {s.icon}
              </div>

              {/* Título */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                {s.title}
              </h3>

              {/* Descrição */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos de hover minimalista nos cards de serviços */}
      <style>{`
        .service-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(201, 168, 76, 0.15);
        }

        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            transform: translateY(-4px);
            border-color: rgba(201, 168, 76, 0.45) !important;
            box-shadow: 0 10px 30px rgba(201, 168, 76, 0.08) !important;
          }

          .service-card:hover .service-icon {
            color: #D4B86A !important;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
