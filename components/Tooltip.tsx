import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      setCoords({
        left: rect.left + rect.width / 2 + scrollX,
        top: position === 'top' 
          ? rect.top + scrollY - 8 
          : rect.bottom + scrollY + 8,
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    updatePosition();
    setIsVisible(true);
    // Call original handler if it exists
    const childProps = (children as any).props;
    if (childProps && childProps.onMouseEnter) {
      childProps.onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsVisible(false);
    const childProps = (children as any).props;
    if (childProps && childProps.onMouseLeave) {
      childProps.onMouseLeave(e);
    }
  };
  
  const handleFocus = (e: React.FocusEvent) => {
    updatePosition();
    setIsVisible(true);
    const childProps = (children as any).props;
    if (childProps && childProps.onFocus) {
      childProps.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setIsVisible(false);
    const childProps = (children as any).props;
    if (childProps && childProps.onBlur) {
      childProps.onBlur(e);
    }
  };

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'aria-label': content,
      } as any)}
      {isVisible && createPortal(
        <div
          className={`fixed z-[100] px-3 py-1.5 text-xs font-bold text-white bg-stone-800 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 animate-fade-in-up transition-opacity duration-200 whitespace-nowrap border border-stone-700 ${position === 'top' ? '-translate-y-full' : ''}`}
          style={{
            left: coords.left - (window.scrollX || window.pageXOffset),
            top: coords.top - (window.scrollY || window.pageYOffset),
          }}
          role="tooltip"
        >
          {content}
          <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent ${position === 'top' ? 'border-t-stone-800 top-full' : 'border-b-stone-800 bottom-full'}`}></div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;