import React from 'react';
import css from './ImageGallery.module.scss';

export const ImageGallery = (props) => {
  return <ul className={css.gallery}>{props.children}</ul>;
};
