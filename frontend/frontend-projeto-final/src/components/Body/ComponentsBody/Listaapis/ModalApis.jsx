import React, { useEffect } from "react";
import "./ModalApis.css";

export default function Modal({ api, Fechar }) {
  if (!api) return null;

  useEffect(() => {
    const teclas = (e) => { if (e.key === "Escape") { Fechar(); } };

    window.addEventListener("keydown", teclas);

    return () => { window.removeEventListener("keydown", teclas); };

  }, [Fechar]);

  return (
    <div id="modal-apis" onClick={Fechar}>
      <div id="modal-apis-conteudo" onClick={e => { e.stopPropagation(); }}>
        <div id="modal-logo-fechar"><a href={api.link} target="_blank"><img src={api.imageUrl} /></a><span id="fechar" onClick={Fechar}>&times;</span></div>
        <p><span className="textoDestaque">Nome: </span>{api.nome}</p>
        <p><span className="textoDestaque">Descricao: <br /></span>{api.descricao} Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eum consequatur perferendis nemo repudiandae nesciunt quae, voluptates distinctio, magnam eligendi asperiores nisi. Velit voluptates dolorem obcaecati quae veniam accusamus unde.</p>
        <p><span className="textoDestaque">Método: </span>{api.metodos}</p>
        <p><span className="textoDestaque">Link: </span><a href={api.link} target="_blank">{api.link}</a></p>
      </div>
    </div>
  );
}
