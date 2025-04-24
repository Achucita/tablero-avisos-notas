// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

// Configurar el mock antes de importar React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route"></div>,
}));

test('renders the application', () => {
  render(<App />);
  // Verificamos que al menos haya un elemento con la clase App
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
