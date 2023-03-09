import React from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import "./Header.css";
function Header({ onSubmit }) {
  return (
    <div className="header">
      <button onClick={onSubmit}>
        Random <AiOutlineTransaction />
      </button>
    </div>
  );
}

export default Header;
