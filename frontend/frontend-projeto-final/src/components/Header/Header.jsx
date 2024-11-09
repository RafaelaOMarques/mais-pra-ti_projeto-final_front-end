import React, { useContext, useEffect, useState, useRef } from "react";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/globe_1.png";
import Logo2 from "../../assets/globe_2.png";
import SearchIcon from "../../assets/search_icon.svg";
import LoginIcon from "../../assets/login_icon.svg";

const Header = ({ onSearchChange }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const menuRef = useRef(null);  // Referência para o menu suspenso
  const navigate = useNavigate();

  const Acessar = () => {
    if (!localStorage.getItem("autenticado") || localStorage.getItem("autenticado").length < 50) {
      navigate("/Acesso");  // Redireciona para a página de acesso sem recarregar
    } else {
      localStorage.removeItem("autenticado");
      navigate("/");  // Redireciona para a página inicial
    }
  };

  useEffect(() => {
    const validarJWT = () => {
      const token = localStorage.getItem("autenticado");
      setTokenValido(false);

      if (token) {
        const payload = token.split('.')[1];
        const dados = JSON.parse(atob(payload));
        const agora = Math.floor(Date.now() / 1000);

        if (dados.exp < agora) {
          console.error("Token expirado");
        } else {
          setTokenValido(true);
          setUserName(dados.sub);  // Assume que o nome do usuário está no campo 'sub' do token
        }
      }
    };

    validarJWT();
  }, []); 

  const closeSearch = () => {
    setIsSearchExpanded(false);
    setSearchValue("");
    onSearchChange("");
  };

  const toggleSearch = () => {
    setIsSearchExpanded(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg header-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="navbar-brand">
        <a className="navbar-brand logo" href="/">
          <img src={isDarkMode ? Logo2 : Logo} alt="Logo" />
          <span>API HUB BRASIL</span>
        </a>
      </div>
      <div className="theme-login-container">
        <div className={`search-container ${isSearchExpanded ? "expanded" : ""}`}>
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={toggleSearch}
          />
          {!isSearchExpanded && <img src={SearchIcon} alt="search-icon" />}
          {isSearchExpanded && (
            <span className="clear-icon" onClick={closeSearch}>
              <FaTimes className={`close-icon ${isDarkMode ? "" : "dark-mode"}`} />
            </span>
          )}
        </div>
        <div className="login-button-container">
          <button onClick={tokenValido ? toggleMenu : Acessar} className="login-button">
            <img src={LoginIcon} alt="login icon" />
            <span>{tokenValido ? userName : "Entrar"}</span>
          </button>
          {tokenValido && menuVisible && (
            <div className="dropdown-menu" ref={menuRef}>
              <Link to="/Gerenciar/Perfil">Perfil</Link>
              <Link to="/Gerenciar/MinhasApis">Gerenciar</Link>
              <a href="/" onClick={Acessar}>Sair</a>
            </div>
          )}
        </div>
        <button className="theme-switcher" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
