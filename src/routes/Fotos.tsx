import { useState, useEffect, useCallback } from "react";
import "./Fotos.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Lista de fotos (apenas arquivos .jpg e .jpeg, excluindo vídeos)
const photosList = [
  "Img/20260215_230738-IMG_STYLE.jpg",
  "Img/20260215_231557-IMG_STYLE.jpg",
  "Img/IMG_20250224_163617.jpg",
  "Img/IMG_20250505_135711.jpg",
  "Img/IMG_20250509_160041.jpg",
  "Img/IMG_20250609_135308_TIMEBURST3.jpg",
  "Img/IMG_20250609_135308_TIMEBURST4.jpg",
  "Img/IMG_20250609_135429.jpg",
  "Img/IMG_20250617_155134.jpg",
  "Img/IMG_20250617_155142.jpg",
  "Img/IMG_20250617_155159.jpg",
  "Img/IMG_20250617_155221.jpg",
  "Img/IMG_20250617_155415.jpg",
  "Img/IMG_20250805_204353_73.jpg",
  "Img/IMG_20250815_131002.jpg",
  "Img/IMG_20250815_150102.jpg",
  "Img/IMG_20250821_165601.jpg",
  "Img/IMG_20250821_165613.jpg",
  "Img/IMG_20250829_180802.jpg",
  "Img/IMG_20250904_163346.jpg",
  "Img/IMG_20250908_123408.jpg",
  "Img/IMG_20250916_165502.jpg",
  "Img/IMG_20250916_165543.jpg",
  "Img/IMG_20250916_165553.jpg",
  "Img/IMG_20250916_165556.jpg",
  "Img/IMG_20250916_165557.jpg",
  "Img/IMG_20250916_165558.jpg",
  "Img/IMG_20250929_123322.jpg",
  "Img/IMG_20251024_145227.jpg",
  "Img/IMG_20251031_125707.jpg",
  "Img/IMG_20251031_125712.jpg",
  "Img/IMG_20251031_154729.jpg",
  "Img/IMG_20251031_154732.jpg",
  "Img/IMG_20251105_122902.jpg",
  "Img/IMG_20251105_122910.jpg",
  "Img/IMG_20251105_122914.jpg",
  "Img/IMG_20251105_123026.jpg",
  "Img/IMG_20251107_150328.jpg",
  "Img/IMG_20251110_161025.jpg",
  "Img/IMG_20251110_161136.jpg",
  "Img/IMG_20251110_161530.jpg",
  "Img/IMG_20251117_183445.jpg",
  "Img/IMG_20251125_150453.jpg",
  "Img/IMG_20251125_150509.jpg",
  "Img/IMG_20251125_150540.jpg",
  "Img/IMG_20251125_150551.jpg",
  "Img/IMG_20251126_122837.jpg",
  "Img/IMG_20251126_122854.jpg",
  "Img/IMG_20251126_122906.jpg",
  "Img/IMG_20251129_150253.jpg",
  "Img/IMG_20251130_171544.jpg",
  "Img/IMG_20251201_141447.jpg",
  "Img/IMG_20251202_122924.jpg",
  "Img/IMG_20251202_122926.jpg",
  "Img/IMG_20260207_155334.jpg",
  "Img/IMG_20260207_155343.jpg",
  "Img/IMG_20260213_112324.jpg",
  "Img/IMG_20260213_112353.jpg",
  "Img/IMG-20250805-WA0007.jpg",
  "Img/IMG-20251009-WA0055.jpg",
  "Img/IMG-20251126-WA0020.jpg",
  "Img/IMG-20251126-WA0022.jpg",
  "Img/IMG-20251126-WA0023.jpg",
  "Img/IMG-20251126-WA0026.jpg",
  "Img/IMG-20251126-WA0059.jpg",
  "Img/IMG-20251126-WA0064.jpg",
  "Img/IMG-20251126-WA0066.jpg",
  "Img/IMG-20251126-WA0069.jpg",
  "Img/IMG-20251126-WA0070.jpg",
  "Img/IMG-20251128-WA0018.jpg",
  "Img/IMG-20251128-WA0019.jpg",
  "Img/IMG-20251128-WA0020.jpg",
  "Img/IMG-20251128-WA0021.jpg",
  "Img/IMG-20251205-WA0091.jpg",
  "Img/IMG-20251206-WA0020.jpg",
  "Img/IMG-20260116-WA0019.jpg",
  "Img/IMG-20260122-WA0071.jpeg",
  "Img/IMG-20260123-WA0012.jpeg",
  "Img/IMG-20260220-WA0029.jpg",
  "Img/IMG-20260304-WA0006 (1).jpg",
  "Img/IMG-20260312-WA0078.jpeg",
  "Img/IMG-20260318-WA0028.jpg",
  "Img/IMG-20260324-WA0041.jpg",
  "Img/IMG-20260326-WA0029.jpeg",
];

const PHOTOS_PER_PAGE = 4;

const Fotos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

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
    if (currentPage === totalPages - 1) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages, isAnimating, currentPhotos.length]);

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
          className={`fotos-arrow fotos-arrow-right`}
          onClick={goToNext}
          aria-label="Próxima página"
        >
          <FaArrowRight />
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
    </div>
  );
};

export default Fotos;
