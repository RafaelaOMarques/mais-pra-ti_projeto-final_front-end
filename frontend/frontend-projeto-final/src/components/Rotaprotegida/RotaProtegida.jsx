import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RotaProtegida({ element }) {
  const token = localStorage.getItem("autenticado");
  const location = useLocation();

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
    sessionStorage.setItem("rotaDestino", "/Minhaapi"); // Salva a rota pretendida
    return <Navigate to="/Acesso" />;
  }

  return element;
}
