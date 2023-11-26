import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onClose, selectedImage }) => {
  const backdropClose = e => {
    e.currentTarget === e.target && onClose();
  };

  const handleEscClose = e => {
    e.code === 'Escape' && onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  });

  return (
    <div className={css.overlay} onClick={backdropClose}>
      <div className={css.modal}>
        <img
          className={css.images}
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
        />
      </div>
    </div>
  );
};
