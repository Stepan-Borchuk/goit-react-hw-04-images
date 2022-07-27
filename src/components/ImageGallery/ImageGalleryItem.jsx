import PropTypes from 'prop-types';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';

function ImageGalleryItem({ tags, previewImg, selectedImg }) {
  return (
    <GalleryItem>
      <GalleryImg src={previewImg} alt={tags} onClick={selectedImg} />
    </GalleryItem>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
