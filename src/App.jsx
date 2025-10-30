import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import EditorPage from "./components/pages/EditorPage";
import ImageLibraryPage from "./components/pages/ImageLibraryPage.jsx";
import BlockLibraryPage from "./components/pages/BlockLibraryPage.jsx";
import ProfilPage from "./components/pages/ProfilsPage.jsx";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand to="/">MarkDown Editor</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Editor
              </Nav.Link>
              <Nav.Link as={Link} to="/blocs">
                Blocs
              </Nav.Link>
              <Nav.Link as={Link} to="/images">
                Images
              </Nav.Link>
              <Nav.Link as={Link} to="/profils">
                Profils
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/blocs" element={<BlockLibraryPage />} />
          <Route path="/images" element={<ImageLibraryPage />} />
          <Route path="/profils" element={<ProfilPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
