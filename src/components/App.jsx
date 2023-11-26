import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages } from '../helpers/api';
import { Notify } from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState('');

  useEffect(() => {
    if (query) {
      const getImagesFromApi = async () => {
        try {
          setIsLoading(true);
          const { hits, total } = await getImages(query, page);

          if (total === 0) {
            Notify.failure(`Nothing was found for your request ${query}`);
          }

          setImages(prev => [...prev, ...hits]);
          setLoadMore(page < Math.ceil(total / 12));
        } catch (error) {
          Notify.failure(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getImagesFromApi();
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    if (query === '') {
      Notify.warning('Please enter something');

      setImages([]);
      setLoadMore(false);

      return;
    }

    setQuery(query.trim());
    setPage(1);
    setImages([]);
    setLoadMore(false);
    setSelectedImages('');
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = selectedImages => {
    setIsShowModal(true);
    setSelectedImages(selectedImages);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setSelectedImages('');
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery data={images} openModal={handleOpenModal} />
      {loadMore && <Button onLoadMore={onLoadMore} />}
      {isShowModal && (
        <Modal onClose={handleCloseModal} selectedImage={selectedImages} />
      )}
    </div>
  );
};
