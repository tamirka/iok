import { useEffect, useState } from 'react';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rx = 0;
    let ry = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animRing = () => {
      rx += (position.x - rx) * 0.12;
      ry += (position.y - ry) * 0.12;
      setRingPosition({ x: rx, y: ry });
      animationFrameId = requestAnimationFrame(animRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    animRing();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x - 5}px`,
          top: `${position.y - 5}px`,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: `${ringPosition.x - 18}px`,
          top: `${ringPosition.y - 18}px`,
          width: isHovering ? '56px' : '36px',
          height: isHovering ? '56px' : '36px',
          opacity: isHovering ? 0.3 : 0.6,
        }}
      />
    </>
  );
}
