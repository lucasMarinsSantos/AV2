import React from "react";
import { theme } from "../styles/theme";

function Button({ children, variant = "primary", size = "md", onClick, disabled, ...props }) {
  const variants = {
    primary: {
      bg: theme.colors.accent,
      color: "#fff",
      hover: "#2563eb",
      shadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
    },
    secondary: {
      bg: "#f3f4f6",
      color: theme.colors.textGray,
      border: `1px solid ${theme.colors.border}`,
      hover: "#e5e7eb",
      shadow: "none"
    }
  };

  const sizes = {
    sm: { padding: "7px 14px", fontSize: "12px", fontWeight: "600" },
    md: { padding: "10px 18px", fontSize: "13px", fontWeight: "600" },
    lg: { padding: "12px 24px", fontSize: "14px", fontWeight: "600" }
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: style.bg,
        color: style.color,
        border: style.border || "none",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        transition: theme.transition,
        opacity: disabled ? 0.5 : 1,
        boxShadow: style.shadow,
        ...sizes[size]
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.background = style.hover;
          e.currentTarget.style.transform = "translateY(-1px)";
          if (style.shadow !== "none") {
            e.currentTarget.style.boxShadow = `0 4px 12px rgba(59, 130, 246, 0.4)`;
          }
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.background = style.bg;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = style.shadow;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
