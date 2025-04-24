// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/create" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteForm />} />
          </Routes>
        </main>
        <footer className="bg-light py-3 text-center">
          <div className="container">
            <p className="text-muted mb-0">Tablero de Avisos y Notas - {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
