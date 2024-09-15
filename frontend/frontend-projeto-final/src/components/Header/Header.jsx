import { useContext } from "react";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import "./Header.css";
import Logo from "../../assets/globe_1.png";
import Logo2 from "../../assets/globe_2.png";
import SearchIcon from "../../assets/search_icon.svg";
import LoginIcon from "../../assets/login_icon.svg";
// import DarkThemeIcon from "../../assets/dark_theme_icon.svg";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const Acessar = () => {
    if (localStorage.getItem('autentico') == "false") {
      window.location.href = "/Acesso";
    } else {
      localStorage.removeItem('autentico');
      window.location.href = "/";
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg header-container ${isDarkMode ? "dark-mode" : ""
        }`}
    >
      <div className="navbar-brand">
        <a className="navbar-brand logo" href="#">
          <img src={isDarkMode ? Logo2 : Logo} alt="Logo" />
          <span>API HUB BRASIL</span>
        </a>
      </div>
      <div className="theme-login-container">
        <div className="search-container">
          <input type="text" />
          <img src={SearchIcon} alt="search-icon" />
        </div>
        <button onClick={Acessar} className="login-button">
          <img src={LoginIcon} alt="login icon" />
          <span>{localStorage.getItem('autentico') == "true" ? "Sair" : "Entrar"}</span>
        </button>
        <button className="theme-switcher" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
