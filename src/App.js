import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import GestaoAeronaves from "./components/GestaoAeronaves";
import GestaoPecas from "./components/GestaoPecas";
import GestaoEtapas from "./components/GestaoEtapas";
import GestaoTestes from "./components/GestaoTestes";
import GestaoFuncionarios from "./components/GestaoFuncionarios";
import Relatorios from "./components/Relatorios";
import Estatisticas from "./components/Estatisticas";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("estatisticas");

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "aeronaves":
        return <GestaoAeronaves />;
      case "pecas":
        return <GestaoPecas />;
      case "etapas":
        return <GestaoEtapas />;
      case "testes":
        return <GestaoTestes />;
      case "funcionarios":
        return <GestaoFuncionarios />;
      case "relatorios":
        return <Relatorios />;
      case "estatisticas":
        return <Estatisticas />;
      default:
        return <Estatisticas />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header currentPage={currentPage} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <main style={{ flex: 1, overflow: "auto", background: "#f0f2f5" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
