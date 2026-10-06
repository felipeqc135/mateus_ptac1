import React, { useState } from 'react';

function Card({ titulo, children }) {
  return (
    <div className="card">
      {titulo && <h3>{titulo}</h3>}
      {children}
    </div>
  );
}

function ItemIdeia({ ideia, onCurtir, onRemover }) {
  return (
    <Card titulo={ideia.titulo}>
      <p>{ideia.descricao}</p>
      <div className="acoes">
        <button type="button" onClick={() => onCurtir(ideia.id)}>
          Curtir ({ideia.curtidas})
        </button>
        <button type="button" onClick={() => onRemover(ideia.id)}>
          Remover
        </button>
      </div>
    </Card>
  );
}

export default function App() {
  const [ideias, setIdeias] = useState([
    { id: '1', titulo: 'Criar App em React', descricao: 'Aplicação para gerir hábitos.', curtidas: 3 },
    { id: '2', titulo: 'Modo Escuro no Painel', descricao: 'Alternar entre tema claro e escuro.', curtidas: 5 }
  ]);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const tituloLimpo = titulo.trim();
    const descricaoLimpa = descricao.trim();

    if (!tituloLimpo || !descricaoLimpa) {
      setErro('Preencha todos os campos.');
      return;
    }

    const novaIdeia = {
      id: crypto.randomUUID(),
      titulo: tituloLimpo,
      descricao: descricaoLimpa,
      curtidas: 0
    };

    setIdeias((prevIdeias) => [novaIdeia, ...prevIdeias]);
    setTitulo('');
    setDescricao('');
    setErro('');
  }

  function handleCurtir(id) {
    setIdeias((prevIdeias) =>
      prevIdeias.map((item) =>
        item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item
      )
    );
  }

  function handleRemover(id) {
    setIdeias((prevIdeias) => prevIdeias.filter((item) => item.id !== id));
  }

  const termoFiltro = filtro.toLowerCase();
  const ideiasFiltradas = ideias.filter(
    (item) =>
      item.titulo.toLowerCase().includes(termoFiltro) ||
      item.descricao.toLowerCase().includes(termoFiltro)
  );

  return (
    <main className="container">
      <h1>Painel de Ideias</h1>

      <form onSubmit={handleSubmit} className="formulario">
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
        
        {erro && <span className="erro">{erro}</span>}
        
        <button type="submit">Adicionar</button>
      </form>

      <div className="busca">
        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <section>
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
      </section>
    </main>
  );
}