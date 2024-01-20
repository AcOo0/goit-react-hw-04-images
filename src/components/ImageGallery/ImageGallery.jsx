import { Component } from "react";

import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

import Searchbar from "./Searchbar/Searchbar";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

import { searchImages } from "api/images";

import styles from './image-gallery.module.css'

class ImageGallery extends Component { 
    state = {
        search: "",
        hits: [],
        loading: false,
        error: null,
        page: 1,
        modalOpen: false,
        fullImage: {},
    }

    async componentDidUpdate(prevProps, prevState) {
        const { search, page } = this.state;
        if (
            // search && (search !== prevState.search || page !== prevState.page)
            prevState.search !== search ||
            prevState.page !== page
        ) {            
            this.fetchImages();
        }
    }

    async fetchImages() {
        const { search, page } = this.state;
            try {
                this.setState({
                loading: true,
            })
                const { data } = await searchImages(search, page);

                if (!data.total) { 
                    return alert('Ох! Нажаль за Вашим запитом нічого не знайдено');
                }
                this.setState(({ hits }) => ({
                    hits: [...hits, ...data.hits],
                    // hits: data.hits?.length ? [...hits, ...data.hits] : hits,
                }))
            }
            catch(error) {
                this.setState({
                    error: error.message,
                })
            }
            finally {
                this.setState({
                    loading: false,
                })
            }
    }

    handleSearch = ({ search }) => {
        if (this.state.search.toLowerCase() === search.toLowerCase()) { 
            return alert(`Ви ж і так переглядаєте ${search}`)
        }
        this.setState({
            search,
            hits: [],
            page: 1,
        })
    }

    loadMore = () => {
        this.setState(({ page }) => ({ page: page + 1 }));
    }

    showModal = ({largeImageURL, tags}) => {
        this.setState({
            modalOpen: true,
            fullImage: {
                largeImageURL,
                tags,
            }
        })
    }

    closeModal = () => { 
        this.setState({
            modalOpen: false,
            fullImage: {},
        })
    }
    
    render() {
        const { handleSearch, loadMore, showModal, closeModal} = this;
        const { hits, loading, error, modalOpen, fullImage } = this.state;
        
        const isImages = Boolean(hits.length);
        
        return (
            <>
                <Searchbar onSubmit={handleSearch} />
                {error && <p>{error}</p>}
                {loading && <Loader/>}
                {isImages && (  <ul className={styles.imageGallery}>
                                    <ImageGalleryItem showModal={showModal} items={hits} />
                                </ul>)}
                {isImages && <div className={styles.loadMoreWrapper}>
                                <Button onClick={loadMore} type="button">Load more</Button>
                </div>}
                {modalOpen && <Modal close={closeModal}>
                    <img src={fullImage.largeImageURL} alt={fullImage.tags} />
                            </Modal>}
            </>
            
        )
    }
}

export default ImageGallery;