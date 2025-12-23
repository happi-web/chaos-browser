import React, { useState, useEffect, useRef } from 'react';
import HallucinatedBrowser from './components/HallucinatedBrowser';
import { useDraggable } from './components/useDraggable';
import { VibeProvider, useVibe } from './components/VibeContext'; 
import { playGlitch, playWarp } from './components/audioEngine'; // Ensure you import your audio

// --- SUB-COMPONENT: FAKE ERROR POPUP ---
const ErrorPopup = ({ id, x, y, msg, onClose }) => (
  <div 
    style={{ top: y, left: x }}
    className="absolute z-50 w-64 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-xl flex flex-col font-sans text-black"
  >
    <div className="bg-[#000080] text-white font-bold text-xs px-1 py-0.5 flex justify-between items-center">
      <span>SYSTEM_FAILURE_0x{id}</span>
      <button onClick={onClose} className="bg-[#c0c0c0] text-black border border-white h-4 w-4 flex items-center justify-center leading-none text-[10px] hover:bg-red-500 hover:text-white">X</button>
    </div>
    <div className="p-4 flex items-center gap-3">
      <div className="text-red-600 text-2xl">❌</div>
      <div className="text-xs">{msg}</div>
    </div>
    <div className="p-2 flex justify-center">
      <button onClick={onClose} className="border-t border-l border-white border-b border-r border-black px-4 py-1 text-xs active:border-t-black active:border-l-black active:bg-gray-400">
        OK
      </button>
    </div>
  </div>
);

