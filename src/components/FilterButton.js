import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { theme } from "../styles/theme";

function FilterButton({ onApplyFilter }) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    status: "",
    tipo: ""
  });

  const handleFilterChange = (field, value) => {
    setFilterValues(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(filterValues);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setFilterValues({ status: "", tipo: "" });
    onApplyFilter({ status: "", tipo: "" });
    setShowFilter(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowFilter(true)} size="md">
        Filtro
      </Button>

      <Modal isOpen={showFilter} title="Filtrar Resultados" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: theme.colors.text,
              marginBottom: 6
            }}>
              Status
            </label>
            <select
              value={filterValues.status}
              onChange={e => handleFilterChange("status", e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            >
              <option value="">Todos</option>
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: theme.colors.text,
              marginBottom: 6
            }}>
              Tipo
            </label>
            <select
              value={filterValues.tipo}
              onChange={e => handleFilterChange("tipo", e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            >
              <option value="">Todos</option>
              <option value="TIPO_A">Tipo A</option>
              <option value="TIPO_B">Tipo B</option>
              <option value="TIPO_C">Tipo C</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={handleResetFilter} size="md">
              Limpar
            </Button>
            <Button variant="primary" onClick={handleApplyFilter} size="md">
              Aplicar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FilterButton;
