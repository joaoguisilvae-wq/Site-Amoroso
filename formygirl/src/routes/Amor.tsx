import { useState, useRef, useEffect } from "react";
import Frases from "../Components/Frases";
import Love from "../Components/Love";

import "./Amor.css";

const Amor = () => {
  const [isFrases, setIsFrases] = useState(true);
  const [sliderStyle, setSliderStyle] = useState<{
    left: string;
    width: string;
  }>({ left: "0", width: "0" });
  const toggleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateSlider = () => {
      if (btnRef.current && toggleRef.current) {
        const btnRect = btnRef.current.getBoundingClientRect();
        const toggleRect = toggleRef.current.getBoundingClientRect();
        const left = btnRect.left - toggleRect.left;
        const width = btnRect.width;
        setSliderStyle({ left: `${left}px`, width: `${width}px` });
      }
    };

    // Pequeno delay para garantir que o DOM foi atualizado
    const timeout = setTimeout(updateSlider, 0);
    window.addEventListener("resize", updateSlider);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateSlider);
    };
  }, [isFrases]);

  return (
    <div className="amor-container">
      <div className="amor-toggle" ref={toggleRef}>
        <div className="amor-toggle-slider" style={sliderStyle} />
        <button
          ref={isFrases ? btnRef : null}
          onClick={() => setIsFrases(true)}
          className={`amor-toggle-btn ${isFrases ? "active" : ""}`}
        >
          Frases
        </button>
        <button
          ref={!isFrases ? btnRef : null}
          onClick={() => setIsFrases(false)}
          className={`amor-toggle-btn ${!isFrases ? "active" : ""}`}
        >
          Te amo
        </button>
      </div>
      <div className="amor-content">
        {isFrases && <Frases />}
        {!isFrases && <Love />}
      </div>
    </div>
  );
};

export default Amor;
