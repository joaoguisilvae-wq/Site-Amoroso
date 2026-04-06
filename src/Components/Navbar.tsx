import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdPalette } from "react-icons/md";

import "./Navbar.css";

// Lista de temas disponíveis (inspirado na Calculadora React)
const THEMES = [
  { dark: "pink-dark", light: "pink-light", name: "Rosa" },
  { dark: "matrix-dark", light: "matrix-light", name: "Matrix" },
  { dark: "minimal-dark", light: "minimal-light", name: "Minimal" },
] as const;

type ThemeKey =
  | (typeof THEMES)[number]["dark"]
  | (typeof THEMES)[number]["light"];

const DEFAULT_THEME: ThemeKey = "pink-dark";

const Navbar = () => {
  const [theme, setTheme] = useState<ThemeKey>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme &&
      THEMES.some((t) => t.dark === savedTheme || t.light === savedTheme)
    ) {
      return savedTheme as ThemeKey;
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre dark/light do tema atual
  const toggleLightDark = () => {
    const currentThemeIndex = THEMES.findIndex(
      (t) => t.dark === theme || t.light === theme,
    );
    if (currentThemeIndex === -1) return;

    const currentTheme = THEMES[currentThemeIndex];
    const isDark = theme === currentTheme.dark;
    setTheme(isDark ? currentTheme.light : currentTheme.dark);
  };

  // Avança para o próximo tema (mantendo dark/light)
  const nextTheme = () => {
    const currentThemeIndex = THEMES.findIndex(
      (t) => t.dark === theme || t.light === theme,
    );
    const isDark = theme.endsWith("-dark");
    const nextIndex = (currentThemeIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setTheme(isDark ? nextTheme.dark : nextTheme.light);
  };

  // Descobre o nome e estado do tema atual
  const currentThemeIndex = THEMES.findIndex(
    (t) => t.dark === theme || t.light === theme,
  );
  const currentThemeName =
    currentThemeIndex !== -1 ? THEMES[currentThemeIndex].name : "";
  const isDark = theme.endsWith("-dark");

  return (
    <div className="Navbar">
      <Link to="/amor" className="title nav-title">
        Te amo mil milhões
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/fotos">Fotos</Link>
      </nav>
      <div className="flex">
        {/* Botão para mudar o tema (clica para próximo tema) */}
        <button
          onClick={nextTheme}
          className="theme-toggle"
          aria-label={`Mudar tema (atual: ${currentThemeName})`}
          title={`Mudar tema (atual: ${currentThemeName}) - Clique para próximo`}
        >
          <MdPalette size={20} />
          <span className="theme-name">{currentThemeName}</span>
        </button>

        {/* Botão para alternar dark/light */}
        <button
          onClick={toggleLightDark}
          className="theme-toggle"
          aria-label={`Alternar para tema ${isDark ? "claro" : "escuro"}`}
          title={`Alternar para tema ${isDark ? "claro" : "escuro"}`}
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
