// src/utils/chaosEngine.js

// =====================================================
// 1. ARCHIVES & TEXT POOLS
// =====================================================

const FALSE_MEMORIES = [
  "Welcome back. You were here before the crash.",
  "You are still searching for this? It hasn't existed for years.",
  "We have been waiting for you to type that.",
  "Do not trust the pixels on this page.",
  "This is not the first time you have requested this."
];

const META_TITLES = [
  "NO_DATA",
  "STOP_LOOKING",
  "IT_IS_WATCHING",
  "BEHIND_YOU",
  "REALITY_LEAK",
  "CORRUPTED_SECTOR",
  "SYSTEM_panic()"
];

const META_BODY = [
  "None of this is real, but you are reacting anyway.",
  "You typed this hoping for meaning. There is none.",
  "The algorithm is tired of generating lies for you.",
  "Why do you keep clicking? The void will continue without you.",
  "If this feels familiar, that is your own fault.",
  "The data is bleeding into the real world. Look behind you."
];

const TRUTHS = [
  "You have endured the noise to find the signal.",
  "The void is not empty. It is full of potential.",
  "Chaos is just a pattern you haven't learned yet.",
  "You are the ghost in the machine.",
  "There is nothing to fear but the silence."
];

// =====================================================
// 2. GLITCH EFFECTS & HELPERS
// =====================================================

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 1. ZALGO / CURSED TEXT GENERATOR (High Entropy)
const toZalgo = (text, intensity) => {
  if (intensity < 6) return text;
  const chars = text.split("");
  return chars.map(char => {
    if (char === " ") return char;
    // Add varying amounts of combining diacritics based on entropy
    if (Math.random() < 0.3) {
      return char + String.fromCharCode(0x0300 + Math.floor(Math.random() * 50));
    }
    return char;
  }).join("");
};

// 2. REDACTION EFFECT (Medium Entropy)
const redactWords = (text, intensity) => {
  if (intensity < 3) return text;
  return text.split(" ").map(word => {
    // Occasional black blocks
    if (Math.random() < 0.05 * intensity) {
      return "█".repeat(word.length);
    }
    return word;
  }).join(" ");
};

// 3. FADE / DISAPPEAR EFFECT (Requested: Entropy > 4)
const fadeWords = (text, entropy) => {
  if (entropy <= 4) return text;
  
  return text.split(" ").map(word => {
    const chanceToFade = (entropy - 4) * 0.15; // Entropy 5 = 15%, Entropy 9 = 75%
    
    if (Math.random() < chanceToFade) {
      // Calculate opacity: Higher entropy = lower opacity (more transparent)
      // We ensure it doesn't go below 0, but can go very close to 0
      const opacity = Math.max(0, 1 - ((entropy * 0.1) + (Math.random() * 0.4)));
      return `<span style="opacity: ${opacity.toFixed(2)}; filter: blur(${entropy - 4}px);">${word}</span>`;
    }
    return word;
  }).join(" ");
};

// 4. STUTTER EFFECT (Low-Medium Entropy)
const stutterText = (text, intensity) => {
  if (intensity < 2 || intensity > 7) return text; // Stops stuttering at high entropy (becomes silence)
  return text.split(" ").map(word => {
    if (word.length > 3 && Math.random() < 0.2) {
      const first = word.charAt(0);
      return `${first}-${first}-${word}`;
    }
    return word;
  }).join(" ");
};

// 5. MASTER TEXT PROCESSOR
const processText = (text, entropy) => {
  let output = text;

  // Apply effects in sequence
  output = stutterText(output, entropy);
  output = redactWords(output, entropy);
  output = toZalgo(output, entropy);
  
  // Apply fading last so HTML tags don't get mangled by other processors
  output = fadeWords(output, entropy); 

  // Hard hard glitches for very high entropy
  if (entropy > 8 && Math.random() > 0.5) {
     return output.split("").reverse().join("");
  }
  
  return output;
};

// Wrap random long words as [[links]]
const glitchifyLinks = (text) =>
  text
    .split(" ")
    .map((word) => {
      // Clean HTML tags if present from previous steps to avoid breaking links
      const cleanWord = word.replace(/<[^>]*>/g, ""); 
      if (cleanWord.length > 4 && Math.random() > 0.8) {
        const punctuation = cleanWord.match(/[.,]/)?.[0] ?? "";
        const core = cleanWord.replace(/[.,]/g, "");
        return `[[${core}]]${punctuation}`; // Note: Links might render weirdly with fades, part of the chaos
      }
      return word;
    })
    .join(" ");

