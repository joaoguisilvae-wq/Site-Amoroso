import { useEffect } from "react";
import "./Fotos.css";

const Fotos = () => {
  // Carregar o script do Flickr quando o componente for montado
  useEffect(() => {
    // Verifica se o script já foi carregado
    if (
      !document.querySelector(
        'script[src="//embedr.flickr.com/assets/client-code.js"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "//embedr.flickr.com/assets/client-code.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="fotos-container">
      <h1 className="fotos-title">Nossas Fotos</h1>

      <div className="fotos-gallery">
        <div className="flickr-album">
          <a
            data-flickr-embed="true"
            href="https://www.flickr.com/photos/204491296@N08/albums/72177720332834106"
            title="aaaaa"
          >
            <img
              src="https://live.staticflickr.com/31337/55181201240_effd6e0462_w.jpg"
              width="400"
              height="300"
              alt="Nossas Fotos"
            />
          </a>
        </div>
      </div>

      <div className="fotos-info">
        <p>Veja todas as nossas fotos no álbum do Flickr!</p>
      </div>
    </div>
  );
};

export default Fotos;
