import React from "react";
import "../scss/Button.scss";
const Button = ({ handleClick, icon }) => {
  return (
    <div className="box">
      <button className="box__btn" onClick={handleClick}>
        {icon}
      </button>
      <div className="box__shadow"></div>
    </div>
  );
};

export default Button;
