import styles from './image-gallery-item.module.css'

const ImageGalleryItem = ({showModal, items }) => {
    const elements = items.map(({
            id,
            webformatURL,
            largeImageURL,
            tags,
            }) => <li key={id} onClick={()=>showModal({largeImageURL, tags})} className={styles.imageGalleryItem}>
                <img className={styles.imageGalleryItemImage} src={webformatURL} alt={tags} loading="lazy" />
        </li>);
    return elements;
}

export default ImageGalleryItem;