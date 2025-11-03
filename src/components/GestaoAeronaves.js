import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Table from "./Table";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";
import FormBuilder from "./FormBuilder";
import { theme } from "../styles/theme";

function GestaoAeronaves() {
  const [busca, setBusca] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filtros, setFiltros] = useState({ tipo: "", modelo: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAeronave, setSelectedAeronave] = useState(null);
  const [aeronaves, setAeronaves] = useState([
    { Código: "E190", Modelo: "Embraer E-190 Regional", Tipo: "COMERCIAL", Capacidade: 100, "Alcance (km)": 4500, Registro: "01/02/2025" },
    { Código: "E195", Modelo: "Embraer E-195 Regional", Tipo: "COMERCIAL", Capacidade: 120, "Alcance (km)": 4800, Registro: "02/02/2025" },
    { Código: "B737", Modelo: "Boeing 737-800", Tipo: "COMERCIAL", Capacidade: 189, "Alcance (km)": 5000, Registro: "05/02/2025" },
    { Código: "A320", Modelo: "Airbus A320", Tipo: "COMERCIAL", Capacidade: 194, "Alcance (km)": 6300, Registro: "08/02/2025" },
    { Código: "F16", Modelo: "F-16 Fighting Falcon", Tipo: "MILITAR", Capacidade: 2, "Alcance (km)": 3900, Registro: "10/02/2025" },
    { Código: "GRIPEN", Modelo: "Gripen JF-17", Tipo: "MILITAR", Capacidade: 1, "Alcance (km)": 3500, Registro: "12/02/2025" },
    { Código: "CITATION", Modelo: "Cessna Citation X", Tipo: "EXECUTIVO", Capacidade: 12, "Alcance (km)": 5950, Registro: "15/02/2025" },
    { Código: "GULFSTREAM", Modelo: "Gulfstream G650ER", Tipo: "EXECUTIVO", Capacidade: 16, "Alcance (km)": 13000, Registro: "18/02/2025" },
    { Código: "ATR72", Modelo: "ATR 72-600", Tipo: "COMERCIAL", Capacidade: 78, "Alcance (km)": 1550, Registro: "20/02/2025" },
    { Código: "Q400", Modelo: "Bombardier Q400", Tipo: "COMERCIAL", Capacidade: 90, "Alcance (km)": 2040, Registro: "22/02/2025" },
  ]);

  let filtradas = aeronaves.filter(a =>
    Object.values(a).some(val => String(val).toLowerCase().includes(busca.toLowerCase()))
  );

  if (filtros.tipo) filtradas = filtradas.filter(a => a.Tipo === filtros.tipo);
  if (filtros.modelo) filtradas = filtradas.filter(a => a.Modelo === filtros.modelo);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage);
  const paginatedData = filtradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formFields = [
    { name: "codigo", label: "Código", type: "text", required: true },
    { name: "modelo", label: "Modelo", type: "text", required: true },
    { name: "tipo", label: "Tipo", type: "select", options: ["COMERCIAL", "MILITAR", "EXECUTIVO"], required: true },
    { name: "capacidade", label: "Capacidade", type: "number", required: true },
    { name: "alcance", label: "Alcance (km)", type: "number", required: true }
  ];

  const modelosUnicos = [...new Set(aeronaves.map(a => a.Modelo))];

  const handleRowClick = (row) => {
    setSelectedAeronave(row);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (updatedData) => {
    setAeronaves(aeronaves.map(a => a.Código === selectedAeronave.Código ? updatedData : a));
  };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ background: theme.colors.bg, borderRadius: theme.radius, padding: "24px", boxShadow: theme.shadows.md }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button variant="secondary" onClick={() => setShowFilter(true)}>Filtro</Button>
          <input
            type="text"
            placeholder="Pesquisar por código ou modelo"
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

      <Modal isOpen={showFilter} title="Filtrar Aeronaves" onClose={() => setShowFilter(false)} size="small">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Tipo</label>
            <select value={filtros.tipo} onChange={e => setFiltros({ ...filtros, tipo: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              <option value="COMERCIAL">Comercial</option>
              <option value="MILITAR">Militar</option>
              <option value="EXECUTIVO">Executivo</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: theme.colors.text, marginBottom: 6 }}>Modelo</label>
            <select value={filtros.modelo} onChange={e => setFiltros({ ...filtros, modelo: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius, fontSize: "13px" }} onFocus={e => e.target.style.borderColor = theme.colors.accent} onBlur={e => e.target.style.borderColor = theme.colors.border}>
              <option value="">Todos</option>
              {modelosUnicos.map(modelo => (
                <option key={modelo} value={modelo}>{modelo}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => { setFiltros({ tipo: "", modelo: "" }); setShowFilter(false); setCurrentPage(1); }} size="md">Limpar</Button>
            <Button variant="primary" onClick={() => { setShowFilter(false); setCurrentPage(1); }} size="md">Aplicar</Button>
          </div>
        </div>
      </Modal>

      <DetailModal
        isOpen={showDetailModal}
        title={`Editar Aeronave - ${selectedAeronave?.Modelo}`}
        data={selectedAeronave}
        fields={Object.keys(selectedAeronave || {})}
        onClose={() => setShowDetailModal(false)}
        onSave={handleSaveDetail}
      />

      <Modal isOpen={showAddModal} title="Adicionar Nova Aeronave" onClose={() => setShowAddModal(false)}>
        <FormBuilder fields={formFields} onSubmit={data => { setAeronaves([...aeronaves, { Código: data.codigo, Modelo: data.modelo, Tipo: data.tipo, Capacidade: data.capacidade, "Alcance (km)": data.alcance, Registro: new Date().toLocaleDateString("pt-BR") }]); setShowAddModal(false); }} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}

export default GestaoAeronaves;
