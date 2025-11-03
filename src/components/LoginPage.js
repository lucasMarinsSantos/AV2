import React, { useState } from "react";
import { theme } from "../styles/theme";

function LoginPage({ setIsLoggedIn }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario && senha) setIsLoggedIn(true);
    else alert("Preencha usuário e senha");
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: theme.gradients.login
    }}>
      <form onSubmit={handleSubmit} style={{
        background: theme.colors.bg,
        padding: "48px",
        borderRadius: "16px",
        boxShadow: theme.shadows.xl,
        minWidth: 380,
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>
        <h2 style={{
          color: theme.colors.primary,
          marginBottom: 12,
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "700",
          letterSpacing: "-0.5px"
        }}>
          Login
        </h2>
        
        <div>
          <label style={{
            fontSize: "12px",
            fontWeight: "600",
            color: theme.colors.textGray,
            marginBottom: 8,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Usuário
          </label>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: theme.radius,
              border: `1.5px solid ${theme.colors.border}`,
              fontSize: "13px",
              transition: theme.transition,
              outline: "none",
              fontFamily: "inherit",
              background: theme.colors.bgLight
            }}
            onFocus={e => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = `0 0 0 3px rgba(30, 64, 175, 0.1)`;
            }}
            onBlur={e => {
              e.target.style.borderColor = theme.colors.border;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div>
          <label style={{
            fontSize: "12px",
            fontWeight: "600",
            color: theme.colors.textGray,
            marginBottom: 8,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Senha
          </label>
          <input
            type="password"
            placeholder="••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: theme.radius,
              border: `1.5px solid ${theme.colors.border}`,
              fontSize: "13px",
              transition: theme.transition,
              outline: "none",
              fontFamily: "inherit",
              background: theme.colors.bgLight
            }}
            onFocus={e => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.boxShadow = `0 0 0 3px rgba(30, 64, 175, 0.1)`;
            }}
            onBlur={e => {
              e.target.style.borderColor = theme.colors.border;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            borderRadius: theme.radius,
            background: theme.gradients.button,
            color: "#fff",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            marginTop: 8,
            transition: theme.transition,
            boxShadow: theme.shadows.md,
            letterSpacing: "0.3px"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = theme.shadows.lg;
            e.currentTarget.style.background = theme.gradients.buttonHover;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = theme.shadows.md;
            e.currentTarget.style.background = theme.gradients.button;
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
