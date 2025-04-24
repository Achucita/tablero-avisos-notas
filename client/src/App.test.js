// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

// Necesitamos mockear el react-router-dom ya que usamos BrowserRouter en App.js
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>, // Render the element prop correctly
}));

test('renders the application', () => {
  render(<App />);
  // Verificamos que al menos haya un elemento con la clase App
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
