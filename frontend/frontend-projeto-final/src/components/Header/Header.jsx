import { useContext, useEffect, useState } from "react";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext/DarkModeContext";
import "./Header.css";
import Logo from "../../assets/globe_1.png";
import Logo2 from "../../assets/globe_2.png";
import SearchIcon from "../../assets/search_icon.svg";
import LoginIcon from "../../assets/login_icon.svg";

const Header = ({ onSearchChange }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // Estado para o valor da pesquisa
  const [tokenValido, defTokenValido] = useState(false)
  
  const Acessar = () => {
    if (!localStorage.getItem("autenticado") || localStorage.getItem("autenticado").length < 50) {
      window.location.href  = "/Acesso";
    } else {
      localStorage.removeItem("autenticado");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const validarJWT = () => {
      const token = localStorage.getItem("autenticado");
      defTokenValido(false)

      if (token) {
        // Decodificando o token
        const payload = token.split('.')[1]; // Pega a parte do payload do JWT
        const dados = JSON.parse(atob(payload)); // Decodifica o payload

        const agora = Math.floor(Date.now() / 1000); // Tempo atual em segundos

        // Verifica se o token expirou
        if (dados.exp < agora) {
          console.error("Token expirado");
          // Aqui você pode redirecionar o usuário ou limpar o token
        } else {
          defTokenValido(true)
        }
      }
    };

    validarJWT(); // Chama a função de validação
  }, []); // executado apenas uma vez ao montar o componente


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
    onSearchChange(value); // Atualiza o valor da pesquisa no Layout
  };

  return (
    <nav
      className={`navbar navbar-expand-lg header-container ${isDarkMode ? "dark-mode" : ""
        }`}
    >
      <div className="navbar-brand">
        <a className="navbar-brand logo" href="/">
          <img src={isDarkMode ? Logo2 : Logo} alt="Logo" />
          <span>API HUB BRASIL</span>
        </a>
      </div>
      <div className="theme-login-container">
        <div
          className={`search-container ${isSearchExpanded ? "expanded" : ""}`}
        >
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange} // Lida com a alteração na barra de pesquisa
            onFocus={toggleSearch}
          />
          <img src={SearchIcon} alt="search-icon" />
          {isSearchExpanded && (
            <span className="clear-icon" onClick={closeSearch}>
              <FaTimes
                className={`close-icon ${isDarkMode ? "" : "dark-mode"}`}
              />
            </span>
          )}
        </div>
        <button onClick={Acessar} className="login-button">
          <img src={LoginIcon} alt="login icon" />
          <span>
            {tokenValido ? "Sair" : "Entrar"}
          </span>
        </button>
        <button className="theme-switcher" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
