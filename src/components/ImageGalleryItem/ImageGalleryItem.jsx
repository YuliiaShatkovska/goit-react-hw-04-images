import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ info, onClick }) => {
  return (
    <li className={css.gallery_item} onClick={() => onClick(info)}>
      <img src={info.webformatURL} alt={info.tags} />
    </li>
  );
};
