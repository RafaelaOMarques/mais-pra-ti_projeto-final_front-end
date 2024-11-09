import React, { useState, useContext } from "react";
import Slider from "react-slick";
import Modal from "../Listaapis/ModalApis";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Estilos para o Carousel
import { DarkModeContext } from "../../../../context/DarkModeContext/DarkModeContext";

const Carousel = ({ apis = [] }) => {
  const [selectedApi, setSelectedApi] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext);

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const settings = {
    infinite: true,
    //centerMode: true,
    slidesToShow: 4, // Número de slides completos visíveis
    slidesToScroll: 1,
    speed: 500,
    arrows: true, // Ativa as setas laterais
    dots: true, // Ativa as bolinhas de navegação
    centerPadding: "60px", // Para mostrar metade dos slides laterais
    initialSlide: Math.floor(apis.length / 2), // Define o slide do meio como inicial
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          //centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          //centerPadding: "20px",
        },
      },
    ],
    nextArrow: <CustomNextArrow />, // Define as setas personalizadas
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Mais populares</h2>
      {apis.length >= 5 ? ( // Exibe o carousel se houver 5 ou mais APIs
        <Slider {...settings} className={isDarkMode ? "dark-mode-slider" : ""}>
          {apis.map((api) => (
            <div
              key={api.id}
              onClick={() => handleApiClick(api)}
              className="carousel-item"
            >
              <img
                src={api.imageUrl}
                alt={api.nome}
                className="carousel-image"
              />
              <p>{api.nome}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>
          {apis.length === 0
            ? "APIs ainda não disponíveis"
            : "APIs ainda insuficientes"}
        </p>
      )}

      {selectedApi && (
        <Modal api={selectedApi} Fechar={() => setSelectedApi(null)} />
      )}
    </div>
  );
};

// Componente para a seta personalizada da direita
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-next-arrow`} onClick={onClick} />;
};

// Componente para a seta personalizada da esquerda
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-prev-arrow`} onClick={onClick} />;
};

export default Carousel;
