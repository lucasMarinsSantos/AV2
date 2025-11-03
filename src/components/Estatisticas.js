import React, { useState } from "react";
import { theme } from "../styles/theme";
import Button from "./Button";
import Modal from "./Modal";

function Estatisticas() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtro, setFiltro] = useState("");

  const categorias = ["Aeronaves", "Funcionários", "Peças", "Etapas"];

  const stats = [
    {
      title: "Aeronaves",
      key: "aeronaves",
      items: [
        { label: "Total", value: "53", color: theme.colors.accent },
        { label: "Comercial", value: "42", color: "#10b981" },
        { label: "Militar", value: "11", color: "#f59e0b" },
        { label: "Capacidade Média", value: "87", color: theme.colors.accent },
        { label: "Alcance Médio", value: "6.607 km", color: theme.colors.accent }
      ]
    },
    {
      title: "Funcionários",
      key: "funcionarios",
      items: [
        { label: "Total", value: "156", color: theme.colors.accent },
        { label: "Ativos", value: "150", color: "#10b981" },
        { label: "Inativos", value: "6", color: "#f59e0b" },
        { label: "Administradores", value: "12", color: theme.colors.accent },
        { label: "Operadores", value: "144", color: theme.colors.accent }
      ]
    },
    {
      title: "Peças",
      key: "pecas",
      items: [
        { label: "Total", value: "892", color: theme.colors.accent },
        { label: "Importada", value: "654", color: "#10b981" },
        { label: "Nacional", value: "238", color: "#f59e0b" },
        { label: "Pronta", value: "745", color: theme.colors.accent },
        { label: "Manutenção", value: "147", color: theme.colors.accent }
      ]
    },
    {
      title: "Etapas",
      key: "etapas",
      items: [
        { label: "Total", value: "47", color: theme.colors.accent },
        { label: "Concluída", value: "28", color: "#10b981" },
        { label: "Em Andamento", value: "15", color: "#f59e0b" },
        { label: "Pausada", value: "4", color: theme.colors.accent }
      ]
    }
  ];

  let filtradas = stats;
  if (filtro) {
    filtradas = stats.filter(stat => stat.title === filtro);
  }
  if (busca) {
    filtradas = filtradas.filter(stat => 
      stat.title.toLowerCase().includes(busca.toLowerCase()) ||
      stat.items.some(item => 
        item.label.toLowerCase().includes(busca.toLowerCase()) ||
        item.value.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }

  return (
    <div style={{ padding: "32px", background: theme.colors.bgLight, minHeight: "100vh" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", marginBottom: 24, boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              placeholder="Pesquisar por categoria ou item"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                paddingLeft: "36px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius,
                fontSize: "13px",
                outline: "none",
                background: theme.colors.bg,
                color: theme.colors.text,
                transition: theme.transition,
                fontFamily: "inherit"
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
            {busca && (
              <button
                onClick={() => setBusca("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: theme.colors.textGray,
                  padding: "4px 8px",
                  transition: theme.transition
                }}
                onMouseEnter={e => e.currentTarget.style.color = theme.colors.accent}
                onMouseLeave={e => e.currentTarget.style.color = theme.colors.textGray}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={showFilter} title="Filtrar Estatísticas" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Categoria</label>
            <select value={filtro} onChange={e => setFiltro(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todas</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltro(""); setShowFilter(false); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      {filtradas.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {filtradas.map(card => (
            <div
              key={card.key}
              style={{
                background: theme.colors.bg,
                borderRadius: "12px",
                padding: "24px",
                boxShadow: theme.shadows.md,
                border: `1px solid ${theme.colors.border}`,
                transition: theme.transition,
                overflow: "hidden"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.shadows.lg;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = theme.shadows.md;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                fontSize: "15px",
                fontWeight: "700",
                color: theme.colors.text,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `2px solid ${theme.colors.accent}`,
                letterSpacing: "-0.3px"
              }}>
                {card.title}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {card.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 12,
                      borderBottom: `1px solid ${theme.colors.border}`,
                      transition: theme.transition
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.paddingLeft = "8px";
                      e.currentTarget.style.paddingRight = "8px";
                      e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.paddingLeft = "0";
                      e.currentTarget.style.paddingRight = "0";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span style={{
                      color: theme.colors.textGray,
                      fontWeight: "500",
                      fontSize: "13px"
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      color: item.color,
                      fontWeight: "700",
                      fontSize: "15px",
                      letterSpacing: "-0.2px"
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "48px 24px",
          color: theme.colors.textGray
        }}>
          <div style={{ fontSize: "48px", marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: "14px", fontWeight: "500" }}>Nenhum resultado encontrado</div>
          <div style={{ fontSize: "12px", color: theme.colors.textLight, marginTop: 4 }}>Tente pesquisar por outro termo</div>
        </div>
      )}
    </div>
  );
}

export default Estatisticas;
