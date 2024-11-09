import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../../../context/DarkModeContext/DarkModeContext";
//context/DarkModeContext/DarkModeContext";
import ModalApis from "./ModalApis";
import "./ListaApis.css";

export default function ListaApis({ apis = [] }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [apiSelec, defApiSelec] = useState(null);

  const exibirModal = (api) => {
    defApiSelec(api);
  };
  const fecharModal = () => {
    defApiSelec(null);
  };

  return (
    <div className="lista-apis">
      <div className="colunas-apis">
        {Array.isArray(apis) && apis.map((api) => (
          <div
            key={api.id}
            className="apis"
            onClick={() => exibirModal(api)}
            style={{
              background: `no-repeat url(${api.imageUrl})`,
              backgroundColor: `${api.cor}`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
      {apiSelec && <ModalApis api={apiSelec} Fechar={fecharModal} />}
    </div>
  );
}
