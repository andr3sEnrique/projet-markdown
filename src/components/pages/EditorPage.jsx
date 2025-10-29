import {Container, Row, Col, Button} from 'react-bootstrap';
import FileTree from '../../components/FileTree';
import MarkdownEditor from '../../components/MarkdownEditor';
import MarkdownPreview from '../../components/MarkdownPreview';
import {useSelector} from "react-redux";

const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function EditorPage() {
    const { tree, currentFileId } = useSelector((state) => state.files);
    const currentFile = currentFileId ? tree[currentFileId] : null;

    const handleExport = () => {
        if (currentFile && !currentFile.isFolder) {
            downloadFile(currentFile.name, currentFile.content);
        }
    }
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
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h4 className="mt-2">Editor</h4>
                                <Button variant="outline-primary" className="mb-1" size="sm" onClick={handleExport} disabled={!currentFile || currentFile.isFolder}>
                                    Export .md
                                </Button>
                            </div>
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