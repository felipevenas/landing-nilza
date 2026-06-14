import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Componentes
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuemSomos from './components/QuemSomos';
import Servicos from './components/Servicos';
import PorQueEscolher from './components/PorQueEscolher';
import Depoimentos from './components/Depoimentos';
import Contato from './components/Contato';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Inicialização do Lenis e GSAP Ticker
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Inicializar o Lenis com scroll suave premium
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    // Sincronizar com GSAP ticker
    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Conectar ScrollTrigger ao Lenis
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Cursor Customizado para Desktop */}
      <CustomCursor />

      {/* Navbar de topo (sticky / blur) */}
      <Navbar />

      <main style={{ width: '100%' }}>
        {/* Seções */}
        <Hero />
        <QuemSomos />
        <Servicos />
        <PorQueEscolher />
        <Depoimentos />
        <Contato />
      </main>

      {/* Rodapé e Botões Flutuantes */}
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
