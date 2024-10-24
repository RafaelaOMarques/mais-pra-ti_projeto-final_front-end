const Modal = ({ api, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{api.name}</h2>
        <p>{api.description}</p>
        {/* Exibir outras propriedades da API aqui */}
      </div>
    </div>
  );
};

export default Modal;
