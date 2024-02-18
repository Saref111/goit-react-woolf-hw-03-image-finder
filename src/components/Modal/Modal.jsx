import React from 'react';
import css from './Modal.module.scss';

export const Modal = ({ image, onClose }) => {
  window.addEventListener('keydown', function closeOnEsc(e) {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', closeOnEsc);
    }
  });
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}