// =====================================================
// 3. MAIN GENERATOR
// =====================================================

export const generateChaosPage = (url, entropyLevel = 0) => {
  // ---------------------------------------------------
  // ASCENSION EVENT (Entropy ≥ 10)
  // ---------------------------------------------------
  if (entropyLevel >= 10) {
    return {
      title: "ASCENSION",
      isAscended: true,
      sections: [
        {
          type: "hero",
          headline: "CLARITY ACHIEVED",
          subhead: randomFrom(TRUTHS),
          imagePrompt:
            "ethereal white light, fractal gold geometry, divine architecture, peace, angelic, 8k"
        },
        {
          type: "article",
          title: "The Simulation Resets",
          body: "You pushed through the entropy. The glitches have aligned. You are free now.",
          imagePrompt: "white dove flying in void, bright light, hope"
        }
      ]
    };
  }

  // ---------------------------------------------------
  // RITUAL FLAGS
  // ---------------------------------------------------
  const isNightmare = url.startsWith("!!");
  const isVoid = url.toLowerCase().includes("void");

  const cleanUrl = url
    .replace(/https?:\/\//, "")
    .replace(/www\./, "")
    .replace(/^!!/, "");

  // ---------------------------------------------------
  // REFUSAL EVENT (Rare)
  // ---------------------------------------------------
  if (Math.random() < 0.05 + entropyLevel * 0.01) {
    return {
      title: "ACCESS_DENIED",
      sections: [
        {
          type: "hero",
          headline: "DO NOT LOOK",
          subhead: "The browser refuses to render this thought.",
          imagePrompt: "black screen, tv static, hidden face, horror"
        }
      ]
    };
  }

  // ---------------------------------------------------
  // IMAGE VIBE
  // ---------------------------------------------------
  let vibe = "surrealism, dreamcore, strange";
  if (entropyLevel > 3) vibe = "decay, glitch art, horror, melting";
  if (entropyLevel > 7) vibe = "void, darkness, abstract, unintelligible";
  if (isNightmare) vibe = "hellscape, demonic, red and black";

  const imagePrompt = `The conceptual opposite of ${cleanUrl}, ${vibe}, cinematic, 4k`;

  // ---------------------------------------------------
  // PAGE ASSEMBLY
  // ---------------------------------------------------
  
  // Base strings before processing
  const baseTitle = `NOT_${cleanUrl.toUpperCase()}`;
  const baseHeadline = isNightmare ? "RUN AWAY" : `THE END OF ${cleanUrl.toUpperCase()}`;
  const baseSubhead = entropyLevel > 4 
    ? randomFrom(FALSE_MEMORIES) 
    : `You asked for ${cleanUrl}. We found its shadow.`;

  const pageData = {
    // Titles get heavy processing
    title: processText(baseTitle, entropyLevel),
    sections: []
  };

  // HERO
  pageData.sections.push({
    type: "hero",
    headline: processText(baseHeadline, entropyLevel),
    subhead: processText(baseSubhead, entropyLevel),
    imagePrompt
  });

  // MARQUEE
  if (entropyLevel > 2 || Math.random() > 0.6) {
    const marqueeBase = entropyLevel >= 8
        ? "REALITY FAILURE /// DO NOT CLOSE THE TAB /// IT IS WATCHING ///"
        : `/// ENTROPY LEVEL: ${entropyLevel * 10}% /// ${cleanUrl.toUpperCase()} IS DISSOLVING ///`;
        
    pageData.sections.push({
      type: "marquee",
      // Marquee gets extra redaction but less fading so it remains readable-ish
      text: redactWords(marqueeBase, entropyLevel) 
    });
  }

  // BODY
  if (!isVoid) {
    let rawBody = entropyLevel > 6
        ? "The data you requested has been eaten by the algorithm. Why are you still here? The simulation requires your attention."
        : randomFrom(META_BODY);
        
    // Combine links with the processor
    // Note: We process text first, then add links, or vice versa depending on desired chaos
    let processedBody = processText(rawBody, entropyLevel);
    
    // Only add wiki-links if entropy isn't totally destroying readability yet
    if(entropyLevel < 8) {
        processedBody = glitchifyLinks(processedBody);
    }

    pageData.sections.push({
      type: "article",
      title: processText(randomFrom(META_TITLES), entropyLevel),
      body: processedBody,
      imagePrompt: `abstract decay of ${cleanUrl}`
    });
  }

  return pageData;
};