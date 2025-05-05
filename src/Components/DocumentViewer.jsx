import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './DocumentViewer.module.css';

const DocumentViewer = ({ imageUrl, alt, className, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  //useEffect(() => {
    //if (imageUrl) {
      //console.log('[DocumentViewer] Nueva imagen detectada:', imageUrl);
      //setLoading(true);
      //setError(false);
      //setImageLoaded(false);
    //} else {
     // console.warn('[DocumentViewer] No se recibió una URL de imagen válida');
    //}
  //}, [imageUrl]);

  const handleImageLoad = () => {
    console.log('[DocumentViewer] Imagen cargada correctamente:', imageUrl);
    setLoading(false);
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('[DocumentViewer] Error al cargar la imagen:', imageUrl, e);
    setLoading(false);
    setError(true);
  };

  if (!imageUrl) {
    return (
      <div className={`${styles.documentViewer} ${styles.placeholder} ${className || ''}`} onClick={onClick}>
        <ImageIcon className={styles.placeholderIcon} />
        <span>No hay imagen disponible</span>
      </div>
    );
  }

  return (
    <div className={`${styles.documentViewer} ${className || ''}`} onClick={onClick}>
      {loading && !imageLoaded && (
        <div className={styles.loadingIndicator}>
          <span className={styles.loadingSpinner}></span>
          <span>Cargando...</span>
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <ErrorOutlineIcon className={styles.errorIcon} />
          <span>Error al cargar la imagen</span>
        </div>
      )}

      <img
        src={imageUrl}
        alt={alt || 'Documento'}
        className={`${styles.viewerImage} ${imageLoaded ? styles.loaded : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

DocumentViewer.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default DocumentViewer;
