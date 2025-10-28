import {Container, Nav, Navbar} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import EditorPage from './components/pages/EditorPage';

function BlockLibraryPage() {
    return <h1>Biblioteca de Bloques Personalizados</h1>;
}
function ImageLibraryPage() {
    return <h1>Biblioteca de Imágenes</h1>;
}
function App() {
  return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>MarkDown Editor</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link to='/'>Editor</Nav.Link>
                    <Nav.Link to='/'>Blocs</Nav.Link>
                    <Nav.Link to='/'>Images</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Container className="mt-4">
            <Routes>
                <Route path="/" element={<EditorPage />} />
            </Routes>
        </Container>
    </>
  )
}

export default App
