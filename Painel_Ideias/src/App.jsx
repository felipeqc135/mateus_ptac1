import React, { useState } from 'react';

function Card({ titulo, children }) {
  return (
    <div style={styles.card}>
      {titulo && <h3 style={styles.cardTitulo}>{titulo}</h3>}
      {children}
    </div>
  );
}

function ItemIdeia({ ideia, onCurtir, onRemover }) {
  return (
    <Card titulo={ideia.titulo}>
      <p style={styles.ideiaDescricao}>{ideia.descricao}</p>
      
      <div style={styles.acoesContainer}>
        <button onClick={() => onCurtir(ideia.id)} style={styles.btnCurtir}>
          ❤️ {ideia.curtidas} {ideia.curtidas === 1 ? 'Curtida' : 'Curtidas'}
        </button>

        <button onClick={() => onRemover(ideia.id)} style={styles.btnRemover}>
          🗑️ Remover
        </button>
      </div>
    </Card>
  );
}

export default function App() {
  const [ideias, setIdeias] = useState([
    { id: 1, titulo: 'Criar App em React', descricao: 'Aplicação para gerir hábitos e rotinas.', curtidas: 3 },
    { id: 2, titulo: 'Modo Escuro no Painel', descricao: 'Alternar entre tema claro e escuro.', curtidas: 5 }
  ]);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  function aoSubmeter(e) {
    e.preventDefault();

    if (titulo.trim() === '' || descricao.trim() === '') {
      setErro('Por favor, preencha o título e a descrição.');
      return;
    }

    const novaIdeia = {
      id: Date.now(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      curtidas: 0
    };

    setIdeias((prev) => [novaIdeia, ...prev]);
    setTitulo('');
    setDescricao('');
    setErro('');
  }

  function handleCurtir(id) {
    setIdeias((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item
      )
    );
  }

  function handleRemover(id) {
    setIdeias((prev) => prev.filter((item) => item.id !== id));
  }

  const ideiasFiltradas = ideias.filter(
    (item) =>
      item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      item.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={styles.pagina}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.tituloPrincipal}>💡 Painel de Ideias</h1>
          <p style={styles.subtitulo}>Registe e organize as suas ideias de projetos</p>
        </header>

        <section style={styles.secaoFormulario}>
          <h2 style={styles.subtituloSecao}>Cadastrar Nova Ideia</h2>
          <form onSubmit={aoSubmeter} style={styles.formulario}>
            <div>
              <label htmlFor="titulo" style={styles.label}>
                Título:
              </label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Sistema de Notificações"
                style={styles.input}
              />
            </div>

            <div>
              <label htmlFor="descricao" style={styles.label}>
                Descrição:
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva a sua ideia..."
                rows={3}
                style={styles.textarea}
              />
            </div>

            {erro && <p style={styles.mensagemErro}>{erro}</p>}

            <button type="submit" style={styles.btnSubmit}>
              Adicionar Ideia
            </button>
          </form>
        </section>

        <section style={styles.secaoFiltro}>
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="🔍 Procurar ideia por título ou descrição..."
            style={styles.inputFiltro}
          />
        </section>

        <section>
          <h2 style={styles.subtituloSecao}>
            Ideias Registadas ({ideiasFiltradas.length})
          </h2>

          {ideiasFiltradas.length === 0 ? (
            <div style={styles.listaVazia}>
              <p>Nenhuma ideia encontrada.</p>
            </div>
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
      </div>
    </div>
  );
}

const styles = {
  pagina: {
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333'
  },
  container: {
    maxWidth: '650px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px'
  },
  tituloPrincipal: {
    margin: 0,
    fontSize: '2rem',
    color: '#1a202c'
  },
  subtitulo: {
    margin: '8px 0 0 0',
    color: '#718096',
    fontSize: '0.95rem'
  },
  secaoFormulario: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    marginBottom: '24px'
  },
  secaoFiltro: {
    marginBottom: '24px'
  },
  subtituloSecao: {
    marginTop: 0,
    marginBottom: '16px',
    fontSize: '1.2rem',
    color: '#2d3748'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#4a5568'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  inputFiltro: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    boxSizing: 'border-box'
  },
  mensagemErro: {
    color: '#e53e3e',
    margin: 0,
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  btnSubmit: {
    padding: '12px',
    backgroundColor: '#3182ce',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '18px',
    marginBottom: '14px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
  },
  cardTitulo: {
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '1.1rem',
    color: '#2d3748'
  },
  ideiaDescricao: {
    margin: '0 0 14px 0',
    color: '#4a5568',
    lineHeight: '1.5',
    fontSize: '0.95rem'
  },
  acoesContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  btnCurtir: {
    padding: '8px 14px',
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  btnRemover: {
    padding: '8px 14px',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    border: '1px solid #fed7d7',
    borderRadius: