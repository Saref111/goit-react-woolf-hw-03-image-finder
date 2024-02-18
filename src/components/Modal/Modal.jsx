export const Modal = ({ image, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}
