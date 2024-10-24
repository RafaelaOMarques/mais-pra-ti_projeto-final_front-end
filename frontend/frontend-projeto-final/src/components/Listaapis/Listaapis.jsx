import React, { useState } from "react";
import ModalApis from "./ModalApis";
import imgTemporaria from "../../assets/viacep.png";
import "./ListaApis.css";

export default function ListaApis({ apis = [] }) {
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
        {apis.map((api) => (
          <div
            key={api.id}
            className="apis"
            onClick={() => exibirModal(api)}
            style={{
              background: `no-repeat url(${api.imageUrl})`,
              backgroundColor: `${api.cor}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>
      {apiSelec && <ModalApis api={apiSelec} Fechar={fecharModal} />}
    </div>
  );
}
