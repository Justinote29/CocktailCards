import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";
import MyCocktails from "./components/MyCocktails";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CreateCocktail from "./components/CreateCocktail";

function App() {
  return (
    <Router>
      <Navbar
        fixed="top"
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/">My Cocktail Cards</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Cocktail Search
              </Nav.Link>
              <Nav.Link as={Link} to="/createcocktail">
                Create Cocktail
              </Nav.Link>
              <Nav.Link as={Link} to="/mycocktails">
                My Cards
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/home" element={<Search />}></Route>
        <Route path="/createcocktail" element={<CreateCocktail />}></Route>
        <Route path="/mycocktails" element={<MyCocktails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
