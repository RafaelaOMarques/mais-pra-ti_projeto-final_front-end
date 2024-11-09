import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Perfil from "../Perfil/Perfil";
import MinhasApis from "./MinhasApis/MinhasApis";
import Termos from "./Termos/Termos";
import "./Gerenciar.css";

export default function Gerenciar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("autenticado");

    const validarJWT = (token) => {
      if (!token) return false;
      try {
        const partes = token.split(".");
        if (partes.length !== 3) return false;
        const payload = JSON.parse(atob(partes[1]));
        const agora = Math.floor(Date.now() / 1000);
        return payload.exp > agora;
      } catch (error) {
        return false;
      }
    };

    if (!validarJWT(token)) {
      navigate("/Acesso");
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>;
  }

  const renderComponent = () => {
    switch (location.pathname) {
      case "/Gerenciar/Perfil": return <Perfil />;
      case "/Gerenciar/Termos": return <Termos />;
      case "/Gerenciar/MinhasApis": return <MinhasApis />;
      default: navigate('/');
    }
  };

  return (
    <div className="minha-api-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate("/Gerenciar/Perfil")}>Perfil</li>
          <li onClick={() => navigate("/Gerenciar/MinhasApis")}>Minhas APIs</li>
          <li onClick={() => navigate("/Gerenciar/Termos")}>Termos</li>
        </ul>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}
