import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function GestaoFuncionarios() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ nivel: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [funcionarios, setFuncionarios] = useState([
    { Nome: "Lucas Gabriel Marins dos Santos", Usuário: "admin.lucas", Nível: "ADMINISTRADOR", Telefone: "4002-8922", Registro: "01/02/2025" },
    { Nome: "Maria Silva", Usuário: "m.silva", Nível: "OPERADOR", Telefone: "4003-1234", Registro: "03/02/2025" },
    { Nome: "Carlos Eduardo Ferreira", Usuário: "c.ferreira", Nível: "SUPERVISOR", Telefone: "4004-5678", Registro: "05/02/2025" },
    { Nome: "Ana Paula Costa", Usuário: "a.costa", Nível: "OPERADOR", Telefone: "4005-9012", Registro: "07/02/2025" },
    { Nome: "Roberto Gonçalves", Usuário: "r.goncalves", Nível: "ADMINISTRADOR", Telefone: "4006-3456", Registro: "08/02/2025" },
    { Nome: "Jessica Oliveira", Usuário: "j.oliveira", Nível: "OPERADOR", Telefone: "4007-7890", Registro: "10/02/2025" },
    { Nome: "Fernando Santos", Usuário: "f.santos", Nível: "SUPERVISOR", Telefone: "4008-2345", Registro: "12/02/2025" },
    { Nome: "Patricia Martins", Usuário: "p.martins", Nível: "OPERADOR", Telefone: "4009-6789", Registro: "15/02/2025" },
    { Nome: "Marcelo Alves", Usuário: "m.alves", Nível: "OPERADOR", Telefone: "4010-1234", Registro: "18/02/2025" },
    { Nome: "Beatriz Mendes", Usuário: "b.mendes", Nível: "SUPERVISOR", Telefone: "4011-5678", Registro: "20/02/2025" },
  ]);

  let filtradas = funcionarios.filter(f =>
    Object.values(f).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.nivel) filtradas = filtradas.filter(f => f.Nível === filtros.nivel);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formFields = [
    { name: "nome", label: "Nome Completo", type: "text", required: true },
    { name: "usuario", label: "Usuário", type: "text", required: true },
    { name: "nivel", label: "Nível", type: "select", options: ["ADMINISTRADOR", "OPERADOR", "SUPERVISOR"], required: true },
    { name: "telefone", label: "Telefone", type: "text", required: true }
  ];

  const handleRowClick = (row) => {
    setSelectedFuncionario(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setFuncionarios(funcionarios.map(f => f.Usuário === selectedFuncionario.Usuário ? updatedData : f));
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar funcionário..."
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

      <Modal isOpen={showFilter} title="Filtrar Funcionários" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Nível de Acesso</label>
            <select value={filtros.nivel} onChange={e => setFiltros({ ...filtros, nivel: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="OPERADOR">Operador</option>
              <option value="SUPERVISOR">Supervisor</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ nivel: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Editar Funcionário - ${selectedFuncionario?.Nome}`}
        data={selectedFuncionario}
        fields={Object.keys(selectedFuncionario || {})}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
      />

      <Modal isOpen={showAddModal} title="Adicionar Novo Funcionário" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={formFields} onSubmit={data => { setFuncionarios([...funcionarios, { Nome: data.nome, Usuário: data.usuario, Nível: data.nivel, Telefone: data.telefone, Registro: new Date().toLocaleDateString("pt-BR") }]); setShowAddModal(false); }} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default GestaoFuncionarios;
