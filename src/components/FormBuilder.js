import React, { useState } from "react";
import { theme } from "../styles/theme";

function FormBuilder({ fields, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFilled = fields.every(f => f.required ? formData[f.name] : true);
    if (!allFilled) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {fields.map(field => (
        <div key={field.name}>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: theme.colors.text,
            marginBottom: 6
          }}>
            {field.label} {field.required && <span style={{ color: theme.colors.danger }}>*</span>}
          </label>
          
          {field.type === "text" || field.type === "number" ? (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                transition: theme.transition,
                fontFamily: "inherit"
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: theme.transition
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            >
              <option value="">Selecione uma opção</option>
              {field.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                resize: "vertical",
                minHeight: "80px",
                fontFamily: "inherit",
                transition: theme.transition
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          )}
        </div>
      ))}
      
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button type="button" onClick={onCancel} style={{
          flex: 1,
          padding: "9px 14px",
          border: `1px solid ${theme.colors.border}`,
          background: "#fff",
          borderRadius: theme.radius,
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: theme.transition,
          color: theme.colors.textGray
        }} onMouseEnter={e => { e.target.style.background = theme.colors.bgLight; }} onMouseLeave={e => { e.target.style.background = "#fff"; }}>
          Cancelar
        </button>
        <button type="submit" style={{
          flex: 1,
          padding: "9px 14px",
          background: theme.colors.accent,
          color: "#fff",
          border: "none",
          borderRadius: theme.radius,
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: theme.transition
        }} onMouseEnter={e => e.target.style.background = "#2563eb"} onMouseLeave={e => e.target.style.background = theme.colors.accent}>
          Salvar
        </button>
      </div>
    </form>
  );
}

export default FormBuilder;
