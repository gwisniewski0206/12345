import { useEffect } from 'react';

const useSliderBackground = (
  ref,
  threshold = 500, // threshold now relative to the viewport center
  inViewColor = '#1963d1',
  outViewColor = 'white'
) => {
  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      // Check if the element's top is above or equal to the viewport center plus threshold
      if (rect.top + rect.height / 2 <= viewportCenter + threshold) {
        ref.current.style.backgroundColor = inViewColor;
        console.log("inview");
      } else {
        ref.current.style.backgroundColor = outViewColor;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, threshold, inViewColor, outViewColor]);
};

export default useSliderBackground;
