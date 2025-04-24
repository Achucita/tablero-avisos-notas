import { render, screen } from "@testing-library/react"
import App from "./App"

// Configurar el mock antes de importar React Router
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }) => <div data-testid={`route-${path}`}>{element}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/" }),
}))

// Importar el componente App después de configurar los mocks
test("renders App component", () => {
  render(<App />)
  // Aquí puedes agregar tus expectativas (expects)
  expect(screen.getByTestId("browser-router")).toBeInTheDocument()
})
