import {Container, Nav, Navbar} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import EditorPage from './components/pages/EditorPage';

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand to="/">
                        MarkDown Editor
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/">
                                Editor
                            </Nav.Link>
                            <Nav.Link to="/blocs">
                                Blocs
                            </Nav.Link>
                            <Nav.Link to="/images">
                                Images
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={<EditorPage />} />
                </Routes>
            </Container>
        </>
    );
}

export default App
