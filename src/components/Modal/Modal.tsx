import React, { FC, useEffect, useState } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title:string,
  content:string
}

const Modal = (props:ModalProps) => {
  const { isOpen, onClose = () => {},title,content} = props;

  return (
    <div className="modal">
      {isOpen && (
        <div>
          <div className="overlay"></div>

          <div className="modal-message">
            <div className="modal-Title">
              <h4>{title}</h4>
            </div>
            <div className="modal-Content">
              <p>{content}</p>
            </div>
                <button className="btn-close" onClick={onClose}>
                  <i className="fas fa-times"></i>
                </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
