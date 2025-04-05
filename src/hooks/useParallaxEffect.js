import { useEffect } from 'react';

const useParallaxEffect = () => {
  useEffect(() => {
    const triangleElements = Array.from(document.querySelectorAll('.triangle'));
    const triangleData = triangleElements.map(triangle => {
      const rect = triangle.getBoundingClientRect();
      const initialTop = rect.top + window.scrollY;
      const height = rect.height;
      return { element: triangle, initialTop, height };
    });

    const applyParallaxEffect = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const footer = document.querySelector('.footer');
      let footerTop = Infinity;
      let maxScroll = scrollPosition;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        footerTop = footerRect.top + scrollPosition;
        maxScroll = footerTop - windowHeight;
      }
      
      const footerFullyInView = scrollPosition + windowHeight >= footerTop;
      const effectiveScroll = footerFullyInView ? maxScroll : scrollPosition;
      
      const speedFactors = [1.5, 2.5, -1, -1.2, 2.8, -1.1];
      const rotationSpeeds = [0.1, -0.2, 0.3, -0.4, 0.2, -0.3];
      const logoSpeedFactor = 0.4;
      
      triangleElements.forEach((triangle, index) => {
        if (index >= 0 && index <= 5) {
          const speedFactor = speedFactors[index] || 1;
          const rotationSpeed = rotationSpeeds[index] || 0.1;
          let translateY = effectiveScroll * (speedFactor / 2);
          const { initialTop, height } = triangleData[index];
          const newTop = initialTop + translateY;
          if (newTop + height > footerTop) {
            translateY = footerTop - height - initialTop;
          }
          const rotation = effectiveScroll * rotationSpeed + 30;
          triangle.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
          if (footerFullyInView) {
           // triangle.style.opacity = 0;
          } else {
            triangle.style.opacity = 1;
          }
        } else if (index === 6 || index === 7) {
          const direction = index === 6 ? -1 : 1;
          const translateX = effectiveScroll * direction * 10;
          if (index === 6) {
            triangle.style.transform = `translateX(${translateX}px)`;
          } else {
            triangle.style.transform = `translateX(${translateX}px) rotate(141deg)`;
          }
        } else if (index === 8) {
          let translateY = effectiveScroll * -10;
          const { initialTop, height } = triangleData[index];
          const newTop = initialTop + translateY;
          if (newTop + height > footerTop) {
            translateY = footerTop - height - initialTop;
          }
          triangle.style.transform = `translateY(${translateY}px) rotate(-6deg)`;
        }
      });
      
      const logo = document.querySelector(".logo");
      if (logo) {
        logo.style.transform = `translate(-50%, calc(-50% + ${effectiveScroll * logoSpeedFactor}px))`;
      }
    };

    window.addEventListener('scroll', applyParallaxEffect);
    applyParallaxEffect();
    return () => window.removeEventListener('scroll', applyParallaxEffect);
  }, []);
};

export default useParallaxEffect;
