import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules"; // Correta importação dos módulos
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./Carousel.css"; // Importação do arquivo CSS
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const CarouselComponent = ({ apis = [] }) => {
  const [selectedApi, setSelectedApi] = useState(null);
  const navigate = useNavigate();

  const handleApiClick = (api) => {
    setSelectedApi(api);
    // Para redirecionar em vez de abrir modal:
    // navigate(`/detalhes/${api.id}`);
  };

  return (
    <div className="carousel-container">
      {apis.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={50}
          slidesPerView={5} // Exibe 5 slides
          centeredSlides={true}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1, // Para telas menores
            },
            768: {
              slidesPerView: 3, // Para telas médias
            },
            1024: {
              slidesPerView: 5, // Para telas maiores
            },
          }}
        >
          {apis.map((api) => (
            <SwiperSlide key={api.id} className="swiper-slide">
              <div
                onClick={() => handleApiClick(api)}
                className="carousel-item"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={api.imageUrl}
                  alt={api.name}
                  className="carousel-image"
                />
                <p>{api.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>APIs ainda não disponíveis</p>
      )}

      {selectedApi && (
        <Modal api={selectedApi} onClose={() => setSelectedApi(null)} />
      )}
    </div>
  );
};

export default CarouselComponent; // Exportação padrão
