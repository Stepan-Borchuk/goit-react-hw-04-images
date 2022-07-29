import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { OverlayModal, ContainerModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ selectedImg, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <OverlayModal onClick={handleBackDropClick}>
      <ContainerModal>
        <img src={selectedImg} alt={tags} />
      </ContainerModal>
    </OverlayModal>,
    modalRoot
  );
}

Modal.propTypes = {
  selectedImg: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
