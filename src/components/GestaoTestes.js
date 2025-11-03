import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function GestaoTestes() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ tipo: "", resultado: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTeste, setSelectedTeste] = useState(null);
  const [testes, setTestes] = useState([
    { Código: "E190", Aeronave: "Embraer E-190 Regional", Tipo: "ELETRICO", Resultado: "APROVADO", Responsável: "Lucas", Data: "01/02/2025" },
    { Código: "E195", Aeronave: "Embraer E-195 Regional", Tipo: "MECANICO", Resultado: "APROVADO", Responsável: "Carlos", Data: "12/02/2025" },
    { Código: "B737", Aeronave: "Boeing 737-800", Tipo: "ESTRUTURAL", Resultado: "APROVADO", Responsável: "Maria", Data: "03/02/2025" },
    { Código: "A320", Aeronave: "Airbus A320", Tipo: "ELETRICO", Resultado: "REPROVADO", Responsável: "Fernando", Data: "05/02/2025" },
    { Código: "F16", Aeronave: "F-16 Fighting Falcon", Tipo: "MECANICO", Resultado: "PENDENTE", Responsável: "Roberto", Data: "08/02/2025" },
    { Código: "GRIPEN", Aeronave: "Gripen JF-17", Tipo: "ESTRUTURAL", Resultado: "APROVADO", Responsável: "Ana", Data: "10/02/2025" },
    { Código: "CITATION", Aeronave: "Cessna Citation X", Tipo: "ELETRICO", Resultado: "APROVADO", Responsável: "Jessica", Data: "12/02/2025" },
    { Código: "GULFSTREAM", Aeronave: "Gulfstream G650ER", Tipo: "MECANICO", Resultado: "PENDENTE", Responsável: "Pedro", Data: "15/02/2025" },
    { Código: "ATR72", Aeronave: "ATR 72-600", Tipo: "ESTRUTURAL", Resultado: "APROVADO", Responsável: "Marcelo", Data: "18/02/2025" },
    { Código: "Q400", Aeronave: "Bombardier Q400", Tipo: "ELETRICO", Resultado: "REPROVADO", Responsável: "Patricia", Data: "20/02/2025" },
  ]);

  const formFields = [
    { name: "codigo", label: "Código", type: "text", required: true },
    { name: "aeronave", label: "Aeronave", type: "text", required: true },
    { name: "tipo", label: "Tipo", type: "select", options: ["ELETRICO", "MECANICO", "ESTRUTURAL"], required: true },
    { name: "resultado", label: "Resultado", type: "select", options: ["APROVADO", "REPROVADO", "PENDENTE"], required: true },
    { name: "responsavel", label: "Responsável", type: "text", required: true }
  ];

  let filtradas = testes.filter(t =>
    Object.values(t).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.tipo) filtradas = filtradas.filter(t => t.Tipo === filtros.tipo);
  if (filtros.resultado) filtradas = filtradas.filter(t => t.Resultado === filtros.resultado);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (row) => {
    setSelectedTeste(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setTestes(testes.map(t => t.Código === selectedTeste.Código ? updatedData : t));
  };

  const handleAddTeste = (data) => {
    const novoTeste = {
      Código: data.codigo,
      Aeronave: data.aeronave,
      Tipo: data.tipo,
      Resultado: data.resultado,
      Responsável: data.responsavel,
      Data: new Date().toLocaleDateString("pt-BR")
    };
    setTestes([...testes, novoTeste]);
    setShowAddModal(false);
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar teste..."
            value={busca}
            onChange={e => { setBusca(e.target.value); setCurrentPage(1); }}
            style={{
              flex: 1,
              padding: "9px 12px",
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius,
              fontSize: "13px",
              outline: "none"
            }}
            onFocus={e => e.target.style.borderColor = theme.colors.accent}
            onBlur={e => e.target.style.borderColor = theme.colors.border}
          />
          <Button variant="primary" onClick={() => setShowAddModal(true)}>Adicionar</Button>
        </div>

        <Table columns={paginatedData[0] ? Object.keys(paginatedData[0]) : []} data={paginatedData} onRowClick={handleRowClick} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} />
      </div>

      <Modal isOpen={showFilter} title="Filtrar Testes" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Tipo de Teste</label>
            <select value={filtros.tipo} onChange={e => setFiltros({ ...filtros, tipo: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="ELETRICO">Elétrico</option>
              <option value="MECANICO">Mecânico</option>
              <option value="ESTRUTURAL">Estrutural</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Resultado</label>
            <select value={filtros.resultado} onChange={e => setFiltros({ ...filtros, resultado: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="APROVADO">Aprovado</option>
              <option value="REPROVADO">Reprovado</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ tipo: "", resultado: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Editar Teste - ${selectedTeste?.Código}`}
        data={selectedTeste}
        fields={Object.keys(selectedTeste || {})}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
      />

      <Modal isOpen={showAddModal} title="Adicionar Novo Teste" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={formFields} onSubmit={handleAddTeste} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default GestaoTestes;
