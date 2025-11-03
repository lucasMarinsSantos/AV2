import React from "react";
import { theme } from "../styles/theme";

function Header({ currentPage, setIsLoggedIn }) {
  const pageTitle = {
    aeronaves: "Gestão de aeronaves",
    pecas: "Gestão de peças",
    etapas: "Gestão de etapas",
    testes: "Gestão de testes",
    funcionarios: "Gestão de funcionários",
    relatorios: "Relatórios",
    estatisticas: "Estatísticas"
  };

  return (
    <header style={{
      background: theme.gradients.header,
      borderBottom: `2px solid ${theme.colors.accent}`,
      padding: "0 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "70px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: theme.shadows.md
    }}>
      <div style={{
        fontSize: "22px",
        fontWeight: "900",
        letterSpacing: "-1px",
        color: "#fff"
      }}>
        AERO
      </div>

      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "13px",
        fontWeight: "500",
        color: "rgba(255,255,255,0.85)",
        letterSpacing: "0.5px"
      }}>
        {pageTitle[currentPage] || "Dashboard"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "500",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            background: theme.colors.accentLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "700",
            color: "#fff"
          }}>
            A
          </div>
          <span>admin@aero.com</span>
        </div>

        <button onClick={() => { if (window.confirm("Desconectar?")) setIsLoggedIn(false); }} style={{
          background: "rgba(255,255,255,0.2)",
          color: "#fff",
          padding: "8px 16px",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
          transition: theme.transition
        }} onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.3)"; }} onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.2)"; }}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
