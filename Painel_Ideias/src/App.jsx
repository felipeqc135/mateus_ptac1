import React, { useState } from 'react';

function Card({ titulo, children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '12px', marginBottom: '10px' }}>
      {titulo && <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{titulo}</h3>}
      {children}
    </div>
  );
}

function ItemIdeia({ ideia, onCurtir, onRemover }) {
  return (
    <Card titulo={ideia.titulo}>
      <p style={{ margin: '0 0 10px 0' }}>{ideia.descricao}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onCurtir(ideia.id)}>
          Curtir ({ideia.curtidas})
        </button>
        <button onClick={() => onRemover(ideia.id)}>
          Remover
        </button>
      </div>
    </Card>
  );
}

export default function App() {
  const [ideias, setIdeias] = useState([
    { id: 1, titulo: 'Criar App em React', descricao: 'Aplicação para gerir hábitos.', curtidas: 3 },
    { id: 2, titulo: 'Modo Escuro no Painel', descricao: 'Alternar entre tema claro e escuro.', curtidas: 5 }
  ]);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  function aoSubmeter(e) {
    e.preventDefault();

    if (titulo.trim() === '' || descricao.trim() === '') {
      setErro('Preencha todos os campos.');
      return;
    }

    const novaIdeia = {
      id: Date.now(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      curtidas: 0
    };

    setIdeias([novaIdeia, ...ideias]);
    setTitulo('');
    setDescricao('');
    setErro('');
  }

  function handleCurtir(id) {
    setIdeias(ideias.map((item) => 
      item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item
    ));
  }

  function handleRemover(id) {
    setIdeias(ideias.filter((item) => item.id !== id));
  }

  const ideiasFiltradas = ideias.filter(
    (item) =>
      item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      item.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h1>Painel de Ideias</h1>

      <form onSubmit={aoSubmeter} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <h3>Adicionar Ideia</h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        {erro && <span style={{ color: 'red' }}>{erro}</span>}
        <button type="submit">Adicionar</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <h3>Ideias ({ideiasFiltradas.length})</h3>
        {ideiasFiltradas.length === 0 ? (
          <p>Nenhuma ideia encontrada.</p>
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
    </div>
  );
}