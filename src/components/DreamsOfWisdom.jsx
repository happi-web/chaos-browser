import React, { useState, useEffect, useRef } from 'react';
import { generateWisdom } from './dreamsOfWisdomEngine';

const DreamsOfWisdom = ({ onReset }) => {
  const [artifact, setArtifact] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const wisdomData = generateWisdom();
    setArtifact(wisdomData);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 768) return; // Disable 3D on mobile for performance
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    containerRef.current.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
  };

  if (!artifact) return null;

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(artifact.imagePrompt)}?width=1080&height=1080&nologo=true`;

  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#fdfbf7] overflow-y-auto overflow-x-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1200px' }}
    >
      {/* BACKGROUND ORBS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,1)_0%,_rgba(243,244,246,1)_100%)]" />
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-pulse"
            style={{
              background: i % 2 === 0 ? '#e0f2fe' : '#fef3c7',
              width: '80vw',
              height: '80vw',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + i * 3}s`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      {/* RESPONSIVE CONTENT CONTAINER */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl px-4 py-8 md:px-8 flex flex-col items-center justify-center min-h-screen transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* IMAGE PORTAL - Scaled for Mobile */}
        <div 
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-white group shrink-0"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className={`absolute inset-0 bg-white z-10 transition-opacity duration-[4000ms] ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
          <img 
            src={imageUrl} 
            alt="Transcendental Vision"
            className="w-full h-full object-cover transition-transform duration-[30s] scale-110"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* WISDOM TEXT - Fluid Typography */}
        <div className="mt-8 md:mt-12 text-center w-full" style={{ transform: 'translateZ(80px)' }}>
          <div 
            className="mb-3 text-[#d4af37] font-serif tracking-[0.3em] text-[10px] md:text-xs uppercase opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            A Ripple from {artifact.author}
          </div>

          <h2 className="font-serif italic text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#2d2d2d] leading-snug md:leading-relaxed mb-8 px-2 max-w-3xl mx-auto">
            {artifact.fragments.map((frag, i) => (
              <span 
                key={i} 
                className="inline-block animate-reveal-blur"
                style={{ 
                  animationDelay: `${frag.delay + 1}s`, 
                  opacity: 0,
                  transform: `translateZ(${frag.depth * 0.2}px)`
                }}
              >
                {frag.word}&nbsp;
              </span>
            ))}
          </h2>

          {/* ACTION BUTTON */}
          <div 
            className="flex flex-col items-center gap-4 md:gap-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '5s', animationFillMode: 'forwards' }}
          >
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            
            <button 
              onClick={onReset}
              className="px-8 md:px-12 py-3 md:py-4 rounded-full border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-white transition-all duration-700 font-serif tracking-widest text-xs md:text-sm uppercase text-[#d4af37]"
            >
              Wake Up
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes reveal-blur {
          0% { opacity: 0; transform: translateY(15px); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-blur { animation: reveal-blur 2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-fade-in { animation: fade-in 2.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DreamsOfWisdom;