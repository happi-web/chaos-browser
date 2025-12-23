/**
 * Dreams of Wisdom Engine
 * Generates transcendental content for the final stage of entropy.
 */

const SAGES = [
  {
    name: "Rumi",
    style: "Mystical",
    prompts: ["whirling dervish energy", "golden threads of light", "cosmos inside a heart"],
    quotes: [
      "Stop acting so small. You are the universe in ecstatic motion.",
      "The beauty you see in me is a reflection of you.",
      "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."
    ]
  },
  {
    name: "Marcus Aurelius",
    style: "Stoic/Eternal",
    prompts: ["marble statues dissolving into stars", "ordered geometry of the soul", "ancient timeless void"],
    quotes: [
      "The universe is change; our life is what our thoughts make it.",
      "He who lives in harmony with himself lives in harmony with the universe.",
      "Look back over the past, with its changing empires that rose and fell, and you can foresee the future too."
    ]
  },
  {
    name: "Carl Sagan",
    style: "Cosmic",
    prompts: ["starstuff forming DNA", "pale blue dot in a cathedral of nebula", "interstellar voyagers"],
    quotes: [
      "The cosmos is within us. We are made of star-stuff.",
      "Somewhere, something incredible is waiting to be known.",
      "For small creatures such as we the vastness is bearable only through love."
    ]
  },
  {
    name: "Hypatia",
    style: "Mathematical/Ethereal",
    prompts: ["golden ratio in the clouds", "astrolabe made of light", "sacred geometry of the sun"],
    quotes: [
      "Reserve your right to think, for even to think wrongly is better than not to think at all.",
      "Fables should be taught as fables, myths as myths, and miracles as poetic fancies.",
      "Life is an unfoldment, and the further we travel the more truth we can comprehend."
    ]
  },
  {
    name: "Alan Watts",
    style: "Zen/Liquid",
    prompts: ["water flowing uphill", "mountain melting into mist", "the sound of one hand clapping"],
    quotes: [
      "You are an aperture through which the universe is looking at and exploring itself.",
      "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
      "We do not 'come into' this world; we come out of it, as leaves from a tree."
    ]
  }
];

/**
 * Creates a "Wisdom Bundle"
 * @returns {Object} An object containing the wisdom, the sage, and visual metadata.
 */
export const generateWisdom = () => {
  // Select a random person (Sage)
  const sage = SAGES[Math.floor(Math.random() * SAGES.length)];
  
  // Select a random quote
  const quote = sage.quotes[Math.floor(Math.random() * sage.quotes.length)];
  
  // Select a random visual modifier
  const visualBase = sage.prompts[Math.floor(Math.random() * sage.prompts.length)];

  // Create an "Insane" word arrangement for the UI
  // This splits the words and assigns them random "float" delays
  const fragmentedWisdom = quote.split(" ").map((word, index) => ({
    word,
    delay: index * 0.2 + Math.random() * 0.5,
    depth: Math.floor(Math.random() * 100), // for Z-axis floating
    opacity: 0.7 + Math.random() * 0.3
  }));

  return {
    text: quote,
    fragments: fragmentedWisdom,
    author: sage.name,
    style: sage.style,
    // The "Insane" Pollinations prompt
    imagePrompt: `${visualBase}, ${sage.style} aesthetic, highly detailed, ethereal, cinematic lighting, transcendental, spiritual awakening, 8k, masterpiece`,
    colorPalette: sage.style === "Mystical" ? "gold and violet" : 
                  sage.style === "Cosmic" ? "deep nebula blue and silver" : 
                  "soft cream and marble"
  };
};

/**
 * Provides a secondary "Insight" if the user lingers too long
 */
export const getDeepInsight = (authorName) => {
    const backup = "Everything is connected in the great web of being.";
    const sage = SAGES.find(s => s.name === authorName);
    return sage ? sage.quotes[0] : backup;
};