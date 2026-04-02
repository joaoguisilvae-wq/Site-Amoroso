import { useState, useMemo } from "react";
import { eu_te_amo } from "../data/frases";
import type { EuTeAmo } from "../data/frases";
import "./Love.css";
import { FaHeartPulse } from "react-icons/fa6";

const Love = () => {
  const [currentFrase, setCurrentFrase] = useState<EuTeAmo | null>(null);
  const [filtroIdioma, setFiltroIdioma] = useState<string>("todas");
  const [mostrarTraducao, setMostrarTraducao] = useState(false);

  // Extrair lista única de idiomas
  const idiomas = useMemo(() => {
    const idiomasSet = new Set(eu_te_amo.map((f) => f.idioma));
    return ["todas", ...Array.from(idiomasSet)].sort();
  }, []);

  // Filtrar frases baseado no idioma selecionado
  const frasesFiltradas = useMemo(() => {
    if (filtroIdioma === "todas") {
      return eu_te_amo;
    }
    return eu_te_amo.filter((f) => f.idioma === filtroIdioma);
  }, [filtroIdioma]);

  // Selecionar uma frase aleatória
  const novaFrase = () => {
    if (frasesFiltradas.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * frasesFiltradas.length);
    setCurrentFrase(frasesFiltradas[indiceAleatorio]);
    setMostrarTraducao(false);
  };

  const handleCardClick = () => {
    setMostrarTraducao(true);
  };

  return (
    <div className="love-container">
      <h1 className="love-title">
        Eus te amo
        <span className="title-icon">
          <FaHeartPulse />
        </span>
      </h1>

      <div className="love-controls">
        <label htmlFor="filtro-idioma-love" className="filtro-label">
          Filtrar por idioma:
        </label>
        <select
          id="filtro-idioma-love"
          value={filtroIdioma}
          onChange={(e) => {
            setFiltroIdioma(e.target.value);
            setCurrentFrase(null);
            setMostrarTraducao(false);
          }}
          className="filtro-select"
        >
          {idiomas.map((idioma) => (
            <option key={idioma} value={idioma}>
              {idioma === "todas" ? "Todas as línguas" : idioma}
            </option>
          ))}
        </select>

        <span className="frases-count">
          {frasesFiltradas.length} frase
          {frasesFiltradas.length !== 1 ? "s" : ""} disponível
          {frasesFiltradas.length !== 1 ? "s" : ""}
        </span>
      </div>

      <button onClick={novaFrase} className="btn-nova-frase">
        Nova Frase
      </button>

      {currentFrase ? (
        <div
          className={`frase-card ${mostrarTraducao ? "traducao-visivel" : ""}`}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCardClick();
            }
          }}
          title="Clique para ver a pronúncia"
        >
          <div className="frase-idioma">{currentFrase.idioma}</div>
          <p className="frase-texto love-text">"{currentFrase.frase}"</p>
          {!mostrarTraducao && (
            <div className="frase-dica">
              <span>Clique para ver detalhes</span>
            </div>
          )}
        </div>
      ) : (
        <div className="frase-placeholder">
          <p>Clique em "Nova Frase" para começar</p>
        </div>
      )}
    </div>
  );
};

export default Love;
