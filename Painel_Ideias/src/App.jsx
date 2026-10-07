import React, { useState } from 'react';
import './index.css';

export default function App() {

  const [ideias, setIdeias] = useState([]);
  const [titulo, setTitulo] = useState('');

  function handleAdicionar(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    const novaIdeia = {
      id: Date.now(),
      titulo: titulo.trim(),
      curtidas: 0
    };

    setIdeias([novaIdeia, ...ideias]);
    setTitulo('');
  }

  function handleCurtir(id) {
    setIdeias(ideias.map(item => 
      item.id === id ? { ...item, curtidas: item.curtidas + 1 } : item
    ));
  }

  function handleRemover(id) {
    setIdeias(ideias.filter(item => item.id !== id));
  }

  return (
    <main className="container">
      <h1>💡 Painel de Ideias</h1>

      <form onSubmit={handleAdicionar} className="form-ideia">
        <input
          type="text"
          placeholder="Digite sua ideia..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit" className="btn-add">Adicionar</button>
      </form>

      <div className="lista">
        {ideias.length === 0 ? (
          <p className="vazio">Nenhuma ideia cadastrada ainda.</p>
        ) : (
          ideias.map((item) => (
            <div key={item.id} className="card">
              <p className="titulo">{item.titulo}</p>
              
              <div className="acoes">
                <button 
                  type="button" 
                  className="btn-curtir" 
                  onClick={() => handleCurtir(item.id)}
                >
                  Curtir ({item.curtidas})
                </button>
                <button 
                  type="button" 
                  className="btn-remover" 
                  onClick={() => handleRemover(item.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}