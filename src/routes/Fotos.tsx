import "./Fotos.css";

const Fotos = () => {
  return (
    <div className="fotos-container">
      <h1 className="fotos-title">Nossas Fotos</h1>

      <div className="fotos-gallery">
        <div className="flickr-album">
          <iframe
            src="https://www.flickr.com/photos/204491296@N08/albums/72177720332834106/player/"
            width="800"
            height="600"
            frameBorder="0"
            allowFullScreen
            title="Nossas Fotos no Flickr"
          />
        </div>
      </div>

      <div className="fotos-info">
        <p>Veja todas as nossas fotos no álbum do Flickr!</p>
        <a
          href="https://www.flickr.com/photos/204491296@N08/albums/72177720332834106"
          target="_blank"
          rel="noopener noreferrer"
          className="flickr-link"
        >
          Abrir álbum completo no Flickr
        </a>
      </div>
    </div>
  );
};

export default Fotos;
