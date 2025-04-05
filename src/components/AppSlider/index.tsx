import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import './index.css';
import appSliderData from '../../content/AppSliderData.json';
import useSliderBackground from '../../hooks/useSliderBackground';

// Define the structure for each slide based on the JSON data.
// Note: The 'id' property is defined as a number.
interface Slide {
  id: number;
  title: string;
  text: string;
  buttonLink: string;
  buttonText: string;
  imageLink: string;
  image: string;
}

/**
 * Utility function to merge multiple refs into a single ref callback.
 * This allows you to pass a single ref to an element while still using multiple refs.
 *
 * @param refs - A list of refs to merge.
 * @returns A ref callback that assigns the element to each provided ref.
 */
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(value);
      } else {
        // Cast ref as MutableRefObject to allow assignment to 'current'
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

const Slider: React.FC = () => {
  // State to track the current slide index.
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // Total number of slides.
  const totalSlides: number = appSliderData.length;

  // Create a mutable ref for the slider container.
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Use the custom hook to update the background based on a 100px threshold.
  useSliderBackground(sliderRef, 100, '#1963d1', 'white');

  // Auto-advance slides every 8 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Function to advance to the next slide.
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Function to go back to the previous slide.
  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Set up swipe handlers.
  // The property "preventDefaultTouchmoveEvent" is not recognized by the type definition,
  // so we cast that part of the configuration as any.
  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    ...( { preventDefaultTouchmoveEvent: true } as any ),
    trackMouse: true,
  });

  // Destructure 'ref' from swipeHandlers to avoid passing it twice.
  const { ref: swipeRef, ...handlers } = swipeHandlers;

  // Merge sliderRef and swipeRef into a single ref using the mergeRefs utility.
  const combinedRef = mergeRefs<HTMLDivElement>(sliderRef, swipeRef);

  return (
    <div className="slider-container" ref={combinedRef} {...handlers}>
      {/* Inner slider container that translates based on the current slide */}
      <div className="slider-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {appSliderData.map((slide: Slide) => (
          <div key={slide.id} className="slide">
            {/* Left section with slide title, text, and button */}
            <div className="slide-left">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <a href={slide.buttonLink} className="slide-button">
                {slide.buttonText}
              </a>
            </div>
            {/* Right section with slide image */}
            <div className="slide-right">
              <a href={slide.imageLink}>
                <img src={slide.image} alt={slide.title} />
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Left arrow for navigating to the previous slide */}
      <div className="slider-arrow left-arrow" onClick={goToPrev}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Right arrow for navigating to the next slide */}
      <div className="slider-arrow right-arrow" onClick={goToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Dots navigation for selecting specific slides */}
      <div className="slider-dots">
        {appSliderData.map((slide: Slide, index: number) => (
          <span
            key={slide.id}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
