import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import "./Navbar.css";
const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as "light" | "dark") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div>
      <Link to="/amor" className="title nav-title">
        Te amo mil milhões
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/fotos">Fotos</Link>
      </nav>
      <div className="flex">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
          title={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
