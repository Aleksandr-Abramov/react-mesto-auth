import React from "react";
import totoltipAccesslt from "../images/svg/toltipAccess.svg"
import toltipFailure from "../images/svg/toltipFailure.svg"

function InfoTooltip({registerPage, isOpen, closePopup}) {
    let sigin = ""   
    if (registerPage === "sign-up") {
         sigin = true;
    } else if (registerPage === "sigin-in") {
        sigin = false;
    }
  
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container ">
          <div className="toltip">
            <img src={sigin ? totoltipAccesslt : toltipFailure} className="toltip__img" alt="доступ открыт" width={120} height={120}/>
            <h2 className="toltip__title">{sigin ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
          </div>
          <button className="popup__close" type="button" aria-label="закрыть popup" onClick={closePopup}></button>
        </div>
      </div>
    )
}

export default InfoTooltip;