import React, { useEffect, useState } from 'react';
import './index.css';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true); // Ensure the modal is always in the DOM when opening
      setTimeout(() => setVisible(true), 10); // Slight delay to trigger animation
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 300); // Delay removal for animation
    }
  }, [isOpen]);

  if (!shouldRender) return null; // Only remove from DOM after animation completes

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof Element && e.target.classList.contains('tmc-modal')) {
      closeModal();
    }
  };

  return (
    <div className={`tmc-modal ${visible ? 'show' : ''}`} onClick={handleOverlayClick}>
      <div className="tmc-modal-content">
        <span className="tmc-modal-close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
