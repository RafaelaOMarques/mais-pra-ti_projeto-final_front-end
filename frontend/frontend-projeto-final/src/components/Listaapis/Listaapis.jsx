import React, { useState } from "react";
import ModalApis from "./ModalApis";
import imgTemporaria from "../../assets/viacep.png"
import "./ListaApis.css";

export default function ListaApis() {
 const [apiSelec, defApiSelec] = useState(null);

 const produtos = Array.from({ length: 12 }, (_, i) => ({
  id: i, nome: `Produto ${i}`,
  descricao: `Descrição ${i}`,
  metodos: i % 2 === 0 ? "GET" : "POST",
  link: `https://www.api.com.br`,
  imageUrl: imgTemporaria,
  cor:'#0B3'
 }));

 const exibirModal = (api) => { defApiSelec(api); };
 const fecharModal = () => { defApiSelec(null); };

 return (
  <div className="lista-apis">
   <div className="colunas-apis">
    {produtos.map((produto) => (
     <div key={produto.id} className="apis" onClick={() => exibirModal(produto)} style={{background: `no-repeat url(${produto.imageUrl})`, backgroundColor:`${produto.cor}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
     </div>
    ))}
   </div>
   {apiSelec && <ModalApis api={apiSelec} Fechar={fecharModal} />}
  </div>
 );
}
