import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './DocumentViewer.module.css';

const DocumentViewer = ({ imageUrl, alt = 'Documento', className = '', onClick }) => {
  const [status, setStatus] = useState('loading'); // 'loading', 'loaded', 'error'
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      setStatus('loading');
    } else {
      console.warn('[DocumentViewer] No se recibió una URL de imagen válida');
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      // Imagen ya estaba en caché
      setStatus('loaded');
    }
  }, [imageUrl]);

  const handleImageLoad = () => {
    
    setStatus('loaded');
  };

  const handleImageError = (e) => {
    //console.error('[DocumentViewer] Error al cargar la imagen:', imageUrl, e);
    setStatus('error');
  };

  if (!imageUrl) {
    return (
      <div
        className={`${styles.documentViewer} ${styles.placeholder} ${className}`}
        onClick={onClick}
        role="img"
        aria-label="No hay imagen disponible"
      >
        <ImageIcon className={styles.placeholderIcon} />
        <span>No hay imagen disponible</span>
      </div>
    );
  }

  return (
    <div className={`${styles.documentViewer} ${className}`} onClick={onClick}>
      {status === 'loading' && (
        <div className={styles.loadingIndicator}>
          <span className={styles.loadingSpinner}></span>
          <span>Cargando...</span>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorContainer}>
          <ErrorOutlineIcon className={styles.errorIcon} />
          <span>Error al cargar la imagen</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className={`${styles.viewerImage} ${status === 'loaded' ? styles.loaded : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: status === 'loaded' ? 'block' : 'none' }}
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
