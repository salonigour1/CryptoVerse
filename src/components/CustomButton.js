import React from "react";
import "./style.css";
function CustomButton({ day, children, onClick, selected }) {
  console.log(day, onClick, selected);
  return (
    <span onClick={onClick} className={`customBtn ${selected ? "active" : ""}`}>
      {children}
    </span>
  );
}

export default CustomButton;
