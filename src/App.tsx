import React from 'react';
import { Footer } from './components/Footer';
import { Nqueens } from './components/nQueens';
import './App.scss';

function App() {
  return (
    <div>
      <div className="App">
        <Nqueens />
      </div>
      <Footer />
    </div>
  );
}

export default App;
