import React, { useState } from 'react';
import './index.css';

// Componente de caixa flexível
function Card({ titulo, children }) {
  return (
    <div className="card">
      {titulo && <h3>{titulo}</h3>}
      {children}
    </div>
  );
}

// Cartão individual de cada ideia
function ItemIdeia({ ideia, onCurtir, onRemover }) {
  return (
    <Card titulo={ideia.titulo}>
      <p>{ideia.descricao}</p>
      <div className="acoes">
        {/* Botão de curtir */}
        <button type="button" className="btn-curtir" onClick={() => onCurtir(ideia.id)}>
          Curtir ({ideia.curtidas})
        </button>
        {/* Botão de remover */}
        <button type="button" className="btn-remover" onClick={() => onRemover(ideia.id)}>
          Remover
        </button>
      </div>
    </Card>
  );
}

export default function App() {
  // Lista de ideias
  const [ideias, setIdeias] = useState([
    { id: '1', titulo: 'Criar App em React', descricao: 'Aplicação para gerir hábitos.', curtidas: 3 },
    { id: '2', titulo: 'Modo Escuro no Painel', descricao: 'Alternar entre tema claro e escuro.', curtidas: 5 }
  ]);

  // Estados dos inputs e filtro
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  // Adiciona nova ideia
  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim() || !descricao.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    const novaIdeia = {
      id: crypto.randomUUID(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      curtidas: 0
    };

    setIdeias((prev) => [novaIdeia, ...prev]);
    setTitulo('');
    setDescricao('');
    setErro('');
  }

  // Soma +1 curtida
  function handleCurtir(id) {
    setIdeias((prev) =>
      prev.map((item) => (item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item))
    );
  }

  // Remove da lista
  function handleRemover(id) {
    setIdeias((prev) => prev.filter((item) => item.id !== id));
  }

  // Filtra pelo título ou descrição
  const termo = filtro.toLowerCase();
  const ideiasFiltradas = ideias.filter(
    (item) =>
      item.titulo.toLowerCase().includes(termo) ||
      item.descricao.toLowerCase().includes(termo)
  );

  return (
    <main className="container">
      <h1>Painel de Ideias</h1>

      {/* Form de cadastro */}
      <form onSubmit={handleSubmit} className="formulario">
        <h3>Adicionar Ideia</h3>
        
        <input
          type="text"
          placeholder="Título da ideia..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        
        <textarea
          placeholder="Descrição detalhada..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        
        {erro && <span className="erro">{erro}</span>}
        
        <button type="submit">Adicionar Ideia</button>
      </form>

      {/* Input de busca */}
      <div className="busca">
        <input
          type="text"
          placeholder="🔍 Buscar ideias..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Lista exibida na tela */}
      <section>
        <h3 className="section-title">Ideias ({ideiasFiltradas.length})</h3>
        <div className="lista-ideias">
          {ideiasFiltradas.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Nenhuma ideia encontrada.</p>
          ) : (
            ideiasFiltradas.map((ideia) => (
              <ItemIdeia
                key={ideia.id}
                ideia={ideia}
                onCurtir={handleCurtir}
                onRemover={handleRemover}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
//cd Painel_Ideias
//npm run dev