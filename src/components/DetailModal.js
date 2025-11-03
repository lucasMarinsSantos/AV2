import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { theme } from "../styles/theme";

function DetailModal({ isOpen, title, data, fields, onClose, onSave, showAssociadosButton, onAssociadosClick }) {
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (data) {
      setEditData({ ...data });
    }
  }, [data, isOpen]);

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editData);
    onClose();
  };

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="medium">
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {fields && fields.map(field => (
          <div key={field}>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "700",
              color: theme.colors.text,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {field}
            </label>
            <input
              type="text"
              value={editData[field] !== undefined ? editData[field] : ""}
              onChange={e => handleChange(field, e.target.value)}
              style={{
                width: "100%",
                padding: "11px 14px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
                background: theme.colors.bg,
                transition: theme.transition
              }}
              onFocus={e => {
                e.target.style.borderColor = theme.colors.accent;
                e.target.style.boxShadow = `0 0 0 3px rgba(59, 130, 246, 0.1)`;
              }}
              onBlur={e => {
                e.target.style.borderColor = theme.colors.border;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${theme.colors.border}` }}>
          {showAssociadosButton && (
            <Button variant="secondary" onClick={onAssociadosClick} size="md" style={{ flex: 1 }}>
              Ver Associados
            </Button>
          )}
          <Button variant="secondary" onClick={onClose} size="md" style={{ flex: 1 }}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} size="md" style={{ flex: 1 }}>
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DetailModal;
