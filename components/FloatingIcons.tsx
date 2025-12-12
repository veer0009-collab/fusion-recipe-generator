import React, { useMemo } from 'react';

const icons = [
  '🌿', '🍋', '🥑', '🍅', '🌶️', '🧄', '🧅', '🥕', '🌽', '🥦', '🥬', '🥒',
  '🥨', '🥯', '🥖', '🧀', '🥐', '🍞', '🥞', '🧇', '🍳', '🥚', '🥩', '🍗',
  '🍤', '🍣', '🍱', '🥘', '🍲', '🍝', '🍜', '🍚', '🍛', '🥗', '🍕', '🍔'
];

interface FloatingIconsProps {
  active: boolean;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ active }) => {
  const floatingItems = useMemo(() => {
    const itemsCount = 35; // Increased count for better density
    const items = [];
    for (let i = 0; i < itemsCount; i++) {
        const iconIndex = Math.floor(Math.random() * icons.length);
        const durationValue = 15 + Math.random() * 20; // Slower, more relaxed float
        items.push({
            icon: icons[iconIndex],
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${durationValue}s`, 
            pulseDuration: `${4 + Math.random() * 3}s`, // Slower, smoother pulse (4-7s)
            size: `${1.5 + Math.random() * 1.5}rem`, // Slightly larger base size
            rotation: Math.random() * 360,
            initialOpacity: 0.05 + Math.random() * 0.08 // Slightly more visible base opacity
        });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {floatingItems.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            // Apply rotation to the wrapper so it doesn't conflict with the float animation transform
            transform: `rotate(${item.rotation}deg)`, 
          }}
        >
          <div
            className={`
              animate-float transition-all duration-1000 ease-in-out font-serif
              ${active ? 'scale-125 blur-0 grayscale-0' : 'scale-100 blur-[0.5px] grayscale-[0.3]'}
            `}
            style={{
              animationDelay: item.delay,
              animationDuration: item.duration,
              opacity: active ? Math.min(item.initialOpacity * 5, 0.8) : item.initialOpacity,
              textShadow: active ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <div 
              className="animate-pulse-scale"
              style={{
                animationDuration: item.pulseDuration
              }}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;