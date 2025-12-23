import React, { useState, useRef, useEffect } from 'react';
import { generateChaosPage } from './chaosEngine';
import { initAudio, updateDrone, playGlitch, playWarp, playAscension } from './audioEngine';
import BookOfNothingness from './BookOfNothingness';
import DreamsOfWisdom from './DreamsOfWisdom'; // <--- IMPORT THIS

const HallucinatedBrowser = () => {
  // --- STATE ---
  const [url, setUrl] = useState("");
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entropy, setEntropy] = useState(0); 
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [fleeBtnPos, setFleeBtnPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]); 

  const contentRef = useRef(null);

  // --- AUDIO SETUP ---
  useEffect(() => {
    const startAudio = () => { initAudio(); window.removeEventListener('click', startAudio); window.removeEventListener('keydown', startAudio); };
    window.addEventListener('click', startAudio); window.addEventListener('keydown', startAudio);
    return () => { window.removeEventListener('click', startAudio); window.removeEventListener('keydown', startAudio); };
  }, []);

  useEffect(() => {
    if (entropy === 10) playAscension();
    else if (entropy < 10) updateDrone(entropy);
  }, [entropy]);

  // --- ACTIONS ---
  const handleDownload = async (imageUrl) => {
    try {
      playWarp();
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `artifact_entropy_${entropy}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  const processHtml = (htmlString) => {
    if (!htmlString) return "";
    return htmlString.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
      return `<span class="chaos-link text-[#00f3ff] font-bold underline decoration-dashed cursor-pointer hover:bg-[#00f3ff] hover:text-black transition-all mx-1 shadow-[0_0_5px_#00f3ff]" data-dest="${p1}">${p1}</span>`;
    });
  };

  const handleGlobalClick = (e) => {
    const link = e.target.closest('.chaos-link');
    if (link && link.dataset.dest) {
      navigateTo(link.dataset.dest);
    }
  };

  const handleFleeHover = () => {
    if (entropy > 7) {
      playGlitch();
      const randomX = (Math.random() * 50) - 25; 
      const randomY = (Math.random() * 50) - 25;
      setFleeBtnPos({ x: randomX, y: randomY });
    }
  };

  const navigateTo = (destination) => {
    const nextEntropy = entropy + 1;
    // Don't play warp if we are ascending, playAscension handles audio there
    if (nextEntropy < 10) playWarp(); 
    
    setHistory(prev => [`${destination.toUpperCase()}`, ...prev].slice(0, 10));
    setLoading(true);
    setPageData(null);
    setEntropy(nextEntropy);
    setFleeBtnPos({ x: 0, y: 0 });

    if (contentRef.current) contentRef.current.scrollTop = 0;
    
    // Longer delay for ascension to build tension
    const delay = nextEntropy === 10 ? 4000 : 800 + (entropy * 200);

    setTimeout(() => {
      const data = generateChaosPage(destination, nextEntropy);
      setPageData(data);
      setLoading(false);
    }, delay);
  };

  const handleUrlSubmit = (e) => { e.preventDefault(); if (url) navigateTo(url); };
  
  // RESET LOGIC
  const handleReset = () => { 
    // Soft reset state without reloading page for smooth transition back
    setEntropy(0);
    setPageData(null);
    setUrl("");
    setLoading(false);
    updateDrone(0); // Reset Audio
  };
  
  const getImage = (prompt) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

  // --- RENDER DREAMS IF ASCENDED ---
  if (entropy >= 10) {
    return <DreamsOfWisdom onReset={handleReset} />;
  }

  // --- STANDARD CHAOS BROWSER RENDER ---
  const cyberpunkBg = {
    backgroundImage: `
      linear-gradient(rgba(0, 255, 157, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 157, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px'
  };

  return (
    <div 
      className="flex flex-col h-full w-full font-mono overflow-hidden relative selection:bg-[#ff0055] selection:text-white" 
      style={{ backgroundColor: '#050505', color: '#a5b4fc', transition: 'background-color 0.5s ease', ...cyberpunkBg }}
      onClick={handleGlobalClick}
    >
      <div className="pointer-events-none absolute inset-0 z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      <BookOfNothingness isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />

      {/* HEADER */}
      <div className="p-3 md:p-4 border-b shrink-0 z-40 relative backdrop-blur-md transition-colors duration-500 flex flex-col gap-2 border-[#00f3ff]/20 bg-black/80">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 md:w-4 md:h-4 shrink-0 transition-all duration-500 shadow-[0_0_10px_currentColor] ${loading ? 'bg-[#ff0055] text-[#ff0055] animate-ping' : entropy > 5 ? 'bg-red-600 text-red-600 animate-pulse' : 'bg-[#00f3ff] text-[#00f3ff]'}`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
          <form onSubmit={handleUrlSubmit} className="flex-1 relative group min-w-0">
            <input type="text" value={url} onKeyDown={() => entropy < 10 && Math.random() > 0.7 && playGlitch()} onChange={(e) => setUrl(e.target.value)} placeholder={entropy > 5 ? "IT SEES YOU..." : "INSERT_DREAM..."} className="w-full bg-transparent outline-none font-bold uppercase tracking-wider transition-all py-1 border-b text-[#00f3ff] border-[#00f3ff]/30 focus:border-[#00f3ff] placeholder-[#00f3ff]/30" />
          </form>
           <button onClick={() => { playGlitch(); setIsBookOpen(true); }} className="shrink-0 text-[10px] border border-[#00f3ff] px-2 py-1 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black uppercase">Manual</button>
        </div>
        <div className="text-[10px] font-bold tracking-widest flex justify-between text-[#a5b4fc]">
          <span>ENTROPY: {entropy}</span>
          <span className={entropy > 7 ? 'text-red-500' : 'text-[#00f3ff]'}>[{'|'.repeat(entropy)}{'.'.repeat(10-entropy)}]</span>
        </div>
      </div>

      {/* VIEWPORT */}
      <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative transition-all duration-1000 scroll-smooth scrollbar-thin scrollbar-thumb-[#00f3ff]/20 scrollbar-track-transparent" style={{ filter: `hue-rotate(${entropy * 5}deg) contrast(${100 + (entropy * 5)}%)`, transform: `skewX(${entropy * 0.2}deg)` }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 z-10 bg-black/90 backdrop-blur-sm">
            <div className="text-6xl animate-bounce">{entropy > 5 ? '👁️' : '💠'}</div>
            <div className="flex flex-col items-center px-4 text-center">
              <div className="text-xl font-bold font-mono tracking-widest text-[#00f3ff]">{entropy === 10 ? "ASCENDING..." : (entropy > 5 ? "REALITY_DISSOLVING" : "GENERATING_HALLUCINATION")}</div>
              <div className="w-full max-w-xs h-1 bg-gray-800 mt-2 rounded overflow-hidden"><div className="h-full bg-[#ff0055] animate-progress"></div></div>
            </div>
          </div>
        )}

        {!loading && pageData && (
          <div className="w-full max-w-3xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12 pb-32">
            {pageData.sections.find(s => s.type === 'hero') && (
              <div className="relative flex flex-col gap-4 md:gap-6">
                <h1 className="text-3xl md:text-5xl font-black uppercase break-words leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff0055] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" dangerouslySetInnerHTML={{ __html: processHtml(pageData.sections.find(s => s.type === 'hero').headline) }} />
                <div className="relative group w-full mx-auto bg-black border border-[#00f3ff]/50 p-1 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff0055]"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff0055]"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff0055]"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff0055]"></div>
                  <img src={getImage(pageData.sections.find(s => s.type === 'hero').imagePrompt)} alt="Artifact" className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700" />
                  <button onClick={(e) => { e.stopPropagation(); handleDownload(getImage(pageData.sections.find(s => s.type === 'hero').imagePrompt)); }} className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 px-3 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 bg-black/80 text-[#00f3ff] border border-[#00f3ff] backdrop-blur-md"><span>💾 SAVE</span></button>
                </div>
                <div className="text-base md:text-xl italic border-l-4 pl-4 text-gray-400 border-[#ff0055]" dangerouslySetInnerHTML={{ __html: processHtml(pageData.sections.find(s => s.type === 'hero').subhead) }} />
              </div>
            )}

            {pageData.sections.find(s => s.type === 'marquee') && (
              <div className="bg-[#ff0055] text-black font-black overflow-hidden py-1 border-y border-[#00f3ff] shadow-[0_0_15px_#ff0055]">
                <div className="animate-marquee whitespace-nowrap text-xs md:text-base" dangerouslySetInnerHTML={{ __html: (pageData.sections.find(s => s.type === 'marquee').text + " ").repeat(10) }} />
              </div>
            )}

            {pageData.sections.find(s => s.type === 'article') && (
              <div className="p-4 md:p-8 relative overflow-hidden bg-black/50 border border-[#333]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-50"></div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#00f3ff] glitch-text" dangerouslySetInnerHTML={{ __html: processHtml(pageData.sections.find(s => s.type === 'article').title) }} />
                <div className="leading-relaxed font-mono text-justify text-sm md:text-base text-[#a5b4fc]" dangerouslySetInnerHTML={{ __html: processHtml(pageData.sections.find(s => s.type === 'article').body) }} />
              </div>
            )}

             <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-dashed border-[#333]">
                  <button onMouseEnter={handleFleeHover} onClick={playGlitch} style={{ transform: `translate(${fleeBtnPos.x}px, ${fleeBtnPos.y}px)`, transition: 'transform 0.1s ease-out' }} className={`flex-1 py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all border ${entropy > 7 ? 'bg-red-900/20 border-red-500 text-red-500 z-50' : 'bg-transparent border-[#a5b4fc] text-[#a5b4fc] hover:bg-[#a5b4fc] hover:text-black'}`}>{entropy > 6 ? "NO_ESCAPE" : "RETURN"}</button>
                  <button onClick={() => { playGlitch(); navigateTo(url); }} className="flex-1 py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all border border-[#00f3ff] text-[#00f3ff] hover:bg-[#ff0055] hover:border-[#ff0055] hover:text-white shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_#ff0055]">{entropy > 6 ? "YIELD" : "RE-ROLL"}</button>
              </div>
          </div>
        )}

        {!loading && !pageData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
            <div className="w-full max-w-lg border border-[#00f3ff]/20 bg-black/40 p-6 md:p-8 backdrop-blur-sm relative">
              <div className="text-4xl md:text-5xl mb-6 animate-pulse opacity-80">{entropy > 5 ? '⚠️' : '🌐'}</div>
              <h2 className="text-lg md:text-3xl font-black mb-4 tracking-widest text-white shadow-[#00f3ff] drop-shadow-md">CHAOS_BROWSER</h2>
              <p className="text-xs md:text-sm text-[#00f3ff] leading-relaxed mb-4">Neural Interface Ready.<br/>Enter a query above.</p>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes scanline { 0% { transform: translateY(0); } 100% { transform: translateY(100vh); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-progress { animation: progress 2s ease-in-out infinite; }
        @keyframes progress { 0% { width: 0%; opacity: 1; } 50% { width: 100%; opacity: 0.5; } 100% { width: 0%; opacity: 0; margin-left: 100%; } }
      `}</style>
    </div>
  );
};

export default HallucinatedBrowser;