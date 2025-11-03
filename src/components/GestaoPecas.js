import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function GestaoPecas() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ tipo: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPeca, setSelectedPeca] = useState(null);
  const [pecas, setPecas] = useState([
    { Nome: "Motor Turbohélice PT6A", Fornecedor: "Pratt Whitney Canada", Tipo: "IMPORTADA", Status: "PRONTA", Atualização: "25/02/2025", Registro: "01/02/2025" },
    { Nome: "Turbina GE CF34", Fornecedor: "General Electric", Tipo: "IMPORTADA", Status: "PRONTA", Atualização: "26/02/2025", Registro: "02/02/2025" },
    { Nome: "Compressor Axial", Fornecedor: "Rolls Royce", Tipo: "IMPORTADA", Status: "MANUTENÇÃO", Atualização: "24/02/2025", Registro: "03/02/2025" },
    { Nome: "Válvula de Controle", Fornecedor: "EMBRAER", Tipo: "NACIONAL", Status: "PRONTA", Atualização: "27/02/2025", Registro: "05/02/2025" },
    { Nome: "Cilindro Hidráulico", Fornecedor: "EATON", Tipo: "IMPORTADA", Status: "INDISPONÍVEL", Atualização: "20/02/2025", Registro: "07/02/2025" },
    { Nome: "Sensor de Temperatura", Fornecedor: "Honeywell", Tipo: "IMPORTADA", Status: "PRONTA", Atualização: "28/02/2025", Registro: "08/02/2025" },
    { Nome: "Câmara de Combustão", Fornecedor: "INFRAERO", Tipo: "NACIONAL", Status: "MANUTENÇÃO", Atualização: "23/02/2025", Registro: "10/02/2025" },
    { Nome: "Módulo de Ignição", Fornecedor: "Airbus", Tipo: "IMPORTADA", Status: "PRONTA", Atualização: "29/02/2025", Registro: "12/02/2025" },
    { Nome: "Filtro de Ar de Alta Performance", Fornecedor: "Parker", Tipo: "IMPORTADA", Status: "PRONTA", Atualização: "27/02/2025", Registro: "15/02/2025" },
    { Nome: "Correia de Transmissão", Fornecedor: "COBREQ", Tipo: "NACIONAL", Status: "PRONTA", Atualização: "26/02/2025", Registro: "18/02/2025" },
  ]);

  let filtradas = pecas.filter(p =>
    Object.values(p).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.tipo) filtradas = filtradas.filter(p => p.Tipo === filtros.tipo);
  if (filtros.status) filtradas = filtradas.filter(p => p.Status === filtros.status);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formFields = [
    { name: "nome", label: "Nome", type: "text", required: true },
    { name: "fornecedor", label: "Fornecedor", type: "text", required: true },
    { name: "tipo", label: "Tipo", type: "select", options: ["IMPORTADA", "NACIONAL"], required: true },
    { name: "status", label: "Status", type: "select", options: ["PRONTA", "MANUTENÇÃO", "INDISPONÍVEL"], required: true }
  ];

  const handleRowClick = (row) => {
    setSelectedPeca(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setPecas(pecas.map(p => p.Nome === selectedPeca.Nome ? updatedData : p));
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar peça ou fornecedor"
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

      <Modal isOpen={showFilter} title="Filtrar Peças" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Tipo</label>
            <select value={filtros.tipo} onChange={e => setFiltros({ ...filtros, tipo: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="IMPORTADA">Importada</option>
              <option value="NACIONAL">Nacional</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Status</label>
            <select value={filtros.status} onChange={e => setFiltros({ ...filtros, status: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="PRONTA">Pronta</option>
              <option value="MANUTENÇÃO">Manutenção</option>
              <option value="INDISPONÍVEL">Indisponível</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ tipo: "", status: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Editar Peça - ${selectedPeca?.Nome}`}
        data={selectedPeca}
        fields={Object.keys(selectedPeca || {})}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
      />

      <Modal isOpen={showAddModal} title="Adicionar Nova Peça" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={formFields} onSubmit={data => { setPecas([...pecas, { Nome: data.nome, Fornecedor: data.fornecedor, Tipo: data.tipo, Status: data.status, Atualização: new Date().toLocaleDateString("pt-BR"), Registro: new Date().toLocaleDateString("pt-BR") }]); setShowAddModal(false); }} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default GestaoPecas;
