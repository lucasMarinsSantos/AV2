import React from "react";
import { theme } from "../styles/theme";
import Button from "./Button";

function SearchBar({ value, onChange, placeholder, onFilter, onAdd }) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      <Button variant="secondary" onClick={onFilter}>
        Filtro
      </Button>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          padding: "10px 14px",
          border: `1.5px solid ${theme.colors.border}`,
          borderRadius: theme.radius,
          fontSize: "13px",
          outline: "none",
          transition: theme.transition
        }}
        onFocus={e => e.target.style.borderColor = theme.colors.primary}
        onBlur={e => e.target.style.borderColor = theme.colors.border}
      />
      <Button onClick={onAdd}>{onAdd.label || "Adicionar"}</Button>
    </div>
  );
}

export default SearchBar;
