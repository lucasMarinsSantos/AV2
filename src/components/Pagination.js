import React from "react";
import { theme } from "../styles/theme";

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, fontSize: "13px" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <button style={{ padding: "6px 10px", border: `1px solid ${theme.colors.border}`, borderRadius: "4px", background: currentPage === 1 ? "#e0e0e0" : theme.colors.bg, cursor: currentPage === 1 ? "default" : "pointer", fontSize: "12px" }} disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          ←
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPageChange(p)} style={{ padding: "6px 10px", borderRadius: "4px", border: p === currentPage ? `1px solid ${theme.colors.primary}` : `1px solid ${theme.colors.border}`, background: p === currentPage ? theme.colors.primary : theme.colors.bg, color: p === currentPage ? "#fff" : theme.colors.text, cursor: "pointer", fontSize: "12px", fontWeight: p === currentPage ? "600" : "400" }}>
            {p}
          </button>
        ))}
        {totalPages > 5 && <span style={{ padding: "6px 10px" }}>...</span>}
        <button style={{ padding: "6px 10px", border: `1px solid ${theme.colors.border}`, borderRadius: "4px", background: currentPage === totalPages ? "#e0e0e0" : theme.colors.bg, cursor: currentPage === totalPages ? "default" : "pointer", fontSize: "12px" }} disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
          →
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>Mostrar</span>
        <select value={itemsPerPage} onChange={e => onItemsPerPageChange(Number(e.target.value))} style={{ padding: "4px 8px", borderRadius: "4px", border: `1px solid ${theme.colors.border}`, fontSize: "12px", cursor: "pointer" }}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
