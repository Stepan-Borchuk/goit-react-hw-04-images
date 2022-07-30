import PropTypes from 'prop-types';
import { ImageList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          previewImg={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ImageList>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
