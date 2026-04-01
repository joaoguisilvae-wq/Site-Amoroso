import { useState, useMemo } from "react";
import { frases_bonitas } from "../data/frases";
import type { FraseBonita } from "../data/frases";
import "./Frases.css";

const Frases = () => {
  const [currentFrase, setCurrentFrase] = useState<FraseBonita | null>(null);
  const [filtroIdioma, setFiltroIdioma] = useState<string>("todas");
  const [mostrarTraducao, setMostrarTraducao] = useState(false);

  // Extrair lista única de idiomas
  const idiomas = useMemo(() => {
    const idiomasSet = new Set(frases_bonitas.map((f) => f.idioma));
    return ["todas", ...Array.from(idiomasSet)].sort();
  }, []);

  // Filtrar frases baseado no idioma selecionado
  const frasesFiltradas = useMemo(() => {
    if (filtroIdioma === "todas") {
      return frases_bonitas;
    }
    return frases_bonitas.filter((f) => f.idioma === filtroIdioma);
  }, [filtroIdioma]);

  // Selecionar uma frase aleatória
  const novaFrase = () => {
    if (frasesFiltradas.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * frasesFiltradas.length);
    setCurrentFrase(frasesFiltradas[indiceAleatorio]);
    setMostrarTraducao(false);
  };

  // Obter todas as traduções disponíveis para uma frase
  const getTraducoes = (frase: FraseBonita) => {
    const traducoes: { label: string; texto: string }[] = [];
    const idiomaLower = frase.idioma.toLowerCase();

    // Define quais traduções mostrar baseado no idioma original
    if (
      idiomaLower.includes("português") ||
      idiomaLower.includes("portugues")
    ) {
      if (frase.traducao_en) {
        traducoes.push({ label: "English", texto: frase.traducao_en });
      }
      if (frase.traducao_es) {
        traducoes.push({ label: "Español", texto: frase.traducao_es });
      }
    } else if (
      idiomaLower.includes("english") ||
      idiomaLower.includes("inglês") ||
      idiomaLower.includes("ingles")
    ) {
      if (frase.traducao_pt) {
        traducoes.push({ label: "Português", texto: frase.traducao_pt });
      }
      if (frase.traducao_es) {
        traducoes.push({ label: "Español", texto: frase.traducao_es });
      }
    } else if (
      idiomaLower.includes("español") ||
      idiomaLower.includes("espanhol")
    ) {
      if (frase.traducao_pt) {
        traducoes.push({ label: "Português", texto: frase.traducao_pt });
      }
      if (frase.traducao_en) {
        traducoes.push({ label: "English", texto: frase.traducao_en });
      }
    } else {
      // Para outros idiomas, mostra todas as traduções disponíveis
      if (frase.traducao_pt) {
        traducoes.push({ label: "Português", texto: frase.traducao_pt });
      }
      if (frase.traducao_en) {
        traducoes.push({ label: "English", texto: frase.traducao_en });
      }
      if (frase.traducao_es) {
        traducoes.push({ label: "Español", texto: frase.traducao_es });
      }
    }

    return traducoes;
  };

  const handleCardClick = () => {
    setMostrarTraducao(true);
  };

  return (
    <div className="frases-container">
      <h1 className="frases-title">Frases Inspiradoras</h1>

      <div className="frases-controls">
        <label htmlFor="filtro-idioma" className="filtro-label">
          Filtrar por idioma:
        </label>
        <select
          id="filtro-idioma"
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
          title="Clique para ver as traduções"
        >
          <div className="frase-idioma">{currentFrase.idioma}</div>
          <p className="frase-texto">"{currentFrase.frase}"</p>
          {mostrarTraducao &&
            (() => {
              const traducoes = getTraducoes(currentFrase);
              if (traducoes.length > 0) {
                return (
                  <div className="frase-traducoes">
                    {traducoes.map((traducao, index) => (
                      <div key={index} className="frase-traducao">
                        <span className="traducao-label">
                          {traducao.label}:
                        </span>
                        <span className="traducao-texto">{traducao.texto}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })()}
          {!mostrarTraducao && (
            <div className="frase-dica">
              <span>Clique para ver as traduções</span>
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

export default Frases;
