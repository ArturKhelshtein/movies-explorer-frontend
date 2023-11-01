import "./PopupSuccesedPatch.css";

import Button from "../Button/Button";

function PopupSuccesedPatch({ name, title, isOpen, buttonType, buttonName, onClose, }) {
  return (
    <>
      <div className="popup-overlay" />
      <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={name}>
        <div className="popup__container">
          <h3 className="popup__heading">{title}</h3>
          <Button type={buttonType} buttonName={buttonName} onClick={onClose} />
        </div>
      </div>
    </>
  );
}
export default PopupSuccesedPatch;
