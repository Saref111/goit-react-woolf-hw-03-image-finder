import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages, PAGE_SIZE } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const getShowMoreButtonVisibility = (images) => {
  return images.length >= PAGE_SIZE;
};

class App extends Component {
  state = {
    images: [],
    modalMedia: null,
    currentPage: 1,
    searchQuery: '',
    showLoadMoreButton: false,
    isLoading: false,
  };

  setLoader = (isLoading) => {
    this.setState((pS) => ({ ...pS, isLoading }));
  };

  onSearch = async (query) => {
    try {
      this.setLoader(true);
      const resp = await fetchImages({ searchQuery: query });

      this.setState((pS) => ({
        ...pS,
        isLoading: false,
        images: resp.data.hits,
        currentPage: 1,
        searchQuery: query,
        showLoadMoreButton: getShowMoreButtonVisibility(resp.data.hits),
      }));
    } catch (error) {
      this.setLoader(false);
      console.error('Error fetching images', error);
    }
  };

  onLoadMore = async () => {
    try {
      this.setLoader(true);
      const resp = await fetchImages({
        searchQuery: this.state.searchQuery,
        currentPage: this.state.currentPage + 1,
      });

      this.setState((pS) => ({
        ...pS,
        isLoading: false,
        images: [...pS.images, ...resp.data.hits],
        currentPage: pS.currentPage + 1,
        showLoadMoreButton: getShowMoreButtonVisibility(resp.data.hits),
      }));
    } catch (error) {
      this.setLoader(false);
      console.error('Error fetching images', error);
    }
  };

  onImageClick = (image) => {
    document.body.style.overflow = 'hidden';
    this.setState((pS) => ({ ...pS, modalMedia: image }));
  };

  onModalClose = () => {
    document.body.style = '';
    this.setState((pS) => ({ ...pS, modalMedia: null }));
  };

  render() {
    const { modalMedia, showLoadMoreButton, images, isLoading } = this.state;
    const listItems = images.map((image) => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onClick={this.onImageClick}
      />
    ));
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery>{listItems}</ImageGallery>
        {showLoadMoreButton && <Button onClick={this.onLoadMore} />}
        {modalMedia && <Modal image={modalMedia} onClose={this.onModalClose} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
