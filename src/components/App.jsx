import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppStyle } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from './service/fetchPixabay';

import SearchBar from './serchBar/Searchbar';
import Loader from './loader/Loader';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImg: null,
    status: 'idle',
    alt: null,
    error: null,
  };
  totalHits = null;

  // componentDidMount;

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const imageData = await fetchPictures(searchQuery, page);

        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning(
            'No results were found for your search, please try something else.',
            { position: 'top-center' }
          );
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: 'resolved',
        }));

        if (page > 1) {
          const CARD_HEIGHT = 300; // preview image height
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ selectedImg }) => ({
      selectedImg: !selectedImg,
    }));
  };

  handleSelectImg = (largeImageURL, tags) => {
    this.setState({ selectedImg: largeImageURL, alt: tags });
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    const { images, status, selectedImg, alt, error } = this.state;

    return (
      <AppStyle>
        {selectedImg && (
          <Modal
            onClose={this.toggleModal}
            selectedImg={selectedImg}
            tags={alt}
          />
        )}
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}

        {images.length > 0 && (
          <ImageGallery images={images} selectedImg={this.handleSelectImg} />
        )}

        {/* button */}
        {status === 'pending' && <Loader />}
      </AppStyle>
    );
  }
}

export default App;
