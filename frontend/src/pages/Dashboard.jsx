import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';
import { FaPlus, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';

// Modal de Edição de Despesa
const EditDespesaModal = ({ despesa, onClose, onSave }) => {
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

// Modal de Edição de Categoria
const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [nome, setNome] = useState(category.nome);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: category.id, nome });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Categoria</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da Categoria</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Modal de Exclusão Genérico
const DeleteModal = ({ itemType, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir est{itemType === 'despesa' ? 'a' : 'a'} {itemType === 'despesa' ? 'despesa' : 'categoria'}?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm} className="btn-danger">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
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
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null); // { type: 'despesa' | 'categoria', id: number }

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

  const handleDelete = async () => {
    if (!deletingItem) return;
    const { type, id } = deletingItem;
    setError('');
    try {
      await api.delete(`/${type}s/${id}`);
      setDeletingItem(null);
      if (type === 'despesa') {
        fetchDespesas();
      } else {
        fetchCategorias();
        fetchDespesas();
      }
    } catch (err) {
      setError(`Falha ao excluir ${type}.`);
    }
  };

  const handleUpdateDespesa = async (despesaToUpdate) => {
    setError('');
    try {
      const { id, ...data } = despesaToUpdate;
      await api.put(`/despesas/${id}`, data);
      setEditingDespesa(null);
      fetchDespesas();
    } catch (err) {
      setError('Falha ao atualizar despesa.');
    }
  };

  const handleUpdateCategory = async (categoryToUpdate) => {
    setError('');
    try {
      const { id, nome } = categoryToUpdate;
      await api.put(`/categorias/${id}`, { nome });
      setEditingCategory(null);
      fetchCategorias();
      fetchDespesas();
    } catch (err) {
      setError('Falha ao atualizar categoria.');
    }
  };


  return (
    <>
      {editingDespesa && 
        <EditDespesaModal 
          despesa={editingDespesa} 
          onClose={() => setEditingDespesa(null)} 
          onSave={handleUpdateDespesa} 
        />
      }
      {editingCategory && 
        <EditCategoryModal 
          category={editingCategory} 
          onClose={() => setEditingCategory(null)} 
          onSave={handleUpdateCategory} 
        />
      }
      {deletingItem &&
        <DeleteModal 
          itemType={deletingItem.type}
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      }

      <div className="dashboard-container">
        <nav className="navbar">
          <h2>Bem-vindo, {user.nome}!</h2>
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

          <div className="table-section">
            <h3>Categorias</h3>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.nome}</td>
                    <td className="actions">
                      <button className="btn-icon" onClick={() => setEditingCategory(cat)}><FaEdit /></button>
                      <button className="btn-icon" onClick={() => setDeletingItem({ type: 'categoria', id: cat.id })}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                      <button className="btn-icon" onClick={() => setDeletingItem({ type: 'despesa', id: despesa.id })}><FaTrash /></button>
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