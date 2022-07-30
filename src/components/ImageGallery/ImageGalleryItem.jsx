import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/modal/Modal';

function ImageGalleryItem({ tags, previewImg, largeImageURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <GalleryItem>
      <GalleryImg
        src={previewImg}
        alt={tags}
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          selectedImg={largeImageURL}
          tags={tags}
        />
      )}
    </GalleryItem>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
