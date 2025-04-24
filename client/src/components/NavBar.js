import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">Tablero de Avisos</a>
        <div className="navbar-links">
          <a href="/" className="navbar-link">Inicio</a>
          <a href="https://github.com/TU_USUARIO/tablero-avisos-notas" className="navbar-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
