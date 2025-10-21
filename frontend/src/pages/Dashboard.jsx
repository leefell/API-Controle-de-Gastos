import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';
import { FaPlus, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';

// Modal de Edição
const EditModal = ({ despesa, onClose, onSave }) => {
  const [descricao, setDescricao] = useState(despesa.descricao);
  const [valor, setValor] = useState(String(despesa.valor));
  const [data, setData] = useState(new Date(despesa.data).toISOString().split('T')[0]);
  const [categoriaId, setCategoriaId] = useState(despesa.categoriaId);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: despesa.id,
      descricao,
      valor: parseFloat(valor),
      data: new Date(data).toISOString(),
      categoriaId: parseInt(categoriaId),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Despesa</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Valor</label>
            <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data</label>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-primary">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal de Exclusão
const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir esta despesa?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm} className="btn-danger">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [despesas, setDespesas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingDespesa, setEditingDespesa] = useState(null);
  const [deletingDespesaId, setDeletingDespesaId] = useState(null);

  useEffect(() => {
    fetchDespesas();
    fetchCategorias();
  }, []);

  const fetchDespesas = async () => {
    try {
      const response = await api.get('/despesas');
      setDespesas(response.data);
    } catch (err) {
      setError('Falha ao buscar despesas.');
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (err) {
      setError('Falha ao buscar categorias.');
    }
  };

  const handleAddDespesa = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/despesas', { 
        descricao, 
        valor: parseFloat(valor), 
        data: new Date(data).toISOString(), 
        categoriaId: parseInt(categoriaId) 
      });
      fetchDespesas();
      setDescricao('');
      setValor('');
      setData('');
      setCategoriaId('');
    } catch (err) {
      setError('Falha ao adicionar despesa.');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/categorias', { nome: newCategoryName });
      fetchCategorias();
      setNewCategoryName('');
      setShowAddCategory(false);
    } catch (err) {
      setError('Falha ao adicionar categoria.');
    }
  };

  const handleDeleteDespesa = async () => {
    try {
      await api.delete(`/despesas/${deletingDespesaId}`);
      setDeletingDespesaId(null);
      fetchDespesas();
    } catch (err) {
      setError('Falha ao excluir despesa.');
    }
  };

  const handleUpdateDespesa = async (despesaToUpdate) => {
    setError('');
    try {
      const { id, descricao, valor, data, categoriaId } = despesaToUpdate;
      await api.put(`/despesas/${id}`, { descricao, valor, data, categoriaId });
      setEditingDespesa(null);
      fetchDespesas();
    } catch (err) {
      setError('Falha ao atualizar despesa.');
    }
  };

  return (
    <>
      {editingDespesa && 
        <EditModal 
          despesa={editingDespesa} 
          onClose={() => setEditingDespesa(null)} 
          onSave={handleUpdateDespesa} 
        />
      }
      {deletingDespesaId &&
        <DeleteModal 
          onConfirm={handleDeleteDespesa}
          onCancel={() => setDeletingDespesaId(null)}
        />
      }

      <div className="dashboard-container">
        <nav className="navbar">
          <h2>Painel</h2>
          <div className="navbar-actions">
            <button onClick={() => setShowAddCategory(!showAddCategory)} className="btn-primary">
              <FaPlus style={{ marginRight: '8px' }} />
              {showAddCategory ? 'Cancelar' : 'Nova Categoria'}
            </button>
            <button onClick={logout}><FaSignOutAlt style={{ marginRight: '8px' }} /> Sair</button>
          </div>
        </nav>

        <div className="content">
          {error && <p className="error">{error}</p>}

          {showAddCategory && (
            <div className="form-section">
              <h3>Adicionar Nova Categoria</h3>
              <form onSubmit={handleAddCategory}>
                <div className="form-group">
                  <label>Nome da Categoria</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Adicionar Categoria</button>
              </form>
            </div>
          )}

          <div className="form-section">
            <h3>Adicionar Nova Despesa</h3>
            <form onSubmit={handleAddDespesa}>
              <div className="form-group">
                <label>Descrição</label>
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Valor</label>
                <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Data</label>
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary">Adicionar Despesa</button>
            </form>
          </div>

          <div className="table-section">
            <h3>Despesas</h3>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map(despesa => (
                  <tr key={despesa.id}>
                    <td>{despesa.descricao}</td>
                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.valor)}</td>
                    <td>{new Date(despesa.data).toLocaleDateString('pt-BR')}</td>
                    <td>{despesa.categoria.nome}</td>
                    <td className="actions">
                      <button className="btn-icon" onClick={() => setEditingDespesa(despesa)}><FaEdit /></button>
                      <button className="btn-icon" onClick={() => setDeletingDespesaId(despesa.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
