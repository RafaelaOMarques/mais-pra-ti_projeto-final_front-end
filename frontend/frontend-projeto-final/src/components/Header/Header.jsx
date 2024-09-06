import { useContext } from "react";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import "./Header.css";
import Logo from "../../assets/globe_1.svg";
import SearchIcon from "../../assets/search_icon.svg";
import LoginIcon from "../../assets/login_icon.svg";
// import DarkThemeIcon from "../../assets/dark_theme_icon.svg";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header className="header-container">
      <div className="logo">
        <img
          src={Logo}
          alt="Logo"
        />
        <span>API HUB BRASIL</span>
      </div>
      <div className="theme-login-container">
        <div className="search-container">
          <input
            type="text"
          />
          <img src={SearchIcon} alt="search-icon"/>
        </div>
        <button className="login-button">
          <img src={LoginIcon} alt="login icon" />
          <span>Entrar</span>
        </button>
        <button className="theme-switcher" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

    </header>
  );
};

export default Header;
