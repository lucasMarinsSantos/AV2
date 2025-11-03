import React from "react";
import { theme } from "../styles/theme";

function Modal({ isOpen, title, children, onClose, size = "medium" }) {
  if (!isOpen) return null;

  const sizes = {
    small: { width: "420px", maxHeight: "70vh" },
    medium: { width: "580px", maxHeight: "80vh" },
    large: { width: "920px", maxHeight: "90vh" }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div style={{
        background: theme.colors.bg,
        borderRadius: "12px",
        boxShadow: theme.shadows.xl,
        border: `1px solid ${theme.colors.border}`,
        ...sizes[size],
        maxHeight: sizes[size].maxHeight,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        animation: "slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      }} onClick={e => e.stopPropagation()}>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: `1px solid ${theme.colors.border}`,
          background: theme.colors.bg,
          zIndex: 10,
          position: "sticky",
          top: 0
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "700",
            color: theme.colors.text,
            letterSpacing: "-0.3px"
          }}>
            {title}
          </h2>
          <button onClick={onClose} style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: theme.colors.textLight,
            padding: 0,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: theme.transition,
            borderRadius: "4px"
          }} onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
            e.currentTarget.style.color = theme.colors.accent;
          }} onMouseLeave={e => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = theme.colors.textLight;
          }}>
            ✕
          </button>
        </div>

        <div style={{
          padding: "24px",
          overflowY: "auto",
          flex: 1
        }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { 
            transform: translateY(20px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}

export default Modal;