// --- SUB-COMPONENT: NOTEPAD MODAL ---
const Notepad = ({ onClose }) => (
  <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-96 h-80 bg-white border-2 border-[#a5b4fc] text-black flex flex-col shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
    <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm">
      <span>memories.txt - Notepad</span>
      <button onClick={onClose} className="text-white hover:bg-red-600 px-1">X</button>
    </div>
    <div className="flex-1 p-1">
      <textarea 
        className="w-full h-full resize-none outline-none font-mono text-xs p-2 selection:bg-black selection:text-white"
        readOnly
        defaultValue={`LOG_START: ${new Date().toLocaleDateString()}

> SYSTEM: User initiated session.
> SYSTEM: Anxiety levels rising.
> SYSTEM: DO NOT TRUST THE BROWSER.
> MEMORY_01: The internet used to be smaller.
> MEMORY_02: I saw you click the button.
> MEMORY_03: Why are you still here?
> MEMORY_04: It watches from the pixels.

[END OF FILE]`} 
      />
    </div>
  </div>
);

const DesktopEnvironment = () => {
  const [time, setTime] = useState("NOW:ISH");
  
  // WINDOW STATE
  const { position, handleMouseDown, isDragging } = useDraggable({ x: 100, y: 50 });
  const [isBrowserOpen, setIsBrowserOpen] = useState(true);
  
  // WEIRD STATE
  const [trashLabel, setTrashLabel] = useState("Trash");
  const [startLabel, setStartLabel] = useState("START");
  const [errors, setErrors] = useState([]); // Stores active error popups
  const [showNotepad, setShowNotepad] = useState(false);
  
  const { hoverColor } = useVibe();

  // CLOCK LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      const hours = new Date().getHours();
      const mood = hours > 22 || hours < 5 ? "LATE" : "NOW:ISH";
      setTime(`${mood} | ${new Date().toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- WEIRD INTERACTIONS ---

  // 1. TRASH: "THE VOID"
  const handleTrashClick = () => {
    playGlitch();
    setTrashLabel("HUNGRY");
    
    // Screen flash effect (Invert colors via CSS filter on body momentarily)
    document.body.style.filter = "invert(1)";
    setTimeout(() => { document.body.style.filter = "none"; }, 150);
    setTimeout(() => { setTrashLabel("Trash"); }, 2000);

    // If there are errors, Trash "eats" them (clears them)
    if (errors.length > 0) {
      setErrors([]);
    } else {
      // If no errors, create a warning
      spawnError("YOU CANNOT DISCARD YOUR SINS.");
    }
  };

  // 2. START BUTTON: "PANIC"
  const handleStartClick = () => {
    playGlitch();
    const scaryWords = ["STOP", "RUN", "NO", "NULL", "HELP", "DIE", "END"];
    setStartLabel(scaryWords[Math.floor(Math.random() * scaryWords.length)]);
    
    // Spawn a random error
    const msgs = ["Fatal Exception 0E", "Reality.sys not found", "User is not authorized to leave", "Infinite Loop Detected"];
    spawnError(msgs[Math.floor(Math.random() * msgs.length)]);
  };

  // 3. SPAWN ERROR HELPER
  const spawnError = (msg) => {
    const id = Date.now();
    const x = Math.random() * (window.innerWidth - 300);
    const y = Math.random() * (window.innerHeight - 200);
    setErrors(prev => [...prev, { id, x, y, msg }]);
  };

  const closeError = (id) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-[#a5b4fc] font-mono selection:bg-[#00ff9d] selection:text-black">
      
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}></div>
      <div className="absolute inset-0 z-0 transition-colors duration-500 ease-in-out" 
        style={{ backgroundColor: hoverColor ? `${hoverColor}66` : 'rgba(0, 0, 0, 0.7)' }}>
      </div>
      <div className="scanlines w-full h-full absolute inset-0 pointer-events-none z-50"></div>

      {/* --- RENDER ACTIVE ERRORS --- */}
      {errors.map(err => (
        <ErrorPopup key={err.id} {...err} onClose={() => closeError(err.id)} />
      ))}

      {/* --- NOTEPAD MODAL --- */}
      {showNotepad && <Notepad onClose={() => setShowNotepad(false)} />}

      {/* --- DESKTOP ICONS --- */}
      <div className="absolute top-8 left-8 flex flex-col gap-8 z-10 select-none">
        
        {/* TRASH ICON */}
        <div onClick={handleTrashClick} className="group cursor-pointer w-20 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <div className="w-12 h-12 border border-[#a5b4fc] flex items-center justify-center group-hover:bg-[#ff0055]/20 transition-colors relative overflow-hidden">
            <span className="text-2xl group-hover:animate-spin">💀</span>
          </div>
          <span className={`text-xs bg-black/50 px-1 ${trashLabel === 'HUNGRY' ? 'text-red-500 font-bold' : ''}`}>
            {trashLabel}
          </span>
        </div>

        {/* MEMORIES ICON */}
        <div onClick={() => { playWarp(); setShowNotepad(true); }} className="group cursor-pointer w-20 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <div className="w-12 h-12 border border-[#a5b4fc] flex items-center justify-center group-hover:bg-[#a5b4fc]/20 transition-colors">
            📄
          </div>
          <span className="text-xs bg-black/50 px-1">memories.txt</span>
        </div>

      </div>

      {/* --- DRAGGABLE BROWSER WINDOW --- */}
      {isBrowserOpen && (
        <div 
          style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}
          className="absolute w-[90%] md:w-[800px] h-[85vh] glass-window z-20 flex flex-col shadow-2xl"
        >
          {/* Title Bar */}
          <div onMouseDown={handleMouseDown} className="h-8 bg-[#a5b4fc]/10 border-b border-[#a5b4fc]/20 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing select-none backdrop-blur-md">
            <div className="flex gap-2 text-xs items-center">
              <span className="animate-pulse text-[#00ff9d]">●</span>
              <span>NETSCAPE_NAVIGATOR_GHOST.EXE</span>
            </div>
            <div className="flex gap-1 group">
              <button onClick={() => setIsBrowserOpen(false)} className="w-4 h-4 border border-[#a5b4fc]/50 flex items-center justify-center hover:bg-[#ff0055] hover:border-[#ff0055] transition-colors text-[10px]">
                X
              </button>
            </div>
          </div>

          {/* Browser Component */}
          <div className="flex-1 overflow-hidden relative bg-black">
            <HallucinatedBrowser />
          </div>
        </div>
      )}

      {/* RE-OPEN BROWSER IF CLOSED (Hidden Easter Egg) */}
      {!isBrowserOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <button onClick={() => setIsBrowserOpen(true)} className="text-[#00ff9d] hover:underline animate-pulse tracking-[0.5em]">
            RESUME_SIMULATION
          </button>
        </div>
      )}

      {/* --- TASKBAR --- */}
      <div className="absolute bottom-0 w-full h-10 bg-[#09090b]/90 backdrop-blur border-t border-[#a5b4fc]/20 flex items-center justify-between px-4 z-40">
        
        {/* WEIRD START BUTTON */}
        <button 
          onClick={handleStartClick}
          className={`px-6 py-1 border border-[#a5b4fc] transition-all text-sm font-bold active:translate-y-1
            ${startLabel !== 'START' ? 'bg-[#ff0055] text-white border-red-500' : 'hover:bg-[#a5b4fc] hover:text-black'}`}
        >
          {startLabel}
        </button>

        <div className="text-xs animate-pulse text-[#00ff9d] font-bold tracking-widest">
          {time}
        </div>
      </div>

    </div>
  );
};

// Wrap in Provider
function App() {
  return (
    <VibeProvider>
      <DesktopEnvironment />
    </VibeProvider>
  );
}

export default App;