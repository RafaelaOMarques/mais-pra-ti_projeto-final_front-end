// Body.jsx
import React from 'react';
import Carousel from './ComponentsBody/Carousel/Carousel';
import ListaApis from './ComponentsBody/ListaApis/Listaapis';
import './Body.css'; // Importa o CSS para a classe no-scrollbar

const Body = ({ apisPopulares, apis }) => {
  return (
    <div className="body-container no-scrollbar">
      <Carousel apis={apisPopulares} />
      <ListaApis apis={apis} />
    </div>
  );
};

export default Body;
