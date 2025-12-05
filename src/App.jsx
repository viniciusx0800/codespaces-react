// import './App.css';

// function MyButton() {
//   return (
//     <button className='button-en'>BUSCAR</button>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//      <h1 className='vaso-h1'>fala vaso</h1>
//      <input type="text" placeholder="pesquisar"/>
//      <MyButton />
     
//     </div>

//   );
// }



// export default App;

import { useState } from "react";
import "./App.css";

function MyButton({ onClick }) {
  return (
    <button className="button-en" onClick={onClick}>
      BUSCAR
    </button>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  async function buscarMusicas() {
    const resposta = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music`
    );
    const dados = await resposta.json();
    setResultados(dados.results);
  }

  return (
    <div className="App">
      <h1 className="vaso-h1">Palco Mp3</h1>

      <input
        type="text"
        placeholder="pesquisar"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <MyButton onClick={buscarMusicas} />
      <section>
      <ul>
        {resultados.map((musica) => (
          <li key={musica.trackId} style={{marginBottom:"20px"}}>
            <strong>{musica.trackName}</strong> - {musica.artistName}
            <br />
             {/* Player de áudio */}
            <audio controls src={musica.previewUrl}>
              Seu navegador não suporta áudio.
            </audio>

          </li>
        ))}
      </ul>
      </section>
    </div>
  );
}

export default App;

