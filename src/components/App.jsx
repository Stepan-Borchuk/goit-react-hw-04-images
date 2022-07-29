import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppStyle } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from './service/fetchPixabay';
import LoadMoreButton from './loadMore/LoadMoreButton';

import SearchBar from './serchBar/Searchbar';
import Loader from './loader/Loader';

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [alt, setAlt] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchImages() {
      setStatus('pending');
      try {
        const imageData = await fetchPictures(searchQuery, page);
        setTotalHits(imageData.total);
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning(
            'No results were found for your search, please try something else.',
            { position: 'top-center' }
          );
        }
        setImages(prevImg => [...prevImg, ...imagesHits]);
        setStatus('resolved');
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        setError(error);
        setStatus('rejected');
      }

      if (page > 1) {
        const CARD_HEIGHT = 300; // preview image height
        window.scrollBy({
          top: CARD_HEIGHT * 2,
          behavior: 'smooth',
        });
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const toggleModal = () => {
    setSelectedImg(!selectedImg);
  };

  const handleSelectImg = (largeImageURL, tags) => {
    setSelectedImg(largeImageURL);
    setAlt(tags);
  };

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    resetState();
    setSearchQuery(query);
  };

  const resetState = () => {
    setImages([]);
    setPage(1);
    setStatus('idle');
    setError(null);
    setSelectedImg(null);
    setAlt(null);
    setTotalHits(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyle>
      {selectedImg && (
        <Modal onClose={toggleModal} selectedImg={selectedImg} tags={alt} />
      )}
      <SearchBar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {error && (
        <h1 style={{ color: 'maline', textAlign: 'center' }}>
          {error.message}
        </h1>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} selectedImg={handleSelectImg} />
      )}
      {images.length > 0 && images.length !== totalHits && (
        <LoadMoreButton onClick={loadMore} />
      )}
      {status === 'pending' && <Loader />}
    </AppStyle>
  );
}
