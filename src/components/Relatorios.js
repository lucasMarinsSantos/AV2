import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function Relatorios() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ tipo: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [relatorios, setRelatorios] = useState([
    { Código: "E190", Modelo: "Embraer E-190 Regional", Tipo: "COMERCIAL", "Relatório ID": 100, Cliente: "EMBRAER", Criado: "01/02/2025" },
    { Código: "E195", Modelo: "Embraer E-195 Regional", Tipo: "COMERCIAL", "Relatório ID": 101, Cliente: "LATAM Airlines", Criado: "02/02/2025" },
    { Código: "B737", Modelo: "Boeing 737-800", Tipo: "COMERCIAL", "Relatório ID": 102, Cliente: "GOL Linhas Aéreas", Criado: "03/02/2025" },
    { Código: "A320", Modelo: "Airbus A320", Tipo: "COMERCIAL", "Relatório ID": 103, Cliente: "Azul Linhas Aéreas", Criado: "05/02/2025" },
    { Código: "F16", Modelo: "F-16 Fighting Falcon", Tipo: "MILITAR", "Relatório ID": 104, Cliente: "Força Aérea Brasileira", Criado: "08/02/2025" },
    { Código: "GRIPEN", Modelo: "Gripen JF-17", Tipo: "MILITAR", "Relatório ID": 105, Cliente: "Ministério da Defesa", Criado: "10/02/2025" },
    { Código: "CITATION", Modelo: "Cessna Citation X", Tipo: "COMERCIAL", "Relatório ID": 106, Cliente: "VistaJet", Criado: "12/02/2025" },
    { Código: "GULFSTREAM", Modelo: "Gulfstream G650ER", Tipo: "COMERCIAL", "Relatório ID": 107, Cliente: "Flexjet", Criado: "15/02/2025" },
    { Código: "ATR72", Modelo: "ATR 72-600", Tipo: "COMERCIAL", "Relatório ID": 108, Cliente: "Astral Aviation", Criado: "18/02/2025" },
    { Código: "Q400", Modelo: "Bombardier Q400", Tipo: "COMERCIAL", "Relatório ID": 109, Cliente: "Saab AB", Criado: "20/02/2025" },
  ]);

  let filtradas = relatorios.filter(r =>
    Object.values(r).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.tipo) filtradas = filtradas.filter(r => r.Tipo === filtros.tipo);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (row) => {
    setSelectedRelatorio(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setRelatorios(relatorios.map(r => r.Código === selectedRelatorio.Código ? updatedData : r));
    setShowDetailModal(false);
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar..."
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
          <Button variant="primary" onClick={() => setShowAddModal(true)}>Gerar</Button>
        </div>

        <Table columns={paginatedData[0] ? Object.keys(paginatedData[0]) : []} data={paginatedData} onRowClick={handleRowClick} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} />
      </div>

      <Modal isOpen={showFilter} title="Filtrar Relatórios" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Tipo de Aeronave</label>
            <select value={filtros.tipo} onChange={e => setFiltros({ ...filtros, tipo: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="COMERCIAL">Comercial</option>
              <option value="MILITAR">Militar</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ tipo: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Relatório - ${selectedRelatorio?.Código}`}
        data={selectedRelatorio}
        fields={Object.keys(selectedRelatorio || {})}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
      />

      <Modal isOpen={showAddModal} title="Gerar Novo Relatório" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={[]} onSubmit={() => setShowAddModal(false)} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default Relatorios;
