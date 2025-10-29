import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card, ListGroup, ButtonGroup } from "react-bootstrap";
import { addBlock, updateBlock, deleteBlock, importBlocks } from "../../features/blocksSlice.js";
import { handleExportAll, handleExportOne } from "../utils/exportFile.js";
import Swal from "sweetalert2";
import ShowToast from "../utils/ShowToast.jsx";

function BlockLibraryPage() {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.blocks.items);
  const blockList = Object.values(blocks);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !content) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name and content are required. Please fill them and try again.",
        footer: "<a href>Why do I have this issue?</a>",
      });
      return;
    }

    if (editingId) {
      dispatch(updateBlock({ id: editingId, name, content, shortcut }));
    } else {
      dispatch(addBlock({ name, content, shortcut }));
    }

    setToast({
      show: true,
      message: `Block crated or updated ✅`,
      variant: "success",
    });

    handleClear();
  };

  const handleEdit = (block) => {
    setEditingId(block.id);
    setName(block.name);
    setContent(block.content);
    setShortcut(block.shortcut);
  };

  const handleClear = () => {
    setEditingId(null);
    setName("");
    setContent("");
    setShortcut("");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: `¿Are you sure you want to delete this block ?`,
      text: "¡You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(deleteBlock({ id }));
      setToast({
        show: true,
        message: `Block deleted ✅`,
        variant: "success",
      });
      if (id === editingId) {
        handleClear();
      }
    }
  };

  const handleShortcutKeyDown = (event) => {
    event.preventDefault();

    let shortcutString = "";

    if (event.ctrlKey) shortcutString += "Ctrl+";
    if (event.altKey) shortcutString += "Alt+";
    if (event.shiftKey) shortcutString += "Shift+";
    if (event.metaKey) shortcutString += "Meta+";

    const key = event.key.toLowerCase();
    if (key !== "control" && key !== "alt" && key !== "shift" && key !== "meta") {
      shortcutString += event.key.toUpperCase();
    }

    setShortcut(shortcutString);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (file.name.endsWith(".parts.mdlc")) {
          dispatch(importBlocks(data));
        } else if (file.name.endsWith(".part.mdlc")) {
          dispatch(
            addBlock({
              name: data.name || "Imported",
              content: data.content || "",
              shortcut: data.shortcut || "",
            })
          );
        } else {
          setToast({
            show: true,
            message: `Format not recognized. Use .part.mdlc or .parts.mdlc`,
            variant: "warning",
          });
        }
      } catch (err) {
        console.error("Error al importar el archivo", err);
        setToast({
          show: true,
          message: "File is corrupted or not a valid JSON.",
          variant: "error",
        });
      }
      setToast({
        show: true,
        message: `File imported ✅`,
        variant: "success",
      });
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={5}>
            <Card>
              <Card.Header>
                <h4>{editingId ? "Edit Block" : "Create new Block"}</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Block name</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Alerta Info" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content (HTML/Markdown)</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder="<div class='alert alert-info'>...</div>" value={content} onChange={(e) => setContent(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Shortcut</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Ctrl+1" value={shortcut} onChange={(e) => setShortcut(e.target.value)} onKeyDown={handleShortcutKeyDown} />
                    <Form.Text>Define a shortcut (ej: Ctrl+1, Alt+B)</Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    {editingId ? "Update Block" : "Save Block"}
                  </Button>
                  {editingId && (
                    <Button variant="secondary" onClick={handleClear} className="ms-2">
                      Cancel
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <h4>Saved Blocks</h4>
            <ButtonGroup>
              <Button variant="success" className="me-1" size="sm" onClick={handleImportClick}>
                Import
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleExportAll(blocks)}>
                Export All
              </Button>
            </ButtonGroup>
            <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".mdlc" style={{ display: "none" }} />
            <ListGroup>
              {blockList.length > 0 ? (
                blockList.map((block) => (
                  <ListGroup.Item key={block.id}>
                    <h5>{block.name}</h5>
                    <pre style={{ fontSize: "0.8rem", maxHeight: "50px", overflow: "hidden" }}>{block.content}</pre>
                    <p className="mb-1">
                      <strong>Shortcut:</strong> {block.shortcut || "None"}
                    </p>
                    <Button variant="outline-primary" className="me-1" size="sm" onClick={() => handleEdit(block)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" className="me-1" size="sm" onClick={async () => await handleDelete(block.id)}>
                      Delete
                    </Button>
                    <Button variant="info" size="sm" onClick={() => handleExportOne(block)}>
                      Export
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <p>There are no custom blocks.</p>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <ShowToast setToast={setToast} toast={toast} />
    </>
  );
}

export default BlockLibraryPage;
