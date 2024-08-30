import { useContext } from "react";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import "./Header.css";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header className="header-container">
      <div className="logo">
        <img
          src="https://raw.githubusercontent.com/adarshaacharya/ApiHub/main/assets/logo.png"
          alt="Logo"
        />
        <span>API HUB BRASIL</span>
      </div>
      <div>
        <div className="theme-login-container">
          <button className="theme-switcher" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="login-button">
            <FaUserCircle style={{ marginRight: "5px" }} />
            Entrar
          </button>
        </div>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="O que você procura?"
          />
          <button className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 105.29 14.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
