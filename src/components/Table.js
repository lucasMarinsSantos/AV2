import React from "react";
import { theme } from "../styles/theme";

function Table({ columns, data, onRowClick }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: theme.radius, border: `1px solid ${theme.colors.border}`, marginBottom: 24 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead style={{ background: "#f5f5f5", borderBottom: `2px solid ${theme.colors.border}` }}>
          <tr>
            {columns.map(col => (
              <th key={col} style={{ padding: "14px", textAlign: "left", fontWeight: "600", color: theme.colors.textGray }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{
                borderBottom: `1px solid ${theme.colors.border}`,
                background: idx % 2 === 0 ? theme.colors.bg : "#fafafa",
                cursor: onRowClick ? "pointer" : "default",
                transition: theme.transition
              }}
              onClick={() => onRowClick && onRowClick(row)}
              onMouseEnter={e => onRowClick && (e.currentTarget.style.background = "#f0f2f5")}
              onMouseLeave={e => onRowClick && (e.currentTarget.style.background = idx % 2 === 0 ? theme.colors.bg : "#fafafa")}
            >
              {columns.map((col, i) => (
                <td key={i} style={{ padding: "12px 14px", color: theme.colors.text }}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
