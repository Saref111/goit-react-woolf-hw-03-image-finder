import React from 'react';
import css from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image)}
        loading="lazy"
      />
    </li>
  );
};
