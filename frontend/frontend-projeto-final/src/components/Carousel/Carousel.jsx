import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "../Modal/Modal"; // Certifique-se de que o Modal esteja implementado corretamente
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Estilos para o Carousel

const CarouselComponent = ({ apis = [] }) => {
  const [selectedApi, setSelectedApi] = useState(null);

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const settings = {
    infinite: true,
    centerMode: true, // Permite o slide central estar no meio
    slidesToShow: 3, // Número de slides completos visíveis
    slidesToScroll: 1,
    speed: 500,
    arrows: true, // Ativa as setas laterais
    dots: true, // Ativa as bolinhas de navegação
    centerPadding: "40px", // Para mostrar metade dos slides laterais
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
              <p>{api.name}</p>
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

// Componentes para customizar as setas
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: 0, zIndex: 2 }}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: 0, zIndex: 2 }}
      onClick={onClick}
    />
  );
};

export default CarouselComponent;
