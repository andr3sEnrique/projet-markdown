import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import FileTree from "../tree/FileTree.jsx";
import MarkdownEditor from "../markdown/MarkdownEditor.jsx";
import MarkdownPreview from "../markdown/MarkdownPreview.jsx";
import { useSelector } from "react-redux";
import ImageSelectorModal from "../images/ImageSelectorModal.jsx";
import { resolveImageRefs } from "../utils/imageResolver.js";
import BlockSelectorModal from "../Block/BlockSelectorModal.jsx";

const downloadFile = (filename, content) => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/markdown" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

function EditorPage() {
  const { tree, currentFileId } = useSelector((state) => state.files);
  const images = useSelector((state) => state.images.items);
  const currentFile = currentFileId ? tree[currentFileId] : null;
  const [showImageModal, setShowImageModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const insertTextRef = useRef(null);

  const handleExport = () => {
    if (currentFile && !currentFile.isFolder) {
      const contentToExport = resolveImageRefs(currentFile.content, images);
      downloadFile(currentFile.name, contentToExport);
    }
  };

  const handleInsertImage = (markdownSyntax) => {
    if (insertTextRef.current) {
      insertTextRef.current(markdownSyntax);
    }
  };

  const handleInsertBlock = (blockContent) => {
    if (insertTextRef.current) {
      insertTextRef.current(blockContent);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3} style={{ borderRight: "1px solid #ddd", height: "90vh" }}>
            <h4 className="mt-2">Browser</h4>
            <FileTree />
          </Col>

          <Col md={9}>
            <Row>
              <Col md={6} style={{ height: "90vh" }}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h4 className="mt-2">Editor</h4>
                  <div className="btn-group">
                    <Button variant="outline-success" className="me-1" size="sm" onClick={() => setShowBlockModal(true)} disabled={!currentFile || currentFile.isFolder}>
                      Insert Block
                    </Button>
                    <Button variant="outline-success" className="me-1" size="sm" onClick={() => setShowImageModal(true)} disabled={!currentFile || currentFile.isFolder}>
                      Insert Image
                    </Button>
                    <Button variant="outline-primary" className="mb-1" size="sm" onClick={handleExport} disabled={!currentFile || currentFile.isFolder}>
                      Export .md
                    </Button>
                  </div>
                </div>
                <MarkdownEditor onInsertText={insertTextRef} />
              </Col>

              <Col md={6} style={{ borderLeft: "1px solid #ddd", height: "90vh", overflowY: "auto" }}>
                <h4 className="mt-2">Preview</h4>
                <MarkdownPreview />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ImageSelectorModal show={showImageModal} onHide={() => setShowImageModal(false)} onInsert={handleInsertImage} />
      <BlockSelectorModal show={showBlockModal} onHide={() => setShowBlockModal(false)} onInsert={handleInsertBlock} />
    </>
  );
}

export default EditorPage;
