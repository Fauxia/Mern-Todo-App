import React, { useEffect } from "react";
import "./Model.css"; // Optional: Add your custom styles
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isId, onClose, title, children }) => {
  useEffect(() => {
    if (isId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = " auto";
    }
    return () => {
      document.body.style.overflow = " auto";
    };
  }, [isId]);
  if (!isId) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <h2 className="text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="close-button hover:text-slate-600 transition-all"
          >
            <X />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
