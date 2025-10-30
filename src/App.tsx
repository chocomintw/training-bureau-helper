import React from 'react';
import FirebaseExample from './components/firebaseExample';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase + React + Vite</h1>
        <p>Deployed with GitHub Pages using pnpm</p>
      </header>
      <FirebaseExample />
    </div>
  );
}

export default App;