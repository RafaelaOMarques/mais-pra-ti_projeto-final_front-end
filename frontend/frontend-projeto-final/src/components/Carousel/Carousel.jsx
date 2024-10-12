import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "../Modal/Modal"; // Certifique-se de que o Modal esteja implementado corretamente
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Estilos para o Carousel

const Carousel = ({ apis = [] }) => {
  const [selectedApi, setSelectedApi] = useState(null);

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const settings = {
    infinite: true,
    centerMode: true, // Permite o slide central estar no meio
    slidesToShow: 4, // Número de slides completos visíveis
    slidesToScroll: 1,
    speed: 500,
    arrows: true, // Ativa as setas laterais
    dots: true, // Ativa as bolinhas de navegação
    centerPadding: "60px", // Para mostrar metade dos slides laterais
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
    nextArrow: <CustomNextArrow />, // Define as setas personalizadas
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Mais populares</h2>
      {apis.length > 0 ? (
        <Slider {...settings}>
          {apis.map((api) => (
            <div
              key={api.id}
              onClick={() => handleApiClick(api)}
              className="carousel-item"
            >
              <img
                src={api.imageUrl}
                alt={api.name}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>APIs ainda não disponíveis</p>
      )}

      {selectedApi && (
        <Modal api={selectedApi} onClose={() => setSelectedApi(null)} />
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
