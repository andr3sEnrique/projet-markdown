import { Container, Row, Col } from 'react-bootstrap';
import FileTree from '../../components/FileTree';
import MarkdownEditor from '../../components/MarkdownEditor';
import MarkdownPreview from '../../components/MarkdownPreview';

function EditorPage() {
    return (
        <Container fluid>
            <Row>
                <Col md={3} style={{ borderRight: '1px solid #ddd', height: '90vh' }}>
                    <h4 className="mt-2">Browser</h4>
                    <FileTree />
                </Col>

                <Col md={9}>
                    <Row>
                        <Col md={6} style={{ height: '90vh' }}>
                            <h4 className="mt-2">Editor</h4>
                            <MarkdownEditor />
                        </Col>

                        <Col md={6} style={{ borderLeft: '1px solid #ddd', height: '90vh', overflowY: 'auto' }}>
                            <h4 className="mt-2">Preview</h4>
                            <MarkdownPreview />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default EditorPage;