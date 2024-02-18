import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'api/api';

class App extends Component {
  state = {
    images: [],
    modal: false,
    modalMedia: null,
    currentPage: 1,
  };

  onSearch = async (query) => {
    try {
      const resp = await fetchImages({ searchQuery: query });

      this.setState((pS) => ({
        ...pS,
        images: resp.data.hits,
        currentPage: 1,
      }));
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  render() {
    const listItems = this.state.images.map((image) => (
      <ImageGalleryItem {...image} />
    ));
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery>{listItems}</ImageGallery>
      </div>
    );
  }
}

export default App;
