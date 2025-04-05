import { useState, useRef, useEffect } from "react";

interface HoverImageSwitcher {
  currentImage: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

/**
 * Custom hook to manage image switching on hover.
 *
 * @param originalImage - The default image URL.
 * @param alternateImages - Array of alternate image URLs.
 * @returns {HoverImageSwitcher} - Object containing current image state and handlers.
 */
const useHoverImageSwitcher = (originalImage: string, alternateImages: string[]): HoverImageSwitcher => {
  const [currentImage, setCurrentImage] = useState<string>(originalImage);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const shuffledImagesRef = useRef<string[]>([]);
  const indexRef = useRef<number>(0);

  // Shuffle array using the Fisher-Yates algorithm
  const shuffleImages = (images: string[]): string[] => {
    const arr = images.filter(Boolean);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleMouseEnter = (): void => {
    if (alternateImages.length > 0) {
      shuffledImagesRef.current = shuffleImages(alternateImages);
      indexRef.current = 0;

      // Set the first alternate image immediately
      setCurrentImage(shuffledImagesRef.current[indexRef.current]);
      indexRef.current = (indexRef.current + 1) % shuffledImagesRef.current.length;

      // Start the interval for image switching
      intervalRef.current = setInterval(() => {
        setCurrentImage(shuffledImagesRef.current[indexRef.current]);
        indexRef.current = (indexRef.current + 1) % shuffledImagesRef.current.length;
      }, 1500);
    }
  };

  const handleMouseLeave = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImage(originalImage);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { currentImage, handleMouseEnter, handleMouseLeave };
};

export default useHoverImageSwitcher;
