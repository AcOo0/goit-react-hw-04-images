import ImageGallery from "./ImageGallery/ImageGallery";

import styles from "./app.module.css"

export const App = () => {
  return (
    <div className={styles.app}>
      <ImageGallery/>
    </div>
  );
};
