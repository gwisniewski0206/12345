import React, { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import './index.css';
import partnerSliderData from "../../content/partnerSliderData.json";

// Define an interface for the JSON data structure
interface PartnerSliderData {
  title: string;
  images: string[];
}

const SlidingImagesSection: React.FC = () => {
  // State to hold the title and images from JSON
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  // Create a ref for the section element
  const ref = useRef<HTMLElement | null>(null);
  // State to track if the section is in view
  const [inView, setInView] = useState<boolean>(false);

  // Load title and images from the imported JSON when the component mounts
  useEffect(() => {
    const data = partnerSliderData as PartnerSliderData;
    setTitle(data.title);
    setImages(data.images);
  }, []);

  // Scroll effect to check if the section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Check if the section is within the viewport
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setInView(true);
        } else {
          setInView(false);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check in case the element is already in view
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Generates animation variants for images based on the direction.
   * @param direction - "left" or "right" determines the initial X offset.
   * @returns Variants object for framer-motion.
   */
  const imageVariants = (direction: "left" | "right"): Variants => ({
    hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  });

  return (
    <section ref={ref} className="sliding-images-section">
      {/* Centered Headline */}
      <h2 className="section-title">{title}</h2>

      {/* Image Container */}
      <div className="image-container">
        {/* Left Image */}
        <motion.div
          className="image-left"
          variants={imageVariants("left")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}  // Trigger animation on scroll
        >
          {images[0] && (
            <img
              src={images[0]}
              alt="Left"
              className="image-partner"
            />
          )}
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="image-right"
          variants={imageVariants("right")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}  // Trigger animation on scroll
        >
          {images[1] && (
            <img
              src={images[1]}
              alt="Right"
              className="image-partner"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SlidingImagesSection;
