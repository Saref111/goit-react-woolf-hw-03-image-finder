import React from 'react';
import css from './Modal.module.scss';

export const Modal = ({ image, onClose }) => {
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', onCloseModal);
    }
  };
  window.addEventListener('keydown', onCloseModal);
  return (
    <div className={css.overlay} onClick={onCloseModal}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
