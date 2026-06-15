import { useRef, useState, MouseEvent, MutableRefObject } from 'react';

export function useDraggableScroll<T extends HTMLElement>(externalRef?: MutableRefObject<T | null>) {
  const internalRef = useRef<T>(null);
  const ref = externalRef || internalRef;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none'; // Prevent text selection
  };

  const handleMouseLeave = () => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);
    ref.current.style.cursor = 'auto';
    ref.current.style.removeProperty('user-select');
  };

  const handleMouseUp = () => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);
    ref.current.style.cursor = 'auto';
    ref.current.style.removeProperty('user-select');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return {
    ref,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
  };
}
