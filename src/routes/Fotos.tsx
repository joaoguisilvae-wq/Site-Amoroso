import { useState, useEffect, useCallback } from "react";
import "./Fotos.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import LoveAnimation from "../Components/LoveAnimation";

// Lista de fotos (apenas arquivos .jpg e .jpeg, excluindo vídeos)
const photosList = [
  "Img/WhatsApp Image 2026-05-09 at 19.35.58.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.35.58 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.35.59.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.35.59 (1).jpeg",
  // 19:36
  "Img/WhatsApp Image 2026-05-09 at 19.36.00.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.00 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.01.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.01 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.01 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.02.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.02 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.03.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.03 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.03 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.03 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.03 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.04.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.36.05.jpeg",
  // 19:42 - Grupo mais recente
  "Img/WhatsApp Image 2026-05-09 at 19.42.54.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.42.54 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.42.54 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.42.55.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 19.42.55 (1).jpeg",
  // 00:44 - Grupo mais antigo
  "Img/WhatsApp Image 2026-05-09 at 00.44.19.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.19 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.19 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.20.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.20 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.20 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.20 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.21.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.21 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.21 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.21 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.21 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.22.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.44.22 (1).jpeg",
  // 00:51
  "Img/WhatsApp Image 2026-05-09 at 00.51.45.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.46.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.46 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.46 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.47.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.47 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.47 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.48.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.48 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.48 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.52.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.52 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.52 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.52 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.52 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.53.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.53 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.53 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.53 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.53 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.54.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.54 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.54 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.54 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.54 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.55.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.55 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.55 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.55 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.55 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56 (4).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.56 (5).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.57.jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.57 (1).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.57 (2).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.57 (3).jpeg",
  "Img/WhatsApp Image 2026-05-09 at 00.51.57 (4).jpeg",
  // 19:35
];

const PHOTOS_PER_PAGE = 4;

const Fotos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);

  const totalPages = Math.ceil(photosList.length / PHOTOS_PER_PAGE);
  const startIndex = currentPage * PHOTOS_PER_PAGE;
  const currentPhotos = photosList.slice(
    startIndex,
    startIndex + PHOTOS_PER_PAGE,
  );

  const goToPrevious = useCallback(() => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setVisiblePhotos(new Array(currentPhotos.length).fill(false));
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
      }, 300);
    }
  }, [currentPage, isAnimating, currentPhotos.length]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setVisiblePhotos(new Array(currentPhotos.length).fill(false));
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
      }, 300);
    }
    if (currentPage === totalPages - 1 && !showLoveAnimation) {
      setShowLoveAnimation(true);
    }
  }, [
    currentPage,
    totalPages,
    isAnimating,
    currentPhotos.length,
    showLoveAnimation,
  ]);

  // Reset visible photos when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const newVisible = new Array(currentPhotos.length).fill(false);
      setVisiblePhotos(newVisible);
      setIsAnimating(false);

      // Staggered animation for each photo
      newVisible.forEach((_, index) => {
        setTimeout(() => {
          setVisiblePhotos((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }, index * 80);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage, currentPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto !== null) {
        if (e.key === "Escape") setSelectedPhoto(null);
        return;
      }
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, selectedPhoto]);

  const openPhoto = (photo: string) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  // Manage body overflow when lightbox is open
  useEffect(() => {
    if (selectedPhoto !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <div className="fotos-container">
      <h1 className="fotos-title">Nossas Fotos</h1>

      <div className="fotos-pagination">
        <span className="fotos-page-info">
          Página {currentPage + 1} de {totalPages}
        </span>
        <div className="fotos-dots">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`fotos-dot ${currentPage === index ? "active" : ""}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setVisiblePhotos(new Array(currentPhotos.length).fill(false));
                  setTimeout(() => {
                    setCurrentPage(index);
                  }, 300);
                }
              }}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="fotos-gallery">
        <button
          className={`fotos-arrow fotos-arrow-left ${currentPage === 0 ? "disabled" : ""}`}
          onClick={goToPrevious}
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          <FaArrowLeft />
        </button>

        <div className="fotos-grid">
          {currentPhotos.map((photo, index) => (
            <div
              key={`${currentPage}-${index}`}
              className={`fotos-item ${visiblePhotos[index] ? "visible" : ""}`}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => openPhoto(photo)}
            >
              <img
                src={photo}
                alt={`Foto ${startIndex + index + 1}`}
                loading="lazy"
                className="fotos-image"
              />
            </div>
          ))}
        </div>

        <button
          className={`fotos-arrow fotos-arrow-right ${currentPage === totalPages - 1 ? "love-arrow" : ""}`}
          onClick={goToNext}
          aria-label="Próxima página"
        >
          {currentPage === totalPages - 1 && !showLoveAnimation ? (
            "❤️"
          ) : (
            <FaArrowRight />
          )}
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fotos-lightbox" onClick={closePhoto}>
          <div
            className="fotos-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fotos-lightbox-close"
              onClick={closePhoto}
              aria-label="Fechar"
            >
              ×
            </button>
            <img
              src={selectedPhoto}
              alt="Foto ampliada"
              className="fotos-lightbox-image"
            />
          </div>
        </div>
      )}
      <LoveAnimation
        trigger={showLoveAnimation}
        onEnd={() => setShowLoveAnimation(false)}
      />
    </div>
  );
};

export default Fotos;
