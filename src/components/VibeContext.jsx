// src/context/VibeContext.js
import React, { createContext, useState, useContext } from 'react';

const VibeContext = createContext();

export const VibeProvider = ({ children }) => {
  // This state holds the current hover color (e.g., '#ff0055' or null)
  const [hoverColor, setHoverColor] = useState(null);

  return (
    <VibeContext.Provider value={{ hoverColor, setHoverColor }}>
      {children}
    </VibeContext.Provider>
  );
};

export const useVibe = () => useContext(VibeContext);