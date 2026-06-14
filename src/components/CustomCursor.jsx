import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Desabilitar cursor em dispositivos que não suportam hover (touch)
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    // Adiciona classe ao body para esconder o cursor padrão do navegador
    document.body.classList.add('custom-cursor-active');

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    // GSAP QuickSetters para máximo desempenho (sem lag de renderização do React)
    const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
    const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');
    const setRingX = gsap.quickSetter(ringRef.current, 'x', 'px');
    const setRingY = gsap.quickSetter(ringRef.current, 'y', 'px');

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // O ponto central acompanha o mouse imediatamente
      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // GSAP Ticker para aplicar Lerp (0.15 de velocidade para atraso suave de ~0.08s)
    const ticker = gsap.ticker.add(() => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      
      setRingX(ringPos.x);
      setRingY(ringPos.y);
    });

    // Detectar hovers para expansão do cursor
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .clickable, input, select, textarea');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouch) return null;

  return (
    <div 
      className="custom-cursor-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div 
        ref={dotRef} 
        className="custom-cursor-dot"
        style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          backgroundColor: '#C9A84C',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          left: 0,
          top: 0,
        }}
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'absolute',
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          border: '1px solid #C9A84C',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(201, 168, 76, 0.08)' : 'transparent',
          left: 0,
          top: 0,
          transition: 'width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.25s ease',
        }}
      />
    </div>
  );
}
