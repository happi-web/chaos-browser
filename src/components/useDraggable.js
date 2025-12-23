import { useState, useEffect, useRef } from 'react';

export const useDraggable = (initialPosition) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Calculate where the mouse is relative to the window corner
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Calculate new raw positions
      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;

      // --- THE FIX: BOUNDARIES ---
      // Prevent dragging off the top (Keep 0 as minimum)
      // Prevent dragging too far left/right (Keep within screen width - 50px)
      newY = Math.max(0, Math.min(newY, window.innerHeight - 50)); 
      newX = Math.max(-200, Math.min(newX, window.innerWidth - 100));

      setPosition({
        x: newX,
        y: newY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return { position, handleMouseDown, isDragging };
};