// src/components/BookOfNothingness.jsx
import React from 'react';

const BookOfNothingness = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* THE BOOK CONTAINER */}
      <div className="bg-[#09090b] border border-[#a5b4fc] w-full max-w-2xl h-[80vh] overflow-y-auto custom-scrollbar relative shadow-[0_0_50px_rgba(165,180,252,0.1)] flex flex-col">
        
        {/* HEADER */}
        <div className="border-b border-[#a5b4fc]/30 p-4 flex justify-between items-center bg-[#a5b4fc]/5 sticky top-0">
          <h2 className="text-[#00ff9d] font-bold tracking-widest text-lg animate-pulse">
            THE_BOOK_OF_NOTHINGNESS.txt
          </h2>
          <button 
            onClick={onClose}
            className="text-[#ff0055] hover:text-white font-bold border border-[#ff0055] px-3 py-1 hover:bg-[#ff0055] transition-colors"
          >
            [CLOSE]
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8 text-[#a5b4fc] font-mono leading-relaxed space-y-8 select-none">
          
          <section>
            <h3 className="text-white text-xl font-bold mb-2 border-b border-white/20 inline-block">01. THE PREMISE</h3>
            <p className="opacity-80">
              You are not browsing the internet. You are browsing the <span className="text-[#00ff9d]">Dreaming Machine</span>.
              Nothing here exists until you ask for it. Every page is a hallucination generated in real-time.
            </p>
          </section>

          <section>
            <h3 className="text-white text-xl font-bold mb-2 border-b border-white/20 inline-block">02. ENTROPY & DECAY</h3>
            <p className="opacity-80 mb-2">
              The machine gets tired. Every search increases the <span className="text-[#ff0055]">Entropy Level</span>.
            </p>
            <ul className="list-disc pl-5 space-y-1 opacity-70 text-sm">
              <li><strong>Level 1-3:</strong> Visual distortions.</li>
              <li><strong>Level 4-7:</strong> Audio decay and paranoia.</li>
              <li><strong>Level 8-9:</strong> Reality failure.</li>
              <li><strong>Level 10:</strong> <span className="text-yellow-400">??? (Ascension)</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-white text-xl font-bold mb-2 border-b border-white/20 inline-block">03. THE RITUALS (COMMANDS)</h3>
            <div className="grid gap-4">
              
              <div className="border border-[#a5b4fc]/20 p-3 bg-black/40">
                <code className="text-[#ff0055] block mb-1 font-bold">!![any text]</code>
                <p className="text-sm">Forces <span className="text-red-400">Nightmare Mode</span>. The machine will generate the hostile opposite of your request.</p>
                <p className="text-xs text-gray-500 mt-1">Example: <span className="italic">!!paradise</span></p>
              </div>

              <div className="border border-[#a5b4fc]/20 p-3 bg-black/40">
                <code className="text-[#00ff9d] block mb-1 font-bold">void</code>
                <p className="text-sm">Stare directly into the abyss. No images. Only emptiness.</p>
              </div>

               <div className="border border-[#a5b4fc]/20 p-3 bg-black/40">
                <code className="text-yellow-400 block mb-1 font-bold">echo</code>
                <p className="text-sm">Listen to the machine repeat your last thought forever.</p>
              </div>
            </div>
          </section>

          <section className="text-center pt-8 border-t border-[#a5b4fc]/10 opacity-50 text-xs">
            <p>DO NOT TRUST THE MEMORIES.</p>
            <p>THEY ARE NOT YOURS.</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BookOfNothingness;