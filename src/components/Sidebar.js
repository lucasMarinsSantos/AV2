import React from "react";
import { theme } from "../styles/theme";

function Sidebar({ setCurrentPage, currentPage }) {
  const menuItems = [
    { key: "aeronaves", label: "Aeronaves" },
    { key: "pecas", label: "Peças" },
    { key: "etapas", label: "Etapas" },
    { key: "testes", label: "Testes" },
    { key: "funcionarios", label: "Funcionários" },
    { key: "relatorios", label: "Relatórios" },
    { key: "estatisticas", label: "Estatísticas" }
  ];

  return (
    <aside style={{
      width: "240px",
      background: theme.gradients.sidebar,
      borderRight: "none",
      padding: "16px 8px",
      height: "calc(100vh - 70px)",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      boxShadow: theme.shadows.md
    }}>
      {menuItems.map(item => (
        <button
          key={item.key}
          onClick={() => setCurrentPage(item.key)}
          style={{
            background: currentPage === item.key ? "rgba(255,255,255,0.2)" : "transparent",
            border: "none",
            color: currentPage === item.key ? "#fff" : "rgba(255,255,255,0.7)",
            padding: "11px 14px",
            borderRadius: "6px",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: currentPage === item.key ? "600" : "500",
            transition: theme.transition
          }}
          onMouseEnter={e => {
            if (currentPage !== item.key) {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.color = "#fff";
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== item.key) {
              e.target.style.background = "transparent";
              e.target.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
