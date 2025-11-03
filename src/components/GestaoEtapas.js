import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function GestaoEtapas() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssociadosModal, setShowAssociadosModal] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState(null);
  const [etapas, setEtapas] = useState([
    { Ordem: "01", Nome: "Preparação de Componentes", Aeronave: "Embraer E-190", Associados: 3, Status: "CONCLUÍDA", Prazo: "01/02/2025" },
    { Ordem: "02", Nome: "Montagem", Aeronave: "Embraer E-190", Associados: 5, Status: "EM ANDAMENTO", Prazo: "05/02/2025" },
    { Ordem: "03", Nome: "Testes de Voo", Aeronave: "Boeing 737-800", Associados: 4, Status: "CONCLUÍDA", Prazo: "08/02/2025" },
    { Ordem: "04", Nome: "Verificação Estrutural", Aeronave: "Airbus A320", Associados: 6, Status: "EM ANDAMENTO", Prazo: "10/02/2025" },
    { Ordem: "05", Nome: "Revisão Elétrica", Aeronave: "F-16 Fighting Falcon", Associados: 2, Status: "PENDENTE", Prazo: "12/02/2025" },
    { Ordem: "06", Nome: "Inspeção Final", Aeronave: "Gripen JF-17", Associados: 5, Status: "CONCLUÍDA", Prazo: "15/02/2025" },
    { Ordem: "07", Nome: "Pinturas e Acabamentos", Aeronave: "Cessna Citation X", Associados: 3, Status: "EM ANDAMENTO", Prazo: "18/02/2025" },
    { Ordem: "08", Nome: "Controle de Qualidade", Aeronave: "Gulfstream G650ER", Associados: 4, Status: "PENDENTE", Prazo: "20/02/2025" },
    { Ordem: "09", Nome: "Embalagem e Transporte", Aeronave: "ATR 72-600", Associados: 2, Status: "CONCLUÍDA", Prazo: "22/02/2025" },
    { Ordem: "10", Nome: "Entrega ao Cliente", Aeronave: "Bombardier Q400", Associados: 3, Status: "PENDENTE", Prazo: "25/02/2025" },
  ]);

  const funcionariosSimples = ["Lucas Gabriel", "Maria Silva", "João Santos", "Ana Costa", "Pedro Oliveira", "Fernando Rodrigues", "Jessica Mendes", "Carlos Santos"];

  let filtradas = etapas.filter(e =>
    Object.values(e).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.status) filtradas = filtradas.filter(e => e.Status === filtros.status);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (row) => {
    setSelectedEtapa(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setEtapas(etapas.map(e => e.Ordem === selectedEtapa.Ordem ? updatedData : e));
    setShowDetailModal(false);
  };

  const handleShowAssociados = () => {
    setShowDetailModal(false);
    setShowAssociadosModal(true);
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar etapa..."
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

      <Modal isOpen={showFilter} title="Filtrar Etapas" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Status</label>
            <select value={filtros.status} onChange={e => setFiltros({ ...filtros, status: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="CONCLUÍDA">Concluída</option>
              <option value="EM ANDAMENTO">Em Andamento</option>
              <option value="PENDENTE">Pendente</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ status: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Editar Etapa - ${selectedEtapa?.Nome}`}
        data={selectedEtapa}
        fields={selectedEtapa ? Object.keys(selectedEtapa) : []}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
        showAssociadosButton={true}
        onAssociadosClick={handleShowAssociados}
      />

      <Modal isOpen={showAssociadosModal} title={`Funcionários - ${selectedEtapa?.Nome}`} onClose={() => setShowAssociadosModal(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: "13px", color: theme.colors.textGray, marginBottom: 12 }}>
            {selectedEtapa?.Associados} funcionários associados a esta etapa:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {funcionariosSimples.slice(0, selectedEtapa?.Associados || 0).map((func, idx) => (
              <div key={idx} style={{
                padding: "10px 12px",
                background: theme.colors.bgLight,
                borderRadius: theme.radius,
                fontSize: "13px",
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`
              }}>
                {func}
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={() => setShowAssociadosModal(false)} size="md" style={{ marginTop: 12, width: "100%" }}>
            Fechar
          </Button>
        </div>
      </Modal>

      <Modal isOpen={showAddModal} title="Adicionar Nova Etapa" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={[]} onSubmit={() => setShowAddModal(false)} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default GestaoEtapas;
