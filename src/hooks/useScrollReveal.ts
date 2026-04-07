import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    let obs: IntersectionObserver;
    let reveals: NodeListOf<Element>;

    const initReveal = () => {
      reveals = document.querySelectorAll('.reveal');
      obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
          }
        });
      }, { threshold: 0.1 });
      
      reveals.forEach(el => obs.observe(el));
    };

    // Use a small timeout to ensure React has rendered the new DOM elements
    const timeoutId = setTimeout(initReveal, 100);

    return () => {
      clearTimeout(timeoutId);
      if (obs && reveals) {
        reveals.forEach(el => obs.unobserve(el));
      }
    };
  }, [location.pathname]);
}
